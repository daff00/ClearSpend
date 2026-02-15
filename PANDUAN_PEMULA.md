# 🎓 Panduan Pemula - ClearSpend

## 📖 **PANDUAN SINGKAT UNTUK PEMULA**

Dokumen ini menjelaskan konsep-konsep penting dalam project ini dengan bahasa sederhana.

---

## 1️⃣ **Apa itu Redux?**

### **Analogi Sederhana:**

Redux seperti **bank data pusat** untuk aplikasi. Semua komponen bisa ambil atau simpan data ke sini.

### **Tanpa Redux:**

```
Component A punya data → harus passing ke Component B → passing ke Component C
```

### **Dengan Redux:**

```
Semua component bisa langsung ambil/ubah data dari Redux Store
```

### **File-file Redux:**

#### `src/store/index.js` - **Bank Pusat**

```javascript
export const store = configureStore({
  reducer: {
    transactions: transactionReducer, // Rak untuk transaksi
    categories: categoryReducer, // Rak untuk kategori
  },
});
```

#### `src/store/transactionSlice.js` - **Rak Transaksi**

```javascript
// State awal
initialState: {
  items: [],        // Array kosong untuk transaksi
  status: 'idle',   // Status: idle, loading, succeeded, failed
}

// Actions (fungsi untuk ubah data)
addTransaction    // Tambah transaksi baru
updateTransaction // Edit transaksi
deleteTransaction // Hapus transaksi
```

---

## 2️⃣ **Apa itu Redux Thunk?**

### **Analogi Sederhana:**

Redux Thunk untuk **operasi yang butuh waktu** (async), seperti ambil data dari server.

### **Contoh di Project:**

```javascript
// Fungsi ini simulasi ambil data (pakai setTimeout 500ms)
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactionsData); // Return data setelah 500ms
      }, 500);
    });
  },
);
```

### **Status yang Dihandle:**

- **pending** → Sedang loading (tampilkan spinner)
- **fulfilled** → Berhasil (tampilkan data)
- **rejected** → Error (tampilkan pesan error)

---

## 3️⃣ **Apa itu useState?**

### **Analogi Sederhana:**

useState untuk **data yang berubah-ubah** di dalam satu component.

### **Contoh:**

```javascript
const [searchTerm, setSearchTerm] = useState("");
//     ↑ value         ↑ fungsi ubah     ↑ nilai awal
```

### **Cara Pakai:**

```javascript
// Tampilkan di input
<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

// searchTerm akan berubah setiap kali user ketik
```

### **Kapan Pakai useState:**

- Form input (search, filter, form fields)
- Toggle visibility (modal show/hide)
- Temporary data (data sementara yang tidak perlu disimpan di Redux)

---

## 4️⃣ **Apa itu useEffect?**

### **Analogi Sederhana:**

useEffect untuk **jalankan kode saat component muncul** atau saat sesuatu berubah.

### **Contoh 1: Fetch Data Saat Component Muncul**

```javascript
useEffect(() => {
  // Kode ini jalan 1x saat component pertama kali muncul
  dispatch(fetchTransactions());
}, []); // [] = dependency array kosong = hanya jalan 1x
```

### **Contoh 2: Jalan Saat Status Berubah**

```javascript
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchTransactions());
  }
}, [status, dispatch]); // Jalan ulang kalau status atau dispatch berubah
```

### **Kapan Pakai useEffect:**

- Fetch data saat component muncul
- Subscribe to events
- Cleanup (bersih-bersih saat component hilang)

---

## 5️⃣ **Apa itu React Router?**

### **Analogi Sederhana:**

React Router untuk **navigasi antar halaman tanpa reload**.

### **Setup di App.jsx:**

```javascript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</BrowserRouter>
```

### **Navigasi dengan Link:**

```javascript
import { Link } from "react-router-dom";

<Link to="/dashboard">Go to Dashboard</Link>;
// Klik link → pindah halaman tanpa reload
```

---

## 6️⃣ **Props & Component Communication**

### **Passing Props ke Child Component:**

```javascript
// Parent
<TransactionTable
  transactions={filteredTransactions}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>;

// Child
function TransactionTable({ transactions, onEdit, onDelete }) {
  // Bisa pakai transactions, onEdit, onDelete
}
```

---

## 7️⃣ **Cara Kerja Form & Modal**

### **State untuk Modal:**

```javascript
const [showModal, setShowModal] = useState(false);

// Buka modal
<button onClick={() => setShowModal(true)}>Add</button>

// Modal component
<TransactionForm
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

### **State untuk Form:**

```javascript
const [formData, setFormData] = useState({
  description: "",
  amount: "",
  date: "",
});

// Update satu field
<input
  value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
/>;
```

---

## 8️⃣ **Redux: useSelector vs useDispatch**

### **useSelector - Ambil Data dari Redux**

```javascript
const transactions = useSelector((state) => state.transactions.items);
//                                          ↑ nama reducer ↑ property
```

### **useDispatch - Kirim Action ke Redux**

```javascript
const dispatch = useDispatch();

