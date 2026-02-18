// FILE INI: Router utama aplikasi, menghubungkan semua halaman
// PERSON: Person 1
// KAPAN DIISI: Phase 1 - Setup awal

import { BrowserRouter, Routes, Route } from "react-router-dom";
// 💡 TODO NANTI: Setelah Redux store dibuat, uncomment 2 baris dibawah ini:
// import { Provider } from "react-redux";
// import { store } from "./store";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import CategoriesPage from "./pages/CategoriesPage";
import FAQPage from "./pages/FAQPage";

function App() {
  return (
    // 💡 TODO NANTI: Setelah store dibuat, wrap dengan Provider seperti ini:
    // <Provider store={store}>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar muncul di semua halaman */}
        <Navbar />

        {/* Routing - ganti halaman tanpa reload */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
