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
      className="bg-white p-10 rounded-[40px] shadow-sm border border-indigo-100 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
           <PlusCircle size={24} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">New Transaction</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Label
          </label>
          <input
            type="text"
            placeholder="e.g. Starbucks Coffee"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 bg-indigo-50/50 border border-transparent rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all font-bold text-slate-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-6 py-4 bg-indigo-50/50 border border-transparent rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all font-bold text-slate-800"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-6 py-4 bg-indigo-50/50 border border-transparent rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all font-bold text-slate-800 appearance-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-6 py-4 bg-indigo-50/50 border border-transparent rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all font-bold text-slate-800"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-[24px] shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
      >
        <PlusCircle className="w-6 h-6" />
        Record Transaction
      </button>
    </form>
  );
}
