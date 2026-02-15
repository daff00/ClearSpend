# 🔀 Git Workflow - Menghindari Conflict

## 📋 **CARA KERJA TIM TANPA CONFLICT**

### **Prinsip Utama:**

> **1 Person = 1 File = Zero Conflicts!** ✅

---

## 🗂️ **File Ownership (Siapa Mengerjakan Apa)**

### **Person 1 - Foundation**

```
src/App.jsx                    ← SUDAH SELESAI
src/store/index.js             ← SUDAH SELESAI
src/components/Navbar.jsx      ← Styling saja
src/pages/LandingPage.jsx      ← ISI & STYLING
src/data/transactions.json     ← Bisa update dummy data
src/data/categories.json       ← Bisa update dummy data
```

### **Person 2 - Dashboard**

```
src/pages/Dashboard.jsx        ← ISI & STYLING
src/components/ChartCard.jsx   ← ISI & STYLING
```

### **Person 3 - Transactions**

```
src/store/transactionSlice.js            ← Sudah ada CRUD, polish saja
src/pages/TransactionsPage.jsx           ← ISI & STYLING
src/components/TransactionTable.jsx      ← ISI & STYLING
src/components/TransactionForm.jsx       ← ISI & STYLING
```

### **Person 4 - Categories**

```
src/store/categorySlice.js         ← Sudah ada CRUD, polish saja
src/pages/CategoriesPage.jsx       ← ISI & STYLING
src/components/CategoryForm.jsx    ← ISI & STYLING
```

### **Person 5 - About**

```
src/pages/AboutPage.jsx  ← ISI & STYLING
```

---

## 🚦 **Git Workflow Step-by-Step**

### **PHASE 1: Setup Awal (Person 1) - SELESAI ✅**

```bash
# Sudah selesai! Struktur folder lengkap sudah di-commit
```

---

### **PHASE 2: Individual Work (Semua Person)**

#### **Step 1: Setiap person buat branch sendiri**

```bash
# Person 1
git checkout -b feature/landing-page

# Person 2
git checkout -b feature/dashboard

# Person 3
git checkout -b feature/transactions

# Person 4
git checkout -b feature/categories

# Person 5
git checkout -b feature/about
```

#### **Step 2: Kerjakan file masing-masing**

```bash
# Edit file yang jadi tanggung jawab kamu
# Contoh: Person 2 edit Dashboard.jsx dan ChartCard.jsx
```

#### **Step 3: Commit secara berkala**

```bash
git add .
git commit -m "feat: add pie chart to dashboard"

# Commit sesering mungkin dengan pesan yang jelas!
```

#### **Step 4: Push branch ke remote**

```bash
git push origin feature/dashboard
```

---

### **PHASE 3: Testing & Merge**

#### **Step 1: Pull Request (PR)**

Setiap person buat PR dari branch mereka ke `main`:

- Person 1: `feature/landing-page` → `main`
- Person 2: `feature/dashboard` → `main`
- dst...

#### **Step 2: Code Review (Optional)**

Tim review code satu sama lain sebelum merge.

#### **Step 3: Merge**

Merge satu per satu, testing setelah setiap merge:

1. Merge Person 1 → Test
2. Merge Person 2 → Test
3. Merge Person 3 → Test
4. dst...

---

## ⚠️ **Menghindari Conflict**

### **✅ AMAN - Tidak Akan Conflict:**

```bash
# Person 2 edit Dashboard.jsx
# Person 3 edit TransactionsPage.jsx
# Person 4 edit CategoriesPage.jsx
# → BEDA FILE, TIDAK ADA CONFLICT! ✅
```

### **⚠️ HATI-HATI - Bisa Conflict:**

```bash
# Person 1 edit App.jsx
# Person 2 juga edit App.jsx
# → CONFLICT! ❌
```

**Solusi:** Person 1 finish dulu setup, baru yang lain mulai.

---

## 🔧 **Git Commands Cheat Sheet**

### **Melihat Status**

```bash
git status              # Lihat file yang berubah
git log --oneline       # Lihat history commit
git branch              # Lihat semua branch
```

### **Branch Management**

```bash
git checkout -b feature/nama    # Buat branch baru
git checkout main               # Pindah ke main
git branch -d feature/nama      # Hapus branch (sudah merge)
```

