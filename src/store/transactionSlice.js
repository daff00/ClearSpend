// ============================================================
// FILE INI: Redux Slice untuk mengelola STATE TRANSAKSI
// ============================================================
// PERSON: Person 3 (Transactions Page)
// POIN: Redux (4pts) + Redux Thunk (5pts) = 9 POIN!
//
// APA ITU REDUX SLICE?
// - Slice = potongan kecil dari Redux store
// - Isinya: state + actions + reducers dalam 1 file
// -Lebih simple dari Redux klasik (tidak perlu banyak file)
//
// KEGUNAAN FILE INI:
// - Menyimpan data transaksi (array of transactions)
// - Menyediakan fungsi untuk CRUD (Create, Read, Update, Delete)
// - Handle async operation (fetch data dari JSON/API)
// ============================================================

// STEP 1: Import yang diperlukan
// Baca REDUX_GUIDE.md untuk penjelasan detail!

// 💡 TODO: Ketik manual 2 baris dibawah ini:
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import transactionsData from "../data/transactions.json";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionsData from "../data/transactions.json";

// STEP 2: Buat Redux Thunk untuk FETCH DATA (5 POIN!)
// Redux Thunk = fungsi async untuk ambil data dari API/JSON
// Mengapa perlu? Karena Redux tidak bisa langsung handle async operation

// 💡 TODO: Ketik manual code dibawah ini:
/*
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",  // <- Nama action (harus unik)
  async () => {
    // Simulasi API call dengan delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData);  // <- Return data transactions
      }, 500);
    });
  }
);
*/

// STEP 3: Buat Slice dengan createSlice (4 POIN Redux!)
// Slice = state + reducers dalam 1 object

// 💡 TODO: Ketik manual code dibawah ini:
/*
const transactionSlice = createSlice({
  name: "transactions",  // <- Nama slice (untuk Redux DevTools)
  
  // INITIAL STATE: Struktur data awal
  initialState: {
    items: [],           // <- Array untuk menyimpan transaksi
    status: "idle",      // <- Status fetch: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,         // <- Error message jika fetch gagal
  },
  
  // REDUCERS: Fungsi untuk UPDATE STATE (synchronous)
  // Setiap reducer akan jadi action yang bisa di-dispatch
  reducers: {
    
    // Action 1: ADD TRANSACTION
    addTransaction: (state, action) => {
      state.items.push({
        ...action.payload,   // <- Data transaction dari form
        id: Date.now(),      // <- Generate ID unik
      });
    },
    
    // Action 2: UPDATE TRANSACTION
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;  // <- Replace dengan data baru
      }
    },
    
    // Action 3: DELETE TRANSACTION
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      // Filter out transaction dengan id yang dihapus
    },
  },
  
  // EXTRA REDUCERS: Handle async actions dari Thunk
  extraReducers: (builder) => {
    builder
      // Saat fetch dimulai (loading)
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      // Saat fetch berhasil
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;  // <- Isi items dengan data dari JSON
      })
      // Saat fetch gagal
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
*/

// STEP 4: Export actions dan reducer
// Actions = fungsi yang bisa di-dispatch dari component
// Reducer = function untuk daftar ke store

// 💡 TODO: Ketik manual 2 baris dibawah ini:
/*
export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
*/

// ============================================================
// CARA MENGGUNAKAN DI COMPONENT:
// ============================================================
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTransactions, addTransaction } from '../store/transactionSlice';
//
// const dispatch = useDispatch();
// const transactions = useSelector((state) => state.transactions.items);
//
// // Fetch data:
// dispatch(fetchTransactions());
//
// // Add transaction:
// dispatch(addTransaction({ type: 'expense', amount: 50000, ... }));
// ============================================================

// 📚 BACA REDUX_GUIDE.md UNTUK PENJELASAN LENGKAP!
