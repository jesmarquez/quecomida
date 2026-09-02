import { mealApi } from "../api/vendor.api";

export const getMeals = async () => {
  const { data } = await mealApi.get(`/`);
  return data;
}