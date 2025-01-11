import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Attendance, UpdateAttendanceResponse } from '../types';

export const useUpdateAttendance = () => {
    const queryClient = useQueryClient();

    // Update attendance API request function
    const updateAttendance = async (id: number, newStatus: string): Promise<UpdateAttendanceResponse> => {
        const response = await axiosInstance.put(`attendances/${id}?newStatus=${newStatus}`);
        return response.data;
    };

    // useMutation hook to update attendance
    const { mutate, isError, data, error } = useMutation<UpdateAttendanceResponse, Error, { id: number, newStatus: string }>({
        mutationFn: ({ id, newStatus }) => updateAttendance(id, newStatus),  // Calling updateAttendance
        onSuccess: (data) => {
            console.log('Attendance updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getFilteredAttendances'] });  // Invalidate queries after mutation
        },
        onError: (error) => {
            console.error('Error updating attendance:', error);
        },
    });

    return {
        mutate,
        data,
        isError,   
        error,     
    };
};
