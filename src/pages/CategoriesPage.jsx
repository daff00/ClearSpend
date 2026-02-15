// FILE INI: Categories Page - CRUD kategori
// PERSON: Person 4
// CARA ISI: Implementasi useState + useEffect + Redux (lihat IMPLEMENTATION_GUIDE.md)

function CategoriesPage() {
  // TODO: Import hooks dan Redux
  // import { useState, useEffect } from 'react';
  // import { useDispatch, useSelector } from 'react-redux';
  // import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../store/categorySlice';

  // TODO: Setup useState untuk modal (3 POIN!)
  // const [showModal, setShowModal] = useState(false);
  // const [editingCategory, setEditingCategory] = useState(null);

  // TODO: Setup useEffect untuk fetch data (3 POIN!)
  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchCategories());
  //   }
  // }, [status, dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ===================  HEADER =================== */}
      <section className="border border-black p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>
          <div className="border border-gray-400 p-2">
            <button className="border border-black px-4 py-2 hover:bg-gray-100">
              + Add Category
            </button>
            <p className="text-xs text-gray-400 mt-1">[ Tombol buka modal ]</p>
          </div>
        </div>
      </section>

      {/* ===================  CATEGORIES GRID =================== */}
      <section className="border border-black p-6">
        <h3 className="font-bold mb-4 border-b border-gray-300 pb-2">
          [ CATEGORIES LIST/GRID ]
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Sample Category Card */}
          <div className="border border-gray-400 p-4 min-h-[100px]">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Food</h3>
              <div>
                <button className="hover:underline mr-2">✏️</button>
                <button className="hover:underline">🗑️</button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">[ Category Card ]</p>
          </div>

          {/* Placeholder Card */}
          <div className="border border-gray-300 p-4 bg-gray-50 min-h-[100px]">
            <p className="text-gray-500 text-center text-sm">
              [ Map categories dari Redux ]
            </p>
          </div>

          <div className="border border-gray-300 p-4 bg-gray-50 min-h-[100px]">
            <p className="text-gray-500 text-center text-sm">[ Category 2 ]</p>
          </div>

          <div className="border border-gray-300 p-4 bg-gray-50 min-h-[100px]">
            <p className="text-gray-500 text-center text-sm">[ Category 3 ]</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Map categories dari Redux, implementasi Edit & Delete dengan
          dispatch actions
        </p>
      </section>

      {/* MODAL PLACEHOLDER */}
      <div className="mt-6 border border-black p-4 bg-gray-50">
        <h3 className="text-xl font-bold mb-2">[ MODAL ADD/EDIT CATEGORY ]</h3>
        <p className="text-gray-600 text-sm">
          Modal akan muncul dengan useState (showModal)
        </p>
        <div className="border border-gray-400 p-3 mt-3 bg-white">
          <label className="block mb-1 text-sm font-semibold">
            Category Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2"
            placeholder="e.g., Food, Transport"
          />
          <p className="text-xs text-gray-400 mt-2">
            [ Input dengan useState ]
          </p>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 border border-gray-300">
        📄 CATEGORIES PAGE - Dikerjakan oleh <strong>Person 4</strong>
        <br />
        Poin: Redux (4) + Redux Thunk (5) + useState (3) + useEffect (3) + 1
        page (3) = <strong>18pts!</strong>
      </div>
    </div>
  );
}

export default CategoriesPage;
