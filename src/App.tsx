/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  Wallet,
  LayoutDashboard,
  ReceiptText,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { Expense } from "./types.ts";
import { DEMO_EXPENSES } from "./constants.ts";
import ExpenseForm from "./components/ExpenseForm.tsx";
import ExpenseList from "./components/ExpenseList.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { motion, AnimatePresence } from "motion/react";

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
    const saved = localStorage.getItem("walletwise_expenses");
    return saved ? JSON.parse(saved) : DEMO_EXPENSES;
  });

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // --- PERSISTENCE LAYER ---
  useEffect(() => {
    localStorage.setItem("walletwise_expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    if (saved) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);    
  }, []);
  console.log("Current theme:", darkMode ? "Dark" : "Light");
  // --- HANDLER FUNCTIONS ---
  const addExpense = (newExpenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: crypto.randomUUID(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions">(
    "dashboard",
  );

  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className={`min-h-screen bg-indigo-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 border-4 md:border-8 border-indigo-100/50 dark:border-slate-900`}
    >
      {/* Header Section */}
      <header className="bg-white dark:bg-slate-900 border-b border-indigo-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 md:h-24 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-0 py-4 md:py-0">
          <div className="text-center md:text-left flex items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-indigo-900 dark:text-indigo-400 tracking-tight">
                SpendWise<span className="text-indigo-500">.</span>
              </h1>
              <p className="hidden md:block text-indigo-400 dark:text-indigo-500 text-xs font-bold uppercase tracking-wider leading-none mt-1">
                Dashboard Overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <nav className="flex bg-indigo-50 dark:bg-slate-800 p-1 rounded-xl md:rounded-2xl flex-1 md:flex-none">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  activeTab === "dashboard"
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                    : "text-indigo-400 dark:text-slate-500 hover:text-indigo-600"
                }`}
              >
                <LayoutDashboard size={16} />
                ANALYTICS
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-2 ${
                  activeTab === "transactions"
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                    : "text-indigo-400 dark:text-slate-500 hover:text-indigo-600"
                }`}
              >
                <ReceiptText size={16} />
                ACTIVITY
              </button>
            </nav>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-10">
        {/* Quick Add Section */}
        <section className="max-w-3xl mx-auto w-full">
          <ExpenseForm onAddExpense={addExpense} />
        </section>

        {/* Content Area */}
        <section className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" ? (
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
                <ExpenseList
                  expenses={expenses}
                  onDeleteExpense={deleteExpense}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

 
    </div>
  );
}
