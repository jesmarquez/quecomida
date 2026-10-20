export interface Order {
  id:               string;
  mealPostId:       string;
  customerEmail:    string;
  quantity:         number;
  status:           string;
  verificationCode: string;
  isVerified:       boolean;
  createdAt:        Date;
  updatedAt:        Date;
  mealPost:         MealPost;
}

export interface MealPost {
  id:          string;
  title: string;
  price:       number;
}
