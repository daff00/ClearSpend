# 📘 PANDUAN IMPLEMENTASI - ClearSpend

## 🎯 **TUJUAN DOKUMEN INI**

Dokumen ini adalah **panduan step-by-step** untuk mengisi functionality ke dalam skeleton HTML/CSS yang sudah dibuat. Setiap person akan mengikuti panduan sesuai dengan file yang mereka kerjakan.

---

## ⚠️ **PENTING: BACA REDUX GUIDE DULU!**

**📚 Sebelum mulai coding, WAJIB baca:** [REDUX_GUIDE.md](REDUX_GUIDE.md)

Redux Guide berisi:

- ✅ Penjelasan lengkap **apa itu Redux** dan mengapa dipakai
- ✅ Step-by-step **membuat Redux dari nol dengan ketik manual**
- ✅ Penjelasan **syntax Redux** baris per baris
- ✅ **Kegunaan setiap bagian** code Redux
- ✅ Cara **menggunakan Redux di component**
- ✅ Common mistakes dan cara debugging

**🎯 Redux = 4 poin + Redux Thunk = 5 poin = TOTAL 9 POIN per person!**

Person 3 dan Person 4 harus baca Redux Guide terlebih dahulu karena akan membuat Redux slice.

---

## 📁 **STATUS SAAT INI**

### ✅ Yang Sudah Jadi:

- Routing dengan React Router (pindah halaman berfungsi)
- Skeleton HTML/CSS dengan border hitam-putih
- Struktur folder lengkap
- Dummy JSON data siap dipakai

### ⏳ Yang Perlu Dikerjakan:

- Redux Thunk untuk fetch data
- useState untuk local state (search, filter, modal)
- useEffect untuk fetch data saat component mount
- CRUD operations (Create, Read, Update, Delete)
- Chart.js untuk visualisasi
- Styling yang bagus

---

## 👥 **PANDUAN PER PERSON**

---

## 📄 **PERSON 1: Landing Page & Setup**

### **File yang Dikerjakan:**

- [src/pages/LandingPage.jsx](src/pages/LandingPage.jsx)
- [src/components/Navbar.jsx](src/components/Navbar.jsx)

### **Task 1: Styling Navbar**

Navbar sudah punya routing yang berfungsi, tinggal tambah styling.

```jsx
// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b-2 border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold hover:text-green-600 transition"
          >
            💰 ClearSpend
          </Link>

          {/* Navigation */}
          <div className="flex gap-8">
            <Link
              to="/"
              className="text-sm font-medium hover:underline hover:text-green-600"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:underline hover:text-green-600"
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className="text-sm font-medium hover:underline hover:text-green-600"
            >
              Transactions
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium hover:underline hover:text-green-600"
            >
              Categories
            </Link>
            <Link
              to=\"/faq\"
              className=\"text-sm font-medium hover:underline hover:text-green-600\"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

### **Task 2: Isi Landing Page**

```jsx
// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HERO SECTION */}
      <section className="border-2 border-gray-800 p-12 mb-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Kelola Keuangan Anda dengan{" "}
          <span className="text-green-600">ClearSpend</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Aplikasi expense tracker sederhana untuk melacak pemasukan dan
          pengeluaran Anda
        </p>
        <Link to="/dashboard">
          <button className="border-2 border-gray-800 bg-green-600 text-white px-8 py-3 hover:bg-green-700 transition font-semibold">
            Mulai Sekarang →
          </button>
        </Link>
      </section>

      {/* FEATURES SECTION */}
      <section className="border-2 border-gray-800 p-8 mb-6">
        <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-gray-300 pb-4">
          Fitur Utama
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-400 p-6 hover:bg-gray-50 transition">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-xl mb-2">Track Transaksi</h3>
            <p className="text-gray-600">
              Catat semua pemasukan dan pengeluaran dengan mudah
            </p>
          </div>

          <div className="border border-gray-400 p-6 hover:bg-gray-50 transition">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-bold text-xl mb-2">Visualisasi Data</h3>
            <p className="text-gray-600">
              Lihat pengeluaran Anda dalam bentuk chart yang informatif
            </p>
          </div>

          <div className="border border-gray-400 p-6 hover:bg-gray-50 transition">
            <div className="text-4xl mb-3">🏷️</div>
            <h3 className="font-bold text-xl mb-2">Kategorisasi</h3>
            <p className="text-gray-600">
              Kelompokkan transaksi berdasarkan kategori custom Anda
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-2 border-gray-800 p-8">
        <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-gray-300 pb-4">
          Cara Menggunakan
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-400 p-4 flex items-start gap-4">
            <div className="bg-green-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
              1
            </div>
            <div>
              <strong className="text-lg">Buat Kategori</strong>
              <p className="text-gray-600">
                Kunjungi halaman Categories dan buat kategori seperti Food,
                Rent, Salary, dll.
              </p>
            </div>
          </div>

          <div className="border border-gray-400 p-4 flex items-start gap-4">
            <div className="bg-green-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
              2
            </div>
            <div>
              <strong className="text-lg">Tambah Transaksi</strong>
              <p className="text-gray-600">
                Klik "Add Transaction" di halaman Transactions untuk mencatat
                pemasukan atau pengeluaran.
              </p>
            </div>
          </div>

          <div className="border border-gray-400 p-4 flex items-start gap-4">
            <div className="bg-green-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0">
              3
            </div>
            <div>
              <strong className="text-lg">Lihat Dashboard</strong>
              <p className="text-gray-600">
                Visualisasi spending Anda dalam bentuk chart di halaman
                Dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
