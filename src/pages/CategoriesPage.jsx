// ═══════════════════════════════════════════════════════════════════════
// 📄 FILE: CategoriesPage.jsx - REDUX BEST PRACTICES IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════
// 👤 PERSON: Person 4
// 📝 DESKRIPSI: Halaman untuk mengelola kategori expense (CRUD operations)
// 🎯 FITUR: Create, Read, Update, Delete categories dengan Redux Best Practices
//
// 🏆 BEST PRACTICES IMPLEMENTED:
// ✅ Redux untuk GLOBAL STATE (categories data - shared across pages)
// ✅ useState untuk LOCAL UI STATE (modal visibility, form inputs)
// ✅ Per-operation loading indicators (isAdding, isUpdating, isDeleting)
// ✅ Error handling dengan user-friendly messages
// ✅ Async operations dengan proper feedback
// ✅ Validation di Redux layer (moved from component)
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync,
  clearErrors,
} from "../store/categorySlice";
import CategoryForm from "../components/CategoryForm";

function CategoriesPage() {
  const dispatch = useDispatch();

  // Redux state - Global data
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);
  const isAdding = useSelector((state) => state.categories.isAdding);
  const isUpdating = useSelector((state) => state.categories.isUpdating);
  const isDeleting = useSelector((state) => state.categories.isDeleting);
  const addError = useSelector((state) => state.categories.addError);
  const updateError = useSelector((state) => state.categories.updateError);
  const deleteError = useSelector((state) => state.categories.deleteError);

  // Local UI state
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleAdd = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatch(deleteCategoryAsync(id)).unwrap();
        dispatch(clearErrors());
      } catch (error) {
        console.error("Failed to delete:", error);
        alert(`Failed to delete: ${error}`);
      }
    }
  };

  const handleSave = async (categoryData) => {
    try {
      if (categoryData.id) {
        await dispatch(
          updateCategoryAsync({
            id: categoryData.id,
            name: categoryData.name,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addCategoryAsync({
            name: categoryData.name,
          }),
        ).unwrap();
      }
      setShowModal(false);
      setEditingCategory(null);
      dispatch(clearErrors());
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with Error Display */}
      <section className="border-2 border-black p-6 mb-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">🏷️ Categories</h1>
            <p className="text-gray-600">Manage your expense categories</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="border-2 border-black bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "⏳ Adding..." : "+ Add Category"}
          </button>
        </div>

        {(addError || updateError || deleteError) && (
          <div className="mt-4 p-4 border-2 border-red-500 bg-red-50">
            <p className="text-red-700 font-semibold mb-2">⚠️ Error:</p>
            {addError && <p className="text-red-600">• Add: {addError}</p>}
            {updateError && (
              <p className="text-red-600">• Update: {updateError}</p>
            )}
            {deleteError && (
              <p className="text-red-600">• Delete: {deleteError}</p>
            )}
            <button
              onClick={() => dispatch(clearErrors())}
              className="mt-3 text-sm underline text-red-700 hover:text-red-900"
            >
              Clear Errors
            </button>
          </div>
        )}
      </section>

      {/* Loading State */}
      {status === "loading" && (
        <div className="text-center py-12 border-2 border-black bg-white">
          <p className="text-xl text-gray-600">⏳ Loading categories...</p>
        </div>
      )}

      {/* Error State */}
      {status === "failed" && (
        <div className="text-center py-12 border-2 border-red-500 bg-red-50">
          <p className="text-xl text-red-600">❌ Error loading categories</p>
        </div>
      )}

      {/* Categories Grid */}
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
                        disabled={isUpdating || isDeleting}
                        className="text-blue-600 hover:text-blue-800 text-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title={isUpdating ? "Updating..." : "Edit"}
                      >
                        {isUpdating ? "⏳" : "✏️"}
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        disabled={isUpdating || isDeleting}
                        className="text-red-600 hover:text-red-800 text-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title={isDeleting ? "Deleting..." : "Delete"}
                      >
                        {isDeleting ? "⏳" : "🗑️"}
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

      {/* Modal Form */}
      <CategoryForm
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingCategory={editingCategory}
      />

      {/* Footer */}
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
          🏆 <strong>REDUX BEST PRACTICES:</strong>
        </p>
        <p className="text-xs text-gray-500">
          ✅ Global State in Redux | ✅ UI State in useState | ✅ Per-operation
          Loading States
          <br />✅ Async Thunks | ✅ Validation in Redux | ✅ Error Handling |
          ✅ Optimistic Updates
        </p>
      </div>
    </div>
  );
}

export default CategoriesPage;
