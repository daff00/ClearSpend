# 💰 ClearSpend - Expense Tracker App

Aplikasi expense tracker sederhana untuk melacak pemasukan dan pengeluaran, dibuat dengan React + Redux + Vite.

---

## 📚 **DOKUMENTASI LENGKAP**

### **🔥 Mulai Disini:**

1. **[REDUX_GUIDE.md](REDUX_GUIDE.md)** ⭐ **WAJIB BACA!**
   - Penjelasan lengkap apa itu Redux dan mengapa dipakai
   - Step-by-step membuat Redux **dengan ketik manual**
   - Penjelasan syntax baris per baris dan kegunaan setiap bagian
   - Cara menggunakan Redux di component
   - Common mistakes dan debugging tips

2. **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)**
   - Panduan implementasi per person (5 orang)
   - Code examples untuk setiap feature
   - Pembagian poin per task

3. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**
   - Struktur folder dan file lengkap
   - Penjelasan kegunaan setiap file

4. **[PANDUAN_PEMULA.md](PANDUAN_PEMULA.md)**
   - Penjelasan dasar React, Redux, hooks
   - Konsep useState, useEffect, useSelector, useDispatch

5. **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)**
   - Git workflow untuk 5 orang tanpa conflict
   - Cara branching, commit, merge

---

## 🚀 **Quick Start**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Jalankan Development Server**

```bash
npm run dev
```

Buka browser di [http://localhost:5173](http://localhost:5173)

### **3. Build untuk Production**

```bash
npm run build
```

---

## 🎯 **Grading Criteria**

| Kriteria               | Poin | Person               |
| ---------------------- | ---- | -------------------- |
| Redux                  | 4    | Person 3 & 4         |
| Redux Thunk            | 5    | Person 3 & 4         |
| useState               | 3    | Person 2, 3, 4, 5    |
| useEffect              | 3    | Person 2, 3, 4       |
| 1 Page                 | 3    | Person 1, 2, 3, 4, 5 |
| **Styling (Optional)** | +3   | Semua                |

---

## 👥 **Pembagian Tugas (5 Orang)**

| Person       | Page             | Features             | Poin |
| ------------ | ---------------- | -------------------- | ---- |
| **Person 1** | Landing + Navbar | Routing, styling     | 3    |
| **Person 2** | Dashboard        | Charts, useEffect    | 6    |
| **Person 3** | Transactions     | Redux + Thunk + CRUD | 18   |
| **Person 4** | Categories       | Redux + Thunk + CRUD | 18   |
| **Person 5** | FAQ              | useState accordion   | 6    |

---

## 📁 **Struktur Project**

```
src/
├── App.jsx              # Router utama + Redux Provider
├── main.jsx             # Entry point
├── pages/               # 5 halaman (1 person = 1 page)
│   ├── LandingPage.jsx
│   ├── Dashboard.jsx
│   ├── TransactionsPage.jsx
│   ├── CategoriesPage.jsx
│   └── FAQPage.jsx
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── TransactionTable.jsx
│   ├── TransactionForm.jsx
│   ├── CategoryForm.jsx
│   └── ChartCard.jsx
├── store/               # Redux store & slices
│   ├── index.js         # Store configuration
│   ├── transactionSlice.js
│   └── categorySlice.js
├── data/                # Dummy JSON data
│   ├── transactions.json
│   └── categories.json
└── utils/               # Helper functions
    └── formatters.js
```

---

## 🛠️ **Tech Stack**

- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Chart.js** - Data visualization
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool

---

## 📖 **Cara Belajar Redux**

### **Langkah-langkah:**

1. **Baca [REDUX_GUIDE.md](REDUX_GUIDE.md)** dari awal sampai akhir
2. **Ketik manual** semua code Redux (jangan copy-paste!)
3. **Pahami setiap baris** dengan baca penjelasan di guide
4. **Test** dengan Redux DevTools di browser
5. **Gunakan Redux** di component dengan useDispatch dan useSelector

### **Mengapa Harus Ketik Manual?**

✅ **Muscle memory** - Tangan terbiasa dengan syntax  
✅ **Understand deeply** - Paham bukan cuma hafal  
✅ **Spot errors** - Bisa debug sendiri kalau ada error  
✅ **Build confidence** - Yakin bisa bikin dari nol

---

## 🐛 **Debugging Tips**

### **Redux DevTools**

1. Install extension: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
2. Buka browser DevTools (F12)
3. Klik tab "Redux"
4. Lihat state tree, action history, dan diff

### **Common Errors**

| Error                          | Solution                                         |
| ------------------------------ | ------------------------------------------------ |
| `Cannot read property 'items'` | Cek useSelector path: `state.transactions.items` |
| `dispatch is not a function`   | Import `useDispatch` dari `react-redux`          |
| `store is not defined`         | Import `store` dan wrap dengan `<Provider>`      |
| `Reducer not found`            | Cek export di slice dan daftar di store          |

---

## 📞 **Support**

Kalau ada pertanyaan atau stuck:

1. Baca Redux Guide dengan teliti
2. Cek Redux DevTools untuk lihat state
3. Lihat console browser untuk error messages
4. Tanya teman satu tim atau instruktur

---

## ✅ **Checklist**

### **Redux Setup:**

- [ ] File [transactionSlice.js](src/store/transactionSlice.js) selesai diketik manual
- [ ] File [categorySlice.js](src/store/categorySlice.js) selesai diketik manual
- [ ] File [store/index.js](src/store/index.js) uncomment reducers
- [ ] File [App.jsx](src/App.jsx) wrap dengan `<Provider>`
- [ ] Redux DevTools menampilkan state

### **Components:**

- [ ] Landing page styled with features
- [ ] Dashboard dengan Chart.js
- [ ] TransactionsPage dengan Redux CRUD
- [ ] CategoriesPage dengan Redux CRUD
- [ ] FAQPage dengan accordion interactive
- [ ] Responsive design (mobile-friendly)
- [ ] No console errors

### **Git:**

- [ ] Setiap person punya branch sendiri
- [ ] Commit messages jelas
- [ ] No merge conflicts

---

**Good luck! 🚀**
