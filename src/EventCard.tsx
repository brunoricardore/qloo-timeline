import { ChangeEvent, useState } from "react";
import { CalendarSettings } from "./constants";
import { CalendarEvent } from "./timelineItems";
import { useEvents } from "./AppContext";

const CardEventContent = ({ event, toggleEditMode }: { event: CalendarEvent, toggleEditMode: () => void }) => {

    const showNextMonthArrow = event.start.getMonth() < event.end.getMonth();

    return (
        <div onClick={toggleEditMode} key={event.id} style={{
            backgroundColor: event.bgColor,
            width: (CalendarSettings.slotWidth * (event.slotSize ?? 1)),
            height: CalendarSettings.slotHeight,
            top: event.lane === 0 ? 0 : (CalendarSettings.slotHeight * event.lane!)
        }}
            title={event.name} className="event-card">
            {event.fromLastMonth && <div title="Event went from previous month" className="prev-month-sign">{'<'}</div>}
            <div className="event-title">
                <span>{event.name}</span>
            </div>
            {showNextMonthArrow && <div title="Event goes to next month" className="next-month-sign">{'>'}</div>}
        </div>
    )
}

const CardEdit = ({ event, toggleEditMode }: { event: CalendarEvent, toggleEditMode: () => void }) => {

    const [newEvent, setNewEvent] = useState(event);

    const {editEvent} = useEvents();

    const width = (CalendarSettings.slotWidth * (event.slotSize ?? 1)) < 200 ? 200 : (CalendarSettings.slotWidth * (event.slotSize ?? 1));

    const handleNameChange = (change: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewEvent(prev => ({...prev, name: change.target.value}));
    }

    const save = () => {
        editEvent(newEvent);
        toggleEditMode();
    }

    return <div key={event.id} style={
        {
            width: width,
            height: 70,
            top: event.lane === 0 ? 0 : (CalendarSettings.slotHeight * event.lane!)
        }
    }
        title={event.name} className="event-card">
        <div className="edit-form">
            <textarea onChange={handleNameChange} value={newEvent.name}></textarea>
            <button onClick={save} >Save</button>
        </div>
    </div>
}


const EventCard = ({ event }: { event: CalendarEvent }) => {

    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => setEditMode(!editMode);

    return (
        <div className={'event-slot' + (editMode ? ' edit' : '')}>
            {!editMode ? <CardEventContent toggleEditMode={toggleEditMode} event={event} /> : <CardEdit toggleEditMode={toggleEditMode} event={event} />}
        </div>
    )
};

export default EventCard;