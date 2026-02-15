# 📚 PANDUAN REDUX TOOLKIT - Belajar dengan Mengetik Manual

## 🎯 **TUJUAN DOKUMEN INI**

Dokumen ini adalah **panduan lengkap Redux** untuk pemula. Kamu akan **mengetik manual semua code Redux** agar benar-benar paham:

- **Apa itu Redux** dan mengapa dipakai
- **Syntax Redux** dan cara kerjanya
- **Kegunaan setiap bagian** code Redux

---

## 📖 **APA ITU REDUX?**

### **Analogi Sederhana: Redux = Gudang Pusat**

Bayangkan aplikasi React kamu adalah sebuah **toko dengan banyak kasir** (components):

**❌ TANPA REDUX:**

- Setiap kasir punya catatan sendiri-sendiri
- Kasir A tidak tahu stok yang dicatat Kasir B
- Data terpisah-pisah, susah sync
- Harus passing props berulang kali (props drilling)

**✅ DENGAN REDUX:**

- Ada **1 gudang pusat** yang menyimpan semua data
- Semua kasir ngecek stok di gudang yang sama
- Data sinkron, semua lihat data yang sama
- Tidak perlu passing props berkali-kali

### **Redux dalam Aplikasi ClearSpend:**

```
┌─────────────────────────────────────┐
│        REDUX STORE (Gudang)        │
│                                     │
│  ┌─────────────────────────────┐  │
│  │  transactions: []            │  │ ← Dashboard baca dari sini
│  │    - { id: 1, amount: 50k }  │  │ ← TransactionsPage baca dari sini
│  │    - { id: 2, amount: 30k }  │  │
│  │                              │  │
│  │  categories: []              │  │ ← Semua component baca dari sini
│  │    - Food                    │  │
│  │    - Transport               │  │
│  └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 🚀 **MENGAPA PERLU REDUX?**

### **Problem: Props Drilling**

Tanpa Redux, untuk passing data dari komponen atas ke bawah:

```jsx
<App>                              // Punya data transactions
  <Dashboard>                      // Terima props, pass ke bawah lagi
    <ChartComponent>              // Terima props, pass ke bawah lagi
      <PieChart transactions={...} />  // Akhirnya pakai disini
    </ChartComponent>
  </Dashboard>
</App>
```

Ribet! Semua komponen di tengah harus **terima dan pass props terus**.

### **Solution: Redux Global State**

Dengan Redux, component manapun bisa ambil data langsung:

```jsx
// Di Dashboard.jsx
const transactions = useSelector((state) => state.transactions.items);

// Di TransactionsPage.jsx (file berbeda!)
const transactions = useSelector((state) => state.transactions.items);
// ☝️ DAPAT DATA YANG SAMA dari store yang sama!
```

---

## 🏗️ **ARSITEKTUR REDUX**

### **3 Konsep Utama Redux:**

```
┌──────────────┐      dispatch      ┌──────────────┐
│  COMPONENT   │  ───────────────>  │    ACTION    │
│              │                    │ (Add Trans)  │
└──────────────┘                    └──────┬───────┘
       ↑                                   │
       │                                   ↓
       │                            ┌──────────────┐
       │   useSelector              │   REDUCER    │
       │   (baca data)              │ (Update data)│
       │                            └──────┬───────┘
       │                                   │
       │                                   ↓
       └─────────────────────────  ┌──────────────┐
                                   │    STORE     │
                                   │ (Central DB) │
                                   └──────────────┘
```

1. **STORE** = Gudang pusat yang menyimpan semua data
2. **ACTION** = Perintah untuk update data (e.g., "tambah transaksi")
3. **REDUCER** = Fungsi yang menjalankan perintah dan update store

---

## 📝 **STEP-BY-STEP: BUAT REDUX DARI NOL**

---

## **STEP 1: Setup Store (Gudang Pusat)**

### **File: [src/store/index.js](src/store/index.js)**

Buka file ini, kamu akan lihat:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    categories: categoryReducer,
  },
});
```

### **📖 Penjelasan Baris per Baris:**

