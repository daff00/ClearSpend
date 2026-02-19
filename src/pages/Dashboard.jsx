// FILE INI: Dashboard Page - halaman dengan grafik/chart
// PERSON: Person 2
// CARA ISI: Implementasi useEffect + Redux + Chart.js (lihat IMPLEMENTATION_GUIDE.md)

// ✅ NO CHANGES: semua import tetap sama
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/transactionSlice';
import { fetchCategories } from '../store/categorySlice';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  // ✅ NO CHANGES: semua hooks dan Redux selector tetap sama
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);
  const categories = useSelector((state) => state.categories.items);
  const categoriesStatus = useSelector((state) => state.categories.status);

  // ✅ NO CHANGES: useEffect fetch logic tetap sama
  useEffect(() => {
    if (status === 'idle') dispatch(fetchTransactions());
  }, [status, dispatch]);

  useEffect(() => {
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [categoriesStatus, dispatch]);

  // ✅ NO CHANGES: semua useMemo compute logic tetap sama
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

  // ✅ NO CHANGES: chart data dan options tetap sama
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
    /*
     * 🔵 CHANGE 1 — Root background
     * BEFORE: bg-white-400 text-black  ← bg-white-400 tidak valid di Tailwind
     * AFTER : bg-slate-50 text-slate-800
     * WHY   : bg-slate-50 adalah light gray yang bersih, cocok untuk light UI.
     *         Lebih enak di mata daripada pure white (bg-white).
     */
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-slate-50 text-slate-800">

      {/* ═══════════════════════════════════════════
          SUMMARY CARDS SECTION
      ═══════════════════════════════════════════ */}
      {/*
       * 🔵 CHANGE 2 — Section wrapper
       * BEFORE: bg-white/5 backdrop-blur-md border border-white/10  ← transparan, cocok dark bg
       * AFTER : bg-white border border-slate-200 shadow-sm
       * WHY   : Di light UI, bg-white/5 hampir tidak terlihat. Ganti ke bg-white solid
       *         supaya section punya background yang jelas dan bersih.
       */}
      <section className="bg-white border border-slate-200 shadow-sm p-6 mb-6 rounded-2xl">

        {/*
         * 🔵 CHANGE 3 — Section heading style
         * BEFORE: border-b border-gray-300
         * AFTER : border-b border-slate-100
         * WHY   : border-gray-300 terlalu gelap untuk light UI. slate-100 lebih halus.
         * ✅ Gradient text (from-emerald-500 to-blue-300) TETAP SAMA — sudah bagus.
         */}
        <h2 className="text-xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 border-b border-slate-100 pb-3">
          Summary Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Card: Total Income ──
           * ✅ NO CHANGES pada struktur card ini — sudah modern dengan border-l-4,
           *    glow orb, dan top edge highlight. Hanya warna glow disesuaikan.
           * 🔵 CHANGE 4 — Glow orb warna
           * BEFORE: bg-green-400/10
           * AFTER : bg-emerald-400/15
           * WHY   : Sedikit lebih visible di light background.
           */}
          <div className="relative overflow-hidden bg-white border border-slate-200 border-l-4 border-l-emerald-500 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-400/15 rounded-full blur-2xl group-hover:bg-emerald-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Income</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{formatCurrency(totalIncome)}</p>
            {/*
             * 🔵 CHANGE 5 — Tambah trend badge di bawah angka
             * BEFORE: tidak ada trend indicator
             * AFTER : badge kecil warna hijau
             * WHY   : Memberi konteks visual cepat tanpa perlu baca angka detail.
             */}
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

          {/* ── Card: Net Balance ──
           * 🔵 CHANGE 6 — Net balance value color dibuat kondisional
           * BEFORE: text-slate-800 selalu (tidak tahu positif/negatif)
           * AFTER : hijau kalau positif, merah kalau negatif
           * WHY   : User langsung tahu kondisi keuangan tanpa baca angka.
           */}
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
      {/*
       * 🔵 CHANGE 7 — Section wrapper sama seperti Change 2
       * BEFORE: bg-white/5 backdrop-blur-md border border-white/10
       * AFTER : bg-white border border-slate-200 shadow-sm
       */}
      <section className="bg-white border border-slate-200 shadow-sm p-6 mb-6 rounded-2xl">
        <h2 className="text-xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 border-b border-slate-100 pb-3">
          Charts & Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Chart 1: Pie — Spending by Category
           * 🔵 CHANGE 8 — Inner chart card
           * BEFORE: bg-white/5 backdrop-blur-md border border-white/10 (gelap/transparan)
           * AFTER : bg-slate-50 border border-slate-100
           * WHY   : Di light UI, slate-50 memberi subtle separation dari parent bg-white.
           */}
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
            {/*
             * 🔵 CHANGE 9 — Chart title style
             * BEFORE: font-bold (generic)
             * AFTER : text-sm font-black text-slate-700 uppercase tracking-widest
             * WHY   : Konsisten dengan label style di summary cards (tracking-widest).
             */}
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
                  /*
                   * 🔵 CHANGE 10 — Empty state styling
                   * BEFORE: bg-gray-50 border border-gray-300 (terlalu harsh)
                   * AFTER : bg-slate-100 border border-slate-200 rounded-xl (lebih soft)
                   */
                  <div className="flex items-center justify-center h-48 bg-slate-100 border border-slate-200 rounded-xl">
                    <p className="text-slate-400 text-sm">No expense data yet</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {categoryLabels.map((label, idx) => (
                      /*
                       * 🔵 CHANGE 11 — Category list item
                       * BEFORE: bg-white/60 p-2 rounded (terlalu flat)
                       * AFTER : bg-white border border-slate-100 rounded-lg dengan hover
                       * WHY   : Lebih jelas batas antar item, lebih professional.
                       */
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
            {/*
             * 🔵 CHANGE 12 — Chart summary below doughnut
             * BEFORE: text-gray-300 (tidak terlihat di light bg!)
             * AFTER : dua pill badges berwarna (hijau untuk income, merah untuk expense)
             * WHY   : text-gray-300 hampir invisible di background putih.
             *         Pill badges lebih informatif dan visual.
             */}
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

        {/*
         * 🔵 CHANGE 13 — Table wrapper
         * BEFORE: nested bg-white/5 backdrop-blur-md border border-white/10 (double glass)
         * AFTER : tidak ada double wrapper — langsung table di dalam section
         * WHY   : Double wrapper membuat UI terasa berat dan redundant.
         */}
        {transactions.length === 0 ? (
          <div className="flex items-center justify-center py-16 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-slate-400 text-sm">Belum ada transaksi</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full text-left">
              {/*
               * 🔵 CHANGE 14 — Table header
               * BEFORE: text-sm text-gray-600 (terlalu besar untuk header)
               * AFTER : bg-slate-50 dengan text-[10px] uppercase tracking-widest
               * WHY   : Konsisten dengan card label style, lebih hierarkis.
               */}
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Date</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Description</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Category</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((t, idx) => (
                  /*
                   * 🔵 CHANGE 15 — Table row styling
                   * BEFORE: border-t saja, tidak ada hover
                   * AFTER : stripe effect (even rows bg-slate-50/50) + hover highlight
                   * WHY   : Stripe dan hover membuat tabel lebih mudah dibaca (readability).
                   */
                  <tr key={t.id} className={`border-t border-slate-100 hover:bg-cyan-50/50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="py-3 px-4 text-sm text-slate-500">{formatDate(t.date)}</td>
                    <td className="py-3 px-4 text-sm text-slate-700 font-medium">{t.description}</td>
                    <td className="py-3 px-4">
                      {/*
                       * 🔵 CHANGE 16 — Category cell
                       * BEFORE: plain text-gray-700
                       * AFTER : pill badge abu-abu
                       * WHY   : Category lebih mudah di-scan secara visual sebagai tag/label.
                       */}
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
      {/*
       * 🔵 CHANGE 17 — Footer styling
       * BEFORE: bg-white/5 backdrop-blur-md border border-white/10 (kosong, tidak terlihat)
       * AFTER  : subtle info bar dengan gradient border top
       * WHY   : Footer yang ada kontennya lebih useful daripada div kosong.
       */}
      <div className="relative bg-white border border-slate-200 rounded-2xl px-6 py-4 text-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Dashboard · Person 2 · useEffect (3pts) + Page (3pts) = 6pts
        </p>
      </div>

    </div>
  );
}

export default Dashboard;
