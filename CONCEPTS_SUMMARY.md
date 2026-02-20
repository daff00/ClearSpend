# ClearSpend — Concepts Implementation Summary

> A complete reference of every graded concept and exactly where it is applied in the project.

---

## Table of Contents

- [1. React Redux (4 pts)](#1-react-redux-4-pts)
- [2. Redux Thunk (5 pts)](#2-redux-thunk-5-pts)
- [3. 1 Person, 1 Page (3 pts)](#3-1-person-1-page-3-pts)
- [4. useEffect (3 pts)](#4-useeffect-3-pts)
- [5. useState (3 pts)](#5-usestate-3-pts)
- [6. Flexbox — Optional (3 pts)](#6-flexbox--optional-3-pts)
- [7. Responsive Design — Optional (2 pts)](#7-responsive-design--optional-2-pts)
- [8. Stylish CSS — Optional (2 pts)](#8-stylish-css--optional-2-pts)

---

## 1. React Redux (4 pts)

**What it is:** A library that provides a single global store to manage shared application state. Components read data with `useSelector` and trigger changes with `useDispatch`.

**How it works in this project:**

```
src/
├── store/
│   ├── index.js            ← configureStore (creates the global store)
│   ├── transactionSlice.js ← reducer + actions for transactions
│   └── categorySlice.js    ← reducer + actions for categories
└── main.jsx                ← <Provider store={store}> wraps the entire app
```

### Store Setup — `src/store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer, // accessed via state.transactions
    categories: categoryReducer,      // accessed via state.categories
  },
});
```

### Reading state — `useSelector`

```js
// src/pages/TransactionsPage.jsx
const transactions = useSelector((state) => state.transactions.items);

// src/pages/CategoriesPage.jsx
const categories  = useSelector((state) => state.categories.items);
const isAdding    = useSelector((state) => state.categories.isAdding);
const addError    = useSelector((state) => state.categories.addError);
```

### Writing state — `useDispatch`

```js
// src/pages/TransactionsPage.jsx
const dispatch = useDispatch();
dispatch(addTransaction(formData));
dispatch(updateTransaction(formData));
dispatch(deleteTransaction(id));

// src/pages/CategoriesPage.jsx
dispatch(addCategoryAsync({ name: categoryName }));
dispatch(updateCategoryAsync({ id, name: categoryName }));
dispatch(deleteCategoryAsync(id));
```

---

## 2. Redux Thunk (5 pts)

**What it is:** Middleware (built into Redux Toolkit) that allows action creators to return async functions instead of plain objects. Used via `createAsyncThunk`, which auto-generates `pending`, `fulfilled`, and `rejected` action states.

### Thunks in `src/store/categorySlice.js`

| Thunk | Action Type | Purpose |
|-------|-------------|---------|
| `fetchCategories` | `categories/fetchCategories` | Load all categories (simulated API, 300ms delay) |
| `addCategoryAsync` | `categories/addCategory` | Add new category with duplicate & empty validation |
| `updateCategoryAsync` | `categories/updateCategory` | Update existing category with validation |
| `deleteCategoryAsync` | `categories/deleteCategory` | Delete a category by ID |

### Thunks in `src/store/transactionSlice.js`

| Thunk | Action Type | Purpose |
|-------|-------------|---------|
| `fetchTransactions` | `transactions/fetchTransactions` | Load all transactions (simulated API) |

### Example — `fetchCategories`

```js
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => resolve(categoriesData), 300); // simulated API
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Example — `addCategoryAsync` with validation

```js
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    const { items } = getState().categories;

    if (!categoryData.name.trim())
      return rejectWithValue("Category name cannot be empty");

    const isDuplicate = items.some(
      (cat) => cat.name.toLowerCase() === categoryData.name.trim().toLowerCase()
    );
    if (isDuplicate)
      return rejectWithValue("Category already exists");

    // ... create and return new category
  }
);
```

### Extrareducers handling pending / fulfilled / rejected

```js
// categorySlice.js — per-operation loading states
.addCase(addCategoryAsync.pending,   (state) => { state.isAdding = true; })
.addCase(addCategoryAsync.fulfilled, (state, action) => {
  state.isAdding = false;
  state.items.push(action.payload);
})
.addCase(addCategoryAsync.rejected,  (state, action) => {
  state.isAdding = false;
  state.addError = action.payload;
})
```

### Dispatching from component with `.unwrap()`

```js
// CategoriesPage.jsx — catches error per-operation
try {
  await dispatch(addCategoryAsync({ name: categoryName })).unwrap();
  setShowModal(false);
} catch (error) {
  console.error("Failed to save:", error);
}
```

---

## 3. 1 Person, 1 Page (3 pts)

Each group member owns one primary file:

| Person | File |
|--------|------|
| Person 1 | `src/components/Navbar.jsx` |
| Person 2 | `src/pages/TransactionsPage.jsx` + `src/components/TransactionTable.jsx` |
| Person 3 | `src/pages/Dashboard.jsx` |
| Person 4 | `src/pages/CategoriesPage.jsx` + `src/store/categorySlice.js` |

---

## 4. useEffect (3 pts)

**What it is:** A React hook that runs side-effects after render. Used here to fetch data from the Redux store when a page first mounts. The `status === "idle"` guard ensures the fetch only runs once, preventing duplicate API calls.

### `src/pages/TransactionsPage.jsx`

```js
useEffect(() => {
  if (transactionStatus === "idle") dispatch(fetchTransactions());
  if (catStatus === "idle")         dispatch(fetchCategories());
}, [transactionStatus, catStatus, dispatch]);
```

- Fetches both **transactions** and **categories** when the page loads.
- Dependencies array `[transactionStatus, catStatus, dispatch]` re-runs only when those values change.

### `src/pages/CategoriesPage.jsx`

```js
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchCategories());
  }
}, [status, dispatch]);
```

- Fetches categories on mount.
- `status === "idle"` prevents re-fetching if data is already loaded.

---

## 5. useState (3 pts)

**What it is:** A React hook to manage **local UI state** — values that belong only to one component and don't need to be shared globally (modals, form inputs, filters).

### `src/pages/TransactionsPage.jsx`

```js
const [searchTerm, setSearchTerm]             = useState("");       // search input
const [filterCategory, setFilterCategory]     = useState("All");    // category filter
const [showModal, setShowModal]               = useState(false);    // add/edit modal visibility
const [editingTransaction, setEditingTransaction] = useState(null); // which transaction is being edited
const [showDeleteModal, setShowDeleteModal]   = useState(false);    // delete confirm modal
const [idToDelete, setIdToDelete]             = useState(null);     // transaction to delete
```

### `src/pages/CategoriesPage.jsx`

```js
const [showModal, setShowModal]           = useState(false);  // add/edit modal visibility
const [editingCategory, setEditingCategory] = useState(null); // which category is being edited
const [categoryName, setCategoryName]     = useState("");     // controlled form input
const [showDeleteModal, setShowDeleteModal] = useState(false);// delete confirm modal
const [idToDelete, setIdToDelete]         = useState(null);   // category to delete
```

### `src/components/Navbar.jsx`

```js
const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // hamburger menu toggle
```

### `src/pages/FAQPage.jsx`

```js
const [activeCat, setActiveCat] = useState("general"); // active FAQ category tab
const [openIndex, setOpenIndex] = useState(null);       // which accordion item is open
const [search, setSearch]       = useState("");         // FAQ search input
```

---

## 6. Flexbox — Optional (3 pts)

**What it is:** A CSS layout model for one-dimensional layouts. Used throughout the app via Tailwind classes (`flex`, `flex-row`, `flex-col`, `items-center`, `justify-between`, `gap-*`).

### `src/components/Navbar.jsx`

```jsx
{/* Main navbar row */}
<div className="flex h-16 items-center justify-between px-4">

{/* Desktop nav links */}
<div className="flex items-center gap-6">

{/* Mobile menu items */}
<div className="flex flex-col gap-2">
```

### `src/pages/TransactionsPage.jsx`

```jsx
{/* Header: title left, button right */}
<section className="flex justify-between items-center">

{/* Search bar + filter dropdown side by side */}
<div className="flex gap-4 items-center">

{/* Delete modal buttons */}
<div className="flex gap-3">
```

### `src/pages/CategoriesPage.jsx`

```jsx
{/* Header: stacks vertically on mobile, row on sm+ */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

{/* Category card: icon + name + action buttons */}
<div className="flex items-center justify-between gap-2">
<div className="flex items-center gap-3 min-w-0 flex-1">
```

---

## 7. Responsive Design — Optional (2 pts)

**What it is:** The app adapts to 3 breakpoints using Tailwind's responsive prefixes.

| Breakpoint | Prefix | Screen Width |
|------------|--------|-------------|
| Mobile | _(none / default)_ | `< 640px` |
| Tablet | `sm:` / `md:` | `640px – 1024px` |
| Desktop | `lg:` / `xl:` | `> 1024px` |

### Navbar — `src/components/Navbar.jsx`

```jsx
{/* Desktop nav only visible on md+ */}
<div className="hidden md:flex items-center gap-6">

{/* Hamburger button only visible on mobile */}
<button className="md:hidden ...">

{/* Logo text hidden on very small screens */}
<span className="hidden sm:inline">ClearSpend</span>
```

### Categories grid — `src/pages/CategoriesPage.jsx`

```jsx
{/* 1 col → 2 cols → 3 cols → 4 cols */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

{/* Padding grows with screen */}
<div className="p-4 sm:p-6">

{/* Add button: full width on mobile, auto on sm+ */}
<Button className="w-full sm:w-auto">
```

### Transactions header — `src/pages/TransactionsPage.jsx`

```jsx
{/* Stacks on mobile, row on sm+ */}
<section className="flex flex-col sm:flex-row justify-between items-center">
```

---

## 8. Stylish CSS — Optional (2 pts)

**What it is:** A consistent cyan-to-blue gradient design system applied across all pages and components.

### Design tokens used

| Role | Tailwind Classes |
|------|-----------------|
| Gradient text | `bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent` |
| Gradient button | `bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600` |
| Glassmorphic navbar | `bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60` |
| Active nav link | `text-cyan-500 underline underline-offset-4 decoration-2 decoration-cyan-500` |
| Card icon background | `bg-gradient-to-br from-cyan-500/10 to-blue-500/10` |
| Card hover | `hover:shadow-md transition-shadow` |
| Button hover animation | `hover:scale-105 transition-all` |
| Delete modal backdrop | `bg-black/50 backdrop-blur-sm` |

### Applied in

| File | Styled Element |
|------|---------------|
| `src/components/Navbar.jsx` | Logo text, nav link active/hover states, mobile menu active item |
| `src/pages/TransactionsPage.jsx` | Page title, subtitle, Add Transaction button |
| `src/components/TransactionTable.jsx` | "Transactions List" section heading |
| `src/pages/CategoriesPage.jsx` | Page title, subtitle, Add/Save buttons, icon backgrounds |
