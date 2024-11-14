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


    const formatDate = (date: Date) => {
        const d = new Date(date);
        return d.toISOString();
    }

    useEffect(() => {
        if (data) {
            const formattedEvents = data.map((task) => {
                const start = task.date ? new Date(task.date) : new Date(); 
                const end = task.endDate ? new Date(task.endDate) : undefined; 
    
                return {
                    title: task.name,
                    start, 
                    end,
                    description: task.description,
                    id: task.id?.toString(),
                };
            });
            setEvents(formattedEvents as EventType[]);
        }
    }, [data]);

    return {
        events,
        error,
        isLoading,
    };
};

export default useGetAllEvents;
