import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { EventType } from '../types';
import { useState, useEffect } from 'react';
import { Task } from '@/features/projects/types';

const useGetAllEvents = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    const fetchEvents = async (): Promise<Task[]> => {
        const response = await axiosInstance.get('/projects/tasks');
        return response.data;
    };

    const { data, error, isLoading } = useQuery<Task[], Error>({
        queryKey: ['getAllEvents'],
        queryFn: fetchEvents,
        staleTime: 300000,
    });

    useEffect(() => {
        if (data) {
            const formattedEvents = data.map((task) => {
                const start = task.start_date ? new Date(task.start_date) : new Date();
                const end = task.end_date ? new Date(task.end_date) : undefined;

                return {
                    ...task,
                    start_date: start,  // Używamy obiektu Date
                    end_date: end,      // Używamy obiektu Date
                    title: task.name,
                };
            });
            setEvents(formattedEvents as EventType[]);
        }
    }, [data]);

    return {
        events:data,
        error,
        isLoading,
};
};

export default useGetAllEvents;
