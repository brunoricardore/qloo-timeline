import { ChangeEvent, useState } from "react";
import { CalendarSettings } from "./constants";
import { CalendarEvent } from "./timelineItems";
import { useEvents } from "./AppContext";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";

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

    const { editEvent } = useEvents();

    const width = 300;

    const { register, handleSubmit, formState, watch } = useForm<Partial<CalendarEvent>>({
        defaultValues: {
            name: event.name,
            start: event.start.toISOString().substring(0, 10) as any,
            end: event.end.toISOString().substring(0, 10) as any,
        }
    });

    const watchField = watch(['start', 'end']);

    const save = (data: any) => {

        editEvent({
            ...event,
            name: data.name,
            start: parseISO(data.start),
            end: parseISO(data.end),
        });
        toggleEditMode();
    }

    return <div key={event.id} style={
        {
            width: width,
            height: 150,
            top: event.lane === 0 ? 0 : (CalendarSettings.slotHeight * event.lane!)
        }
    }
        title={event.name} className="event-card">
        Editind event {event.id}
        <form onSubmit={handleSubmit(save)} className="edit-form">
            <textarea {...register('name', { required: true })}></textarea>
            <div style={{ display: 'flex', gap: 5, width: '100%' }}>

                <input style={{ flex: 1 }} type="date"
                    {...register('start', { required: true, validate: (startDate) => startDate! <= watchField[1]! })} />

                <input style={{ flex: 1 }} type="date"
                    {...register('end', { required: true, validate: (endDate) => endDate! <= watchField[0]! })} />
            </div>
            <div style={{ display: 'flex', gap: 5, width: '100%' }}>
                <button disabled={!formState.isValid} type="submit" >Save</button>
                <button onClick={toggleEditMode} type="submit" >close</button>

            </div>
        </form>
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