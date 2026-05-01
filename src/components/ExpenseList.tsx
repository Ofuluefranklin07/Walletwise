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
      <div className="bg-white dark:bg-slate-900 p-20 rounded-[40px] shadow-sm border border-indigo-100 dark:border-slate-800 text-center space-y-4">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-indigo-200 dark:text-slate-700">
          <Trash2 className="w-10 h-10" />
        </div>
        <p className="text-slate-500 dark:text-slate-300 font-bold text-lg">Your transaction list is empty.</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs mx-auto">Start recording your spending to see your insights here.</p>
      </div>
    );
  }

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[40px] shadow-sm p-5 md:p-10 flex flex-col gap-6 md:gap-8 h-full transition-colors duration-300">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Recent Activity</h3>
        <button className="text-[9px] md:text-[10px] font-black text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 px-2 md:px-3 py-1.5 rounded-lg md:rounded-xl transition-colors uppercase tracking-widest leading-none">
          All
        </button>
      </div>
      
      <div className="flex flex-col gap-3 md:gap-5 overflow-hidden">
        {sortedExpenses.map((expense) => (
          <div 
            key={expense.id}
            className="group flex items-center justify-between p-4 md:p-5 bg-indigo-50/40 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 border border-transparent hover:border-indigo-100 dark:hover:border-slate-700 rounded-2xl md:rounded-[28px] transition-all"
          >
            <div className="flex items-center gap-3 md:gap-5 min-w-0">
              <div 
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm bg-white dark:bg-slate-700 border border-indigo-100 dark:border-slate-600 shrink-0"
              >
                {expense.category === 'Food' ? '🍔' : 
                 expense.category === 'Transport' ? '🚗' : 
                 expense.category === 'Entertainment' ? '🍿' : 
                 expense.category === 'Shopping' ? '🛍️' : 
                 expense.category === 'Utilities' ? '⚡' : 
                 expense.category === 'Health' ? '🏥' : '💰'}
              </div>
              
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm md:text-base font-black text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {expense.title}
                </h3>
                <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1 md:gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[expense.category] }} />
                    {expense.category}
                  </span>
                  <span className="shrink-0">
                    {format(new Date(expense.date), 'MMM dd')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6 ml-2">
              <p className="text-sm md:text-lg font-black text-rose-500 whitespace-nowrap">
                -₦{expense.amount.toFixed(expense.amount % 1 === 0 ? 0 : 2)}
              </p>
              
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="p-1.5 md:p-2.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg md:rounded-xl transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                title="Delete"
              >
                <Trash2 size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
