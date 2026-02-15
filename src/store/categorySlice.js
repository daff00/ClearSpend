// ============================================================
// FILE INI: Redux Slice untuk mengelola STATE CATEGORIES
// ============================================================
// PERSON: Person 4 (Categories Page)
// POIN: Redux (4pts) + Redux Thunk (5pts) = 9 POIN!
//
// STRUKTUR MIRIP dengan transactionSlice.js
// Bedanya: ini untuk manage categories, bukan transactions
// ============================================================

// STEP 1: Import dependencies
// 💡 TODO: Ketik manual 2 baris dibawah ini:
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import categoriesData from "../data/categories.json";

// STEP 2: Buat Redux Thunk untuk FETCH CATEGORIES (5 POIN!)
// 💡 TODO: Ketik manual code dibawah ini:
/*
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categoriesData);
      }, 300);
    });
  }
);
*/

// STEP 3: Buat Category Slice (4 POIN Redux!)
// 💡 TODO: Ketik manual code dibawah ini:
/*
const categorySlice = createSlice({
  name: "categories",
  
  initialState: {
    items: [],        // Array of categories: [{ id: 1, name: "Food" }, ...]
    status: "idle",
    error: null,
  },
  
  reducers: {
    // Action 1: ADD CATEGORY
    addCategory: (state, action) => {
      state.items.push({
        id: Date.now(),
        name: action.payload.name,  // Hanya butuh name, id auto-generate
      });
    },
    
    // Action 2: UPDATE CATEGORY
    updateCategory: (state, action) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    
    // Action 3: DELETE CATEGORY
    deleteCategory: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
  },
  
  // Handle async fetch
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
*/

// STEP 4: Export actions dan reducer
// 💡 TODO: Ketik manual 2 baris dibawah ini:
/*
export const { addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
*/

// ============================================================
// CARA MENGGUNAKAN DI COMPONENT:
// ============================================================
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories, addCategory } from '../store/categorySlice';
//
// const dispatch = useDispatch();
// const categories = useSelector((state) => state.categories.items);
//
// // Fetch categories:
// dispatch(fetchCategories());
//
// // Add category:
// dispatch(addCategory({ name: 'Entertainment' }));
// ============================================================

// 📚 BACA REDUX_GUIDE.md UNTUK PENJELASAN LENGKAP!
