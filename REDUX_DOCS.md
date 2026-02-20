# Redux & Redux Thunk — Simple Documentation

> Written in plain English so anyone can understand it.

---

## Table of Contents

1. [What is Redux?](#1-what-is-redux)
2. [The 3 Main Parts of Redux](#2-the-3-main-parts-of-redux)
3. [How Redux is Set Up in This Project](#3-how-redux-is-set-up-in-this-project)
4. [What is a Slice?](#4-what-is-a-slice)
5. [What is Redux Thunk?](#5-what-is-redux-thunk)
6. [How Data Flows — Step by Step](#6-how-data-flows--step-by-step)
7. [transactionSlice.js Explained](#7-transactionslicejs-explained)
8. [categorySlice.js Explained](#8-categoryslicejs-explained)
9. [Using Redux in a Component](#9-using-redux-in-a-component)
10. [Quick Reference Cheatsheet](#10-quick-reference-cheatsheet)

---

## 1. What is Redux?

Imagine your app is a restaurant.

- Every table (component) needs to know the current **menu** and **orders**.
- Without Redux, each table keeps its own copy of the data — they can get out of sync.
- **Redux is like a central kitchen board** — one place where all the data lives. Every table reads from it and sends updates to it.

In technical terms:

> Redux is a **global state manager**. It stores data in one place, and any component in the app can read from or write to it.

### Why use Redux instead of just `useState`?

| `useState`                      | Redux                                   |
| ------------------------------- | --------------------------------------- |
| Lives inside **one component**  | Shared across **the entire app**        |
| Lost when component unmounts    | Persists as long as the app runs        |
| Great for UI (open/close modal) | Great for data (list of transactions)   |
| Simple to use                   | Slightly more setup, much more powerful |

**Rule of thumb used in this project:**

- `useState` → UI state (is this modal open? what did the user type?)
- `Redux` → Data state (list of transactions, list of categories)

---

## 2. The 3 Main Parts of Redux

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   COMPONENT                                     │
│   "I want to add a new category"                │
│          │                                      │
│          ▼  dispatch(addCategoryAsync({...}))   │
│                                                 │
│   ACTION / THUNK                                │
│   "Here is the instruction + data"              │
│          │                                      │
│          ▼                                      │
│                                                 │
│   REDUCER                                       │
│   "OK, I will update the state"                 │
│          │                                      │
│          ▼                                      │
│                                                 │
│   STORE (new state)                             │
│   "State updated! Re-render all subscribers"    │
│          │                                      │
│          ▼  useSelector(state => state....)     │
│                                                 │
│   COMPONENT re-renders with new data            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Store

The single place where **all app data lives**. Think of it as a JavaScript object.

```js
// What the store looks like at runtime
{
  transactions: {
    items: [ { id: 1, description: "Coffee", amount: 25000 }, ... ],
    status: "succeeded",
    error: null
  },
  categories: {
    items: [ { id: 1, name: "Food" }, ... ],
    status: "succeeded",
    isAdding: false,
    addError: null
  }
}
```

### Action

A plain message that says **"something happened"**. It has a `type` and optional `payload` (data).

```js
// Example action
{ type: "categories/addCategory", payload: { name: "Travel" } }
```

### Reducer

A function that **receives the current state + an action**, and **returns the new state**. It never modifies the old state directly.

```js
// What a reducer does (simplified)
function reducer(currentState, action) {
  if (action.type === "transactions/addTransaction") {
    return { ...currentState, items: [...currentState.items, action.payload] };
  }
  return currentState;
}
```

---

## 3. How Redux is Set Up in This Project

### Step 1 — Create the store (`src/store/index.js`)

```js
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    //    ↑ key name        ↑ reducer from the slice
    categories: categoryReducer,
  },
});
```

`configureStore` is the Redux Toolkit function that creates the store.
The `reducer` object maps a **key name** to each slice's **reducer function**.
The key name is what you use in `useSelector` later: `state.transactions`, `state.categories`.

### Step 2 — Provide the store to the whole app (`src/main.jsx`)

```jsx
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

`<Provider>` wraps the entire app so every component can access the store.
Without this, `useSelector` and `useDispatch` would not work.

---

## 4. What is a Slice?

A **slice** is a chunk of the store for one feature. It bundles together:

- The **initial state** (what the data looks like at start)
- The **reducers** (how to change the data — sync operations)
- The **extra reducers** (how to handle async results from thunks)

```
src/store/
├── index.js             ← assembles all slices into one store
├── transactionSlice.js  ← everything about transactions
└── categorySlice.js     ← everything about categories
```

### Slice structure (simplified)

```js
const mySlice = createSlice({
  name: "myFeature", // prefix for all action types
  initialState: { items: [] }, // what state starts as
  reducers: {
    // Sync actions — direct state updates
    addItem: (state, action) => {
      state.items.push(action.payload); // Immer lets you "mutate" safely
    },
  },
  extraReducers: (builder) => {
    // Async action results from Thunks
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
```

---

## 5. What is Redux Thunk?

### The problem

Redux reducers only handle **synchronous** actions. But real apps need to **wait for things** — like fetching data from an API, saving to a database, or even just a timer.

```js
// This does NOT work — you can't do async inside a reducer
addItem: (state, action) => {
  const data = await fetch("/api/items");  // ❌ ERROR
  state.items = data;
}
```

### The solution — Redux Thunk

**Thunk** is middleware built into Redux Toolkit. It lets you dispatch an **async function** instead of a plain action object. That function can do async work, then dispatch real actions when done.

Think of it like this:

> Normal action: "Add item RIGHT NOW."
> Thunk: "Go fetch the item from the server first, THEN add it when it arrives."

### `createAsyncThunk` — the easy way to write thunks

`createAsyncThunk` automatically creates 3 action types for you:

```
myThunk.pending   → dispatched when the async function STARTS
myThunk.fulfilled → dispatched when the async function SUCCEEDS
myThunk.rejected  → dispatched when the async function FAILS
```

You only write the async logic once. Redux Toolkit handles the rest.

### Basic structure of a thunk

```js
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories", // action type prefix (string)
  async (argument, { rejectWithValue, getState }) => {
    //    ↑ data passed           ↑ helper functions from Redux Toolkit
    try {
      const data = await someAsyncOperation();
      return data; // → dispatches fetchCategories.fulfilled
    } catch (error) {
      return rejectWithValue(error.message); // → dispatches fetchCategories.rejected
    }
  },
);
```

### Helper functions available inside a thunk

| Helper                 | What it does                                                |
| ---------------------- | ----------------------------------------------------------- |
| `rejectWithValue(msg)` | Sends a custom error message to the `rejected` handler      |
| `getState()`           | Reads the current Redux store state (useful for validation) |
| `dispatch(action)`     | Dispatches another action from inside the thunk             |

---

## 6. How Data Flows — Step by Step

Here is exactly what happens when a user clicks **"Add Category"**:

```
1. User types "Travel" and clicks Save
         │
         ▼
2. CategoriesPage.jsx calls:
   dispatch(addCategoryAsync({ name: "Travel" }))
         │
         ▼
3. Redux Thunk intercepts because addCategoryAsync is a thunk
   - Dispatches addCategoryAsync.pending
   - State: { isAdding: true }
   - UI shows "Saving..." on the button
         │
         ▼
4. Thunk runs the async function:
   - Reads current state with getState() to check for duplicates
   - If "Travel" already exists → rejectWithValue("Category already exists")
   - If OK → waits 500ms (simulating an API call) → returns the new category
         │
         ▼
5a. SUCCESS → addCategoryAsync.fulfilled fires
    - State: { isAdding: false, items: [..., { id: 123, name: "Travel" }] }
    - Modal closes, new card appears in the grid

5b. FAILURE → addCategoryAsync.rejected fires
    - State: { isAdding: false, addError: "Category already exists" }
    - Error message appears inside the modal
```

---

## 7. `transactionSlice.js` Explained

### Initial State

```js
initialState: {
  items: [],          // array of transaction objects
  status: "idle",     // "idle" | "loading" | "succeeded" | "failed"
  error: null,        // error message from fetch
}
```

### Thunk — `fetchTransactions`

```js
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData); // loads from local JSON file
      }, 1000); // simulates 1 second API delay
    });
  },
);
```

This thunk only **fetches** data — it has no input argument and no validation needed.

### Sync Reducers

```js
// Add: push a new transaction to the array
addTransaction: (state, action) => {
  state.items.push({ ...action.payload, id: Date.now() });
},

// Update: find by ID and replace with new data
updateTransaction: (state, action) => {
  const index = state.items.findIndex((t) => t.id === action.payload.id);
  if (index !== -1) state.items[index] = action.payload;
},

// Delete: filter out the transaction with matching ID
deleteTransaction: (state, action) => {
  state.items = state.items.filter((t) => t.id !== action.payload);
},
```

> `add`, `update`, and `delete` are **synchronous** — no waiting needed, so they use regular reducers (not thunks).

### Extra Reducers (handling the thunk result)

```js
extraReducers: (builder) => {
  builder
    .addCase(fetchTransactions.pending, (state) => {
      state.status = "loading"; // show a spinner in the UI
    })
    .addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload; // store the fetched data
    })
    .addCase(fetchTransactions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};
```

---

## 8. `categorySlice.js` Explained

Categories use **async thunks for ALL operations** (fetch, add, update, delete). This is because the project simulates a real API where every CRUD operation has a delay and can fail.

### Initial State — Per-operation Loading

```js
initialState: {
  items: [],            // array of category objects

  // Separate loading state per operation (best practice)
  status: "idle",       // for the initial fetch
  isAdding: false,      // true while addCategoryAsync runs
  isUpdating: false,    // true while updateCategoryAsync runs
  isDeleting: false,    // true while deleteCategoryAsync runs

  // Separate error per operation
  error: null,
  addError: null,
  updateError: null,
  deleteError: null,
}
```

Why separate loading states? Because multiple things can happen at once. For example, the list can be loading while the user also tries to add a new item.

### Thunk 1 — `fetchCategories`

```js
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => resolve(categoriesData), 300); // 300ms simulated delay
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
```

### Thunk 2 — `addCategoryAsync` (with validation)

```js
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    try {
      const { items } = getState().categories; // read current store

      // Rule 1: name must not be empty
      if (!categoryData.name.trim())
        return rejectWithValue("Category name cannot be empty");

      // Rule 2: no duplicates (case insensitive)
      const isDuplicate = items.some(
        (cat) =>
          cat.name.toLowerCase() === categoryData.name.trim().toLowerCase(),
      );
      if (isDuplicate) return rejectWithValue("Category already exists");

      // Simulate saving to API
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: Date.now(), name: categoryData.name.trim() });
        }, 500);
      });
    } catch (error) {
      return rejectWithValue("Failed to add category");
    }
  },
);
```

### Thunk 3 — `updateCategoryAsync`

Same pattern as add, but also checks that:

- The category being updated **exists**
- The new name is not a duplicate of **any other** category (excluding itself)

### Thunk 4 — `deleteCategoryAsync`

```js
export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { getState, rejectWithValue }) => {
    try {
      const { items } = getState().categories;
      const exists = items.find((cat) => cat.id === categoryId);
      if (!exists) return rejectWithValue("Category not found");

      await new Promise((resolve) => setTimeout(resolve, 500));

      return categoryId; // returns the ID so the reducer knows what to remove
    } catch (error) {
      return rejectWithValue("Failed to delete category");
    }
  },
);
```

### How ExtraReducers handles all 4 thunks

```js
// FETCH
.addCase(fetchCategories.pending,   (state) => { state.status = "loading" })
.addCase(fetchCategories.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.items = action.payload;  // replace items with fetched data
})
.addCase(fetchCategories.rejected,  (state, action) => {
  state.status = "failed";
  state.error = action.payload;
})

