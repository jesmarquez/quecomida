import { qcApi } from "../../api/qcApi";
import type{ Meal } from "../interfaces/meals.response.interface";


export const getMeals = async () => {
  try {
    const { data } = await qcApi.get<Meal[]>('/api/meals');
    return data;
  } catch (error) {
    console.log (error);
    throw (error);
  }
}