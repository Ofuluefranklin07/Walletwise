import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Category, Expense } from '../types.ts';
import { CATEGORIES } from '../constants.ts';
import { cn } from '../lib/utils.ts';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

/**
 * COMPONENT EXPLANATION:
 * This component is responsible for gathering user input to create a new expense.
 * 
 * REACT CONCEPTS USED:
 * 1. useState: We use this to track what the user is typing in each field. 
 *    As they type, we update the state, and React re-renders the input with the new value.
 *    This is called "Controlled Components".
 * 
 * 2. Props: This component receives 'onAddExpense' which is a function from the parent (App.tsx).
 *    When the form is submitted, we call this function to send the data back up.
 */
export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  // We define "State" for each form field.
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Other');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || parseFloat(amount) <= 0) return;

    onAddExpense({
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
    });

    setTitle('');
    setAmount('');
    setCategory('Other');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-2xl md:rounded-[40px] shadow-sm border border-indigo-100 dark:border-slate-800 flex flex-col gap-5 md:gap-6 transition-colors duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
           <PlusCircle size={20} className="md:w-6 md:h-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Record Spend</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
            Description
          </label>
          <input
            type="text"
            placeholder="e.g. Starbucks"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-3 md:px-6 md:py-4 bg-indigo-50/50 dark:bg-slate-800/50 border border-transparent rounded-xl md:rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-200 dark:focus:border-indigo-900 transition-all font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600"
            required
          />
        </div>

        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400 pointer-events-none">₦</span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-5 py-3 md:pl-12 md:pr-6 md:py-4 bg-indigo-50/50 dark:bg-slate-800/50 border border-transparent rounded-xl md:rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-200 dark:focus:border-indigo-900 transition-all font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600"
              required
            />
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-5 py-3 md:px-6 md:py-4 bg-indigo-50/50 dark:bg-slate-800/50 border border-transparent rounded-xl md:rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-200 dark:focus:border-indigo-900 transition-all font-bold text-slate-800 dark:text-slate-100 appearance-none cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-white dark:bg-slate-900">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-5 py-3 md:px-6 md:py-4 bg-indigo-50/50 dark:bg-slate-800/50 border border-transparent rounded-xl md:rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-100 dark:focus:border-indigo-900 transition-all font-bold text-slate-800 dark:text-slate-100 dark:[color-scheme:dark]"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 md:mt-4 w-full py-4 md:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm md:text-lg rounded-xl md:rounded-[24px] shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 md:gap-3"
      >
        <PlusCircle className="w-5 h-5 md:w-6 md:h-6" />
        Add Transaction
      </button>
    </form>
  );
}
