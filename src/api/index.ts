import axios from 'axios';
import { useMutation } from 'react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UserDetails = {
  username: string;
  password: string;
};

const useLogin = () =>
  useMutation((values: UserDetails) =>
    axios.post(`${API_URL}/login`, values).then((res) => res.data),
  );

export { useLogin };
