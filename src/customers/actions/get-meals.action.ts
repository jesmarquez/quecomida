import { qcApi } from "../../api/qcApi";
import type{ Meal } from "../../vendors/interfaces/meals.response.interface";


export const getMealsPublic = async () => {
  try {
    const { data } = await qcApi.get<Meal[]>('/api/meals');
    return data;
  } catch (error) {
    console.log (error);
    throw (error);
  }
}