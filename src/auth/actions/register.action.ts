import { qcApi } from "../../api/qcApi"

export const registerAction = async ( name: string, email: string, phone: string, address: string, password: string) => {

  try {
    const { data } = await qcApi.post('/api/vendors/register', {
      name: name,
      email: email,
      phone: phone,
      address: address,
      password: password
    });
  
    return { success: true, ...data};
  } catch( error) {
    console.log(error);
    return { success: false, error};
  }

}