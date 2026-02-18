// ═══════════════════════════════════════════════════════════════════════
// 📄 FILE: CategoryForm.jsx
// 👤 PERSON: Person 4
// 📝 DESKRIPSI: Modal form component untuk Add/Edit category
// 🎯 PROPS:
//    - isOpen: Boolean (show/hide modal)
//    - onClose: Function (handler untuk close modal)
//    - onSave: Function (handler untuk save data)
//    - editingCategory: Object | null (category yang diedit, null = Add mode)
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";

/**
 * 🎨 COMPONENT: CategoryForm
 * Modal form untuk menambah atau mengedit category
 *
 * @param {Object} props - Component props
 * @param {Boolean} props.isOpen - Control visibility modal
 * @param {Function} props.onClose - Callback saat modal ditutup
 * @param {Function} props.onSave - Callback saat data disave
 * @param {Object|null} props.editingCategory - Data category untuk edit mode
 */
function CategoryForm({ isOpen, onClose, onSave, editingCategory }) {
  // ─────────────────────────────────────────────
  // 🟢 LOCAL STATE dengan useState
  // ─────────────────────────────────────────────
  // categoryName: Input value untuk nama category
  // Initial value:
  // - Edit mode: ambil dari editingCategory.name
  // - Add mode: empty string
  const [categoryName, setCategoryName] = useState(editingCategory?.name || "");

  // ─────────────────────────────────────────────
  // 🔄 EFFECT: Sync state dengan editingCategory prop
  // ─────────────────────────────────────────────
  /**
   * Update categoryName ketika editingCategory berubah
   * Penting untuk memastikan form terisi dengan benar saat edit
   */
  useEffect(() => {
    if (editingCategory) {
      // Edit mode: isi dengan data category yang akan diedit
      setCategoryName(editingCategory.name);
    } else {
      // Add mode: kosongkan input
      setCategoryName("");
    }
  }, [editingCategory]);

  // ─────────────────────────────────────────────
  // 🎯 EVENT HANDLER: Submit Form
  // ─────────────────────────────────────────────
  /**
   * Handle form submission
   * Flow:
   * 1. Prevent default form behavior
   * 2. Validasi input tidak kosong
   * 3. Call onSave dengan data category
   * 4. Reset input dan close modal
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Validasi: pastikan input tidak kosong (setelah trim)
    if (categoryName.trim()) {
      // Kirim data ke parent component (CategoriesPage)
      onSave({
        name: categoryName,
        id: editingCategory?.id, // undefined jika Add mode
      });

      // Reset input dan close modal
      setCategoryName("");
      onClose();
    }
  };

  // ─────────────────────────────────────────────
  // 🚫 EARLY RETURN: Jangan render jika modal closed
  // ─────────────────────────────────────────────
  if (!isOpen) return null;

  // ─────────────────────────────────────────────
  // 🖼️ RENDER MODAL
  // ─────────────────────────────────────────────
  return (
    // Backdrop: Dark overlay di belakang modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="bg-white border-4 border-black p-6 max-w-md w-full">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            📌 MODAL HEADER
            Title berbeda tergantung mode (Add/Edit)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <h3 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-3">
          {editingCategory ? "✏️ Edit Category" : "➕ Add Category"}
        </h3>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            📌 FORM
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ─────────────────────────────────
              🔹 INPUT: Category Name
              ───────────────────────────────── */}
          <div>
            {/* Label */}
            <label className="block mb-2 font-semibold text-gray-700">
              Category Name <span className="text-red-500">*</span>
            </label>

            {/* Input Field */}
            <input
              type="text"
              required // HTML5 validation
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)} // Update state on change
              className="w-full border-2 border-gray-300 p-3 focus:border-green-500 focus:outline-none"
              placeholder="e.g., Food, Transport, Entertainment"
              autoFocus // Auto focus saat modal dibuka
            />

            {/* Help Text */}
            <p className="text-xs text-gray-500 mt-1">
              Enter a unique category name
            </p>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              📌 ACTION BUTTONS
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="flex gap-3 pt-4">
            {/* ─────────────────────────────────
                🔹 SAVE BUTTON
                Submit form dan trigger validation
                ───────────────────────────────── */}
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white px-4 py-3 font-semibold hover:bg-green-700 transition border-2 border-black"
            >
              {editingCategory ? "💾 Update" : "✅ Save"}
            </button>

            {/* ─────────────────────────────────
                🔹 CANCEL BUTTON
                Reset dan close modal tanpa save
                ───────────────────────────────── */}
            <button
              type="button" // Prevent form submission
              onClick={() => {
                setCategoryName(""); // Reset input
                onClose(); // Close modal
              }}
              className="flex-1 bg-gray-500 text-white px-4 py-3 font-semibold hover:bg-gray-600 transition border-2 border-black"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
