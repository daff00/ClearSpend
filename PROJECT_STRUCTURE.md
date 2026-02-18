# 🟢 ClearSpend - Expense Tracker

## 📁 **STRUKTUR FOLDER LENGKAP**

```
src/
├── main.jsx                    # ✅ Entry point (JANGAN DIUBAH)
├── App.jsx                     # ✅ Router setup (Person 1 - SUDAH SELESAI)
├── index.css                   # ✅ Tailwind imports
│
├── store/                      # ✅ Redux Store (SUDAH DIBUAT)
│   ├── index.js               # Redux store configuration
│   ├── transactionSlice.js    # Transaction Redux slice (Person 3)
│   └── categorySlice.js       # Category Redux slice (Person 4)
│
├── data/                       # ✅ Dummy Data (SUDAH DIBUAT)
│   ├── transactions.json      # 8 sample transactions
│   └── categories.json        # 9 sample categories
│
├── pages/                      # ✅ SEMUA PAGES (SUDAH DIBUAT - TINGGAL ISI!)
│   ├── LandingPage.jsx        # Person 1 - Hero, Features, Guide
│   ├── Dashboard.jsx          # Person 2 - Charts & Stats
│   ├── TransactionsPage.jsx   # Person 3 - Transaction CRUD
│   ├── CategoriesPage.jsx     # Person 4 - Category CRUD
│   └── FAQPage.jsx            # Person 5 - FAQ Accordion
│
├── components/                 # ✅ SEMUA COMPONENTS (SUDAH DIBUAT)
│   ├── Navbar.jsx             # Navigation bar (Person 1)
│   ├── TransactionTable.jsx   # Table component (Person 3)
│   ├── TransactionForm.jsx    # Add/Edit modal (Person 3)
│   ├── CategoryForm.jsx       # Add/Edit category (Person 4)
│   └── ChartCard.jsx          # Chart wrapper (Person 2)
│
└── utils/                      # ✅ Utility Functions (SUDAH DIBUAT)
    └── formatters.js          # Currency & date formatters
```

---

## 🎯 **STATUS IMPLEMENTASI**

### ✅ **SUDAH SELESAI (100% Skeleton)**

- [x] Folder structure lengkap
- [x] Redux store configuration
- [x] Redux slices dengan Thunk (transactionSlice, categorySlice)
- [x] Dummy JSON data (transactions, categories)
- [x] Router setup di App.jsx
- [x] Navbar component dengan navigation links
- [x] Semua 5 page skeleton dengan border & penjelasan
- [x] Semua component skeleton siap digunakan
- [x] Utility functions (formatters)

### 🔄 **SIAP DIKERJAKAN OLEH TIM**

Setiap file sudah berisi:

- ✅ Layout skeleton dengan border warna untuk setiap section
- ✅ Teks penjelasan apa fungsi section tersebut
- ✅ Hooks (useState, useEffect) sudah disetup
- ✅ Redux integration sudah terhubung
- ✅ Comment menjelaskan apa yang harus diisi

---

## 👥 **PEMBAGIAN TUGAS DETAIL**

### **Person 1: Foundation & Landing Page** ✅ SETUP SELESAI

**Status:** Redux & Router sudah disetup, tinggal styling Landing Page

**Files yang sudah dibuat:**

- ✅ `src/App.jsx` - Router & Redux Provider
- ✅ `src/store/index.js` - Store configuration
- ✅ `src/components/Navbar.jsx` - Navigation
- ✅ `src/pages/LandingPage.jsx` - Skeleton dengan 3 section

**Yang perlu diisi:**

- Isi Hero Section: Welcome message, tagline, tombol CTA
- Isi Features Section: 3 card dengan icon, judul, deskripsi
- Isi Guide Section: Step-by-step cara pakai ClearSpend
- Styling Navbar: Warna, spacing, hover effects

**Poin:** Redux (4), 1 page (3) = **7 points**

---

### **Person 2: Dashboard dengan Charts** ⏳ SIAP DIKERJAKAN

