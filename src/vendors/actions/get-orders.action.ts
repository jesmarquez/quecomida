import { qcApi } from "../../api/qcApi";
import type { Order } from "../interfaces/order.interfaces";
import axios from "axios";


export const getOrders = async ():Promise<Order[]> => {

  try {
    const { data }  = await qcApi('/api/orders');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
          const backendMessage = error.response.data?.message || error.response.data;
          console.log(`Error ${error.response.status}: ${backendMessage}`);
          
        } else if (error.request) {
          console.log('Network Error: No response received from the server.');
          
        } else {
          console.log(`Request Error: ${error.message}`);
        }

      } else {
        console.log(`An unexpected error occurred: ${String(error)}`);
      }
      throw(error);
    }
 
}