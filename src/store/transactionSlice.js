// ============================================================
// FILE INI: Redux Slice untuk mengelola STATE TRANSAKSI
// ============================================================
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
import { 
  Briefcase, Utensils, Home, ShoppingCart, Car, Ticket, PiggyBank, Gift 
} from 'lucide-react';

// STEP 2: Buat Redux Thunk untuk FETCH DATA (5 POIN!)
// Redux Thunk = fungsi async untuk ambil data dari API/JSON
// Mengapa perlu? Karena Redux tidak bisa langsung handle async operation
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    // Simulasi API call dengan delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData);
      }, 1000);
    })
  }
)

export const ICON_MAP = {
  Briefcase,
  Utensils,
  Home,
  ShoppingCart,
  Car,
  Ticket,
  PiggyBank,
  Gift,
}

// STEP 3: Buat Slice dengan createSlice (4 POIN Redux!)
// Slice = state + reducers dalam 1 object
const transactionSlice = createSlice({
  name: "transactions",

  // Initial State, data awal saat app pertama kali load
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },

  // Reducers untuk update state (synchronous)
  reducers: {
    // Action 1: Add Transaction
    addTransaction: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    // Action 2: Update Transaction
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id ===action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload; // replace dengan data baru
      }
    },

    // Action 3: Delete Transaction
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },

  // Extra reducers: Handle Async actions dari Thunk
  extraReducers: (builder) => {
    builder
      // Saat fetchTransactions PENDING (loading)
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      // Saat fetchTransactions FULFILLED (berhasil)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      // Saat fetchTransactions REJECTED (gagal)
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// STEP 4: Export actions dan reducer
// Actions = fungsi yang bisa di-dispatch dari component
// Reducer = function untuk daftar ke store
export const { addTransaction, updateTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;

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