**Status:** Page skeleton ready, tinggal implementasi Chart.js

**Files yang sudah dibuat:**

- ✅ `src/pages/Dashboard.jsx` - useEffect & Redux integration ready
- ✅ `src/components/ChartCard.jsx` - Wrapper component

**Yang perlu diisi:**

1. Install & import Chart.js:

   ```javascript
   import { Pie, Doughnut } from "react-chartjs-2";
   import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
   ChartJS.register(ArcElement, Tooltip, Legend);
   ```

2. Tambahkan Pie Chart untuk spending by category
3. Tambahkan Doughnut Chart untuk income vs expenses
4. Styling summary cards (Total Income, Expenses, Balance)

**Poin:** useEffect (3), 1 page (3) = **6 points**

---

### **Person 3: Transactions Page** ⏳ SIAP DIKERJAKAN

**Status:** Semua logic CRUD sudah ada, tinggal styling & polish

**Files yang sudah dibuat:**

- ✅ `src/pages/TransactionsPage.jsx` - CRUD logic ready
- ✅ `src/store/transactionSlice.js` - Redux Thunk ready
- ✅ `src/components/TransactionTable.jsx` - Table component
- ✅ `src/components/TransactionForm.jsx` - Form modal

**Yang perlu diisi:**

- Styling tabel transaksi (zebra stripes, hover effects)
- Styling form modal (better spacing, colors)
- Test CRUD operations (Add, Edit, Delete)
- Test search & filter functionality
- Loading state saat fetch data

**Poin:** Redux (4), Redux Thunk (5), useState (3), useEffect (3), 1 page (3) = **18 points** 🔥

---

### **Person 4: Categories Page** ⏳ SIAP DIKERJAKAN

**Status:** CRUD logic ready, tinggal styling

**Files yang sudah dibuat:**

- ✅ `src/pages/CategoriesPage.jsx` - CRUD logic ready
- ✅ `src/store/categorySlice.js` - Redux Thunk ready
- ✅ `src/components/CategoryForm.jsx` - Form modal

**Yang perlu diisi:**

- Styling category cards (colors, shadows, hover)
- Styling form modal
- Test Add/Edit/Delete category
- Confirm delete dengan window.confirm sudah ada

**Poin:** Redux (4), Redux Thunk (5), useState (3), useEffect (3), 1 page (3) = **18 points** 🔥

---

### **Person 5: FAQ Page** ⏳ SIAP DIKERJAKAN

**Status:** Skeleton ready dengan accordion functionality

**Files yang sudah dibuat:**

- ✅ `src/pages/FAQPage.jsx` - useState for accordion

**Yang perlu diisi:**

- Tambah lebih banyak FAQ items sesuai kebutuhan
- Styling accordion (animations, transitions)
- Styling question & answer sections
- Test accordion expand/collapse
- Tambah section technical info dengan details lengkap

**Poin:** useState (3), 1 page (3) = **6 points**

---

## 🚀 **CARA MEMULAI**

### 1. **Jalankan Development Server**

```bash
npm run dev
```

Buka browser di `http://localhost:5173`

### 2. **Test Navigasi**

Klik semua link di Navbar:

- Home → Landing Page ✅
- Dashboard → Dashboard Page ✅
- Transactions → Transactions Page ✅
- Categories → Categories Page ✅
- FAQ → FAQ Page ✅

### 3. **Cek Redux DevTools**

Install Redux DevTools Extension di browser, lalu:

- Buka DevTools → Redux tab
- Lihat `transactions` dan `categories` state
- Klik "Dispatch" untuk test actions

---

## 📝 **PETUNJUK UNTUK SETIAP ANGGOTA**

### **Setiap file sudah diberi tanda:**

```javascript
// FILE INI: [Penjelasan kegunaan file]
// PERSON: [Siapa yang mengerjakan]
// KAPAN DIISI: [Kapan harus dikerjakan]
// POIN: [Berapa poin yang didapat]
```

