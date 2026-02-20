// ============================================================
// FILE: transactionSlice.js — Redux Slice for Transactions
// ============================================================
//
// WHAT IS A SLICE?
// A slice is one section of the Redux store. It bundles together:
//   - The initial state (what data looks like at the start)
//   - Reducers (functions that update the state)
//   - Async thunks (for operations that need to wait, like fetching data)
//
// THIS FILE HANDLES:
//   - Storing the list of transactions
//   - CRUD operations: Create, Read, Update, Delete
//   - Fetching transaction data asynchronously
// ============================================================

// STEP 1: Import what we need
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionsData from "../data/transactions.json";
import {
  Briefcase,
  Utensils,
  Home,
  ShoppingCart,
  Car,
  Ticket,
  PiggyBank,
  Gift,
} from "lucide-react";

// ============================================================
// STEP 2: ASYNC THUNK — fetchTransactions (Redux Thunk, 5 pts)
//
// WHAT IS A THUNK?
// A thunk is an async function that runs before the reducer.
// It is used when you need to wait for something (like an API call)
// before updating the state.
//
// createAsyncThunk automatically creates 3 action types:
//   - fetchTransactions.pending   → triggers when the fetch STARTS
//   - fetchTransactions.fulfilled → triggers when the fetch SUCCEEDS
//   - fetchTransactions.rejected  → triggers when the fetch FAILS
// ============================================================
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    // Simulates a real API call with a 1 second delay.
    // In a real app, replace this with: const res = await fetch('/api/transactions')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData);
      }, 1000);
    });
  },
);

// Icon map — used to render icons by name stored as a string
export const ICON_MAP = {
  Briefcase,
  Utensils,
  Home,
  ShoppingCart,
  Car,
  Ticket,
  PiggyBank,
  Gift,
};

// ============================================================
// STEP 3: CREATE THE SLICE — createSlice (Redux, 4 pts)
//
// This is the main Redux piece for transactions.
// It defines what the data looks like and how it can change.
// ============================================================
const transactionSlice = createSlice({
  name: "transactions",

  // The starting data when the app first loads.
  // items: empty array, filled later by fetchTransactions
  // status: "idle" means nothing has started yet
  initialState: {
    items: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },

  // REDUCERS — synchronous state updates (no waiting needed)
  // These are called directly when the user adds, edits, or deletes.
  reducers: {
    // Add a new transaction to the list
    addTransaction: (state, action) => {
      state.items.push({
        ...action.payload,
        id: Date.now(), // generates a unique ID using the current timestamp
      });
    },

    // Find a transaction by ID and replace it with new data
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // Remove the transaction that matches the given ID
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },

  // EXTRA REDUCERS — handle the 3 states from the async thunk above
  extraReducers: (builder) => {
    builder
      // Fetch just started — show a loading indicator in the UI
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      // Fetch succeeded — save the data and mark as done
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      // Fetch failed — save the error message to show in the UI
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ============================================================
// STEP 4: EXPORTS
//
// Export the sync actions so components can dispatch them.
// Export the reducer so the store in index.js can register it.
// ============================================================
export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;

// ============================================================
// HOW TO USE THIS IN A COMPONENT:
// ============================================================
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTransactions, addTransaction } from '../store/transactionSlice';
//
// const dispatch      = useDispatch();
// const transactions  = useSelector((state) => state.transactions.items);
// const status        = useSelector((state) => state.transactions.status);
//
// // Load transactions when the page opens:
// dispatch(fetchTransactions());
//
// // Add a new transaction:
// dispatch(addTransaction({ type: 'expense', amount: 50000, description: 'Coffee' }));
//
// // Delete a transaction by ID:
// dispatch(deleteTransaction(transactionId));
// ============================================================
