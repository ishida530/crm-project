import axiosInstance from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { InvestmentsResponse } from "../types";

const useGetInvestments = () => {
    const fetchInvestments = async (): Promise<InvestmentsResponse> => {
        const response = await axiosInstance.get("investments");
        return response.data;
    };

    const { data, error, isLoading } = useQuery<InvestmentsResponse, Error>({
        queryKey: ['getAllInvestments'],
        queryFn: fetchInvestments,
    });

    return {
        investments: data?.investments,
        error,
        isLoading,
    };
};

export default useGetInvestments;
