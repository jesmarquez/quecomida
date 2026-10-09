import { qcApi } from "../../api/qcApi"
import type { Meal } from "../interfaces/meals.response.interface";

export const getMealById = async (id: string) => {

  try {
    const { data } = await qcApi<Meal>(`/api/meals/${id}`);

    return data;
  } catch(error) {
    console.log(error);
    throw( error);
  }
}