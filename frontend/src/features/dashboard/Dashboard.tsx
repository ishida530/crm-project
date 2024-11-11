import React, { useState } from 'react';
import Calendar from '@/components/ui/Calendar';
import useGetAllEvents from './hooks/useGetEvents';
import { EventType } from './types'; // Zaimportuj odpowiednie typy
import EventFormModal from './EventFormModal';
import { useCreateEvent } from './hooks/useCreateEvent';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core/index.js';
import { useEditEvent } from './hooks/useEditEvent';
import { useDeleteEvent } from './hooks/useDeleteEvent';
import DeleteEventAlertDialog from './DeleteEventAlertDialog';

const Dashboard = () => {
    const { events, isLoading, error } = useGetAllEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isdeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [event, setEvent] = useState<EventType>()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { mutate: createEvent } = useCreateEvent()
    const { mutate: editEvent } = useEditEvent()
    const { mutate: deleteEvent } = useDeleteEvent()


    const handleOpenModal = (selectInfo: DateSelectArg) => {
        console.log(selectInfo)
        setIsEdit(false)
        setEvent({
            title: '',
            start: selectInfo.start,
            end: selectInfo.end,
            description: ''
        })
        setIsModalOpen(true);

    };
    const handleEdit = (clickInfo: EventClickArg) => {
        console.log(clickInfo)
        setIsEdit(true)
        setEvent({
            title: clickInfo.event.title,
            start: clickInfo.event.start ? clickInfo.event.start : new Date(),
            end: clickInfo.event.end ? clickInfo.event.end : undefined,
            description: clickInfo.event.extendedProps.description,
            id: Number(clickInfo.event.id),
        })
        setIsModalOpen(true);

    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveEvent = (eventData: EventType) => {
        console.log(eventData)
        const newEvent = {
            name: eventData.title,
            description: eventData.description,
            date: eventData.start,
            endDate: eventData.end,
            id: event?.id
        }
        if (isEdit) {
            editEvent(newEvent)
        } else {
            createEvent(newEvent)
        }

        handleCloseModal();
    };


    const handleDelete = () => {
        deleteEvent(Number(event?.id))
        setIsDeleteModalOpen(false)

    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Calendar eventsData={events}
                onAddEvent={handleOpenModal}
                onEditEvent={handleEdit}
            />
            {isModalOpen && <EventFormModal
                initialValues={event}
                onSave={handleSaveEvent}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                isEdit={isEdit}
                onDelete={() => setIsDeleteModalOpen(true)}
            />}

            {isdeleteModalOpen && < DeleteEventAlertDialog
                isOpen={isdeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onSave={handleDelete}
            />
            }
        </div>
    );
};

export default Dashboard;