| Baris                            | Arti                                                  |
| -------------------------------- | ----------------------------------------------------- |
| `import { configureStore }`      | Fungsi dari Redux Toolkit untuk buat store            |
| `import transactionReducer`      | Import reducer dari slice transactions                |
| `reducer: { transactions: ... }` | Daftarkan reducer ke store dengan nama "transactions" |
| `export const store`             | Export store agar bisa dipakai di App.jsx             |

**🎯 KEGUNAAN:** File ini adalah **gudang pusat**. Semua reducer dari slice-slice lain didaftarkan disini.

---

## **STEP 2: Buat Redux Slice untuk Transactions**

### **File: [src/store/transactionSlice.js](src/store/transactionSlice.js)**

**❗ PENTING:** File ini sudah ada tapi masih kosong. Kamu akan **ketik manual semua code** di file ini.

### **🔹 STEP 2.1: Import Dependencies**

Ketik manual di baris paling atas:

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionsData from "../data/transactions.json";
```

**📖 Penjelasan:**

- `createSlice` = Fungsi untuk buat Redux slice (state + actions + reducers)
- `createAsyncThunk` = Fungsi untuk buat async action (fetch data dari API/JSON)
- `transactionsData` = Data dummy dari JSON untuk dipakai

---

### **🔹 STEP 2.2: Buat Redux Thunk (Async Action)**

**❓ APA ITU REDUX THUNK?**

- Redux biasa **tidak bisa handle async operation** (fetch API)
- Redux Thunk = middleware yang **memungkinkan async actions**
- Dipakai untuk: fetch data, POST ke API, dll

**💰 POIN: 5 POINTS!**

Ketik manual code dibawah:

```javascript
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions", // ← Nama action (harus unik)
  async () => {
    // Simulasi API call dengan Promise + setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData); // ← Return data setelah 500ms
      }, 500);
    });
  },
);
```

**📖 Penjelasan Baris per Baris:**

| Baris                              | Arti                                                             |
| ---------------------------------- | ---------------------------------------------------------------- |
| `export const fetchTransactions`   | Export agar bisa di-import di component                          |
| `createAsyncThunk(...)`            | Fungsi untuk buat async action                                   |
| `"transactions/fetchTransactions"` | Nama unik untuk action ini (convention: `slice/actionName`)      |
| `async () => { ... }`              | Fungsi async yang akan dijalankan saat action di-dispatch        |
| `return new Promise(...)`          | Simulasi API call (dalam real app, pakai `fetch()` atau `axios`) |
| `setTimeout(() => {...}, 500)`     | Delay 500ms untuk simulasi loading                               |
| `resolve(transactionsData)`        | Return data ke Redux setelah selesai                             |

**🎯 KEGUNAAN:**

- Saat component panggil `dispatch(fetchTransactions())`, function ini jalan
- Data dari JSON akan di-load setelah 500ms (simulasi API)
- Redux akan update state dengan data tersebut

---

### **🔹 STEP 2.3: Buat Redux Slice**

**❓ APA ITU SLICE?**

- Slice = **potongan kecil dari Redux store**
- Berisi: **state + actions + reducers** dalam 1 file
- Lebih simple dari Redux klasik (tidak perlu pisah banyak file)

**💰 POIN: 4 POINTS!**

Ketik manual code dibawah:

```javascript
const transactionSlice = createSlice({
  name: "transactions", // ← Nama slice (untuk Redux DevTools)

  // INITIAL STATE: Data awal saat app pertama kali load
  initialState: {
    items: [], // ← Array untuk menyimpan transaksi
    status: "idle", // ← Status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // ← Error message jika fetch gagal
  },

  // REDUCERS: Fungsi untuk update state (synchronous)
  reducers: {
    // ═══════════════════════════════════════════════
    // ACTION 1: ADD TRANSACTION
    // ═══════════════════════════════════════════════
    addTransaction: (state, action) => {
      state.items.push({
        ...action.payload, // ← Data dari form (type, amount, etc)
        id: Date.now(), // ← Generate ID unik
      });
    },

    // ═══════════════════════════════════════════════
    // ACTION 2: UPDATE TRANSACTION
    // ═══════════════════════════════════════════════
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload; // ← Replace dengan data baru
      }
    },

    // ═══════════════════════════════════════════════
    // ACTION 3: DELETE TRANSACTION
    // ═══════════════════════════════════════════════
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      // ☝️ Filter: buang transaction dengan id yang di-delete
    },
  },

  // EXTRA REDUCERS: Handle async actions dari Thunk
  extraReducers: (builder) => {
    builder
      // ─────────────────────────────────────────────
      // Saat fetchTransactions PENDING (loading)
      // ─────────────────────────────────────────────
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      // ─────────────────────────────────────────────
      // Saat fetchTransactions FULFILLED (berhasil)
      // ─────────────────────────────────────────────
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // ← Isi items dengan data dari JSON
      })
      // ─────────────────────────────────────────────
      // Saat fetchTransactions REJECTED (gagal)
      // ─────────────────────────────────────────────
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
```

**📖 Penjelasan Konsep:**

#### **A. INITIAL STATE**

```javascript
initialState: {
  items: [],       // Array transaksi kosong di awal
  status: "idle",  // Belum fetch data
  error: null,     // Belum ada error
}
```

Ini seperti **nilai awal variabel** saat aplikasi pertama kali dibuka.

#### **B. REDUCERS (Synchronous Actions)**

```javascript
reducers: {
  addTransaction: (state, action) => {
    state.items.push({ ...action.payload, id: Date.now() });
  },
}
```

- `state` = state saat ini
- `action.payload` = data yang dikirim dari component
- Di Redux Toolkit, kamu bisa langsung **mutate state** (push, filter, etc)
  - Redux Toolkit pakai `immer` library di balik layar
  - Sebenarnya tetap immutable, tapi syntax lebih simple!

#### **C. EXTRA REDUCERS (Async Actions)**

```javascript
extraReducers: (builder) => {
  builder.addCase(fetchTransactions.fulfilled, (state, action) => {
    state.items = action.payload;
  });
};
```

- Handle 3 stage async: **pending**, **fulfilled**, **rejected**
- `action.payload` = data yang di-return dari thunk
- Update state berdasarkan hasil async operation

---

### **🔹 STEP 2.4: Export Actions dan Reducer**

Ketik manual di bagian paling bawah file:

```javascript
export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
```

**📖 Penjelasan:**

- `transactionSlice.actions` = Object berisi semua actions dari `reducers`
- Export dengan **named exports** agar bisa di-import: `import { addTransaction } from '...'`
- Export reducer dengan **default export** untuk didaftarkan ke store

---

## **STEP 3: Buat Redux Slice untuk Categories**

### **File: [src/store/categorySlice.js](src/store/categorySlice.js)**

Strukturnya **mirip dengan transactionSlice**. Ketik manual semua code dengan perbedaan:

| transactionSlice                     | categorySlice        |
| ------------------------------------ | -------------------- |
| `name: "transactions"`               | `name: "categories"` |
| `fetchTransactions`                  | `fetchCategories`    |
| `addTransaction`                     | `addCategory`        |
| Categories cuma punya `{ id, name }` | Lebih simple!        |

**💡 TIP:** Copy structure dari transactionSlice, lalu ganti nama-namanya.

---

## **STEP 4: Connect Redux ke App**

### **File: [src/App.jsx](src/App.jsx)**

Setelah Redux slice selesai dibuat, sekarang **connect ke aplikasi**:

Uncomment 2 baris di bagian atas:

```javascript
import { Provider } from "react-redux";
import { store } from "./store";
```

Lalu wrap `<BrowserRouter>` dengan `<Provider>`:

```javascript
function App() {
  return (
    <Provider store={store}>  {/* ← Tambahkan ini */}
      <BrowserRouter>
        {/* ... routes ... */}
      </BrowserRouter>
    </Provider>  {/* ← Tambahkan ini */}
  );
}
```

**📖 Penjelasan:**

- `<Provider>` = Component dari React Redux yang **memberi akses store** ke semua component
- Semua component di dalam `<Provider>` bisa pakai `useSelector` dan `useDispatch`

---

## **STEP 5: Gunakan Redux di Component**

### **Contoh: Dashboard.jsx**

```javascript
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../store/transactionSlice";

