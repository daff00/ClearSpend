// FILE INI: Komponen Navbar - navigasi utama aplikasi
// PERSON: Person 1
// TAMPIL DI: Semua halaman
// CARA ISI: Styling dengan Tailwind, tambah logo, ubah warna

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* TODO: Ganti dengan logo dan styling yang bagus */}
          <div className="border border-gray-400 p-2">
            <Link to="/" className="text-xl font-semibold">
              ClearSpend
            </Link>
            <p className="text-xs text-gray-500">
              [ Logo & Brand - ISI DISINI ]
            </p>
          </div>

          {/* Navigation Links - Sudah berfungsi untuk routing */}
          <div className="flex gap-6">
            <Link to="/" className="text-sm hover:underline">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>
            <Link to="/transactions" className="text-sm hover:underline">
              Transactions
            </Link>
            <Link to="/categories" className="text-sm hover:underline">
              Categories
            </Link>
            <Link to="/about" className="text-sm hover:underline">
              About
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-1 border-t border-gray-300">
        📍 Navbar Component - Navigasi berfungsi, tinggal styling
      </div>
    </nav>
  );
}

export default Navbar;
