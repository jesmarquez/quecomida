import { qcApi } from "../../api/qcApi";
import axios from "axios";

export const createUpdateMealAction = async( formData: FormData, id?: string) => {

  try {
    const url = id ? `/api/meals/${id}` : '/api/meals';
    const method = id ? 'put' : 'post';

    const { data } = await qcApi.request({
      url,
      method,
      data: formData,
      headers: { "Content-Type": 'multipart/form-data' },
    });

    return data;
  } catch(error) {
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