function Dashboard() {
  // ═══════════════════════════════════════════════
  // SETUP HOOKS
  // ═══════════════════════════════════════════════
  const dispatch = useDispatch(); // Untuk dispatch actions

  // useSelector: Ambil data dari Redux store
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);

  // ═══════════════════════════════════════════════
  // FETCH DATA saat component mount
  // ═══════════════════════════════════════════════
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions()); // Panggil Redux Thunk
    }
  }, [status, dispatch]);

  // ═══════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {transactions.map((t) => (
        <p key={t.id}>
          {t.description}: Rp {t.amount}
        </p>
      ))}
    </div>
  );
}
```

**📖 Penjelasan Step-by-Step:**

#### **1. Import Hooks dan Actions**

```javascript
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../store/transactionSlice";
```

#### **2. Setup useDispatch**

```javascript
const dispatch = useDispatch();
```

- `dispatch` = Fungsi untuk **kirim action** ke Redux
- Seperti **tombol untuk perintah gudang**

#### **3. Setup useSelector**

```javascript
const transactions = useSelector((state) => state.transactions.items);
```

- `useSelector` = Hook untuk **baca data dari store**
- `state.transactions` = Nama reducer yang didaftarkan di store
- `state.transactions.items` = Ambil property `items` dari state

**Visual:**

```
store = {
  transactions: {        ← state.transactions
    items: [...],        ← state.transactions.items
    status: "succeeded",
    error: null,
  },
  categories: { ... }
}
```

#### **4. Dispatch Action**

```javascript
dispatch(fetchTransactions());
```

- Panggil Redux Thunk untuk fetch data
- Redux akan:
  1. Set `status = 'loading'`
  2. Fetch data dari JSON (500ms delay)
  3. Set `status = 'succeeded'` dan isi `items`

#### **5. Handle Loading State**

```javascript
if (status === "loading") {
  return <p>Loading...</p>;
}
```

- Cek status dari Redux
- Tampilkan loading indicator saat fetch data

---

### **Contoh: TransactionsPage.jsx (CRUD Operations)**

```javascript
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../store/transactionSlice";

