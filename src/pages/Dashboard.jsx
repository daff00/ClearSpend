// FILE INI: Dashboard Page - halaman dengan grafik/chart
// PERSON: Person 2
// CARA ISI: Implementasi useEffect + Redux + Chart.js (lihat IMPLEMENTATION_GUIDE.md)

function Dashboard() {
  // TODO: Import hooks dan Redux
  // import { useEffect } from 'react';
  // import { useDispatch, useSelector } from 'react-redux';
  // import { fetchTransactions } from '../store/transactionSlice';

  // TODO: Setup hooks
  // const dispatch = useDispatch();
  // const transactions = useSelector((state) => state.transactions.items);
  // const status = useSelector((state) => state.transactions.status);

  // TODO: useEffect untuk fetch data (3 POIN!)
  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchTransactions());
  //   }
  // }, [status, dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ===================  SUMMARY CARDS =================== */}
      <section className="border border-black p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          [ SUMMARY CARDS SECTION ]
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-400 p-4 min-h-[100px]">
            <h3 className="text-sm text-gray-600 mb-2">Total Income</h3>
            <p className="text-2xl font-bold">Rp 0</p>
            <p className="text-xs text-gray-400 mt-2">[ Hitung dari Redux ]</p>
          </div>

          <div className="border border-gray-400 p-4 min-h-[100px]">
            <h3 className="text-sm text-gray-600 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold">Rp 0</p>
            <p className="text-xs text-gray-400 mt-2">[ Hitung dari Redux ]</p>
          </div>

          <div className="border border-gray-400 p-4 min-h-[100px]">
            <h3 className="text-sm text-gray-600 mb-2">Net Balance</h3>
            <p className="text-2xl font-bold">Rp 0</p>
            <p className="text-xs text-gray-400 mt-2">[ Income - Expenses ]</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          💡 TODO: Calculate totals menggunakan transactions.reduce()
        </p>
      </section>

      {/* ===================  CHARTS SECTION =================== */}
      <section className="border border-black p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          [ CHARTS SECTION ]
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1: Pie Chart */}
          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-4">Spending by Category</h3>
            <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-300">
              <p className="text-gray-500">[ PIE CHART ]</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">Chart.js Pie Chart</p>
          </div>

          {/* Chart 2: Doughnut Chart */}
          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-4">Income vs Expenses</h3>
            <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-300">
              <p className="text-gray-500">[ DOUGHNUT CHART ]</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Chart.js Doughnut Chart
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          💡 TODO: Install Chart.js dan implementasi charts (lihat guide)
        </p>
      </section>

      {/* ===================  RECENT TRANSACTIONS =================== */}
      <section className="border border-black p-6">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          [ RECENT TRANSACTIONS ]
        </h2>
        <div className="border border-gray-400 p-4 min-h-[200px] bg-gray-50">
          <p className="text-gray-600 text-center">
            Table 5 transaksi terakhir akan muncul di sini
          </p>
          <p className="text-xs text-gray-400 text-center mt-4">
            [ transactions.slice(0, 5).map() ]
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          💡 TODO: Map 5 transaksi terakhir dari Redux
        </p>
      </section>

      {/* FOOTER INFO */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 border border-gray-300">
        📄 DASHBOARD PAGE - Dikerjakan oleh <strong>Person 2</strong> | Poin:
        useEffect (3) + 1 page (3) = 6pts
      </div>
    </div>
  );
}

export default Dashboard;
