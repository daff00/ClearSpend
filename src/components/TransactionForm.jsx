// FILE INI: Form modal untuk add/edit transaksi
// PERSON: Person 3
// KAPAN DIISI: Phase 3 - Saat mengerjakan TransactionsPage
// DIGUNAKAN DI: TransactionsPage.jsx
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Tag } from 'lucide-react';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import { cn } from '../lib/utils';

// Import Context Icons
import { ICON_MAP } from '../store/transactionSlice';

// Skema Validasi dengan Zod
const formSchema = z.object({
  type: z.enum(['income', 'expense'], {
    required_error: 'Pilih tipe transaksi.',
  }),
  description: z.string().min(2, 'Deskripsi minimal 2 karakter.'),
  amount: z.coerce.number().positive('Jumlah harus positif.'),
  date: z.date({
    required_error: 'Pilih tanggal.',
  }),
  category: z.string({
    required_error: 'Pilih kategori.',
  }),
});

function TransactionForm({
  isOpen,
  onClose,
  onSave,
  editingTransaction,
  categories,
}) {
  // Inisialisasi React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'expense',
      description: '',
      amount: 0,
      date: new Date(),
      category: '',
    },
  });

  // Reset form saat editingTransaction berubah (Fix Bug Edit)
  React.useEffect(() => {
    if (editingTransaction) {
      form.reset({
        ...editingTransaction,
        date: new Date(editingTransaction.date),
        amount: Number(editingTransaction.amount)
      });
    } else {
      form.reset({
        type: 'expense',
        description: '',
        amount: 0,
        date: new Date(),
        category: '',
      });
    }
  }, [editingTransaction, form]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      id: editingTransaction?.id,
      // Format tanggal kembali ke string ISO untuk Redux/Database
      date: format(data.date, 'yyyy-MM-dd'),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {editingTransaction ? "Edit Transaksi" : "Tambah Transaksi"}
          </DialogTitle>
          <DialogDescription>
            {editingTransaction ? "Perbarui detail transaksi Anda." : "Catat pengeluaran atau pemasukan baru Anda."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Tipe Transaksi */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipe</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="income" /></FormControl>
                        <FormLabel className="font-normal">Income</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="expense" /></FormControl>
                        <FormLabel className="font-normal">Expense</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deskripsi */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Makan Siang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Jumlah */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel className='mb-[10px]'>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pilih tanggal</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Kategori */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>
                          <div className="flex items-center gap-2">
                            {/* [TAMBAHAN]: Render icon jika tersedia di ICON_MAP */}
                            {ICON_MAP && ICON_MAP[cat.icon] ? 
                              React.createElement(ICON_MAP[cat.icon], { className: "h-4 w-4" }) : 
                              <Tag className="h-4 w-4" />
                            }
                            {cat.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4 flex gap-2">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Batal</Button>
              <Button type="submit" className="flex-1">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionForm;