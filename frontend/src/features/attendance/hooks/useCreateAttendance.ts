import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterAttendance, UpdateAttendanceResponse } from '../types';

export const useCreateAttendance = () => {
    const queryClient = useQueryClient();

    const createAttendance = async (attendanceData: RegisterAttendance): Promise<UpdateAttendanceResponse> => {
        console.log(attendanceData)
        const response = await axiosInstance.post('attendances', attendanceData);
        return response.data;
    };

    return useMutation<UpdateAttendanceResponse, Error, RegisterAttendance>({
        mutationFn: createAttendance,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['getFilteredAttendances'] });
        },
        onError: (error) => {
            console.error('Error creating attendance:', error);
        },
    });
};
