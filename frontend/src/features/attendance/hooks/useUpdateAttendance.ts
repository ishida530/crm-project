import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Attendance, UpdateAttendanceResponse } from '../types';

export const useUpdateAttendance = () => {
    const queryClient = useQueryClient();

    const updateAttendance = async (attendanceData: Attendance): Promise<UpdateAttendanceResponse> => {
        const response = await axiosInstance.put(`attendances/${attendanceData.id}`, attendanceData);
        return response.data;
    };

    const { mutate, isError, data, isPending } = useMutation<UpdateAttendanceResponse, Error, Attendance>({
        mutationFn: updateAttendance,
        onSuccess: (data) => {
            console.log('Attendance updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllAttendances'] });
        },
        onError: (error) => {
            console.error('Error updating attendance:', error);
        },
    });

    return {
        mutate,
        data,
        isPending,
        isError,
    };
};
