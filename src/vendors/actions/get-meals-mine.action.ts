import { qcApi } from "../../api/qcApi";
import type { Meal } from "../interfaces/meals.response.interface";

export const getMealsMine = async () => {
  try {
    const { data } = await qcApi.get<Meal[]>('/api/meals/mine');
    return data;
  } catch(error) {
    console.log(error);
    throw(error);
  }

}