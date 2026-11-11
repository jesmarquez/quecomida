export interface Order {
  id:               string;
  mealPostId:       string;
  customerEmail:    string;
  quantity:         number;
  status:           Status;
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
  images: Images[];
}

export interface Images {
  id: string;
  imageUrl: string
}

export type Status = "ORDERED" | "READY_FOR_PICKUP" | "HANDED_OVER";
export const STATUSES: readonly Status[] = ['ORDERED', 'READY_FOR_PICKUP', 'HANDED_OVER'];
export const isStatus = (v: unknown): v is Status =>
  typeof v === 'string' && (STATUSES as readonly string[]).includes(v);