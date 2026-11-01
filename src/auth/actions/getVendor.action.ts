import { qcApi } from "../../api/qcApi";
import type { Vendor } from '../interfaces/auth.response';
import axios from "axios";

export const getVendorAction = async() => {

  try {
    const  { data }  = await qcApi.get<Vendor>('/api/vendors/me');
    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response.data?.error || error.response.data;
      console.log(`Error ${error.response.status}: ${backendMessage}`);
      if (error.response.status === 401) {
        console.log('delete token');
      } 
    } else {
      console.log(`An unexpected error occured: ${ String(error)}`);
    }
    throw (error);
  }
}