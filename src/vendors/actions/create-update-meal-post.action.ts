import { qcApi } from "../../api/qcApi"

export const createUpdateMealAction = async( formData: FormData) => {

  try {

    const { data }  = await qcApi.post('meals', formData, {
      headers: { "Content-Type" : 'multipart/form-data' }
    });
  
    console.log('Meal created', data );
  } catch(error) {
    console.log('Failed to create meal:',error);
  }

}