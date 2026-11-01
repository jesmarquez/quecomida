import { qcApi } from "../../api/qcApi"
import axios from "axios";

import type { Status } from "../../vendors/interfaces/order.interfaces"

export const updateOrder = async (id: string, newStatus:Status) => {
  try {
    const { data } = await qcApi.patch(`/api/orders/${id}/status`,
      {
        status: newStatus
      });
    console.log( data );
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log(`Status: ${error.response.status} Data: ${error.response.data.error}`);
      }
    }
    throw error;
  }
}