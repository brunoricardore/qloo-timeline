import { useState } from "react";
import { useEvents } from "./AppContext";
import EventLines from "./EventLines";
import YearBadge from "./YearBadge";
import { RawEvents } from "./timelineItems";

const Timeline = () => {

    const { events } = useEvents();

    const organizedEvents: {
        [year: string]: RawEvents[]
    } = events.reduce((acc: any, val) => {
        const split = val.start.getFullYear();

        if (!acc[split]) {
            acc[split] = [];
        }

        acc[split].push(val)
        return acc;
    }, {});

    const yearSelected = (year: string) => {
        setSelectedYear(year);
    }

    const [selectedYear, setSelectedYear] = useState('');

    return <>
        <h1>Timeline Component</h1>
        <h3>Total events {events.length}</h3>

        <ul className="timeline">
            {
                Object.keys(organizedEvents).map(year =>
                    <li key={year} >
                        <YearBadge onYearSelected={yearSelected} year={year} active={selectedYear === year} />
                        {
                            (year === selectedYear) && <EventLines year={selectedYear} events={organizedEvents[year]} />
                        }
                    </li>
                )
            }
        </ul>

    </>
}

export default Timeline;