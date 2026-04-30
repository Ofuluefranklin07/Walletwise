export type Category = 
  | 'Food' 
  | 'Transport' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Utilities' 
  | 'Health' 
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO string
}
