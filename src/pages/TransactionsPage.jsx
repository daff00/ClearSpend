import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../store/transactionSlice";
import { fetchCategories } from "../store/categorySlice";

// IMPORT: Menggunakan komponen UI kustom untuk konsistensi desain
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";

function TransactionsPage() {
  const dispatch = useDispatch();

  // REDUX STATE: Mengambil data dari store
  const transactions = useSelector((state) => state.transactions.items);
  const transactionStatus = useSelector((state) => state.transactions.status);
  const { items: categories, status: catStatus } = useSelector(
    (state) => state.categories,
  );

  // LOCAL STATE: Untuk UI dan filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // FETCHING DATA: Hanya fetch jika status 'idle' untuk mencegah request berlebih
  useEffect(() => {
    if (transactionStatus === "idle") dispatch(fetchTransactions());
    if (catStatus === "idle") dispatch(fetchCategories());
  }, [transactionStatus, catStatus, dispatch]);

  const handleSave = (formData) => {
    if (formData.id) {
      dispatch(updateTransaction(formData));
    } else {
      dispatch(addTransaction(formData));
    }
    setShowModal(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (idToDelete) {
      dispatch(deleteTransaction(idToDelete));
      setShowDeleteModal(false);
      setIdToDelete(null);
    }
  };

  // CLIENT-SIDE FILTERING: Dilakukan saat render. 
  // Perhatikan: Jika data sangat banyak (ribuan), sebaiknya filtering dilakukan di Backend.
  const filteredAndSortedTransactions = transactions
    .filter((t) => {
      const matchSearch = t.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory =
        filterCategory === "All" || t.category === filterCategory;
      return matchSearch && matchCategory;
    })
    // SORTING: Memastikan data terbaru muncul paling atas
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* HEADER SECTION */}
      <section className="flex justify-between items-center p-4 border rounded-lg bg-card">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          {/* text-muted-foreground memberikan warna abu-abu yang pas untuk deskripsi */}
          <p className="text-muted-foreground text-sm">
            Kelola semua pemasukan dan pengeluaran Anda.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTransaction(null);
            setShowModal(true);
          }}
        >
          + Add Transaction
        </Button>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section className="p-4 border rounded-lg bg-card">
        <div className="flex gap-4 items-center">
          {/* flex-1 membuat input memanjang maksimal memenuhi ruang */}
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />

          {/* RADIX SELECT: Menggunakan onValueChange, bukan onChange. 
              Value yang dikirim langsung berupa string, bukan event object. */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* TABLE SECTION: p-8 memberikan ruang nafas yang lega untuk tabel */}
      <section className="p-8 border rounded-lg bg-card shadow-sm">
        <TransactionTable
          transactions={filteredAndSortedTransactions}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </section>

      {/* MODAL FORM: 
          Penggunaan 'key' di sini SANGAT PENTING. 
          Ini memaksa React mereset state internal form (unmount & remount) 
          saat berganti antara edit data A ke data B atau ke form baru. */}
      <TransactionForm
        key={editingTransaction?.id || "new-transaction"}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTransaction(null);
        }}
        onSave={handleSave}
        editingTransaction={editingTransaction}
        categories={categories}
      />

      {/* DELETE CONFIRMATION MODAL: 
          z-[60] memastikan modal ini muncul di atas elemen apapun.
          backdrop-blur-sm memberikan efek premium pada background saat modal muncul. */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 shadow-xl border">
            <h3 className="text-xl font-bold mb-2">Hapus Transaksi?</h3>
            <p className="text-muted-foreground mb-6">
              Tindakan ini tidak dapat dibatalkan. Transaksi akan dihapus secara
              permanen dari database.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </Button>
              {/* variant="destructive" otomatis memberikan warna merah standarisasi Shadcn */}
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmDelete}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;