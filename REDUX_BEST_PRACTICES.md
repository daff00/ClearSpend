# 🏆 Redux Best Practices Implementation - Category Feature

## 📖 Overview

Dokumen ini menjelaskan implementasi **Redux Best Practices** untuk fitur Category di ClearSpend, berdasarkan prinsip:

> **Redux untuk GLOBAL STATE yang di-share antar components**  
> **useState untuk LOCAL UI STATE yang specific ke satu component**

---

## 🎯 What Changed?

### ❌ SEBELUM (Basic Implementation)

```javascript
// categorySlice.js - Basic
const categorySlice = createSlice({
  initialState: {
    items: [],
    status: "idle", // ❌ Hanya 1 loading state untuk semua operations
    error: null, // ❌ Hanya 1 error state
  },
  reducers: {
    addCategory: (state, action) => {
      // ❌ Sync action, no async handling
      state.items.push({ id: Date.now(), name: action.payload.name });
    },
  },
});
```

**Problems:**

- ❌ Tidak bisa show loading indicator per operation (add, update, delete)
- ❌ Validation di component level (duplicated logic)
- ❌ Sync actions, tidak proper untuk API calls
- ❌ Error handling minimal

---

### ✅ SESUDAH (Best Practices)

```javascript
// categorySlice.js - Best Practices
const categorySlice = createSlice({
  initialState: {
    items: [],

    // ✅ Per-operation loading states
    status: "idle", // Untuk fetch
    isAdding: false, // Untuk add operation
    isUpdating: false, // Untuk update operation
    isDeleting: false, // Untuk delete operation

    // ✅ Per-operation error messages
    error: null,
    addError: null,
    updateError: null,
    deleteError: null,
  },
});

// ✅ Async Thunks untuk semua CRUD operations
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    // ✅ Validation di Redux layer
    const { items } = getState().categories;

    const isDuplicate = items.some(
      (cat) =>
        cat.name.toLowerCase() === categoryData.name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      return rejectWithValue("Category already exists");
    }

    // ✅ Simulate async API call
    const newCategory = await api.addCategory(categoryData);
    return newCategory;
  },
);
```

**Benefits:**

- ✅ Per-operation loading indicators (UX improvement)
- ✅ Validation centralized di Redux (single source of truth)
- ✅ Async handling dengan proper error states
- ✅ Better UX dengan specific error messages

---

## 🏗️ Architecture: Redux vs useState

### 📊 State Classification Table

| State Type         | Storage     | Why?                               | Example                                                         |
| ------------------ | ----------- | ---------------------------------- | --------------------------------------------------------------- |
| **Global Data**    | ✅ Redux    | Di-share antar pages               | `categories.items` - TransactionsPage needs this untuk dropdown |
| **Loading States** | ✅ Redux    | Part of global state lifecycle     | `isAdding`, `isUpdating`, `isDeleting`                          |
| **Error States**   | ✅ Redux    | Hasil dari async operations        | `addError`, `updateError`                                       |
| **UI State**       | ❌ useState | Local to component, tidak di-share | `showModal`, `editingCategory`                                  |
| **Form Inputs**    | ❌ useState | Temporary, tidak perlu persist     | `categoryName` in CategoryForm                                  |
| **Derived Data**   | 🔵 Computed | Calculate on render                | `filteredCategories = categories.filter(...)`                   |

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      CategoriesPage.jsx                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  🟢 LOCAL STATE (useState)                             │   │
│  │  • showModal: boolean                                  │   │
│  │  • editingCategory: object | null                      │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  🔴 REDUX STATE (useSelector)                          │   │
│  │  • categories.items: array                             │   │
│  │  • categories.isAdding: boolean                        │   │
│  │  • categories.isUpdating: boolean                      │   │
│  │  • categories.addError: string | null                  │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  🎯 HANDLERS                                           │   │
│  │  handleSave() → dispatch(addCategoryAsync())           │   │
│  │  handleDelete() → dispatch(deleteCategoryAsync())      │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    categorySlice.js (Redux)                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  🔄 ASYNC THUNKS                                       │   │
│  │  • fetchCategories()                                   │   │
│  │  • addCategoryAsync() ← Validation Here               │   │
│  │  • updateCategoryAsync() ← Validation Here            │   │
│  │  • deleteCategoryAsync()                              │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  📦 STATE UPDATES (extraReducers)                      │   │
│  │  .pending → isAdding = true                            │   │
│  │  .fulfilled → items.push(newCategory), isAdding = false│   │
│  │  .rejected → addError = message, isAdding = false      │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                  TransactionsPage.jsx                            │
│  ✅ Can use categories from Redux for dropdown!                 │
│  const categories = useSelector(state => state.categories.items)│
└─────────────────────────────────────────────────────────────────┘
```

---

## 💡 Key Best Practices Explained

### 1️⃣ **Per-Operation Loading States**

**❌ Bad Practice:**

```javascript
const isLoading = useSelector(state => state.categories.status === 'loading');

