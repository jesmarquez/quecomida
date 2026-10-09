import { qcApi } from "../../api/qcApi"

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
    console.log('Failed to create meal:',error);
    throw error;
  }

}