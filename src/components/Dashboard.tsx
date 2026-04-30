import { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Expense } from '../types.ts';
import { CATEGORY_COLORS } from '../constants.ts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

interface DashboardProps {
  expenses: Expense[];
}

/**
 * COMPONENT EXPLANATION:
 * This component summarizes the data using charts.
 * 
 * REACT CONCEPTS USED:
 * 1. useMemo: This is an optimization hook. 
 *    Calculating chart data can be "expensive" if there are thousands of items.
 *    useMemo tells React: "Only re-calculate this data IF the 'expenses' array changes."
 *    Otherwise, just remember (memoize) the previous result.
 */
export default function Dashboard({ expenses }: DashboardProps) {
  // 1. Calculate category breakdown for Pie Chart
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    expenses.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + e.amount;
    });
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  // 2. Calculate daily totals for Bar Chart
  const dailyData = useMemo(() => {
    const result: Record<string, number> = {};
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    last7Days.forEach(date => {
      result[date] = 0;
    });

    expenses.forEach(e => {
      const dateStr = e.date.split('T')[0];
      if (result[dateStr] !== undefined) {
        result[dateStr] += e.amount;
      }
    });

    return Object.entries(result).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }),
      amount
    }));
  }, [expenses]);

  // 3. Stats Overview
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-8">
      {/* Summary Cards */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-sm border-b-4 border-indigo-500 hover:shadow-xl transition-all">
          <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2">Total Budget</p>
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">
            ${(totalSpent * 2.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h2>
          <div className="mt-2 md:mt-3 text-[10px] md:text-xs font-bold text-emerald-500">Healthy status</div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-sm border-b-4 border-emerald-400 hover:shadow-xl transition-all">
          <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2">Monthly Income</p>
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">$6,200</h2>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-sm border-b-4 border-rose-400 hover:shadow-xl transition-all sm:col-span-2 lg:col-span-1">
          <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2">Spent This Month</p>
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">
            ${totalSpent.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h2>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="col-span-12 lg:col-span-5 bg-white p-6 md:p-10 rounded-2xl md:rounded-[32px] shadow-sm flex flex-col justify-between h-[400px] md:h-[500px]">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-lg md:text-2xl font-black text-slate-800 tracking-tight uppercase">Spending</h3>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-50 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-500">
            <PieChartIcon size={18} />
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={window.innerWidth < 768 ? 50 : 70}
                outerRadius={window.innerWidth < 768 ? 70 : 100}
                paddingAngle={8}
                dataKey="value"
              >
                {categoryData.map((entry) => (
                  <Cell 
                    key={`cell-${entry.name}`} 
                    fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xl md:text-3xl font-black text-slate-800">${totalSpent.toFixed(0)}</p>
            <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest">Total</p>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4">
          {categoryData.slice(0, 4).map(c => (
            <div key={c.name} className="flex items-center gap-2 md:gap-3">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[c.name as keyof typeof CATEGORY_COLORS] }} />
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate">{c.name}</span>
                <span className="text-xs md:text-sm font-black text-slate-800">${c.value.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Chart */}
      <div className="col-span-12 lg:col-span-7 bg-white p-6 md:p-10 rounded-2xl md:rounded-[32px] shadow-sm h-[400px] md:h-[500px]">
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h3 className="text-lg md:text-2xl font-black text-slate-800 tracking-tight uppercase">Trends</h3>
          <BarChart3 className="text-indigo-200" size={20} />
        </div>

        <div className="h-full pb-12 md:pb-16">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(value) => `$${value}`}
                width={35}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="amount" 
                fill="#6366f1" 
                radius={[8, 8, 0, 0]} 
                barSize={window.innerWidth < 768 ? 24 : 40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
