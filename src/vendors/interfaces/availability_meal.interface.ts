import type { DietaryInfo } from './vendor.interfaces';

export interface MealAvailability {
  id:          string;
  title:       string;
  description: string;
  price:       number;
  isAvailable: boolean;
  vendorId:    string;
  dietaryTags: DietaryInfo[];
  customTags:  string[];
  createdAt:   Date;
  updatedAt:   Date;
}
