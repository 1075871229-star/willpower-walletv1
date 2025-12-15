export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export interface UserProfile {
  name: string;
  mobile: string;
  gender: Gender;
  age: number;
  height: number; // cm
  weight: number; // kg
}

export interface FoodItem {
  id: string;
  name: string;
  defaultCalories: number;
  defaultPrice: number;
}

export interface Record {
  id: string;
  timestamp: number;
  foodName: string;
  calories: number;
  price: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  totalMoney: number;
  totalCalories: number;
  isCurrentUser?: boolean;
}