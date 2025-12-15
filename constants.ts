import { FoodItem, LeaderboardUser } from './types';

export const MOCK_FOODS: FoodItem[] = [
  { id: '1', name: 'Bubble Tea', defaultCalories: 450, defaultPrice: 25 },
  { id: '2', name: 'Burger', defaultCalories: 550, defaultPrice: 45 },
  { id: '3', name: 'Pizza Slice', defaultCalories: 285, defaultPrice: 20 },
  { id: '4', name: 'Chocolate Bar', defaultCalories: 210, defaultPrice: 12 },
  { id: '5', name: 'Fried Chicken', defaultCalories: 320, defaultPrice: 35 },
  { id: '6', name: 'Soda Can', defaultCalories: 140, defaultPrice: 5 },
  { id: '7', name: 'Donut', defaultCalories: 300, defaultPrice: 15 },
];

export const MOCK_COMMUNITY_USERS: LeaderboardUser[] = [
  { id: 'u_1', name: 'FitAlice', totalMoney: 1200, totalCalories: 15000 },
  { id: 'u_2', name: 'IronMark', totalMoney: 850, totalCalories: 9500 },
  { id: 'u_3', name: 'User_992', totalMoney: 2100, totalCalories: 22000 },
  { id: 'u_4', name: 'SarahRuns', totalMoney: 450, totalCalories: 5000 },
  { id: 'u_5', name: 'EcoWarrior', totalMoney: 320, totalCalories: 4200 },
];

// Jogging MET value rough approximation for moderate jogging
export const JOGGING_COEFFICIENT = 0.115;