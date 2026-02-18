// FILE INI: Categories Page - CRUD kategori
// PERSON: Person 4
// CARA ISI: Implementasi useState + useEffect + Redux (lihat IMPLEMENTATION_GUIDE.md)

// Import Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/categorySlice";

function CategoriesPage() {
  // ═══════════════════════════════════════════════
  // REDUX HOOKS (4 POIN!)
  // ═══════════════════════════════════════════════
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);

  // ═══════════════════════════════════════════════
  // LOCAL STATE (3 POIN useState!)
  // ═══════════════════════════════════════════════
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  // ═══════════════════════════════════════════════
  // FETCH DATA saat component mount (3 POIN useEffect!)
  // ═══════════════════════════════════════════════
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // ═══════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════

  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Validation
    if (!categoryName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    // Check for duplicates (case insensitive)
    const isDuplicate = categories.some(
      (cat) =>
        cat.name.toLowerCase() === categoryName.trim().toLowerCase() &&
        cat.id !== editingCategory?.id,
    );

    if (isDuplicate) {
      alert("Category already exists");
      return;
    }

    // Dispatch Redux action
    if (editingCategory) {
      dispatch(
        updateCategory({
          id: editingCategory.id,
          name: categoryName.trim(),
        }),
      );
    } else {
      dispatch(addCategory({ name: categoryName.trim() }));
    }

    // Close modal and reset
    setShowModal(false);
    setCategoryName("");
    setEditingCategory(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoryName("");
    setEditingCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ===================  HEADER & ADD BUTTON =================== */}
      <section className="border-2 border-black p-6 mb-6 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🏷️ Categories</h1>
            <p className="text-gray-600">Manage your expense categories</p>
          </div>
          <button
            onClick={handleAdd}
            className="border-2 border-black bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition font-semibold"
          >
            + Add Category
          </button>
        </div>
      </section>

      {/* ===================  LOADING STATE =================== */}
      {status === "loading" && (
        <div className="text-center py-12 border-2 border-black bg-white">
          <p className="text-xl text-gray-600">⏳ Loading categories...</p>
        </div>
      )}

      {/* ===================  ERROR STATE =================== */}
      {status === "failed" && (
        <div className="text-center py-12 border-2 border-red-500 bg-red-50">
          <p className="text-xl text-red-600">❌ Error loading categories</p>
        </div>
      )}

      {/* ===================  CATEGORIES GRID =================== */}
      {status === "succeeded" && (
        <section className="border-2 border-black p-6 bg-white">
          <h3 className="font-bold text-xl mb-4 border-b-2 border-gray-300 pb-3">
            📋 Categories List ({categories.length})
          </h3>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 mb-4">No categories yet</p>
              <button
                onClick={handleAdd}
                className="border-2 border-black bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition font-semibold"
              >
                + Add Your First Category
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border-2 border-black p-5 bg-white hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-gray-800">
                      {category.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800 text-xl transition"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800 text-xl transition"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
                    ID: {category.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ===================  MODAL ADD/EDIT =================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-3">
              {editingCategory ? "✏️ Edit Category" : "➕ Add Category"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border-2 border-gray-300 p-3 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Food, Transport, Entertainment"
                  required
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a unique category name
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-3 font-semibold hover:bg-green-700 transition border-2 border-black"
                >
                  {editingCategory ? "💾 Update" : "✅ Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-500 text-white px-4 py-3 font-semibold hover:bg-gray-600 transition border-2 border-black"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================  FOOTER INFO =================== */}
      <div className="text-center text-sm text-gray-600 mt-8 p-4 border-2 border-gray-300 bg-gray-50">
        <p className="mb-2">
          📄 <strong>CATEGORIES PAGE</strong> - Dikerjakan oleh{" "}
          <strong>Person 4</strong>
        </p>
        <p className="text-xs">
          <strong>Poin:</strong> Redux (4) + Redux Thunk (5) + useState (3) +
          useEffect (3) + 1 page (3) ={" "}
          <strong className="text-green-600">18 POIN!</strong>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          ✅ Fully functional CRUD operations | Duplicate check | Redux state
          management
        </p>
      </div>
    </div>
  );
}

export default CategoriesPage;
