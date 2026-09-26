// ---- Types ----
export interface Meal {
  name: string;
  description: string;
  price: string;
  status: Status;
  image: string;
  dietaryTags: DietaryInfo[];
  customTasg: string[];
}

export type Status = 'Active' | 'Inactive';
export type DietaryInfo = 'Vegetarian' | 'Vegan' | 'Gluten-free' | 'Nut-free';