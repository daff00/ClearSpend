// FILE INI: Landing Page - halaman pertama saat buka aplikasi
// PERSON: Person 1
// CARA ISI: Ganti semua text placeholder dengan konten asli, tambah gambar, styling

function LandingPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ===================  HERO SECTION =================== */}
      <section className="border border-black p-8 mb-6 min-h-[300px]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 border-b border-gray-300 pb-2">
            [ HERO SECTION ]
          </h1>
          <p className="text-gray-600 mb-4">
            Judul besar, tagline menarik tentang ClearSpend
          </p>
          <div className="border border-gray-400 inline-block p-4 mt-4">
            <button className="border border-black px-6 py-2 hover:bg-gray-100">
              [ Tombol Get Started ]
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Isi dengan welcome message, value proposition, dan CTA button
          yang menarik
        </p>
      </section>

      {/* ===================  FEATURES SECTION =================== */}
      <section className="border border-black p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-300 pb-2">
          [ FEATURES SECTION ]
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Tampilkan 3-4 fitur utama ClearSpend
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feature Card 1 */}
          <div className="border border-gray-400 p-4 min-h-[150px]">
            <h3 className="font-bold text-lg mb-2">[ Feature 1 ]</h3>
            <p className="text-sm text-gray-600">Track Income & Expenses</p>
            <p className="text-xs text-gray-400 mt-4">
              💡 Tambah icon dan deskripsi
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="border border-gray-400 p-4 min-h-[150px]">
            <h3 className="font-bold text-lg mb-2">[ Feature 2 ]</h3>
            <p className="text-sm text-gray-600">Visualize with Charts</p>
            <p className="text-xs text-gray-400 mt-4">
              💡 Tambah icon dan deskripsi
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="border border-gray-400 p-4 min-h-[150px]">
            <h3 className="font-bold text-lg mb-2">[ Feature 3 ]</h3>
            <p className="text-sm text-gray-600">Categorize Spending</p>
            <p className="text-xs text-gray-400 mt-4">
              💡 Tambah icon dan deskripsi
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Isi dengan 3-4 fitur utama, gunakan icon, dan styling yang
          menarik
        </p>
      </section>

      {/* ===================  HOW IT WORKS SECTION =================== */}
      <section className="border border-black p-8">
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-300 pb-2">
          [ HOW IT WORKS / GUIDE ]
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Panduan step-by-step cara menggunakan ClearSpend
        </p>

        <div className="space-y-4">
          <div className="border border-gray-400 p-4">
            <strong>Step 1:</strong> [ Jelaskan langkah pertama ]
          </div>
          <div className="border border-gray-400 p-4">
            <strong>Step 2:</strong> [ Jelaskan langkah kedua ]
          </div>
          <div className="border border-gray-400 p-4">
            <strong>Step 3:</strong> [ Jelaskan langkah ketiga ]
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Buat tutorial 3-5 langkah menggunakan aplikasi
        </p>
      </section>

      {/* FOOTER INFO */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 border border-gray-300">
        📄 LANDING PAGE - Dikerjakan oleh <strong>Person 1</strong> | Poin: 3pts
      </div>
    </div>
  );
}

export default LandingPage;
