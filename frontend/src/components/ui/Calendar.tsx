import { useCallback, useRef } from 'react';
import plLocale from '@fullcalendar/core/locales/pl'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventType } from '@/features/dashboard/types';
import {  DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';



interface CalendarProps {
  eventsData: EventType[];
  onAddEvent: (selectInfo: DateSelectArg) => void,
  onEditEvent: (clickInfo: EventClickArg) => void,
}

export default function Calendar({ eventsData, onAddEvent,onEditEvent }: CalendarProps) {



  const calendarRef = useRef<FullCalendar | null>(null);

  // const handleEventClick = useCallback((clickInfo: EventClickArg) => {
  //   if (
  //     window.confirm(`このイベント「${clickInfo.event.title}」を削除しますか`)
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // }, []);

  return (
    <>
      <Button variant={'outline'} onClick={onAddEvent}>Add Event</Button>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventsData}
        eventClick={onEditEvent}
        locale={plLocale}
        selectable={true}

        select={onAddEvent}
        eventContent={(eventInfo) => {
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="hover:cursor-pointer">
                  <strong>{eventInfo.event.title}</strong>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{eventInfo.event.extendedProps.description}</div>
                  <div>{eventInfo.event.extendedProps.department}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }}
      />
    </>
  );
}