// ADD
.addCase(addCategoryAsync.pending,   (state) => { state.isAdding = true; state.addError = null; })
.addCase(addCategoryAsync.fulfilled, (state, action) => {
  state.isAdding = false;
  state.items.push(action.payload);   // add new category to the list
})
.addCase(addCategoryAsync.rejected,  (state, action) => {
  state.isAdding = false;
  state.addError = action.payload;    // show error message
})

// UPDATE
.addCase(updateCategoryAsync.fulfilled, (state, action) => {
  const index = state.items.findIndex((c) => c.id === action.payload.id);
  if (index !== -1) state.items[index] = action.payload; // replace in array
})

// DELETE
.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
  state.items = state.items.filter((c) => c.id !== action.payload); // remove by ID
})
```

---

## 9. Using Redux in a Component

### Reading data — `useSelector`

```js
import { useSelector } from "react-redux";

// Get the array of categories
const categories = useSelector((state) => state.categories.items);

// Get the loading state for the add operation
const isAdding = useSelector((state) => state.categories.isAdding);

// Get the error message for the add operation
const addError = useSelector((state) => state.categories.addError);
```

The component **automatically re-renders** when the selected value changes.

### Sending updates — `useDispatch`

```js
import { useDispatch } from "react-redux";
import { addCategoryAsync, deleteCategoryAsync } from "../store/categorySlice";

