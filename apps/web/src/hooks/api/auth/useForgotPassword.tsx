import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ForgotPasswordResponse {
  message: string;
}

const useForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true)
      const { data } = await axiosInstance.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        { email },
      );

      alert(data.message);
      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { forgotPassword, isLoading };
};

export default useForgotPassword;
