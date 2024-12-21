import axiosInstance from '@/api/api';
import { useMutation } from '@tanstack/react-query';

export interface SaveFcmTokenRequest {
  userId: number;
  token: string;
}

export interface SaveFcmTokenResponse {
  statusCode: number;
  message: string;
}

export const useSaveFcmToken = () => {

  const saveFcmToken = async (data: SaveFcmTokenRequest): Promise<SaveFcmTokenResponse> => {
    console.log(data)
    const response = await axiosInstance.post(`/tokenfcm/${data.userId}`, data.token);
    return response.data;
  };

  return useMutation<SaveFcmTokenResponse, Error, SaveFcmTokenRequest>({
    mutationFn: saveFcmToken,
    onSuccess: (data) => {
      console.log('FCM token saved successfully:', data);
    },
    onError: (error) => {
      console.error('Error saving FCM token:', error);
    },
  });
};
