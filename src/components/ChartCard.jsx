// FILE INI: Komponen wrapper untuk Chart.js
// PERSON: Person 2
// KAPAN DIISI: Phase 3 - Saat mengerjakan Dashboard
// DIGUNAKAN DI: Dashboard.jsx

function ChartCard({ title, children }) {
  return (
    <div className="border-4 border-orange-500 p-4 bg-white rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="border-2 border-gray-300 p-4 min-h-[300px]">
        {children || (
          <div className="flex items-center justify-center h-64 bg-gray-100">
            <p className="text-gray-500">[ Chart akan ditampilkan di sini ]</p>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        ⬆️ Komponen wrapper reusable untuk semua chart
      </p>
    </div>
  );
}

export default ChartCard;