const dispatch = useDispatch();

// Dispatch a thunk (async)
dispatch(addCategoryAsync({ name: "Travel" }));

// Dispatch a sync action (transactionSlice)
dispatch(deleteTransaction(42));
```

### Using `.unwrap()` for error handling in the component

```js
// Without .unwrap() — errors are silently swallowed
dispatch(addCategoryAsync({ name }));

// With .unwrap() — throws if rejected, so you can catch it
try {
  await dispatch(addCategoryAsync({ name })).unwrap();
  setShowModal(false); // only runs if successful
} catch (error) {
  console.error("Failed:", error); // runs if thunk was rejected
}
```

### Showing loading and error state in the UI

```jsx
// Button that shows loading text while async runs
<Button disabled={isAdding}>{isAdding ? "Saving..." : "Save Category"}</Button>;

// Error message that appears when add fails
{
  addError && <p className="text-red-500">{addError}</p>;
}

// Conditional rendering based on fetch status
{
  status === "loading" && <p>Loading...</p>;
}
{
  status === "succeeded" && <CategoryList />;
}
{
  status === "failed" && <p>Error: {error}</p>;
}
```

---

## 10. Quick Reference Cheatsheet

### Store setup

```js
// store/index.js
export const store = configureStore({
  reducer: { transactions: transactionReducer, categories: categoryReducer },
});

