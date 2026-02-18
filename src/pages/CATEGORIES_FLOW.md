# 📚 CategoriesPage - Flow Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Data Flow](#data-flow)
4. [Component Breakdown](#component-breakdown)
5. [Handler Functions](#handler-functions)
6. [Redux Integration](#redux-integration)

---

## 🎯 Overview

**CategoriesPage** adalah halaman untuk mengelola kategori expense dengan full CRUD operations menggunakan **Redux** untuk state management.

### 💡 Konsep yang Digunakan:

- ✅ **Redux Hooks** (4 poin) - useDispatch, useSelector
- ✅ **Redux Thunk** (5 poin) - Async actions untuk CRUD
- ✅ **useState** (3 poin) - Local state untuk modal
- ✅ **useEffect** (3 poin) - Fetch data on mount
- ✅ **Component Modularity** (3 poin) - CategoryForm component

**Total: 18 POIN!**

---

## 📁 File Structure

```
src/
├── pages/
│   └── CategoriesPage.jsx        # Main page component
├── components/
│   └── CategoryForm.jsx          # Modal form untuk Add/Edit
└── store/
    └── categorySlice.js          # Redux slice untuk categories
```

---

## 🔄 Data Flow

### 1️⃣ **Initial Load Flow**

```
Component Mount
    ↓
useEffect() triggered
    ↓
Check status === 'idle'
    ↓
dispatch(fetchCategories())
    ↓
Redux Thunk: Fetch dari JSON
    ↓
Update Redux Store
    ↓
useSelector() gets new data
    ↓
Component Re-render with data
```

### 2️⃣ **Add Category Flow**

```
User clicks "+ Add Category"
    ↓
handleAdd() triggered
    ↓
setEditingCategory(null)  // Mode Add
setShowModal(true)        // Show modal
    ↓
CategoryForm renders
    ↓
User inputs name & clicks Save
    ↓
handleSave(categoryData) triggered
    ↓
Validasi input (empty & duplicate)
    ↓
dispatch(addCategory({name}))
    ↓
Redux adds to store
    ↓
setShowModal(false)  // Close modal
    ↓
Component re-renders with new category
```

### 3️⃣ **Edit Category Flow**

```
User clicks Edit button (✏️)
    ↓
handleEdit(category) triggered
    ↓
setEditingCategory(category)  // Pass object
setShowModal(true)             // Show modal
    ↓
CategoryForm renders dengan pre-filled data
    ↓
User edits name & clicks Update
    ↓
handleSave(categoryData) triggered
    ↓
Validasi input (empty & duplicate)
    ↓
dispatch(updateCategory({id, name}))
    ↓
Redux updates store
    ↓
setShowModal(false)  // Close modal
    ↓
Component re-renders with updated category
```

### 4️⃣ **Delete Category Flow**

```
User clicks Delete button (🗑️)
    ↓
handleDelete(id) triggered
    ↓
Confirmation dialog muncul
    ↓
User confirms
    ↓
dispatch(deleteCategory(id))
    ↓
Redux removes from store
    ↓
Component re-renders tanpa category tersebut
```

---

## 🧩 Component Breakdown

### **CategoriesPage.jsx** - Main Component

#### 📦 Imports

```javascript
import { useState, useEffect } from "react";           // React Hooks
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
import { fetchCategories, addCategory, ... } from "../store/categorySlice";
import CategoryForm from "../components/CategoryForm";  // Modal Component
```

#### 🔴 Redux Hooks

```javascript
const dispatch = useDispatch();           // Function untuk dispatch actions
const categories = useSelector(...);      // Get categories array dari store
const status = useSelector(...);          // Get loading status
```

**Kenapa pakai selector terpisah?**

- Lebih specific re-render (hanya saat data berubah)
- Easier to debug
- Better performance

#### 🟢 Local State (useState)

```javascript
const [showModal, setShowModal] = useState(false);
const [editingCategory, setEditingCategory] = useState(null);
```

**State Purpose:**

- `showModal`: Control visibility modal (true/false)
- `editingCategory`: Track category yang diedit
  - `null` = Add mode
  - `object` = Edit mode dengan data category

#### 🔵 Side Effect (useEffect)

```javascript
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchCategories());
  }
}, [status, dispatch]);
```

**Explanation:**

1. Runs once saat component mount (karena dependency array)
2. Cek `status === 'idle'` untuk prevent duplicate fetch
3. Dispatch action `fetchCategories()` untuk load data

#### 🎨 Render Sections

**Section 1: Header**

- Title & description
- Add button

**Section 2: Loading State**

- Conditional render: `status === 'loading'`
- Tampil loading spinner/text

**Section 3: Error State**

- Conditional render: `status === 'failed'`
- Tampil error message

**Section 4: Categories Grid**

- Conditional render: `status === 'succeeded'`
- Empty state jika `categories.length === 0`
- Grid cards jika ada data
- Responsive layout (1-3-4 columns)

**Section 5: Modal Form**

- Component `<CategoryForm />`
- Props: `isOpen`, `onClose`, `onSave`, `editingCategory`

**Section 6: Footer**

- Info person & poin

---

## 🎯 Handler Functions

### 1️⃣ `handleAdd()`

**Purpose:** Buka modal untuk Add mode

```javascript
const handleAdd = () => {
  setEditingCategory(null); // Reset to Add mode
  setShowModal(true); // Show modal
};
```

**Flow:**

1. Reset `editingCategory` ke `null` (Add mode)
2. Set `showModal` ke `true`
3. Modal CategoryForm muncul dengan form kosong

---

### 2️⃣ `handleEdit(category)`

**Purpose:** Buka modal untuk Edit mode

**Parameters:**

- `category` (Object): Category object yang akan diedit

```javascript
const handleEdit = (category) => {
  setEditingCategory(category); // Set category data
  setShowModal(true); // Show modal
};
```

**Flow:**

1. Set `editingCategory` dengan object category
2. Set `showModal` ke `true`
3. Modal CategoryForm muncul dengan form pre-filled

**Example Call:**

```javascript
<button onClick={() => handleEdit(category)}>✏️</button>
```

---

### 3️⃣ `handleDelete(id)`

**Purpose:** Delete category dengan confirmation

**Parameters:**

- `id` (Number): Category ID yang akan dihapus

```javascript
const handleDelete = (id) => {
  if (window.confirm("Are you sure?")) {
    dispatch(deleteCategory(id));
  }
};
```

**Flow:**

1. Tampilkan confirmation dialog
2. Jika user confirm, dispatch `deleteCategory(id)`
3. Redux removes category dari store
4. Component re-render automatically

**Why confirmation?**

- Prevent accidental delete
- Better UX

---

### 4️⃣ `handleSave(categoryData)`

**Purpose:** Save category (Add atau Update)

**Parameters:**

- `categoryData` (Object):
  - `name` (String): Category name
  - `id` (Number | undefined): Category ID (ada jika Edit mode)

```javascript
const handleSave = (categoryData) => {
  // VALIDASI 1: Empty check
  if (!categoryData.name.trim()) {
    alert("Category name cannot be empty");
    return;
  }

  // VALIDASI 2: Duplicate check
  const isDuplicate = categories.some(
    (cat) =>
      cat.name.toLowerCase() === categoryData.name.trim().toLowerCase() &&
      cat.id !== categoryData.id,
  );

  if (isDuplicate) {
    alert("Category already exists");
    return;
  }

  // DISPATCH ACTION
  if (categoryData.id) {
    // Edit mode
    dispatch(
      updateCategory({
        id: categoryData.id,
        name: categoryData.name.trim(),
      }),
    );
  } else {
    // Add mode
    dispatch(
      addCategory({
        name: categoryData.name.trim(),
      }),
    );
  }

  // CLEANUP
  setShowModal(false);
  setEditingCategory(null);
};
```

**Validation Logic:**

**1. Empty Check:**

```javascript
if (!categoryData.name.trim()) { ... }
```

- `trim()` removes whitespace di awal/akhir
- Check if empty string setelah trim
- Prevent user submit whitespace only

**2. Duplicate Check:**

```javascript
const isDuplicate = categories.some(
  (cat) =>
    cat.name.toLowerCase() === categoryData.name.trim().toLowerCase() &&
    cat.id !== categoryData.id,
);
```

- `some()` returns `true` jika ada 1 match
- `toLowerCase()` untuk case-insensitive comparison
- `cat.id !== categoryData.id` untuk allow edit dengan nama sama (tidak berubah)

**Example Scenarios:**

**Scenario A: Add New**

```javascript
handleSave({ name: "Food" });
// categoryData.id = undefined → Add mode
// dispatch(addCategory({ name: "Food" }))
```

**Scenario B: Edit Existing**

```javascript
handleSave({ name: "Food & Drinks", id: 1 });
// categoryData.id = 1 → Edit mode
// dispatch(updateCategory({ id: 1, name: "Food & Drinks" }))
```

---

### 5️⃣ `handleCloseModal()`

**Purpose:** Close modal tanpa save

```javascript
const handleCloseModal = () => {
  setShowModal(false);
  setEditingCategory(null);
};
```

**Flow:**

1. Set `showModal` ke `false`
2. Reset `editingCategory` ke `null`
3. Modal disappears

---

## 🔴 Redux Integration

### Redux Store Structure

```javascript
{
  categories: {
    items: [
      { id: 1, name: "Food" },
      { id: 2, name: "Transport" }
    ],
    status: 'succeeded',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  }
}
```

### Actions Available

#### 1️⃣ `fetchCategories()` - Async Thunk

**Purpose:** Fetch semua categories dari JSON

```javascript
dispatch(fetchCategories());
```

**Flow:**

1. Set `status` ke `'loading'`
2. Fetch data dari `src/data/categories.json`
3. Simulate API delay (300ms)
4. Set `status` ke `'succeeded'`
5. Store data di `items` array

---

#### 2️⃣ `addCategory(data)` - Sync Action

**Purpose:** Tambah category baru

```javascript
dispatch(addCategory({ name: "Healthcare" }));
```

**Flow:**

1. Generate new ID (max ID + 1)
2. Create object: `{ id: newId, name: "Healthcare" }`
3. Push ke `items` array
4. Component re-render automatically

---

#### 3️⃣ `updateCategory(data)` - Sync Action

**Purpose:** Update category yang sudah ada

```javascript
dispatch(updateCategory({ id: 1, name: "Food & Drinks" }));
```

**Flow:**

1. Find category dengan ID tersebut
2. Update `name` property
3. Component re-render automatically

---

#### 4️⃣ `deleteCategory(id)` - Sync Action

**Purpose:** Delete category

```javascript
dispatch(deleteCategory(1));
```

**Flow:**

1. Filter out category dengan ID tersebut
2. Remove dari `items` array
3. Component re-render automatically

---

## 💡 Best Practices

### 1️⃣ **Validation di Parent Component**

✅ **Good:** Validasi di `handleSave()` (CategoriesPage)

- Single source of truth
- Easier to modify validation logic
- Can access `categories` array untuk duplicate check

❌ **Bad:** Validasi di CategoryForm

- Duplicate logic jika reuse component
- Cannot access Redux store easily

---

### 2️⃣ **Separate Local vs Global State**

✅ **Local State (useState):**

- Modal visibility (`showModal`)
- UI-only state (`editingCategory`)

✅ **Global State (Redux):**

- Categories data (`categories.items`)
- Loading status (`categories.status`)

---

### 3️⃣ **Component Composition**

✅ **CategoryForm as Separate Component:**

- Reusable
- Single Responsibility (UI only)
- Easy to test

✅ **CategoriesPage handles Business Logic:**

- Validation
- Redux dispatch
- State management

---

### 4️⃣ **Conditional Rendering**

Use specific conditions untuk better readability:

```javascript
{
  status === "loading" && <LoadingState />;
}
{
  status === "failed" && <ErrorState />;
}
{
  status === "succeeded" && <DataGrid />;
}
```

Better than:

```javascript
{status === "loading" ? <LoadingState /> : status === "failed" ? ...}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Modal tidak muncul

**Cause:** `showModal` state tidak update
**Solution:** Check if `setShowModal(true)` dipanggil

---

### Issue 2: Data tidak update

**Cause:** Dispatch action tidak triggered
**Solution:** Check Redux DevTools untuk melihat actions

---

### Issue 3: Duplicate validation tidak kerja

**Cause:** Case sensitivity atau trim issue
**Solution:** Gunakan `.toLowerCase()` dan `.trim()`

---

### Issue 4: Component tidak re-render

**Cause:** useSelector selector tidak return new reference
**Solution:** Use specific selector: `state.categories.items` bukan `state.categories`

---

## 📝 Summary

**CategoriesPage** adalah complete example dari:

- ✅ Redux integration dengan hooks
- ✅ CRUD operations
- ✅ Form handling dengan separate component
- ✅ Input validation
- ✅ Conditional rendering
- ✅ State management (local + global)

Pelajari file ini dengan teliti karena pattern yang sama bisa dipakai untuk:

- TransactionsPage
- Products management
- Users management
- Any CRUD page!

---

**Happy Coding! 🚀**