// Problem: Can't show specific loading for Add vs Update vs Delete
<button disabled={isLoading}>Add Category</button>
<button disabled={isLoading}>Update</button>
```

**✅ Best Practice:**

```javascript
const isAdding = useSelector(state => state.categories.isAdding);
const isUpdating = useSelector(state => state.categories.isUpdating);
const isDeleting = useSelector(state => state.categories.isDeleting);

// Better UX: Specific loading states
<button disabled={isAdding}>
  {isAdding ? "⏳ Adding..." : "+ Add Category"}
</button>

<button disabled={isUpdating || isDeleting}>
  {isUpdating ? "⏳" : "✏️"}
</button>
```

**Benefits:**

- User tahu exactly operation mana yang sedang berjalan
- Buttons di-disable secara selective
- Better visual feedback

---

### 2️⃣ **Validation in Redux Layer**

**❌ Bad Practice (Validation di Component):**

```javascript
// CategoriesPage.jsx
const handleSave = (categoryData) => {
  // ❌ Validation logic di component
  if (!categoryData.name.trim()) {
    alert("Category name cannot be empty");
    return;
  }

  const isDuplicate = categories.some(
    (cat) => cat.name.toLowerCase() === categoryData.name.trim().toLowerCase(),
  );

  if (isDuplicate) {
    alert("Category already exists");
    return;
  }

  dispatch(addCategory(categoryData));
};
```

**Problems:**

- ❌ Jika ada multiple components yang add category, validation logic duplicated
- ❌ Tidak consistent error handling
- ❌ Component too complex dengan business logic

**✅ Best Practice (Validation di Redux Thunk):**

```javascript
// categorySlice.js
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    const { items } = getState().categories;

    // ✅ Validation centralized di Redux
    if (!categoryData.name.trim()) {
      return rejectWithValue("Category name cannot be empty");
    }

    const isDuplicate = items.some(
      (cat) =>
        cat.name.toLowerCase() === categoryData.name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      return rejectWithValue("Category already exists");
    }

    // Proceed with API call
    const newCategory = await api.addCategory(categoryData);
    return newCategory;
  },
);

// CategoriesPage.jsx - Component simplified
const handleSave = async (categoryData) => {
  try {
    await dispatch(addCategoryAsync(categoryData)).unwrap();
    setShowModal(false); // Close modal on success
  } catch (error) {
    // Error handled by Redux, displayed in UI from state
    console.error(error);
  }
};
```

**Benefits:**

- ✅ Single source of truth untuk validation rules
- ✅ Consistent error handling
- ✅ Component cleaner, fokus ke UI logic
- ✅ Easy to test validation logic (Redux thunk unit tests)

---

### 3️⃣ **Async Thunks for All CRUD**

**❌ Bad Practice (Sync Actions):**

```javascript
// categorySlice.js
reducers: {
  addCategory: (state, action) => {
    // ❌ Sync action, no loading state, no error handling
    state.items.push({ id: Date.now(), name: action.payload.name });
  },
}
```

**Problems:**

- ❌ Tidak bisa show loading state
- ❌ Tidak bisa handle API errors
- ❌ Tidak realistic untuk real apps (semua CRUD need API calls)

**✅ Best Practice (Async Thunks):**

```javascript
// categorySlice.js
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("API Error");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Handle in extraReducers
extraReducers: (builder) => {
  builder
    .addCase(addCategoryAsync.pending, (state) => {
      state.isAdding = true; // ✅ Show loading
      state.addError = null;
    })
    .addCase(addCategoryAsync.fulfilled, (state, action) => {
      state.isAdding = false;
      state.items.push(action.payload); // ✅ Add new category
    })
    .addCase(addCategoryAsync.rejected, (state, action) => {
      state.isAdding = false;
      state.addError = action.payload; // ✅ Show error
    });
};
```

**Benefits:**

- ✅ Proper loading states untuk better UX
- ✅ Error handling yang robust
- ✅ Ready untuk real API integration
- ✅ Consistent pattern untuk semua CRUD operations

---

### 4️⃣ **Error Handling Best Practice**

**✅ Implementation:**

```javascript
// Redux State - Per-operation errors
const initialState = {
  addError: null,
  updateError: null,
  deleteError: null,
};

