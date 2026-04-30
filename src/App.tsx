/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Wallet, LayoutDashboard, ReceiptText, Sparkles } from 'lucide-react';
import { Expense } from './types.ts';
import { DEMO_EXPENSES } from './constants.ts';
import ExpenseForm from './components/ExpenseForm.tsx';
import ExpenseList from './components/ExpenseList.tsx';
import Dashboard from './components/Dashboard.tsx';
import { motion, AnimatePresence } from 'motion/react';

/**
 * WELCOME TO REACT LOGIC STUDY GUIDE! 🚀
 * 
 * 1. STATE (useState): 
 *    Think of state as the "memory" of your app. In this app, our memory is
 *    the list of expenses. We use `useState` to store them.
 * 
 * 2. EFFECTS (useEffect): 
 *    Effects are things that happen "outside" of just rendering the UI.
 *    Like saving data to a database or localStorage. We use it here to ensure
 *    your expenses stay saved even if you refresh the page.
 * 
 * 3. LIFTING STATE UP:
 *    If two components need to share data (like the List and the Charts),
 *    we store the data in their common parent (this App component) and 
 *    pass it down as "props".
 */

export default function App() {
  // --- STATE LAYER ---
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('walletwise_expenses');
    return saved ? JSON.parse(saved) : DEMO_EXPENSES;
  });

  // --- PERSISTENCE LAYER ---
  useEffect(() => {
    localStorage.setItem('walletwise_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // --- HANDLER FUNCTIONS ---
  const addExpense = (newExpenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: crypto.randomUUID(),
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');

  return (
    <div className="min-h-screen bg-indigo-50 font-sans text-slate-900 border-8 border-indigo-100/50">
      {/* Header Section */}
      <header className="bg-white border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-indigo-900 tracking-tight">
              SpendWise<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider leading-none mt-1">Dashboard Overview</p>
          </div>

          <nav className="flex bg-indigo-50 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'dashboard' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-indigo-400 hover:text-indigo-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              ANALYTICS
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'transactions' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-indigo-400 hover:text-indigo-600'
              }`}
            >
              <ReceiptText className="w-4 h-4" />
              ACTIVITY
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-10">
        {/* Quick Add Section */}
        <section className="max-w-3xl mx-auto">
          <ExpenseForm onAddExpense={addExpense} />
        </section>

        {/* Content Area */}
        <section className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Dashboard expenses={expenses} />
              </motion.div>
            ) : (
              <motion.div
                key="transactions"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-5xl mx-auto"
              >
                <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Pro Tip Tooltip */}
      <div className="fixed bottom-6 left-12 bg-slate-900/80 backdrop-blur-md text-white text-[10px] py-1.5 px-4 rounded-full pointer-events-none z-50 shadow-2xl">
        PRO TIP: Use <span className="text-indigo-300 font-mono">useMemo()</span> to recalculate chart data only when state changes.
      </div>
    </div>
  );
}
