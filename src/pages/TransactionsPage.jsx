// FILE INI: Transactions Page - CRUD transaksi dengan tabel
// PERSON: Person 3
// CARA ISI: Implementasi useState + useEffect + Redux (lihat IMPLEMENTATION_GUIDE.md)
// Import Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscations, addTransaction, updateTransaction, deleteTransaction } from '../store/transactionSlice';

function TransactionsPage() {
  // TODO: Setup useState untuk local state (3 POIN!)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // TODO: Setup useEffect untuk fetch data (3 POIN!)
  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchTransactions());
  //   }
  // }, [status, dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ===================  HEADER & ADD BUTTON =================== */}
      <section className="border border-black p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <div className="border border-gray-400 p-2">
            <button className="border border-black px-4 py-2 hover:bg-gray-100">
              + Add Transaction
            </button>
            <p className="text-xs text-gray-400 mt-1">[ Tombol buka modal ]</p>
          </div>
        </div>
      </section>

      {/* ===================  SEARCH & FILTER =================== */}
      <section className="border border-black p-4 mb-6">
        <h3 className="font-bold mb-3 border-b border-gray-300 pb-2">
          [ SEARCH & FILTER SECTION ]
        </h3>
        <div className="flex gap-4">
          <div className="border border-gray-400 p-3 flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full border border-gray-300 p-2"
            />
            <p className="text-xs text-gray-400 mt-1">
              [ Search dengan useState ]
            </p>
          </div>

          <div className="border border-gray-400 p-3">
            <select className="border border-gray-300 p-2">
              <option>All Categories</option>
              <option>Food</option>
              <option>Rent</option>
              <option>Salary</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              [ Filter dengan useState ]
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          💡 TODO: Implementasi search & filter dengan useState + filter array
        </p>
      </section>

      {/* ===================  TRANSACTIONS TABLE =================== */}
      <section className="border border-black p-4">
        <h3 className="font-bold mb-4 border-b border-gray-300 pb-2">
          [ TRANSACTIONS TABLE ]
        </h3>

        <div className="border border-gray-400">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left border-b border-gray-400">Date</th>
                <th className="p-2 text-left border-b border-gray-400">
                  Description
                </th>
                <th className="p-2 text-left border-b border-gray-400">
                  Amount
                </th>
                <th className="p-2 text-left border-b border-gray-400">
                  Category
                </th>
                <th className="p-2 text-left border-b border-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2">2026-02-15</td>
                <td className="p-2">Sample Transaction</td>
                <td className="p-2">Rp 100.000</td>
                <td className="p-2">Food</td>
                <td className="p-2">
                  <button className="text-sm hover:underline mr-2">Edit</button>
                  <button className="text-sm hover:underline">Delete</button>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  [ Data dari Redux transactions.map() ]
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          💡 TODO: Map data dari Redux, implementasi Edit & Delete dengan
          dispatch actions
        </p>
      </section>

      {/* MODAL PLACEHOLDER */}
      <div className="mt-6 border border-black p-4 bg-gray-50">
        <h3 className="text-xl font-bold mb-2">[ MODAL ADD/EDIT ]</h3>
        <p className="text-gray-600 text-sm">
          Modal akan muncul dengan useState (showModal)
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Form fields: type, description, amount, date, category
        </p>
      </div>

      {/* FOOTER INFO */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 border border-gray-300">
        📄 TRANSACTIONS PAGE - Dikerjakan oleh <strong>Person 3</strong>
        <br />
        Poin: Redux (4) + Redux Thunk (5) + useState (3) + useEffect (3) + 1
        page (3) = <strong>18pts!</strong>
      </div>
    </div>
  );
}

export default TransactionsPage;