### **Saving Work**

```bash
git add .                       # Stage semua perubahan
git add src/pages/Dashboard.jsx # Stage file tertentu
git commit -m "pesan commit"    # Commit dengan pesan
git push origin feature/nama    # Push ke remote
```

### **Pulling Updates**

```bash
git pull origin main            # Pull update dari main
git fetch origin                # Fetch tanpa merge
```

### **Undo Changes**

```bash
git checkout -- file.jsx        # Undo perubahan 1 file
git reset HEAD~1                # Undo commit terakhir (keep changes)
git reset --hard HEAD~1         # Undo commit terakhir (hapus changes)
```

---

## 🚨 **Kalau Terjadi Conflict**

### **Skenario:**

```
Person 1 dan Person 2 edit file yang sama → Conflict saat merge
```

### **Cara Resolve:**

#### **Step 1: Pull latest dari main**

```bash
git checkout main
git pull origin main
git checkout feature/your-branch
git merge main
```

#### **Step 2: Git akan tanda file yang conflict**

```bash
Auto-merging src/App.jsx
CONFLICT (content): Merge conflict in src/App.jsx
```

#### **Step 3: Buka file, cari marker conflict**

```javascript
<<<<<<< HEAD
// Your changes
const myCode = 'version 1';
=======
// Their changes
const myCode = 'version 2';
>>>>>>> main
```

#### **Step 4: Edit file, pilih versi yang mau dipakai**

```javascript
// Pilih salah satu atau gabungkan
const myCode = "final version";
```

#### **Step 5: Commit resolve**

```bash
git add src/App.jsx
git commit -m "resolve conflict in App.jsx"
git push origin feature/your-branch
```

---

## 📌 **Best Practices**

### **✅ DO:**

- Commit sering dengan pesan yang jelas
- Pull dari main sebelum mulai kerja
- Test di local sebelum push
- Komunikasi dengan tim kalau mau edit shared file
- Buat branch terpisah untuk setiap feature

### **❌ DON'T:**

- Jangan edit file yang bukan tanggung jawab kamu
- Jangan commit langsung ke `main`
- Jangan push code yang error
- Jangan lupa pull update dari main
- Jangan commit file yang tidak perlu (node_modules, .env)

---

## 📝 **Commit Message Convention**

### **Format:**

```
type: subject

feat: add new feature
fix: fix bug
style: change styling
refactor: refactor code
docs: update documentation
```

### **Examples:**

```bash
git commit -m "feat: add pie chart to dashboard"
git commit -m "fix: transaction form validation"
git commit -m "style: improve navbar spacing"
git commit -m "refactor: extract table component"
git commit -m "docs: update README with setup instructions"
```

---

## 🗓️ **Timeline Recommended**

### **Week 1:**

- Day 1-2: Person 1 setup (SELESAI ✅)
- Day 3-4: Person 3 & 4 polish Redux slices

### **Week 2:**

- Day 1-5: Semua person kerjakan page masing-masing **parallel**
- Commit & push berkala

### **Week 3:**

- Day 1-2: Code review & testing
- Day 3-4: Merge semua branch
- Day 5: Final testing & polish

---

## 🎯 **Git Workflow Summary**

```
1. Person 1 setup (DONE) ✅
   └─ Push ke main

2. Setiap person buat branch
   ├─ Person 1: feature/landing-page
   ├─ Person 2: feature/dashboard
   ├─ Person 3: feature/transactions
   ├─ Person 4: feature/categories
   └─ Person 5: feature/about

3. Kerjakan di branch masing-masing
   └─ Edit file tanggung jawab sendiri
   └─ Commit + Push berkala

4. Buat Pull Request saat selesai
   └─ Review code
   └─ Merge ke main
   └─ Test!

5. DONE! 🎉
```

---

## 🆘 **Need Help?**

### **Git Commands Help:**

```bash
git --help
git commit --help
```

### **Git Tutorials:**

- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- Git Branching: https://learngitbranching.js.org/

### **Team Communication:**

- Koordinasi di group chat sebelum edit shared files
- Update progress berkala
- Ask for help kalau stuck!

---

**Remember:** Dengan struktur ini, kemungkinan conflict **sangat kecil** karena setiap orang punya file sendiri! 🎉

Good luck! 🚀
