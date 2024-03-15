import { eachDayOfInterval, parseISO, intervalToDuration, differenceInDays } from 'date-fns';
import { createContext, useContext, useState } from "react";
import timelineItems, { CalendarEvent } from "./timelineItems";

export type AppContextProps = {
    events: CalendarEvent[],
    editEvent: (event: CalendarEvent) => void
}



export const CalendarContext = createContext({});

const CalendarContextProvider = (props: any) => {

    const getInitialEvents = () => {
        return timelineItems.map(event => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);

            const startDate = parseISO(event.start);
            const endDate = parseISO(event.end);

            const diffDays = differenceInDays(event.end, event.start) || 1;

            return {
                id: event.id,
                start: startDate,
                end: endDate,
                bgColor: `#${randomColor}`,
                slotSize: diffDays,
                name: event.name
            } as CalendarEvent;
        })
    };

    const [events, setEvents] = useState<CalendarEvent[]>(getInitialEvents);

    const editEvent = (event: CalendarEvent) => {
        setEvents(prev => {
            const editIndex = prev.findIndex(e => e.id === event.id);
            return prev.map((ev, index) => {
                if (index === editIndex) return event;
                return ev;
            })
        })
    }

    return (<CalendarContext.Provider value={{events, editEvent}}>
        {props.children}
    </CalendarContext.Provider>)
}

export const useEvents = () => useContext<AppContextProps>(CalendarContext as any);

export default CalendarContextProvider;