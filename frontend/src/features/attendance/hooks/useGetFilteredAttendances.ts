import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Attendance } from '../types';

interface UseGetFilteredAttendancesParams {
    month: number;
    weekNumber: number;
}

const useGetFilteredAttendances = ({ month, weekNumber }: UseGetFilteredAttendancesParams) => {
    const fetchFilteredAttendances = async (): Promise<Attendance[]> => {
        const response = await axiosInstance.get('attendances/statuses', {
            params: { month, weekNumber },
        });
        return response.data;
    };
    const { data, error, isLoading } = useQuery<Attendance[], Error>({
        queryKey: ['getFilteredAttendances', month, weekNumber], 
        queryFn: fetchFilteredAttendances,
        enabled: !!month && !!weekNumber,
        staleTime: 300000,
    });

    return {
        attendances: data,
        error,
        isLoading,
    };
};

export default useGetFilteredAttendances;
