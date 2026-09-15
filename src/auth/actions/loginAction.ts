
import { qcApi } from '../../api/qcApi'
import type { AuthResponse } from '../interfaces/auth.response';

export const loginAction = async(email: string, password: string ):Promise<AuthResponse> => {

  try {
    const { data } = await qcApi.post<AuthResponse>('/vendors/login', {
      email: email,
      password: password
    });
    
    localStorage.setItem('username', email);
    localStorage.setItem('token', data.token);

    return data;
  } catch (error)
   {
    console.log({ error });
    throw error;
  }
}