// Panggil action
dispatch(fetchTransactions());
dispatch(addTransaction(newData));
dispatch(deleteTransaction(id));
```

---

## 9️⃣ **Tailwind CSS Basics**

### **Layout:**

```css
flex                  → display: flex
flex-col             → flex-direction: column
justify-between      → justify-content: space-between
items-center         → align-items: center
gap-4                → gap: 1rem (16px)

grid                 → display: grid
grid-cols-3          → 3 kolom
```

### **Spacing:**

```css
p-4    → padding: 1rem (16px) semua sisi
px-4   → padding kiri-kanan
py-4   → padding atas-bawah
m-4    → margin: 1rem
mx-auto → margin kiri-kanan auto (center)
```

### **Colors:**

```css
bg-blue-500     → Background biru
text-white      → Text putih
border-2        → Border 2px
border-red-500  → Border merah
```

### **Effects:**

```css
rounded         → border-radius
shadow          → box-shadow
hover:bg-blue-600 → Background saat hover
```

### **Responsive:**

```css
md:grid-cols-2   → 2 kolom di medium screen (768px+)
lg:grid-cols-3   → 3 kolom di large screen (1024px+)
```

---

## 🔄 **Workflow Development**

### **1. Person 1 (Setup) - SUDAH SELESAI ✅**

- Install dependencies
- Setup Redux store
- Setup Router
- Buat Navbar

### **2. Person 3 & 4 (Redux Slices) - SUDAH SELESAI ✅**

- Buat transactionSlice
- Buat categorySlice
- Test Redux di DevTools

### **3. Semua Person (Pages) - SIAP DIKERJAKAN ⏳**

- Setiap orang kerjakan page masing-masing
- **TIDAK ADA CONFLICT** karena beda file!

### **4. Testing & Polish**

- Test semua fitur
- Fix bugs
- Styling polish

---

## 🐛 **Debugging Tips**

### **1. Redux tidak update?**

Buka Redux DevTools:

- Tab "State" → Lihat isi state
- Tab "Actions" → Lihat actions yang dipanggil
- Tab "Diff" → Lihat perubahan state

### **2. Component tidak re-render?**

Check:

- Apakah state/props berubah?
- Apakah menggunakan `===` untuk compare object? (harus shallow equal)

### **3. useEffect jalan terus?**

Check dependency array:

```javascript
useEffect(() => {
  // ...
}, []); // [] = hanya jalan 1x
```

Jangan lupa dependency:

```javascript
useEffect(() => {
  console.log(searchTerm);
}, [searchTerm]); // Jalan saat searchTerm berubah
```

### **4. Form tidak submit?**

Check:

```javascript
<form onSubmit={handleSubmit}>
  <button type="submit">Save</button> {/* type="submit" perlu! */}
</form>
```

---

## 📚 **Resources Belajar**

### **React:**

- React Docs: https://react.dev
- useState: https://react.dev/reference/react/useState
- useEffect: https://react.dev/reference/react/useEffect

### **Redux:**

- Redux Toolkit: https://redux-toolkit.js.org
- Redux Thunk: https://redux-toolkit.js.org/api/createAsyncThunk

### **Tailwind:**

- Tailwind Docs: https://tailwindcss.com/docs
- Cheatsheet: https://nerdcave.com/tailwind-cheat-sheet

### **React Router:**

- React Router: https://reactrouter.com

---

## ❓ **FAQ - Pertanyaan Umum**

### **Q: Kapan pakai Redux vs useState?**

**A:**

- Redux → Data yang dipakai banyak component (transactions, categories)
- useState → Data lokal component (form input, modal visibility)

### **Q: Kenapa pakai setTimeout di Redux Thunk?**

**A:** Untuk simulasi API call. Di real app, ganti dengan `fetch()` atau `axios`.

### **Q: Bagaimana cara test Redux action?**

**A:**

1. Buka Redux DevTools
2. Dispatch action
3. Lihat di tab "Actions" dan "State"

### **Q: Error "Maximum update depth exceeded"?**

**A:** useEffect dependency array salah. Check:

```javascript
// ❌ SALAH - infinite loop
useEffect(() => {
  setData(newData);
}); // Tidak ada []

// ✅ BENAR
useEffect(() => {
  setData(newData);
}, []); // Dengan dependency array
```

### **Q: Bagaimana cara membuat category dropdown?**

**A:**

```javascript
<select>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>
```

---

## 🎯 **Next Steps**

1. **Jalankan app:** `npm run dev`
2. **Buka browser:** http://localhost:5173
3. **Test navigasi** dengan klik link di Navbar
4. **Buka Redux DevTools** untuk lihat state
5. **Mulai kerjakan page masing-masing!**

---

**Good luck! 🚀**

Kalau ada pertanyaan, diskusi dengan tim atau search di dokumentasi official!
