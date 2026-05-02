import { Category, Expense } from './types.ts';

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Health',
  'Other',
  'School' 

];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#FB7185', // Rose 400
  Transport: '#6366F1', // Indigo 500
  Entertainment: '#34D399', // Emerald 400
  Shopping: '#818CF8', // Indigo 400
  Utilities: '#F43F5E', // Rose 500
  Health: '#10B981', // Emerald 500
  Other: '#94A3B8', // Slate 400
   School: '#13ce80',
};

export const DEMO_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Five Guys Burgers',
    amount: 42.00,
    category: 'Food',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Apartment Rent',
    amount: 1800,
    category: 'Utilities',
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '3',
    title: 'AMC Cinema',
    amount: 35.00,
    category: 'Entertainment',
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: '4',
    title: 'Freelance Payout',
    amount: 2400.00,
    category: 'Other',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
    {
    id: '5',
    title: 'Academic Spendings',
    amount: 10000.00,
    category: 'School',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];