// main.jsx
<Provider store={store}>
  <App />
</Provider>;
```

### Creating a slice

```js
const slice = createSlice({
  name: "feature",
  initialState: { items: [], status: "idle" },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
export const { addItem } = slice.actions;
export default slice.reducer;
```

### Creating a thunk

```js
export const fetchItems = createAsyncThunk(
  "feature/fetchItems",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const data = await someAPI();
      return data; // → .fulfilled
    } catch (err) {
      return rejectWithValue(err.message); // → .rejected
    }
  },
);
```

### Using in a component

```js
const dispatch = useDispatch();
const items = useSelector((state) => state.feature.items);
const loading = useSelector((state) => state.feature.status === "loading");

// Read  → useSelector
// Write → dispatch(action or thunk)
```

### Where each concept is used in this project

| Concept            | File(s)                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `configureStore`   | `src/store/index.js`                                                               |
| `<Provider>`       | `src/main.jsx`                                                                     |
| `createSlice`      | `src/store/transactionSlice.js`, `src/store/categorySlice.js`                      |
| `createAsyncThunk` | `src/store/transactionSlice.js` (1 thunk), `src/store/categorySlice.js` (4 thunks) |
| `useSelector`      | `src/pages/TransactionsPage.jsx`, `src/pages/CategoriesPage.jsx`                   |
| `useDispatch`      | `src/pages/TransactionsPage.jsx`, `src/pages/CategoriesPage.jsx`                   |
| `.unwrap()`        | `src/pages/CategoriesPage.jsx`                                                     |
