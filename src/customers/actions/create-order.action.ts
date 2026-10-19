import { qcApi } from "../../api/qcApi";
import type { OrderCreated } from "../interfaces/order-created.response";

export const createOrder = async ( email:string, mealId: string, quantity: string):Promise<OrderCreated> => {

  try {
    const { data } = await qcApi.post<OrderCreated>('/api/orders', 
                            {
                              mealPostId: mealId,
                              customerEmail: email,
                              quantity: quantity
                          });
    return data;
    
  } catch (error) {
    console.log(error);
    throw(error);    
  }

}
