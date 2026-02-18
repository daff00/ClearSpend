// FILE INI: Transactions Page - CRUD transaksi dengan tabel
// PERSON: Person 3

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } from '../store/transactionSlice';
import { fetchCategories } from '../store/categorySlice'; 

import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";

function TransactionsPage() {
  const dispatch = useDispatch();
  
  const transactions = useSelector((state) => state.transactions.items);
  const transactionStatus = useSelector((state) => state.transactions.status);
  const { items: categories, status: catStatus } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // [TAMBAHAN]: State untuk modal konfirmasi hapus kustom
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    if (transactionStatus === 'idle') {
      dispatch(fetchTransactions());
    }
    if (catStatus === 'idle') {
      dispatch(fetchCategories());
    }
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

  // [MODIFIKASI]: Mengganti alert confirm dengan modal kustom
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

  // Logika Filter & Sorting
  const filteredAndSortedTransactions = transactions
    .filter((t) => {
      const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = filterCategory === "All" || t.category === filterCategory;
      return matchSearch && matchCategory;
    })
    // [TAMBAHAN]: Logic sorting dari tanggal terbaru ke terlama
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <section className="border border-black p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <button 
            onClick={() => { setEditingTransaction(null); setShowModal(true); }}
            className="border border-black px-4 py-2 hover:bg-gray-100 bg-white"
          >
            + Add Transaction
          </button>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="border border-black p-4 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full border border-gray-300 p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            className="border border-gray-300 p-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-black p-4">
        <TransactionTable 
          transactions={filteredAndSortedTransactions} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
        />
      </section>

      {/* MODAL TRANSACTION */}
      {/* [MODIFIKASI]: Penambahan 'key' agar form mereset otomatis saat ganti transaksi yang diedit (Fix Bug) */}
      <TransactionForm 
        key={editingTransaction?.id || 'new-transaction'}
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingTransaction(null); }}
        onSave={handleSave}
        editingTransaction={editingTransaction}
        categories={categories}
      />

      {/* [TAMBAHAN]: Modal Konfirmasi Hapus Kustom */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 border-2 border-red-500">
            <h3 className="text-xl font-bold mb-2">Hapus Transaksi?</h3>
            <p className="text-gray-600 mb-6">
              Tindakan ini tidak dapat dibatalkan. Transaksi akan dihapus permanen.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsPage;