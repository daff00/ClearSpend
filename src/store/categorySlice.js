// ═══════════════════════════════════════════════════════════════════════
// FILE: categorySlice.js — Redux Slice for Categories
// ═══════════════════════════════════════════════════════════════════════
// PERSON: Person 4 (Categories Page)
//
// WHAT THIS FILE DOES:
// Manages all category data for the entire app using Redux.
// Every component that needs category data reads from here.
//
// BEST PRACTICES USED:
// ✅ Separate loading state per operation (isAdding, isUpdating, isDeleting)
//    → So the UI knows exactly which button to show as "loading"
// ✅ Async thunks for all CRUD operations
//    → The store handles the async logic, not the component
// ✅ Separate error per operation (addError, updateError, deleteError)
//    → So error messages appear in the right place
// ✅ Validation inside the thunk (before touching the reducer)
//    → Catches bad input before it ever reaches the state
// ═══════════════════════════════════════════════════════════════════════

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesData from "../data/categories.json";

// ═══════════════════════════════════════════════════════════════════════
// ASYNC THUNKS — All 4 CRUD operations are async
//
// WHY USE THUNKS FOR CRUD HERE?
// In a real app, saving or deleting data requires an API call that takes
// time. We use thunks so Redux can wait for the operation to finish,
// then update the state with the result (or the error).
// ═══════════════════════════════════════════════════════════════════════

/**
 * FETCH CATEGORIES
 * Loads all categories when the page first opens.
 *
 * - Only runs when status = 'idle' (checked in the component with useEffect)
 * - Simulates an API delay of 300ms
 * - On success  → extraReducer saves the data to state.items
 * - On failure  → extraReducer saves the error to state.error
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call (300ms delay)
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(categoriesData);
        }, 300);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * ADD CATEGORY
 * Creates a new category after passing two validation checks.
 *
 * Validation (runs before saving):
 * 1. The name must not be empty
 * 2. The name must not already exist (case insensitive check)
 *
 * getState() lets us read the current categories list from inside the thunk
 * so we can check for duplicates without making an extra request.
 *
 * - On success  → extraReducer pushes the new category to state.items
 * - On failure  → extraReducer saves the message to state.addError
 *
 * @param {Object} categoryData - { name: string }
 */
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { items } = state.categories;

      // Validation 1: Empty name check
      if (!categoryData.name || !categoryData.name.trim()) {
        return rejectWithValue("Category name cannot be empty");
      }

      // Validation 2: Duplicate check (case insensitive)
      const isDuplicate = items.some(
        (cat) =>
          cat.name.toLowerCase() === categoryData.name.trim().toLowerCase(),
      );

      if (isDuplicate) {
        return rejectWithValue("Category already exists");
      }

      // Simulate API call (500ms delay)
      const newCategory = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(), // In real app: server generates ID
            name: categoryData.name.trim(),
          });
        }, 500);
      });

      return newCategory;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add category");
    }
  },
);

/**
 * UPDATE CATEGORY
 * Saves a new name for an existing category after validation.
 *
 * Validation (runs before saving):
 * 1. The category ID must exist in the list
 * 2. The new name must not be empty
 * 3. The new name must not already be used by a DIFFERENT category
 *
 * - On success  → extraReducer finds the category by ID and replaces it
 * - On failure  → extraReducer saves the message to state.updateError
 *
 * @param {Object} categoryData - { id: number, name: string }
 */
export const updateCategoryAsync = createAsyncThunk(
  "categories/updateCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { items } = state.categories;

      // Validation 1: Category exists
      const existingCategory = items.find((cat) => cat.id === categoryData.id);
      if (!existingCategory) {
        return rejectWithValue("Category not found");
      }

      // Validation 2: Empty name check
      if (!categoryData.name || !categoryData.name.trim()) {
        return rejectWithValue("Category name cannot be empty");
      }

      // Validation 3: Duplicate check (exclude current category)
      const isDuplicate = items.some(
        (cat) =>
          cat.name.toLowerCase() === categoryData.name.trim().toLowerCase() &&
          cat.id !== categoryData.id,
      );

      if (isDuplicate) {
        return rejectWithValue("Category already exists");
      }

      // Simulate API call (500ms delay)
      const updatedCategory = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: categoryData.id,
            name: categoryData.name.trim(),
          });
        }, 500);
      });

      return updatedCategory;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update category");
    }
  },
);

/**
 * DELETE CATEGORY
 * Removes a category by its ID.
 *
 * Validation:
 * - The category must exist before we try to delete it
 *
 * Returns the ID on success so the extraReducer knows which item to remove.
 *
 * - On success  → extraReducer filters out the item with matching ID
 * - On failure  → extraReducer saves the message to state.deleteError
 *
 * @param {number} categoryId - The ID of the category to delete
 */
