import { useRef } from 'react';
import plLocale from '@fullcalendar/core/locales/pl';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventType } from '@/features/dashboard/types';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';

interface CalendarProps {
  eventsData: EventType[];
  onAddEvent: (selectInfo: DateSelectArg) => void;
  onEditEvent: (clickInfo: EventClickArg) => void;
}

export default function Calendar({ eventsData, onAddEvent, onEditEvent }: CalendarProps) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={eventsData.map(event => {
        return ({
          title: event.name,
          start: event.start_date,
          end: event.end_date ? event.end_date : event.start_date,
          description: event.description,
          id: event.id?.toString() || '',
        })
      })}
      eventClick={onEditEvent}
      locale={plLocale}
      selectable={true}
      select={(e) => onAddEvent(e)}
      eventContent={(eventInfo) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="hover:cursor-pointer">
                <strong>{eventInfo.event.title}</strong>
              </TooltipTrigger>
              <TooltipContent>
                <div>{eventInfo.event.extendedProps.description}</div>
                <div>
                  {eventInfo.event.start && `Początek: ${formatTime(eventInfo.event.start)}`}
                </div>
                {eventInfo.event.end && (
                  <div>
                    Zakończenie: {eventInfo.event.end.toLocaleDateString('pl-PL')} {formatTime(eventInfo.event.end)}
                  </div>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }}
    />
  );
}