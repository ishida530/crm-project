import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { DeleteAttendanceResponse } from '../types';

const deleteAttendance = async (attendanceId: number): Promise<DeleteAttendanceResponse> => {
    const response = await axiosInstance.delete(`attendances/${attendanceId}`);
    return response.data;
};

export const useDeleteAttendance = () => {
    const queryClient = useQueryClient();

    const { mutate, isError, data, isPending } = useMutation<DeleteAttendanceResponse, Error, number>({
        mutationFn: deleteAttendance,
        onSuccess: (data) => {
            console.log('Attendance deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllAttendances'] });
        },
        onError: (error) => {
            console.error('Error deleting attendance:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
