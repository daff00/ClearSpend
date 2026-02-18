// FILE INI: Dashboard Page - halaman dengan grafik/chart
// PERSON: Person 2
// CARA ISI: Implementasi useEffect + Redux + Chart.js (lihat IMPLEMENTATION_GUIDE.md)

  // TODO: Import hooks dan Redux
  import { useEffect, useMemo } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchTransactions } from '../store/transactionSlice';
  import { fetchCategories } from '../store/categorySlice';
  import { formatCurrency, formatDate } from '../utils/formatters';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { Doughnut, Pie } from 'react-chartjs-2';

  ChartJS.register(ArcElement, Tooltip, Legend);
function Dashboard() {
  // TODO: Setup hooks
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);
  const categories = useSelector((state) => state.categories.items);
  const categoriesStatus = useSelector((state) => state.categories.status);

  // TODO: useEffect untuk fetch data (3 POIN!)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  // Fetch categories if idle (used for labels / chart hints)
  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  // Compute totals and category breakdown using reduce()
  const { totalIncome, totalExpenses, netBalance, spendingByCategory, categoryLabels, categoryValues } = useMemo(() => {
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

  // Doughnut data for Income vs Expenses
  const doughnutData = useMemo(() => ({
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#10B981', '#06422E'],
        borderWidth: 0,
      },
    ],
  }), [totalIncome, totalExpenses]);

  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12 } },
      tooltip: { enabled: true },
    },
  }), []);

  // Pie data for Spending by Category
  const categoryData = useMemo(() => ({
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        // fixed palette so each slice gets a stable color
        backgroundColor: (() => {
          const palette = ['#4F46E5', '#0EA5A4', '#F97316', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4', '#F472B6'];
          return categoryLabels.map((_, i) => palette[i % palette.length]);
        })(),
        borderWidth: 0,
      },
    ],
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
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-white-400 text-black">
      {/* ===================  SUMMARY CARDS =================== */}
      <section className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-green-900 border-b border-white/10 pb-2">
          SUMMARY CARDS SECTION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden bg-white border-l-4 border-green-500 backdrop-blur-lg p-6 rounded-xl shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 group">
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-all duration-300" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Income</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(totalIncome)}</p>
            {/* <p className="text-xs text-white/30 mt-2">[ Hitung dari Redux ]</p> */}
          </div>

          <div className="relative overflow-hidden bg-white border-l-4 border-red-500 backdrop-blur-lg p-6 rounded-xl shadow-sm hover:shadow-md hover:border-red-400 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-400/10 rounded-full blur-2xl group-hover:bg-red-400/20 transition-all duration-300" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Expenses</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(totalExpenses)}</p>
            {/* <p className="text-xs text-gray-400 mt-2">[ Hitung dari Redux ]</p> */}
          </div>

          <div className="relative overflow-hidden bg-white border-l-4 border-cyan-500 backdrop-blur-lg p-6 rounded-xl shadow-sm hover:shadow-md hover:border-cyan-400 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all duration-300" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Net Balance</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(netBalance)}</p>
            {/* <p className="text-xs text-gray-400 mt-2">[ Income - Expenses ]</p> */}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          {/* 💡 Totals dihitung menggunakan <code>transactions.reduce()</code>. Categories loaded: {categories.length}. */}
        </p>
      </section>

      {/* ===================  CHARTS SECTION =================== */}
      <section className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
           CHARTS SECTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1: Pie Chart */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4">Spending by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                <div className="w-56 h-56">
                  <Pie data={categoryData} options={categoryOptions} />
                </div>
              </div>

              <div>
                {/* List backup beside the chart */}
                {categoryLabels.length === 0 ? (
                  <div className="flex items-center justify-center h-48 bg-gray-50 border border-gray-300">
                    <p className="text-gray-500">No expense data yet</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {categoryLabels.map((label, idx) => (
                      <li key={label} className="flex justify-between bg-white/60 p-2 rounded">
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-sm">{formatCurrency(categoryValues[idx])}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Chart shows spending breakdown by category (colors generated dynamically).</p>
          </div>

          {/* Chart 2: Doughnut Chart */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4">Income vs Expenses</h3>
            <div className="flex items-center justify-center">
              <div className="w-56 h-56">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-300 text-center">
              <div>Income: {formatCurrency(totalIncome)}</div>
              <div>Expenses: {formatCurrency(totalExpenses)}</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          {/* 💡 TODO: Install Chart.js dan implementasi charts (lihat guide) */}
        </p>
      </section>

      {/* ===================  RECENT TRANSACTIONS =================== */}
      <section className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
           RECENT TRANSACTIONS 
        </h2>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
          {transactions.length === 0 ? (
            <p className="text-gray-600 text-center">Table 5 transaksi terakhir akan muncul di sini</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="py-2">Date</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="py-2 text-sm text-gray-700">{formatDate(t.date)}</td>
                    <td className="py-2 text-sm text-gray-700">{t.description}</td>
                    <td className="py-2 text-sm text-gray-700">{t.category}</td>
                    <td className={`py-2 text-sm font-medium ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          {/* 💡 TODO: Map 5 transaksi terakhir dari Redux */}
        </p>
      </section>

      {/* FOOTER INFO */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-6 rounded-2xl shadow-xl">
        {/* 📄 DASHBOARD PAGE - Dikerjakan oleh <strong>Person 2</strong> | Poin: */}
        {/* useEffect (3) + 1 page (3) = 6pts */}
      </div>
    </div>
  );
}

export default Dashboard;
