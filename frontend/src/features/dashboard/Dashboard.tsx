import React, { useEffect, useState } from 'react';
import Calendar from '@/components/ui/Calendar';
import useGetAllEvents from './hooks/useGetEvents';
import { EventType } from './types';
import EventFormModal from './EventFormModal';
import { useCreateEvent } from './hooks/useCreateEvent';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';
import { useEditEvent } from './hooks/useEditEvent';
import { useDeleteEvent } from './hooks/useDeleteEvent';
import DeleteEventAlertDialog from './DeleteEventAlertDialog';

const Dashboard = () => {
  const { events, isLoading, error } = useGetAllEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: createEvent } = useCreateEvent();
  const { mutate: editEvent } = useEditEvent();
  const { mutate: deleteEvent } = useDeleteEvent();

  const handleOpenModal = (selectInfo: DateSelectArg) => {
    setIsEdit(false);
    setCurrentEvent({
      name: '',
      start_date: selectInfo.start,
      end_date: selectInfo.end,
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (clickInfo: EventClickArg) => {
    setIsEdit(true);
    setCurrentEvent({
      name: clickInfo.event.name,
      start_date: clickInfo.event.start_date || new Date(),
      end_date: clickInfo.event.end || undefined,
      description: clickInfo.event.extendedProps.description || '',
      id: Number(clickInfo.event.id)
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEvent = (eventData: EventType) => {
    const newEvent = {
      name: eventData.name,
      description: eventData.description,
      start_date: eventData.start_date.toISOString(),
      end_date: eventData.end_date?.toISOString(),
      id: currentEvent?.id,
      author: Number(localStorage.getItem('userId')),
      nothificationSent: 0
    };
    if (isEdit) {
      editEvent(newEvent);
    } else {
      createEvent(newEvent);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (currentEvent?.id) {
      deleteEvent(Number(currentEvent.id));
    } else {
      console.error("No event selected for deletion.");
    }
    setIsDeleteModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Calendar
        eventsData={events}
        onAddEvent={handleOpenModal}
        onEditEvent={handleEdit}
      />
      {isModalOpen && (
        <EventFormModal
          initialValues={currentEvent || { name: '', start_date: new Date(), end_date: new Date(), description: '' }}
          onSave={handleSaveEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isEdit={isEdit}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteEventAlertDialog
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSave={handleDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
