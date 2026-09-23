import { qcApi } from "../../api/qcApi"


export const changePassword = async (email: string, token: string, password:string ) => {

  
  try {
    const { data } = await qcApi.post('/api/vendors/reset-password', {
        token: token,
        email: email,
        password
      });
    return data;
  } catch (error) {
    console.log(error);
    return {
      message: error.response.data.error
    }

  }
}