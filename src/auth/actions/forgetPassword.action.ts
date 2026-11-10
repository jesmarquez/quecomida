import axios from "axios";
import { qcApi } from "../../api/qcApi";

export const forgetPasswordAction = async (email: string) =>{
  
  try {
    const { data } = await qcApi.post('/api/vendors/forget-password', {
      email: email
    });
  
    console.log( data );
    return data;
  
  } catch(error) {
    if (axios.isAxiosError<{ error?: string }>(error)) {
      const status = error.response?.data?.error ?? error.message
      const backendMessage = error.response?.data?.error ?? error.message;
      console.log(`Error ${status ?? 'no response'}: ${backendMessage}`);
    }
    else {
      console.log(`An unexpected error occurred changePassword: ${String(error)}`);
    }
    throw error;
  }

}