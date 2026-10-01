import { qcApi } from "../../api/qcApi"

export const createUpdateMealAction = async( formData: FormData) => {

  try {

    const { data }  = await qcApi.post('/api/meals', formData, {
      headers: { "Content-Type" : 'multipart/form-data' }
    });
  
    return data;
  } catch(error) {
    console.log('Failed to create meal:',error);
    throw error;
  }

}