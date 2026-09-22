import { qcApi } from "../../api/qcApi";

export const forgetPasswordAction = async (email: string) =>{
  
  try {
    const { data } = await qcApi.post('/api/vendors/forget-password', {
      email: email
    });
  
    console.log( data );
    return data;
  
  } catch(error) {
    console.log({ error });
    return {
      message: error.response.data.error
    }
    throw(error);
  }

}