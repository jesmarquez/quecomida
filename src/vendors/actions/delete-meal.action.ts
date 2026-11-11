import { qcApi } from "../../api/qcApi"
import axios from 'axios';

export const deleteMeal = async (id: string) =>  {

  try {
    const { data } = await qcApi.delete(`/api/meals/${id}`);
    console.log(data);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
          const backendMessage = error.response.data.error?.message || error.response.data;
          console.log(`Error ${error.response.status}: ${backendMessage}`);
          if (error.response.status === 409 ) {
            throw({ message: 'This meal has orders and can not be deleted.'})
          }
          
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
