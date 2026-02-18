// FILE INI: FAQ Page - Frequently Asked Questions
// PERSON: Person 5
// CARA ISI: Tambah FAQ items, styling accordion

import { useState } from 'react';

function FAQPage() {
  // useState untuk handle accordion open/close (3 POIN!)
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ accordion
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ Data
  const faqs = [
    {
      question: "Apa itu ClearSpend?",
      answer: "ClearSpend adalah aplikasi expense tracker yang membantu Anda melacak pengeluaran dan pemasukan dengan mudah. Aplikasi ini dibangun dengan React dan Redux untuk pembelajaran state management."
    },
    {
      question: "Bagaimana cara menambahkan transaksi?",
      answer: "Kunjungi halaman Transactions, klik tombol 'Add Transaction', lalu isi form dengan detail transaksi (tipe, jumlah, deskripsi, tanggal, dan kategori). Klik 'Save' untuk menyimpan."
    },
    {
      question: "Apakah data saya disimpan secara permanen?",
      answer: "Saat ini aplikasi menggunakan Redux untuk state management tanpa backend. Data akan hilang saat refresh halaman. Untuk menyimpan data permanen, perlu integrasi dengan database atau localStorage."
    },
    {
      question: "Bagaimana cara membuat kategori baru?",
      answer: "Pergi ke halaman Categories, klik 'Add Category', masukkan nama kategori baru, lalu simpan. Kategori ini akan tersedia saat menambahkan transaksi."
    },
    {
      question: "Apa fungsi Dashboard?",
      answer: "Dashboard menampilkan ringkasan keuangan Anda dalam bentuk angka dan grafik (chart). Anda bisa melihat total income, expenses, balance, dan visualisasi pengeluaran per kategori."
    },
    {
      question: "Bagaimana cara mengedit atau menghapus transaksi?",
      answer: "Di halaman Transactions, setiap baris memiliki button 'Edit' dan 'Delete'. Klik Edit untuk mengubah data, atau Delete untuk menghapus transaksi."
    },
    {
      question: "Teknologi apa yang digunakan?",
      answer: "Aplikasi ini dibangun dengan React 19, Redux Toolkit untuk state management, React Router untuk navigasi, Chart.js untuk visualisasi data, dan Tailwind CSS untuk styling."
    },
    {
      question: "Apakah aplikasi ini responsive?",
      answer: "Ya, aplikasi ini menggunakan Tailwind CSS dengan responsive design. Dapat diakses dari desktop maupun mobile device dengan layout yang menyesuaikan."
    },
    {
      question: "Bagaimana cara filter transaksi?",
      answer: "Di halaman Transactions, gunakan search bar untuk mencari berdasarkan deskripsi, atau pilih kategori dari dropdown filter untuk melihat transaksi spesifik."
    },
    {
      question: "Apakah bisa export data ke Excel/CSV?",
      answer: "Fitur export belum tersedia dalam versi ini. Ini bisa menjadi enhancement untuk versi mendatang dengan menambahkan library seperti xlsx atau csv-parser."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* ===================  HEADER =================== */}
      <section className="border-2 border-black p-8 mb-6 text-center bg-white">
        <h1 className="text-4xl font-bold mb-3">
          ❓ Frequently Asked Questions
        </h1>
        <p className="text-gray-600">
          Temukan jawaban untuk pertanyaan umum tentang ClearSpend
        </p>
      </section>

      {/* ===================  FAQ ACCORDION =================== */}
      <section className="border-2 border-black p-6 bg-white">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-400 overflow-hidden"
            >
              
              {/* FAQ Question - Clickable */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 hover:bg-gray-50 transition flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">
                  {index + 1}. {faq.question}
                </span>
                <span className="text-2xl text-gray-500">
                  {openFAQ === index ? '−' : '+'}
                </span>
              </button>

              {/* FAQ Answer - Expandable */}
              {openFAQ === index && (
                <div className="p-4 bg-gray-50 border-t border-gray-300">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
              
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-6 border-t-2 border-gray-300">
          <p className="text-sm text-gray-500 text-center">
            💡 Masih ada pertanyaan? Silakan hubungi tim development atau instruktur
          </p>
        </div>
      </section>

      {/* ===================  TECHNICAL INFO =================== */}
      <section className="border-2 border-black p-6 mt-6 bg-white">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
          📚 Technical Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-2 text-lg">🛠️ Tech Stack</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• React 19</li>
              <li>• Redux Toolkit + Redux Thunk</li>
              <li>• React Router DOM</li>
              <li>• Chart.js</li>
              <li>• Tailwind CSS</li>
              <li>• Vite</li>
            </ul>
          </div>

          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-2 text-lg">📦 Features</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Transaction CRUD</li>
              <li>• Category Management</li>
              <li>• Dashboard with Charts</li>
              <li>• Search & Filter</li>
              <li>• Responsive Design</li>
              <li>• Redux State Management</li>
            </ul>
          </div>

          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-2 text-lg">👥 Team</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Person 1: Landing Page</li>
              <li>• Person 2: Dashboard</li>
              <li>• Person 3: Transactions</li>
              <li>• Person 4: Categories</li>
              <li>• Person 5: FAQ Page</li>
            </ul>
          </div>

          <div className="border border-gray-400 p-4">
            <h3 className="font-bold mb-2 text-lg">🎯 Learning Goals</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Redux & Redux Thunk</li>
              <li>• React Hooks (useState, useEffect)</li>
              <li>• Component Architecture</li>
              <li>• State Management</li>
              <li>• Data Visualization</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Code Implementation Note */}
      <div className="mt-6 p-4 bg-gray-100 border border-gray-400 rounded">
        <p className="text-xs text-gray-600">
          <strong>💡 Implementation Note:</strong> FAQ Page ini menggunakan <code className="bg-white px-1">useState</code> untuk 
          handle accordion state (expand/collapse). Setiap FAQ item adalah component yang clickable, dan state 
          menentukan apakah jawaban ditampilkan atau tidak.
        </p>
      </div>

    </div>
  );
}

export default FAQPage;
