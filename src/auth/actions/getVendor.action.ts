import { qcApi } from "../../api/qcApi"
import type { Vendor } from '../interfaces/auth.response'

export const getVendorAction = async() => {

  try {
    const  { data }  = await qcApi.get<Vendor>('/api/vendors/me');
    return data;

  } catch (error) {
    console.log(error);

  }
}