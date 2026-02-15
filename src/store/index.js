// ============================================================
// FILE INI: REDUX STORE - Gudang Pusat untuk Semua Data
// ============================================================
// PERSON: Person 1 (setup awal), Person 3 & 4 (uncomment setelah slice selesai)
//
// APA ITU STORE?
// - Store = Gudang yang menyimpan SEMUA STATE aplikasi
// - Semua component bisa akses data dari sini
// - Hanya ada 1 store untuk seluruh aplikasi
//
// KEGUNAAN FILE INI:
// - DAFTAR semua reducer dari slice-slice yang dibuat
// - Connect slice ke store agar bisa dipakai di component
// ============================================================

import { configureStore } from "@reduxjs/toolkit";

// 💡 TODO: Setelah transactionSlice.js dan categorySlice.js selesai diisi,
// uncomment 2 baris dibawah ini:
// import transactionReducer from "./transactionSlice";
// import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    // 💡 TODO: Setelah import reducers, uncomment 2 baris dibawah:
    // transactions: transactionReducer,  // ← State bisa diakses pakai state.transactions
    // categories: categoryReducer,        // ← State bisa diakses pakai state.categories
    // Sementara kosong dulu, nanti diisi setelah slice selesai dibuat
  },
});

// ============================================================
// PENJELASAN DETAIL:
// ============================================================
// configureStore({ reducer: { ... } })
// - Fungsi dari Redux Toolkit untuk setup store
// - Parameter `reducer` berisi SEMUA reducer dari slice
//
// transactions: transactionReducer
// - Key "transactions" = nama untuk akses di useSelector
// - Value transactionReducer = reducer dari transactionSlice
//
// CARA AKSES DI COMPONENT:
// const data = useSelector((state) => state.transactions.items);
//                                            ↑
//                                   Nama key yang didaftarkan disini
// ============================================================

// 📚 BACA REDUX_GUIDE.md UNTUK PENJELASAN LENGKAP!
