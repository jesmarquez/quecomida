import { qcApi } from "../../api/qcApi";

export const verifyOrderAction = async (orderId: string, code: string) => {
  try {
    const { data } = await qcApi.post(`/api/orders/${orderId}/verify`, { code });
    return data;
  } catch (error) {
    console.log('Failed to verify order:', error);
    throw error;
  }
};