// Component - Display errors
{
  (addError || updateError || deleteError) && (
    <div className="border-2 border-red-500 bg-red-50 p-4">
      <p className="text-red-700 font-semibold">⚠️ Error:</p>
      {addError && <p>• Add: {addError}</p>}
      {updateError && <p>• Update: {updateError}</p>}
      {deleteError && <p>• Delete: {deleteError}</p>}
      <button onClick={() => dispatch(clearErrors())}>Clear Errors</button>
    </div>
  );
}
```

**Benefits:**

- User-friendly error messages
- Clear indication of which operation failed
- Easy to dismiss errors

---

## 📝 Usage Examples

### Example 1: Add Category

```javascript
// In CategoriesPage.jsx
const handleSave = async (categoryData) => {
  try {
    // Dispatch async thunk
    await dispatch(addCategoryAsync({ name: categoryData.name })).unwrap();

    // Success: Close modal
    setShowModal(false);
    setEditingCategory(null);
    dispatch(clearErrors());
  } catch (error) {
    // Error: Keep modal open, show error from Redux state
    console.error("Failed to add:", error);
  }
};
```

**What happens:**

1. User clicks "Save" button
2. `isAdding` becomes `true` → Button shows "⏳ Adding..."
3. Redux thunk validates input (empty check, duplicate check)
4. If valid: Add to `items`, set `isAdding = false`, close modal
5. If invalid: Set `addError` message, keep modal open

---

### Example 2: Delete Category

```javascript
const handleDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    try {
      await dispatch(deleteCategoryAsync(id)).unwrap();
      dispatch(clearErrors());
    } catch (error) {
      alert(`Failed to delete: ${error}`);
    }
  }
};
```

**What happens:**

1. User clicks delete button (🗑️)
2. Confirmation dialog appears
3. If confirmed: `isDeleting = true` → Button shows "⏳"
4. Redux thunk validates category exists
5. If valid: Remove from `items`, set `isDeleting = false`
6. If error: Set `deleteError` message

---

## 🎯 When to Use Redux vs useState?

### ✅ USE REDUX for:

1. **Data yang di-share antar multiple components**
   - ✅ Categories list (needed in TransactionsPage dropdown)
   - ✅ Transactions list (needed in Dashboard for charts)

2. **Loading/Error states dari async operations**
   - ✅ `isAdding`, `isUpdating`, `isDeleting`
   - ✅ `addError`, `updateError`, `deleteError`

3. **Data yang perlu persist** (with Redux Persist)
   - ✅ User authentication state
   - ✅ App settings

### ❌ USE useState for:

1. **UI state local to one component**
   - ❌ Modal visibility (`showModal`)
   - ❌ Form input yang belum di-submit (`categoryName`)
   - ❌ Tabs/accordion active state

2. **Temporary data**
   - ❌ Search query (before filtering)
   - ❌ Editing state (`editingCategory`)

3. **Tidak di-share dengan components lain**

### 🔵 USE Computed/Derived for:

1. **Filtered/sorted data**

   ```javascript
   // ❌ DON'T store filtered data in Redux
   const filteredCategories = useSelector((state) => state.categories.filtered);

   // ✅ DO compute on render
   const categories = useSelector((state) => state.categories.items);
   const filteredCategories = categories.filter((c) => c.name.includes(search));
   ```

2. **Calculated values**

   ```javascript
   // ❌ DON'T store counts in Redux
   const totalCategories = useSelector((state) => state.categories.total);

   // ✅ DO compute on render
   const categories = useSelector((state) => state.categories.items);
   const totalCategories = categories.length;
   ```

---

## 🔍 Code Comparison: Before vs After

### Before (Basic)

```javascript
// categorySlice.js
const categorySlice = createSlice({
  name: "categories",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    addCategory: (state, action) => {
      state.items.push({ id: Date.now(), name: action.payload.name });
    },
  },
});