### **Setiap section punya border warna:**

- 🟢 **Border hijau** = Header/Title section
- 🔵 **Border biru** = Content/Feature section
- 🟣 **Border ungu** = Form/Input section
- 🟠 **Border orange** = Chart/Table section
- 🔴 **Border merah** = Modal/Overlay section

### **Teks penjelasan:**

Setiap section ada teks kecil di bawah yang menjelaskan:

```
⬆️ Section ini untuk apa
[ Apa yang harus diisi di sini ]
```

---

## 🎯 **GRADING CHECKLIST**

### **Mandatory (18 points)**

- [x] Redux (4pts) - `store/index.js`, slices ready
- [x] Redux Thunk (5pts) - `fetchTransactions`, `fetchCategories` ready
- [x] useState (3pts) - Dipakai di semua page untuk local state
- [x] useEffect (3pts) - Fetch data on mount di Dashboard, Transactions, Categories
- [x] 1 person = 1 page (3pts) - 5 pages, 5 people ✅

### **Optional (7 points)**

- [ ] Flexbox (3pts) - Navbar, grids, flex layouts
- [ ] Responsive (2pts) - `md:`, `lg:` breakpoints
- [ ] Stylish CSS (2pts) - Colors, shadows, hover effects

**Total Possible:** 25 points

---

## 🔧 **TROUBLESHOOTING**

### **Error: Cannot find module 'X'**

```bash
npm install
```

### **Redux state tidak muncul**

Check Redux DevTools:

- State tab → Lihat `transactions` dan `categories`
- Actions tab → Lihat `fetchTransactions/pending`, `fetchTransactions/fulfilled`

### **Chart.js error**

Pastikan sudah register components:

```javascript
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
```

### **Router tidak berfungsi**

Cek `App.jsx`:

- `<BrowserRouter>` membungkus semua
- `<Routes>` berisi semua `<Route>`
- Path harus match dengan Link `to` di Navbar

---

## 📚 **DOKUMENTASI TAMBAHAN**

### **Redux Thunk - Cara Kerja**

Sudah diimplementasi di `transactionSlice.js`:

```javascript
// Async action
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(transactionsData), 500);
    });
  },
);

// Dipanggil dengan dispatch
dispatch(fetchTransactions());
```

### **useState Examples**

```javascript
// Search
const [searchTerm, setSearchTerm] = useState("");

// Filter
const [filterCategory, setFilterCategory] = useState("All");

// Modal
const [showModal, setShowModal] = useState(false);
```

### **useEffect Examples**

```javascript
// Fetch data on mount
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchTransactions());
  }
}, [status, dispatch]);
```

---

## 🎨 **STYLING TIPS**

### **Tailwind Classes yang Berguna**

```css
/* Layout */
flex, grid, grid-cols-3, gap-4, space-y-4

/* Spacing */
p-4, px-6, py-2, m-4, mx-auto

/* Colors */
bg-blue-500, text-white, border-green-500

/* Effects */
shadow-lg, hover:shadow-xl, rounded-lg, transition-all

/* Responsive */
md:grid-cols-2, lg:grid-cols-3, sm:px-4
```

### **Color Scheme Suggestions**

- **Primary:** Green (#16a34a) - untuk brand & CTA buttons
- **Success:** Blue (#3b82f6) - untuk income
- **Danger:** Red (#ef4444) - untuk expenses
- **Neutral:** Gray - untuk backgrounds

---

## ✅ **READY TO GO!**

Semua file skeleton sudah dibuat dengan:

- ✅ Working Redux store with Thunk
- ✅ Router connecting 5 pages
- ✅ CRUD logic implemented
- ✅ Forms & modals ready
- ✅ Hooks (useState, useEffect) setup
- ✅ Dummy data loaded
- ✅ Border & text explanations

**Tinggal:** Styling, polish, dan test! 🚀

---

Generated on: February 15, 2026  
Structure Version: 1.0  
Ready for collaborative work with zero conflicts! 🎉
