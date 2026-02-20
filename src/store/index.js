// ============================================================
// FILE: index.js — The Redux Store (Central Data Hub)
// ============================================================
//
// WHAT IS THE STORE?
// The store is a single JavaScript object that holds ALL the data
// for the entire app. Every component can read from it or update it.
// There is only ONE store in the whole app.
//
// WHAT THIS FILE DOES:
// - Creates the store using configureStore()
// - Registers all the slices (transactions + categories)
// ============================================================

import { configureStore } from "@reduxjs/toolkit";

import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    // The key name here is what you use in useSelector inside components.
    // e.g. useSelector((state) => state.transactions.items)
    transactions: transactionReducer, // handles all transaction data
    categories: categoryReducer, // handles all category data
  },
});

// ============================================================
// HOW TO READ DATA IN A COMPONENT:
// ============================================================
// import { useSelector } from 'react-redux';
//
// const transactions = useSelector((state) => state.transactions.items);
// const categories   = useSelector((state) => state.categories.items);
//
// The key ("transactions", "categories") must match the keys above.
// ============================================================
