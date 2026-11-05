import { qcApi } from "../../api/qcApi"
import type { MealAvailability } from "../interfaces/availability_meal.interface";

export const updateMealAvailable = async (id: string, newAvailability: boolean ): Promise <MealAvailability> => {
  try {
    const { data } = await qcApi.patch<MealAvailability>(`/api/meals/${ id }/availability`, {
      isAvailable : newAvailability
    });
    return data;
  } catch (error) {
    console.log('updateMealAvailable', { id, newAvailability, error});
    throw new Error(`Could not update meal $ {id} availability`, { cause: error })
  }
}