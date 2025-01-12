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
    console.log('selectInfo', selectInfo)
    setCurrentEvent({
      name: selectInfo.title,
      startDate: selectInfo.start,
      endDate: selectInfo.end,
      description: selectInfo.description,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (clickInfo: EventClickArg) => {
    console.log('handleEdit clickInfo', clickInfo)
    setIsEdit(true);
    setCurrentEvent({
      name: clickInfo.event.title,
      startDate: clickInfo.event.start || new Date(),
      endDate: clickInfo.event.end || undefined,
      description: clickInfo.event.extendedProps.description, // Jeśli `description` jest w standardowej właściwości
      id: Number(clickInfo.event.id)
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEvent = (eventData: EventType) => {
    console.log('handleSaveEvent', eventData)
    const newEvent = {
      name: eventData.name,
      description: eventData.description,
      start_date: eventData.start_date,
      end_date: eventData.end_date,
      id: currentEvent?.id,
      author: localStorage.getItem('userId'),
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
          initialValues={currentEvent || { name: '', start_date: new Date().toISOString, end_date: new Date().toISOString, description: '' }}
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