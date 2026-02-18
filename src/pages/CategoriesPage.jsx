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

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Hapus kategori ini? Transaksi yang sudah ada mungkin akan kehilangan referensi kategori."
      )
    ) {
      try {
        await dispatch(deleteCategoryAsync(id)).unwrap();
        dispatch(clearErrors());
      } catch (error) {
        console.error("Failed to delete:", error);
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
          })
        ).unwrap();
      } else {
        await dispatch(
          addCategoryAsync({
            name: categoryName,
          })
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
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-6">
      {/* Header with Error Display */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Atur kategori transaksi untuk pelaporan yang lebih baik.
          </p>
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} disabled={isAdding}>
              <Plus className="mr-2 h-4 w-4" />
              {isAdding ? "Adding..." : "Add Category"}
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
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button
                onClick={handleSave}
                disabled={isAdding || isUpdating || !categoryName.trim()}
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
              <Tag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                No categories yet
              </p>
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Category
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Tag className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {category.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            ID: {category.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-blue-600"
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
    </div>
  );
}

export default CategoriesPage;
