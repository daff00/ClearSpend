// FILE INI: Komponen tabel untuk menampilkan transaksi
// PERSON: Person 3
// KAPAN DIISI: Phase 3 - Saat mengerjakan TransactionsPage
// DIGUNAKAN DI: TransactionsPage.jsx

// [TAMBAHAN]: Import komponen UI dari table.jsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./ui/table";

function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="border-4 border-orange-500 p-4">
      <h3 className="font-bold mb-4">INI TRANSACTION TABLE COMPONENT</h3>

      <div className="border-2 border-gray-300">
        {/* [MODIFIKASI]: Mengganti table standar dengan komponen UI table.jsx */}
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
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                  [ Tidak ada transaksi / Loading... ]
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        ⬆️ Sekarang menggunakan komponen dari table.jsx
      </p>
    </div>
  );
}

export default TransactionTable;