// ---- Types ----
export interface Meal {
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
  image: string;
  dietaryTags: DietaryInfo[];
  customTasg: string[];
}

export type DietaryInfo = 'GLUTEN_FREE' | 'VEGAN' | 'CARNIVORE' | 'ITALIAN';