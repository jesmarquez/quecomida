// ---- Types ----
export interface Meal {
  id: number;
  name: string;
  description: string;
  price: string;
  status: 'active' | 'paused';
  image: string;
  tags: string[];
  isNew?: boolean;
}

// ---- Stat Card ----
export interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  colorClass: string;
  bgClass: string;
}
