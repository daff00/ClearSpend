// FILE INI: Dashboard Page - halaman dengan grafik/chart
// PERSON: Person 2
// CARA ISI: Implementasi useEffect + Redux + Chart.js (lihat IMPLEMENTATION_GUIDE.md)

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/transactionSlice';
import { fetchCategories } from '../store/categorySlice';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);
  const categories = useSelector((state) => state.categories.items);
  const categoriesStatus = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTransactions());
  }, [status, dispatch]);

  useEffect(() => {
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [categoriesStatus, dispatch]);
  const { totalIncome, totalExpenses, netBalance, categoryLabels, categoryValues } = useMemo(() => {
    const acc = transactions.reduce(
      (s, t) => {
        if (t.type === 'income') s.income += Number(t.amount || 0);
        if (t.type === 'expense') s.expenses += Number(t.amount || 0);
        if (t.type === 'expense') {
          const cat = t.category || 'Uncategorized';
          s.byCategory[cat] = (s.byCategory[cat] || 0) + Number(t.amount || 0);
        }
        return s;
      },
      { income: 0, expenses: 0, byCategory: {} }
    );
    const labels = Object.keys(acc.byCategory);
    const values = labels.map((k) => acc.byCategory[k]);
    return {
      totalIncome: acc.income,
      totalExpenses: acc.expenses,
      netBalance: acc.income - acc.expenses,
      spendingByCategory: acc.byCategory,
      categoryLabels: labels,
      categoryValues: values,
    };
  }, [transactions]);

  const doughnutData = useMemo(() => ({
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [totalIncome, totalExpenses],
      backgroundColor: ['#10B981', '#06422E'],
      borderWidth: 0,
    }],
  }), [totalIncome, totalExpenses]);

  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12 } },
      tooltip: { enabled: true },
    },
  }), []);

  const categoryData = useMemo(() => ({
    labels: categoryLabels,
    datasets: [{
      data: categoryValues,
      backgroundColor: (() => {
        const palette = ['#4F46E5', '#0EA5A4', '#F97316', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4', '#F472B6'];
        return categoryLabels.map((_, i) => palette[i % palette.length]);
      })(),
      borderWidth: 0,
    }],
  }), [categoryLabels, categoryValues]);

  const categoryOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12 } },
      tooltip: { enabled: true },
    },
  }), []);

  return (
 
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-slate-50 text-slate-800">

      {/* ═══════════════════════════════════════════
          SUMMARY CARDS SECTION
      ═══════════════════════════════════════════ */} 
      <section className="bg-white border border-slate-200 shadow-sm p-6 mb-6 rounded-2xl">
        <h2 className="text-xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 border-b border-slate-100 pb-3">
          Summary Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden bg-white border border-slate-200 border-l-4 border-l-emerald-500 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-400/15 rounded-full blur-2xl group-hover:bg-emerald-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Income</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(totalIncome)}</p>
            <p className="text-[10px] text-emerald-500 font-semibold mt-2">↑ Total pemasukan</p>
          </div>

          {/* ── Card: Total Expenses ── */}
          <div className="relative overflow-hidden bg-white border border-slate-200 border-l-4 border-l-rose-500 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-400/15 rounded-full blur-2xl group-hover:bg-rose-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Expenses</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(totalExpenses)}</p>
            <p className="text-[10px] text-rose-500 font-semibold mt-2">↓ Total pengeluaran</p>
          </div>

          <div className="relative overflow-hidden bg-white border border-slate-200 border-l-4 border-l-cyan-500 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/15 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Net Balance</p>
            <p className={`text-2xl font-black mt-1 ${netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {formatCurrency(netBalance)}
            </p>
            <p className="text-[10px] text-cyan-500 font-semibold mt-2">= Income − Expenses</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHARTS SECTION
      ═══════════════════════════════════════════ */}

      <section className="bg-white border border-slate-200 shadow-sm p-6 mb-6 rounded-2xl">
        <h2 className="text-xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 border-b border-slate-100 pb-3">
          Charts & Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
              Spending by Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                <div className="w-56 h-56">
                  <Pie data={categoryData} options={categoryOptions} />
                </div>
              </div>
              <div>
                {categoryLabels.length === 0 ? (
                  <div className="flex items-center justify-center h-48 bg-slate-100 border border-slate-200 rounded-xl">
                    <p className="text-slate-400 text-sm">No expense data yet</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {categoryLabels.map((label, idx) => (
                      <li key={label} className="flex justify-between items-center bg-white border border-slate-100 px-3 py-2 rounded-lg hover:border-slate-200 transition-colors">
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                        <span className="text-sm font-bold text-slate-800">{formatCurrency(categoryValues[idx])}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
              Chart shows spending breakdown by category.
            </p>
          </div>

          {/* Chart 2: Doughnut — Income vs Expenses */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
              Income vs Expenses
            </h3>
            <div className="flex items-center justify-center">
              <div className="w-56 h-56">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-700 font-semibold">{formatCurrency(totalIncome)}</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-xs text-rose-700 font-semibold">{formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RECENT TRANSACTIONS SECTION
      ═══════════════════════════════════════════ */}
      <section className="bg-white border border-slate-200 shadow-sm p-6 mb-6 rounded-2xl">
        <h2 className="text-xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 border-b border-slate-100 pb-3">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className="flex items-center justify-center py-16 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-slate-400 text-sm">Belum ada transaksi</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full text-left">

              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Date</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Description</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Category</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(-5).reverse().map((t, idx) => (

                  <tr key={t.id} className={`border-t border-slate-100 hover:bg-cyan-50/50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="py-3 px-4 text-sm text-slate-500">{formatDate(t.date)}</td>
                    <td className="py-3 px-4 text-sm text-slate-700 font-medium">{t.description}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-sm font-black text-right ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER INFO
      ═══════════════════════════════════════════ */}

      {/* <div className="relative bg-white border border-slate-200 rounded-2xl px-6 py-4 text-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Dashboard · Person 2 · useEffect (3pts) + Page (3pts) = 6pts
        </p>
      </div> */}

    </div>
  );
}

export default Dashboard;
