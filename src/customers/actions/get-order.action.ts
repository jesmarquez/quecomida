import { qcApi } from "../../api/qcApi";
import type { Order } from "../../vendors/interfaces/order.interfaces";
import axios from "axios";


export const getOrder = async (orderId: string):Promise<Order> => {

  try {
    const { data }  = await qcApi<Order>(`/api/orders/${orderId}`);

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