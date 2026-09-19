
import { qcApi } from '../../api/qcApi'
import type { AuthResponse, DataAuth } from '../interfaces/auth.response';



export const loginAction = async(email: string, password: string ):Promise<DataAuth> => {

  try {
    const { data } = await qcApi.post<AuthResponse>('/api/vendors/login', {
      email: email,
      password: password
    });

    return {
      username: data.vendor.email,
      token: data.token
    };
  } catch (error)
   {
    console.log('login action',{ error });
    return {
      username: null,
      token: null
    };
  }
}