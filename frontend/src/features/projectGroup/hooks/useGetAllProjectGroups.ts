import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectGroup } from '../types';
import useStore from '@/lib/store'; // Importujemy nasz Zustand store

const useGetAllProjectGroups = () => {
    // Pobieramy funkcję do zapisywania w Zustand
    const setProjectGroups = useStore((state) => state.setProjectGroups);

    const fetchProjectGroups = async (): Promise<ProjectGroup[]> => {
        const response = await axiosInstance.get('/project-groups'); // Zapytanie do API
        setProjectGroups(response.data); // Zapisujemy dane w Zustand po udanym zapytaniu

        return response.data; // Zwracamy dane, które będą użyte w hooku
    };

    const { data, error, isLoading } = useQuery<ProjectGroup[], Error>({
        queryKey: ['getAllProjectGroup'], // Klucz zapytania
        queryFn: fetchProjectGroups, // Funkcja do pobrania danych
        staleTime: 300000

    });

    return {
        projectGroups: data, // Zwracamy dane
        error,
        isLoading,
    };
};

export default useGetAllProjectGroups;