```

**📌 Poin:** 1 page (3pts) = **3 points**

---

## 📊 **PERSON 2: Dashboard dengan Chart.js**

### **File yang Dikerjakan:**

- [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx)

### **Task 1: Setup Redux & Hooks**

```jsx
// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../store/transactionSlice";
import { fetchCategories } from "../store/categorySlice";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const dispatch = useDispatch();

  // Get data from Redux
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);

  // useEffect: Fetch data on mount (3 POIN!)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  // Group expenses by category
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // Chart data
  const pieData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4BC0C0", "#FF6384"],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* SUMMARY CARDS */}
      <section className="border-2 border-gray-800 p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
          Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-400 p-4 bg-green-50">
            <h3 className="text-sm text-gray-600 mb-2">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">
              Rp {totalIncome.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="border border-gray-400 p-4 bg-red-50">
            <h3 className="text-sm text-gray-600 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">
              Rp {totalExpenses.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="border border-gray-400 p-4 bg-blue-50">
            <h3 className="text-sm text-gray-600 mb-2">Net Balance</h3>
            <p className="text-2xl font-bold text-blue-600">
              Rp {netBalance.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </section>

      {/* CHARTS */}
      <section className="border-2 border-gray-800 p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
          Visualisasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-4">Spending by Category</h3>
            <Pie data={pieData} />
          </div>

          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-4">Income vs Expenses</h3>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </section>

      {/* RECENT TRANSACTIONS */}
      <section className="border-2 border-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
          Recent Transactions
        </h2>
        <div>
          {transactions.slice(0, 5).map((t) => (
            <div
              key={t.id}
              className="flex justify-between py-3 border-b border-gray-300"
            >
              <div>
                <p className="font-semibold">{t.description}</p>
                <p className="text-xs text-gray-500">{t.category}</p>
              </div>
              <span
                className={
                  t.type === "income"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {t.type === "income" ? "+" : "-"} Rp{" "}
                {t.amount.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
```

**📌 Poin:** useEffect (3) + 1 page (3) = **6 points**

---

## 💰 **PERSON 3: Transactions Page**

### **File yang Dikerjakan:**

- [src/pages/TransactionsPage.jsx](src/pages/TransactionsPage.jsx)
- [src/store/transactionSlice.js](src/store/transactionSlice.js)
- [src/store/index.js](src/store/index.js)

### **⚠️ PENTING: Baca Redux Guide Dulu!**

**🚨 STOP! Jangan skip section ini!**

Sebelum lanjut, WAJIB baca dulu: **[REDUX_GUIDE.md](REDUX_GUIDE.md)**

Redux Guide akan mengajarkan:

1. ✅ **Apa itu Redux** dan konsep store/action/reducer
2. ✅ **Step-by-step membuat Redux slice** dengan ketik manual
3. ✅ **Penjelasan setiap baris code** dan kegunaannya
4. ✅ **Cara menggunakan Redux** di component

**📌 POIN YANG BISA DIDAPAT:**

- Redux (4pts) ✅
- Redux Thunk (5pts) ✅
- useState (3pts) ✅
- useEffect (3pts) ✅
- 1 page (3pts) ✅
- **TOTAL: 18 POIN!**

---

### **Task 1: Complete Redux Slice**

**📂 File:** [src/store/transactionSlice.js](src/store/transactionSlice.js)

File ini sudah ada tapi masih kosong dengan TODO comments. Kamu akan **ketik manual semua code**.

**📚 Ikuti panduan di:** [REDUX_GUIDE.md - STEP 2](REDUX_GUIDE.md#step-2-buat-redux-slice-untuk-transactions)

Setelah selesai mengetik manual, file akan berisi:

- ✅ Import createSlice dan createAsyncThunk
- ✅ Redux Thunk `fetchTransactions` (5 POIN!)
- ✅ Redux Slice dengan initialState
- ✅ 3 Reducers: addTransaction, updateTransaction, deleteTransaction (4 POIN!)
- ✅ extraReducers untuk handle async
- ✅ Export actions dan reducer

**⏱️ Estimasi waktu:** 30-45 menit (dengan baca guide sambil ngetik)

---

### **Task 2: Update Store Configuration**

**📂 File:** [src/store/index.js](src/store/index.js)

Setelah transactionSlice selesai, uncomment 2 baris:

```javascript
import transactionReducer from "./transactionSlice";
// ...
transactions: transactionReducer,
```

**📚 Lihat panduan di:** [REDUX_GUIDE.md - STEP 1](REDUX_GUIDE.md#step-1-setup-store-gudang-pusat)

---

### **Task 3: Connect Redux ke App**

**📂 File:** [src/App.jsx](src/App.jsx)

Uncomment import dan wrap dengan Provider:

```javascript
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return <Provider store={store}>{/* ... existing code ... */}</Provider>;
}
```

**📚 Lihat panduan di:** [REDUX_GUIDE.md - STEP 4](REDUX_GUIDE.md#step-4-connect-redux-ke-app)

---

### **Task 4: Use Redux in TransactionsPage**

**📂 File:** [src/pages/TransactionsPage.jsx](src/pages/TransactionsPage.jsx)

Sekarang gunakan Redux di component. Tambahkan:

1. **Import hooks dan actions:**

```javascript
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../store/transactionSlice";
```

2. **Setup Redux hooks:**

```javascript
const dispatch = useDispatch();
const transactions = useSelector((state) => state.transactions.items);
const status = useSelector((state) => state.transactions.status);
```

3. **Fetch data dengan useEffect (3 POIN!):**

```javascript
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchTransactions());
  }
}, [status, dispatch]);
```

4. **Handle CRUD operations:**

```javascript
const handleAdd = (formData) => {
  dispatch(addTransaction(formData));
};

const handleUpdate = (id, newData) => {
  dispatch(updateTransaction({ id, ...newData }));
};

const handleDelete = (id) => {
  dispatch(deleteTransaction(id));
};
```

5. **Setup useState untuk search, filter, modal (3 POIN!):**

```javascript
const [searchTerm, setSearchTerm] = useState("");
const [filterCategory, setFilterCategory] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingTransaction, setEditingTransaction] = useState(null);
```

6. **Filter transactions:**

```javascript
const filteredTransactions = transactions.filter((t) => {
  const matchSearch = t.description
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
  const matchCategory = filterCategory === "" || t.category === filterCategory;
  return matchSearch && matchCategory;
});
```

7. **Map ke table dan handle buttons**

**📚 Untuk contoh lengkap, lihat:** [REDUX_GUIDE.md - STEP 5](REDUX_GUIDE.md#step-5-gunakan-redux-di-component)

**📌 Poin:** Redux (4) + Redux Thunk (5) + useState (3) + useEffect (3) + 1 page (3) = **18 points!**

---

## 🏷️ **PERSON 4: Categories Page**

### **File yang Dikerjakan:**

- [src/pages/CategoriesPage.jsx](src/pages/CategoriesPage.jsx)
- [src/store/categorySlice.js](src/store/categorySlice.js)

### **⚠️ SAMA SEPERTI PERSON 3!**

Ikuti langkah yang sama dengan Person 3, tapi untuk **categories**:

1. **📚 Baca Redux Guide:** [REDUX_GUIDE.md - STEP 3](REDUX_GUIDE.md#step-3-buat-redux-slice-untuk-categories)
2. **Ketik manual** [src/store/categorySlice.js](src/store/categorySlice.js)
3. **Uncomment** reducer di [src/store/index.js](src/store/index.js)
4. **Gunakan Redux** di [src/pages/CategoriesPage.jsx](src/pages/CategoriesPage.jsx)

**Perbedaan dengan transactionSlice:**

- Nama: `categories` bukan `transactions`
- Structure lebih simple: `{ id, name }` saja
- Actions: `addCategory`, `updateCategory`, `deleteCategory`

**📌 Poin:** Redux (4) + Redux Thunk (5) + useState (3) + useEffect (3) + 1 page (3) = **18 points!**

---

## 👤 **PERSON 5: FAQ Page**

### **Task: Buat FAQ Accordion dengan useState**

**📂 File:** [src/pages/FAQPage.jsx](src/pages/FAQPage.jsx)

FAQ Page menampilkan **Frequently Asked Questions** dengan accordion (expand/collapse) menggunakan **useState**.

#### **Konsep yang Digunakan:**
- ✅ **useState (3 POIN!)** - Handle accordion open/close state
- ✅ **Array Mapping** - Render multiple FAQ items
- ✅ **Conditional Rendering** - Show/hide FAQ answer
- ✅ **Event Handlers** - onClick untuk toggle accordion

#### **Implementation:**

```jsx
// src/pages/FAQPage.jsx
import { useState } from 'react';

function FAQPage() {
  // useState untuk handle accordion (3 POIN!)
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Apa itu ClearSpend?",
      answer: "ClearSpend adalah aplikasi expense tracker..."
    },
    {
      question: "Bagaimana cara menambahkan transaksi?",
      answer: "Kunjungi halaman Transactions..."
    },
    // ... more FAQs
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1>FAQ - Frequently Asked Questions</h1>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-400">
            
            {/* Question - Clickable */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 hover:bg-gray-50 flex justify-between"
            >
              <span className="font-semibold">
                {index + 1}. {faq.question}
              </span>
              <span className="text-2xl">
                {openFAQ === index ? '−' : '+'}
              </span>
            </button>

            {/* Answer - Conditional Rendering */}
            {openFAQ === index && (
              <div className="p-4 bg-gray-50 border-t">
                <p>{faq.answer}</p>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
```

#### **How It Works:**

**1. State Management:**
```javascript
const [openFAQ, setOpenFAQ] = useState(null);
// null = semua FAQ tertutup
// number (index) = FAQ dengan index tersebut terbuka
```

**2. Toggle Logic:**
```javascript
const toggleFAQ = (index) => {
  // Jika FAQ yang sama diklik, tutup (set null)
  // Jika FAQ berbeda diklik, buka FAQ itu (set index)
  setOpenFAQ(openFAQ === index ? null : index);
};
```

**3. Conditional Rendering:**
```javascript
{openFAQ === index && (
  <div>Answer here</div>
)}
// Hanya render answer jika FAQ ini terbuka
```

**📌 Poin:** useState (3) + 1 page (3) = **6 points**

---

## 🔧 **COMMON ISSUES & SOLUTIONS**

### **Error: Cannot find module**

```bash
npm install
```

### **Redux DevTools tidak muncul**

Install extension Redux DevTools di browser

### **Chart.js error**

Pastikan register components:

```javascript
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
```

### **useEffect infinite loop**

Selalu include dependency array:

```javascript
useEffect(() => {
  // code
}, [dependency]); // JANGAN lupa ini!
```

---

## ✅ **CHECKLIST**

- [ ] Person 1: Landing page & navbar styled
- [ ] Person 2: Dashboard with charts
- [ ] Person 3: Transactions CRUD working
- [ ] Person 4: Categories CRUD working
- [ ] Person 5: FAQ page with accordion interactive
- [ ] All pages responsive
- [ ] Redux DevTools showing data
- [ ] No console errors
- [ ] Git commits clear

---

**Good luck! 🚀**
