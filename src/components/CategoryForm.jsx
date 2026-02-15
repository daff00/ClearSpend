// FILE INI: Form modal untuk add/edit kategori
// PERSON: Person 4
// KAPAN DIISI: Phase 3 - Saat mengerjakan CategoriesPage
// DIGUNAKAN DI: CategoriesPage.jsx

import { useState } from "react";

function CategoryForm({ isOpen, onClose, onSave, editingCategory }) {
  const [categoryName, setCategoryName] = useState(editingCategory?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onSave({
        name: categoryName,
        id: editingCategory?.id,
      });
      setCategoryName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg border-4 border-orange-500 min-w-[400px] mx-4">
        <h3 className="text-xl font-bold mb-4">
          {editingCategory ? "EDIT CATEGORY" : "ADD CATEGORY"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="border-2 border-purple-300 p-4 mb-4">
            <label className="block mb-2 font-semibold">Category Name</label>
            <input
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="e.g., Food, Transport, Entertainment"
            />
            <p className="text-xs text-gray-400 mt-2">
              [ Input dengan useState ]
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded flex-1 hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryName("");
                onClose();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded flex-1 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            ⬆️ onSave dispatch addCategory atau updateCategory Redux action
          </p>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
