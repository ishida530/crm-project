import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Attendance } from '../types';

const useGetAllAttendances = () => {
  const fetchAttendances = async (): Promise<Attendance[]> => {
    const response = await axiosInstance.get('attendances');
    return response.data;
  };

  const { data, error, isLoading } = useQuery<Attendance[], Error>({
    queryKey: ['getAllAttendances'],
    queryFn: fetchAttendances,
    staleTime: 300000,
  });

  return {
    attendances: data,
    error,
    isLoading,
  };
};

export default useGetAllAttendances;
