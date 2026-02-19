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
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Tag, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [categoryName, setCategoryName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

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
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (idToDelete) {
      try {
        await dispatch(deleteCategoryAsync(idToDelete)).unwrap();
        dispatch(clearErrors());
      } catch (error) {
        console.error("Failed to delete:", error);
      } finally {
        setShowDeleteModal(false);
        setIdToDelete(null);
      }
    }
  };

  const handleSave = async () => {
    if (!categoryName.trim()) return;

    try {
      if (editingCategory) {
        await dispatch(
          updateCategoryAsync({
            id: editingCategory.id,
            name: categoryName,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addCategoryAsync({
            name: categoryName,
          }),
        ).unwrap();
      }
      setShowModal(false);
      setEditingCategory(null);
      setCategoryName("");
      dispatch(clearErrors());
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header with Error Display */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-sm sm:text-base bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Atur kategori transaksi untuk pelaporan yang lebih baik.
          </p>
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">
                {isAdding ? "Adding..." : "Add Category"}
              </span>
              <span className="sm:hidden">
                {isAdding ? "Adding..." : "Add"}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <label className="text-sm font-medium mb-2 block">
                Nama Kategori
              </label>
              <Input
                placeholder="e.g. Health, Education, Hobby"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
            {(addError || updateError) && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive">
                <p className="text-sm text-destructive">
                  ⚠️ {addError || updateError}
                </p>
              </div>
            )}
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
              <Button
                onClick={handleSave}
                disabled={isAdding || isUpdating || !categoryName.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isAdding || isUpdating ? "Saving..." : "Simpan Kategori"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error Banner */}
      {deleteError && (
        <div className="p-4 rounded-lg border border-destructive bg-destructive/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-destructive mb-1">
                ⚠️ Error Deleting Category
              </p>
              <p className="text-sm text-destructive/80">{deleteError}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(clearErrors())}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {status === "loading" && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            ⏳ Loading categories...
          </p>
        </div>
      )}

      {/* Error State */}
      {status === "failed" && (
        <div className="text-center py-12 px-4 rounded-lg border border-destructive bg-destructive/10">
          <p className="text-xl text-destructive">
            ❌ Error loading categories
          </p>
        </div>
      )}

      {/* Categories Grid */}
      {status === "succeeded" && (
        <div>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-16 w-16 text-cyan-500 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                No categories yet
              </p>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Category
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="group overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0">
                          <Tag className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-base sm:text-lg truncate">
                            {category.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-cyan-500"
                          onClick={() => handleEdit(category)}
                          disabled={isUpdating || isDeleting}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(category.id)}
                          disabled={isUpdating || isDeleting}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 shadow-xl border">
            <h3 className="text-xl font-bold mb-2">Hapus Kategori?</h3>
            <p className="text-muted-foreground mb-6">
              Tindakan ini tidak dapat dibatalkan. Transaksi yang sudah ada
              mungkin akan kehilangan referensi kategori ini.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDeleteModal(false);
                  setIdToDelete(null);
                }}
                disabled={isDeleting}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