// CategoriesPage.jsx
const handleSave = (categoryData) => {
  if (!categoryData.name.trim()) {
    alert("Category name cannot be empty");
    return;
  }
  dispatch(addCategory({ name: categoryData.name }));
  setShowModal(false);
};
```

### After (Best Practices)

```javascript
// categorySlice.js
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { getState, rejectWithValue }) => {
    const { items } = getState().categories;

    if (!categoryData.name.trim()) {
      return rejectWithValue("Category name cannot be empty");
    }

    const isDuplicate = items.some(
      (cat) =>
        cat.name.toLowerCase() === categoryData.name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      return rejectWithValue("Category already exists");
    }

    const newCategory = await api.addCategory(categoryData);
    return newCategory;
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle",
    isAdding: false,
    addError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAsync.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.isAdding = false;
        state.items.push(action.payload);
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.payload;
      });
  },
});

// CategoriesPage.jsx
const isAdding = useSelector((state) => state.categories.isAdding);
const addError = useSelector((state) => state.categories.addError);

const handleSave = async (categoryData) => {
  try {
    await dispatch(addCategoryAsync({ name: categoryData.name })).unwrap();
    setShowModal(false);
    dispatch(clearErrors());
  } catch (error) {
    // Error displayed from addError state
    console.error(error);
  }
};

return (
  <>
    <button disabled={isAdding}>
      {isAdding ? "⏳ Adding..." : "+ Add Category"}
    </button>

    {addError && <div className="error-message">{addError}</div>}
  </>
);
```

---

## ✅ Checklist: Is Your Redux Implementation Following Best Practices?

### Global State

- [ ] Data di Redux hanya yang di-share antar components?
- [ ] UI state local (modal, tabs) menggunakan useState?
- [ ] Derived data di-compute on render, tidak disimpan?

### Loading States

- [ ] Ada per-operation loading states (`isAdding`, `isUpdating`, `isDeleting`)?
- [ ] Loading states digunakan untuk disable buttons/show spinners?
- [ ] Loading state untuk fetch terpisah dari operation states?

### Error Handling

- [ ] Ada per-operation error states (`addError`, `updateError`, `deleteError`)?
- [ ] Error messages user-friendly (tidak too technical)?
- [ ] Ada cara untuk clear errors?

### Async Operations

- [ ] Semua CRUD operations menggunakan async thunks?
- [ ] Thunks handle .pending, .fulfilled, .rejected?
- [ ] Error handling dengan try/catch atau rejectWithValue?

### Validation

- [ ] Validation di Redux layer (thunk), tidak di component?
- [ ] Validation consistent untuk semua operations?
- [ ] Validation errors return descriptive messages?

### Component Structure

- [ ] Component fokus ke UI logic, tidak business logic?
- [ ] Handlers simple (dispatch thunk, handle success/error)?
- [ ] Component tidak duplicated validation/business logic?

---

## 🚀 Next Steps

1. **Apply to Transactions**
   - Refactor `transactionSlice.js` dengan same pattern
   - Add per-operation loading states
   - Move validation to Redux layer

2. **Testing**
   - Unit test untuk Redux thunks
   - Test validation logic
   - Test error handling

3. **Real API Integration**
   - Replace setTimeout dengan real fetch calls
   - Handle network errors
   - Add retry logic

4. **Advanced Patterns**
   - Optimistic updates (update UI immediately, rollback on error)
   - Caching strategy
   - Real-time updates (WebSocket)

---

## 📚 Resources

- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)
- [When to Use Redux](https://redux.js.org/faq/general#when-should-i-use-redux)
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Async Logic with Thunks](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)

---

## 🎓 Summary

**Redux Best Practices untuk ClearSpend:**

1. ✅ **Redux = Global Data** (categories, transactions)
2. ✅ **useState = UI State** (modal, form inputs)
3. ✅ **Per-operation loading/error states** untuk better UX
4. ✅ **Async thunks untuk semua CRUD** operations
5. ✅ **Validation di Redux layer** (single source of truth)
6. ✅ **User-friendly error handling** dengan clear messages

> 🏆 **Result:** Code lebih maintainable, scalable, dan testable!

---

**Dikerjakan oleh:** Person 4 (Categories Feature)  
**Date:** February 2026  
**Version:** 2.0 (Best Practices Implementation)