function TransactionsPage() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);

  // ═══════════════════════════════════════════════
  // HANDLE ADD
  // ═══════════════════════════════════════════════
  const handleAdd = (formData) => {
    dispatch(
      addTransaction({
        type: "expense",
        description: "Makan siang",
        amount: 25000,
        date: "2026-02-15",
        category: "Food",
      }),
    );
  };

  // ═══════════════════════════════════════════════
  // HANDLE UPDATE
  // ═══════════════════════════════════════════════
  const handleUpdate = (id, newData) => {
    dispatch(
      updateTransaction({
        id: id,
        ...newData,
      }),
    );
  };

  // ═══════════════════════════════════════════════
  // HANDLE DELETE
  // ═══════════════════════════════════════════════
  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <div>
      {transactions.map((t) => (
        <div key={t.id}>
          <p>{t.description}</p>
          <button onClick={() => handleUpdate(t.id, { amount: 50000 })}>
            Edit
          </button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧪 **TESTING REDUX**

### **1. Install Redux DevTools**

Install extension di browser:

- Chrome: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- Firefox: [Redux DevTools](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

### **2. Buka DevTools**

1. Jalankan app: `npm run dev`
2. Buka browser DevTools (F12)
3. Klik tab **Redux**

Kamu akan lihat:

- **State tree**: Semua data di store
- **Action list**: History semua action yang di-dispatch
- **Diff**: Perubahan state sebelum dan sesudah action

### **3. Test Actions**

Coba dispatch action dan lihat di DevTools:

```javascript
dispatch(addTransaction({ amount: 10000, ... }));
```

Di DevTools, kamu akan lihat:

1. Action `transactions/addTransaction`
2. Payload yang dikirim
3. State sebelum dan sesudah

---

## ❌ **COMMON MISTAKES**

### **1. Lupa Export Actions**

❌ **SALAH:**

```javascript
const transactionSlice = createSlice({ ... });
export default transactionSlice.reducer;  // Cuma export reducer
```

✅ **BENAR:**

```javascript
const transactionSlice = createSlice({ ... });
export const { addTransaction } = transactionSlice.actions;  // Export actions juga!
export default transactionSlice.reducer;
```

---

### **2. Salah useSelector Path**

❌ **SALAH:**

```javascript
const transactions = useSelector((state) => state.items); // Langsung items?
```

✅ **BENAR:**

```javascript
const transactions = useSelector((state) => state.transactions.items);
//                                            ↑ Nama reducer di store
```

---

### **3. Mutate State (di Redux Klasik)**

Di Redux klasik, **tidak boleh mutate state**:

❌ **SALAH (di Redux klasik):**

```javascript
state.items.push(newItem); // Langsung push = mutate!
```

✅ **BENAR (di Redux Toolkit):**

```javascript
state.items.push(newItem); // OK di Redux Toolkit karena pakai Immer!
```

**Redux Toolkit** pakai library `immer` yang otomatis handle immutability.

---

### **4. Lupa Dispatch**

❌ **SALAH:**

```javascript
addTransaction({ amount: 10000 }); // Langsung panggil action?
```

✅ **BENAR:**

```javascript
dispatch(addTransaction({ amount: 10000 })); // Harus pakai dispatch!
```

---

## 📊 **REDUX vs useState**

| **Aspek**       | **useState**              | **Redux**                             |
| --------------- | ------------------------- | ------------------------------------- |
| **Scope**       | Local (1 component saja)  | Global (semua component)              |
| **Sharing**     | Harus passing props       | Langsung akses dari mana saja         |
| **Debugging**   | Console.log saja          | Redux DevTools (history, time travel) |
| **Setup**       | Simple                    | Butuh setup (store, slice, etc)       |
| **Kapan Pakai** | Data lokal (form, toggle) | Data shared (user info, transactions) |

**🎯 RULE OF THUMB:**

- Data cuma dipakai 1 component → **useState**
- Data dipakai banyak component → **Redux**

---

## 🎓 **KESIMPULAN**

### **Yang Sudah Dipelajari:**

✅ **Konsep Redux:**

- Store = Gudang pusat untuk semua data
- Action = Perintah untuk update data
- Reducer = Fungsi yang update store
- Slice = State + Actions + Reducers dalam 1 file

✅ **Redux Toolkit:**

- `createSlice`: Buat slice dengan syntax simple
- `createAsyncThunk`: Handle async operations (fetch API)
- `configureStore`: Setup Redux store

✅ **React Redux Hooks:**

- `useSelector`: Baca data dari store
- `useDispatch`: Kirim action ke store

✅ **Cara Pakai di Component:**

- Import actions dari slice
- Setup dispatch dan selector
- Dispatch actions untuk CRUD
- useEffect untuk fetch data

---

## 📝 **TODO CHECKLIST**

Ikuti urutan ini untuk implement Redux:

### **PERSON 3 (Transactions):**

- [ ] Buka [src/store/transactionSlice.js](src/store/transactionSlice.js)
- [ ] Uncomment dan ketik manual semua code yang ada
- [ ] Export actions dan reducer
- [ ] Buka [src/App.jsx](src/App.jsx), uncomment Provider
- [ ] Buka [src/pages/TransactionsPage.jsx](src/pages/TransactionsPage.jsx)
- [ ] Import useDispatch, useSelector, dan actions
- [ ] Setup state dengan useSelector
- [ ] Dispatch fetchTransactions di useEffect
- [ ] Implement handle Add/Update/Delete
- [ ] Test di browser, buka Redux DevTools

### **PERSON 4 (Categories):**

- [ ] Ikuti langkah yang sama untuk categorySlice.js
- [ ] Implement di [src/pages/CategoriesPage.jsx](src/pages/CategoriesPage.jsx)

### **PERSON 2 (Dashboard):**

- [ ] Gunakan data dari Redux (bukan dummy data)
- [ ] Display transactions untuk charts

---

## 🚀 **NEXT STEPS**

Setelah Redux selesai, kamu bisa:

1. Ganti data JSON dengan **real API** (fetch dari backend)
2. Tambah **Redux persist** (simpan data di localStorage)
3. Implement **optimistic updates** (UI update duluan, sync ke API belakangan)

---

**Happy Coding! 🎉**

Kalau ada error, cek:

1. Redux DevTools untuk lihat state dan actions
2. Console browser untuk error messages
3. Pastikan semua import sudah benar
