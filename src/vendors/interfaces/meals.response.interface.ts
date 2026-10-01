export interface Meal {
  id:          string;
  title:       string;
  description: string;
  price:       number;
  isAvailable: boolean;
  vendorId:    string;
  dietaryTags: string[];
  customTags:  string[];
  createdAt:   Date;
  updatedAt:   Date;
  images:      Image[];
  vendor:      Vendor;
}

export interface Image {
  id:         string;
  imageUrl:   string;
  mealPostId: string;
}

export interface Vendor {
  id:   string;
  name: string;
}
