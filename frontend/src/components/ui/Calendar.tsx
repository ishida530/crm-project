import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState([
    { title: 'event 1', date: '2024-11-01' },
    { title: 'event 2', date: '2024-12-05' },
  ]);

  useEffect(() => { }, [calendarRef])
  const onEventAdded = () => {
    const newEvent = {
      title: `event ${events.length + 1}`,
      // date: new Date().toISOString().split('T')[0], 
      date: '2024-12-05'

    };

    setEvents([...events, newEvent]);

    const api = calendarRef.current?.getApi();
    api?.addEvent(newEvent);
  };

  return (
    <>
      <button onClick={onEventAdded}>Add Event</button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </>
  );
}
