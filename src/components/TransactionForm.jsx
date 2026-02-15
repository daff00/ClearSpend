// FILE INI: Form modal untuk add/edit transaksi
// PERSON: Person 3
// KAPAN DIISI: Phase 3 - Saat mengerjakan TransactionsPage
// DIGUNAKAN DI: TransactionsPage.jsx

import { useState } from "react";

function TransactionForm({
  isOpen,
  onClose,
  onSave,
  editingTransaction,
  categories,
}) {
  const [formData, setFormData] = useState({
    type: editingTransaction?.type || "expense",
    description: editingTransaction?.description || "",
    amount: editingTransaction?.amount || "",
    date: editingTransaction?.date || new Date().toISOString().split("T")[0],
    category: editingTransaction?.category || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingTransaction?.id,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg border-4 border-red-500 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">
          {editingTransaction ? "EDIT TRANSACTION" : "ADD TRANSACTION"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div className="border-2 border-purple-300 p-3">
            <label className="block mb-2 font-semibold">Transaction Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mr-2"
                />
                Income
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mr-2"
                />
                Expense
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="border-2 border-purple-300 p-3">
            <label className="block mb-2 font-semibold">Description</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="e.g., Dinner with friends"
            />
          </div>

          {/* Amount */}
          <div className="border-2 border-purple-300 p-3">
            <label className="block mb-2 font-semibold">Amount (Rp)</label>
            <input
              type="number"
              required
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full border p-2 rounded"
              placeholder="0"
              min="0"
              step="1"
            />
          </div>

          {/* Date */}
          <div className="border-2 border-purple-300 p-3">
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Category */}
          <div className="border-2 border-purple-300 p-3">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded flex-1 hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded flex-1 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          ⬆️ Form dengan useState untuk setiap field. onSave dispatch Redux
          action
        </p>
      </div>
    </div>
  );
}

export default TransactionForm;
