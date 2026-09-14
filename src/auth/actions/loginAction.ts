
import { qcApi } from '../../api/qcApi'

export const loginAction = async(email: string, password: string ) => {
  try {
    console.log(import.meta.env.VITE_QC_API_URL);
    const { data } = await qcApi.post('/vendors/login', {
      email: email,
      password: password
    });
    console.log( data );
    return data;
  } catch (error)
   {
    console.log({ error });
    return false;
  }
}