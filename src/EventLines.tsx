import { eachDayOfInterval, endOfMonth, intervalToDuration, isWithinInterval, parseISO } from 'date-fns';
import { orderBy } from 'lodash-es';
import { useState } from "react";
import { useEvents } from "./AppContext";
import EventCard from "./EventCard";
import { CalendarSettings, weekDays } from "./constants";
import { CalendarEvent, RawEvents } from "./timelineItems";

interface CalendarDay {
    date: Date,
    number: number,
    dayOfWeek: string
}

const EventLines = ({ year }: { year: string, events: RawEvents[] }) => {

    let { events } = useEvents();

    const [month, setMonth] = useState(1);

    const monthString = month <= 9 ? `0${month}` : month;

    if (month !== 0) {
        const allEvents = structuredClone(events);
        const lastMonthEvents = allEvents.filter((e: CalendarEvent) => {
            const dateToCompare = parseISO(`${year}-${monthString}-01`);
            return e.end.getMonth() === dateToCompare.getMonth() && e.start.getMonth() < dateToCompare.getMonth();
        }).map((event: CalendarEvent) => {
            event.start = parseISO(`${year}-${monthString}-01`);
            event.slotSize = intervalToDuration({
                start: event.start,
                end: event.end
            }).days!;
            event.fromLastMonth = true;
            return event;
        });

        if (lastMonthEvents.length) {
            events = {
                ...events,
                ...lastMonthEvents
            }
        }
    }

    events = orderBy(events, ['start', 'slotSize'], ['asc', 'desc']);

    const daysOfMonth = (year: string, month: number): CalendarDay[] => {

        let firstDay = parseISO(`${year}-${monthString}-01`);
        let lastDay = endOfMonth(firstDay);

        const days = eachDayOfInterval({
            start: firstDay,
            end: lastDay
        });

        return days.map(day => {
            return {
                date: day,
                number: day.getDate(),
                dayOfWeek: weekDays[day.getDay()]
            }
        })
    }

    const calculateEventTop = (event: CalendarEvent, day: CalendarDay): CalendarEvent => {
        event.lane = alreadyRenderedItems.filter(e => e.start.getTime() === day.date.getTime()).length;
        let goToLane = 0;

        const maxLane = alreadyRenderedItems
            .filter(re => re.start.getTime() < event.start.getTime())
            .filter(re => isWithinInterval(event.start, { start: re.start, end: re.end }))
            .sort((a, b) => b.lane! - a.lane!);

        if (maxLane.length) {
            goToLane = maxLane[0].lane! + 1
        }

        const emptyLane = Array.from(Array(goToLane).keys()).filter(lane => {
            return alreadyRenderedItems
                .filter(re => re.lane === lane)
                .filter(re => isWithinInterval(event.start, { start: re.start, end: re.end }))
                .length === 0
        });

        if (emptyLane.length) {
            goToLane = emptyLane[0]
        }

        event.lane = goToLane > 0 ? goToLane : event.lane;

        return event;
    }

    const alreadyRenderedItems: CalendarEvent[] = [];

    return <div className="timeline-year-board">
        <h4 className="title">Showing timeline for {year}-{month}</h4>

        <div>
            <button disabled={month < 2} onClick={() => setMonth(month - 1)} >{'<'}</button>
            <button disabled={month === 12} onClick={() => setMonth(month + 1)} >{'>'}</button>
        </div>

        <div className="table-responsive">
            <table>
                <thead>
                    <tr style={{ display: 'flex' }}>
                        {
                            daysOfMonth(year, month).map((day, index) =>
                            (<th key={index}>
                                <div>{day.dayOfWeek}</div>
                                <div>{day.number}</div>
                            </th>)
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ display: 'flex', overflow: 'hidden' }}>
                        {
                            daysOfMonth(year, month).map((day, index) => {
                                return (<td data-date={day.number} key={index} style={{ width: CalendarSettings.slotWidth, minHeight: 250 }}>
                                    <div className="day-slot">
                                        {
                                            events
                                                .filter(event => event.start.getTime() === day.date.getTime())
                                                .map(event => {

                                                    event = calculateEventTop(event, day);
                                                    alreadyRenderedItems.push(event);

                                                    return <EventCard key={event.id} event={event} />
                                                })
                                        }
                                    </div>
                                </td>)
                            }
                            )
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default EventLines;