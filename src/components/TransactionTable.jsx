// FILE INI: Komponen tabel untuk menampilkan transaksi
// PERSON: Person 3
// KAPAN DIISI: Phase 3 - Saat mengerjakan TransactionsPage
// DIGUNAKAN DI: TransactionsPage.jsx

function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="border-4 border-orange-500 p-4">
      <h3 className="font-bold mb-4">INI TRANSACTION TABLE COMPONENT</h3>

      <div className="border-2 border-gray-300">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left border">Date</th>
              <th className="p-2 text-left border">Description</th>
              <th className="p-2 text-left border">Amount</th>
              <th className="p-2 text-left border">Category</th>
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border hover:bg-gray-50">
                  <td className="p-2 border">{transaction.date}</td>
                  <td className="p-2 border">{transaction.description}</td>
                  <td className="p-2 border">
                    Rp {transaction.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="p-2 border">{transaction.category}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-blue-600 mr-2 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border">
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  [ Tidak ada transaksi / Loading... ]
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        ⬆️ Komponen ini menerima props: transactions, onEdit, onDelete
        <br />
        TODO: Implementasi fungsi onEdit dan onDelete dari parent
      </p>
    </div>
  );
}

export default TransactionTable;
