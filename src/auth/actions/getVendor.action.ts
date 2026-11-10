import { qcApi } from "../../api/qcApi";
import type { Vendor } from '../interfaces/auth.response';
import axios from "axios";

export const getVendorAction = async() => {

  try {
    const  { data }  = await qcApi.get<Vendor>('/api/vendors/me');
    return data;

  } catch (error) {
    if (axios.isAxiosError<{ error?: string }>(error)) {
      const status = error.response?.data?.error ?? error.message
      const backendMessage = error.response?.data?.error ?? error.message;
      console.log(`Error ${status ?? 'no response'}: ${backendMessage}`);
    }
    else {
      console.log(`An unexpected error occurred getVendorAction: ${String(error)}`);
    }
    throw error;
  }
}