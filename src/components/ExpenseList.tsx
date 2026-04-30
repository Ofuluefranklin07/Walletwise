import { Trash2, Calendar, Tag } from 'lucide-react';
import { Expense } from '../types.ts';
import { CATEGORY_COLORS } from '../constants.ts';
import { format } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

/**
 * COMPONENT EXPLANATION:
 * This component displays the list of all expenses stored in our state.
 * 
 * REACT CONCEPTS USED:
 * 1. Array.map(): This is the standard way to render a list of elements in React.
 *    For every 'expense' in the 'expenses' array, we return a block of JSX.
 * 
 * 2. Keys: When rendering lists, React needs a unique 'key' for every item to track updates
 *    efficiently. We use the 'expense.id'.
 * 
 * 3. Conditional Rendering: If the array is empty, we show a friendly message.
 */
export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white p-20 rounded-[40px] shadow-sm border border-indigo-100 text-center space-y-4">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-200">
          <Trash2 className="w-10 h-10" />
        </div>
        <p className="text-slate-500 font-bold text-lg">Your transaction list is empty.</p>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">Start recording your spending to see your insights here.</p>
      </div>
    );
  }

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-[40px] shadow-sm p-10 flex flex-col gap-8 h-full">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recent Activity</h3>
        <button className="text-[10px] font-black text-indigo-500 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors uppercase tracking-widest leading-none">
          View All
        </button>
      </div>
      
      <div className="flex flex-col gap-5 overflow-hidden">
        {sortedExpenses.map((expense) => (
          <div 
            key={expense.id}
            className="group flex items-center justify-between p-5 bg-indigo-50/50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 border border-transparent hover:border-indigo-100 rounded-[28px] transition-all"
          >
            <div className="flex items-center gap-5">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-white border border-indigo-100"
              >
                {expense.category === 'Food' ? '🍔' : 
                 expense.category === 'Transport' ? '🚗' : 
                 expense.category === 'Entertainment' ? '🍿' : 
                 expense.category === 'Shopping' ? '🛍️' : 
                 expense.category === 'Utilities' ? '⚡' : 
                 expense.category === 'Health' ? '🏥' : '💰'}
              </div>
              
              <div className="space-y-0.5">
                <h3 className="text-base font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {expense.title}
                </h3>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[expense.category] }} />
                    {expense.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-lg font-black text-rose-500 whitespace-nowrap">
                -${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                title="Delete Transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
