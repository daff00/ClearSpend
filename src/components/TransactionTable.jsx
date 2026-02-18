// FILE INI: Komponen tabel untuk menampilkan transaksi
// Import komponen UI dari table.jsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./ui/table";
import { cn } from "@/lib/utils"; // Pastikan utilitas 'cn' diimport untuk class kondisional

function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="">
      <h3 className="text-2xl font-bold mb-4">Transactions List</h3>

      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => {
                // LOGIKA: Menentukan apakah ini pengeluaran atau pemasukan
                // Catatan: Pastikan di database/store Anda memiliki field 'type' atau pembeda lainnya.
                const isExpense = transaction.type === "expense";
                const isIncome = transaction.type === "income";

                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>

                    {/* CELL AMOUNT: Menggunakan class kondisional untuk warna */}
                    <TableCell
                      className={cn(
                        "font-bold",
                        isExpense && "text-red-600",
                        isIncome && "text-green-600"
                      )}
                    >
                      {/* LOGIKA: Menambahkan simbol +/- di depan nominal */}
                      {isExpense ? "- " : isIncome ? "+ " : ""}
                      Rp {transaction.amount.toLocaleString("id-ID")}
                    </TableCell>

                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => onEdit(transaction)}
                        className="text-blue-600 mr-3 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500"
                >
                  [ Tidak ada transaksi / Loading... ]
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TransactionTable;