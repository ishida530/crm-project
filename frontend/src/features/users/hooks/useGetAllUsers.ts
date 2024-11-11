import { UserListResponse } from './../types';
import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';



const useGetAllUsers = () => {
  const fetchUsers = async (): Promise<UserListResponse> => {
    const response = await axiosInstance.get('/admin/get-all-users');
    return response.data;
  }

  const { data, error, isLoading } = useQuery<UserListResponse, Error>({
    queryKey: ['getAllUsers'],
    queryFn: fetchUsers,


    staleTime: 300000,
  });

  return {
    users: data?.userList,
    error,
    isLoading,
  };
};

export default useGetAllUsers;