export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { items } = state.categories;

      // Validation: Category exists
      const categoryExists = items.find((cat) => cat.id === categoryId);
      if (!categoryExists) {
        return rejectWithValue("Category not found");
      }

      // Simulate API call (500ms delay)
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });

      return categoryId; // Return the ID so the reducer knows which item to remove
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete category");
    }
  },
);

// ═══════════════════════════════════════════════════════════════════════
// THE SLICE — Initial State + Reducers + Extra Reducers
// ═══════════════════════════════════════════════════════════════════════

const categorySlice = createSlice({
  name: "categories",

  // INITIAL STATE
  // This is what the categories data looks like when the app first loads.
  // We use separate loading and error fields per operation so the UI can
  // show the right feedback for each button independently.
  initialState: {
    items: [], // array of categories: [{ id: 1, name: "Food" }, ...]

    // Loading flags — only one operation runs at a time
    status: "idle", // for the initial fetch: "idle" | "loading" | "succeeded" | "failed"
    isAdding: false, // true while addCategoryAsync is running
    isUpdating: false, // true while updateCategoryAsync is running
    isDeleting: false, // true while deleteCategoryAsync is running

    // Error fields — each operation has its own so errors show in the right place
    error: null, // error from the initial fetch
    addError: null, // error from addCategoryAsync
    updateError: null, // error from updateCategoryAsync
    deleteError: null, // error from deleteCategoryAsync
  },

  // SYNC REDUCERS
  // These are simple, instant state updates — no async needed.
  reducers: {
    // Clears all error messages (call this after the user dismisses an error)
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },

    // Resets everything back to the initial state (useful for logout / cleanup)
    resetCategoriesState: (state) => {
      state.items = [];
      state.status = "idle";
      state.isAdding = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.error = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  // EXTRA REDUCERS
  // These handle the results of the async thunks above.
  // Each thunk produces 3 possible outcomes: pending, fulfilled, rejected.
  extraReducers: (builder) => {
    // ─────────────────────────────────────────────
    // FETCH CATEGORIES
    // ─────────────────────────────────────────────
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // ─────────────────────────────────────────────
      // ADD CATEGORY
      // isAdding = true while waiting → button shows "Saving..."
      // ─────────────────────────────────────────────
      .addCase(addCategoryAsync.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.isAdding = false;
        state.items.push(action.payload); // Add new category to items
        state.addError = null;
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.payload || action.error.message;
      })

      // ─────────────────────────────────────────────
      // UPDATE CATEGORY
      // isUpdating = true while waiting → edit button shows "Saving..."
      // ─────────────────────────────────────────────
      .addCase(updateCategoryAsync.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Find and update the category
        const index = state.items.findIndex(
          (cat) => cat.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload; // replace the old object with the updated one
        }
        state.updateError = null;
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload || action.error.message;
      })

      // ─────────────────────────────────────────────
      // DELETE CATEGORY
      // isDeleting = true while waiting → delete button shows "Menghapus..."
      // ─────────────────────────────────────────────
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.isDeleting = false;
        // action.payload is the deleted category's ID — filter it out of the list
        state.items = state.items.filter((cat) => cat.id !== action.payload);
        state.deleteError = null;
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload || action.error.message;
      });
  },
});

// ═══════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════

// Export sync actions so components can dispatch them
export const { clearErrors, resetCategoriesState } = categorySlice.actions;

// Export the reducer so index.js can register it in the store
export default categorySlice.reducer;

// ═══════════════════════════════════════════════════════════════════════
// HOW TO USE THIS IN A COMPONENT:
// ═══════════════════════════════════════════════════════════════════════
//
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchCategories,
//   addCategoryAsync,
//   updateCategoryAsync,
//   deleteCategoryAsync,
//   clearErrors
// } from '../store/categorySlice';
//
// const dispatch   = useDispatch();
// const categories = useSelector((state) => state.categories.items);
// const isAdding   = useSelector((state) => state.categories.isAdding);
// const addError   = useSelector((state) => state.categories.addError);
//
// // Load categories when the page opens:
// dispatch(fetchCategories());
//
// // Add a new category:
// dispatch(addCategoryAsync({ name: "Travel" }));
//
// // Update an existing category:
// dispatch(updateCategoryAsync({ id: 1, name: "Food & Drinks" }));
//
// // Delete a category by ID:
// dispatch(deleteCategoryAsync(1));
//
// // Clear all error messages:
// dispatch(clearErrors());
//
// TIP: Use .unwrap() to catch errors in the component:
// try {
//   await dispatch(addCategoryAsync({ name })).unwrap();
//   setShowModal(false); // runs only if successful
// } catch (error) {
//   console.error(error); // runs only if rejected
// }
// ═══════════════════════════════════════════════════════════════════════
