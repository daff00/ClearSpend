// FILE INI: Landing Page - halaman pertama saat buka aplikasi
// PERSON: Person 1
// CARA ISI: Ganti semua text placeholder dengan konten asli, tambah gambar, styling

import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3,  Zap, Banknote } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  // radial-gradient(ellipse_200%_100%_at_bottom_left,_#4169e1,_#87ceeb)]
  return (
    <div className="bg-gray-50 flex flex-col gap-30 min-h-screen p-8">
      {/* ===================  HERO SECTION =================== */}
      <section className="bg-[radial-gradient(circle_at_center,_#4169e1,_#87ceeb)] rounded-2xl p-4 mb-2">
        <div className="text-center">``
          <h1 className="text-5xl text-white font-sans font-bold mt-8 mb-4">
            Manage Your Finances with
          </h1>
          <h1 className="text-8xl text-cyan-300 font-sans font-bold text-shadow-cyan-20 text-shadow-lg mb-6  pb-6">ClearSpend</h1>
          <p className="text-xl text-zinc-100 mt-6 mb-3">
            Clearly track your income and expenses!
            <br/>
            Easily visualize your financial data with charts and graphs.
          </p>
          <div className="inline-block p-4 mt-4 mb-8 justify-content-center">
            <button onClick={()=> navigate("/dashboard")} className="rounded-xl bg-cyan-300 bg-blur-md border border border-cyan-200 px-8 py-4 mx-5 hover:bg-gray-100">
              Get Started <ArrowRight className="inline-block h-5 w-5 ml-2" />
            </button>
            
            <button onClick={()=> navigate("/faq")} className="rounded-xl bg-cyan-100 bg-blur-md border border border-cyan-200 px-8 py-4 mx-5 hover:bg-gray-100">
              Learn More <ArrowRight className="inline-block h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
        {/* <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Isi dengan welcome message, value proposition, dan CTA button
          yang menarik
        </p> */}
      </section>

      {/* ===================  FEATURES SECTION =================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-slate-200 shadow-sm p-10 mb-6 rounded-2xl">
        {/* <h2 className="text-blue-950 text-2xl font-bold mb-6 text-center border-b border-gray-300 pb-2">
          FEATURES
        </h2> */}
        {/* <p className="text-gray-600 text-center mb-6">
          Tampilkan 3-4 fitur utama ClearSpend
        </p> */}

          {/* Feature Card 1 */}
          <div className="relative overflow-hidden bg-white border border-blue-200 border-l-4 border-l-blue-400 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/15 rounded-full blur-2xl group-hover:bg-blue-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-300">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2"> Fast and Easy </h3>
            <p className="text-sm text-gray-600">Track Income & Expenses. Simple interface for everyone.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="relative overflow-hidden bg-white border border-violet-200 border-l-4 border-l-violet-500 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-violet-400/15 rounded-full blur-2xl group-hover:bg-violet-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-violet-50 flex items-center justify-center text-violet-400">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visualize Data</h3>
            <p className="text-sm text-gray-600">See your spending patterns with interactive charts and graphs.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="relative overflow-hidden bg-white border border-purple-200 border-l-4 border-l-purple-400 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-400/15 rounded-full blur-2xl group-hover:bg-purple-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-400">
              <Banknote className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Categorize Spending</h3>
            <p className="text-sm text-gray-600">Easily categorize your income and expenses for better financial tracking.</p>
          </div>

      </section>

      {/* grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-slate-200 shadow-sm p-10 mb-6 rounded-2xl */}

      {/* ===================  HOW IT WORKS SECTION =================== */}
      <section className="bg-white border border-slate-200 p-10 mb-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-300 pb-2">
          STEP-BY-STEP GUIDE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-200 text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Choose Category</h4>
              <p className="text-muted-foreground">Chose category of your transaction.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-300 text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Add Transaction</h4>
              <p className="text-muted-foreground">Add income or expense details in the Transactions page.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-400 text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Analyze Data</h4>
              <p className="text-muted-foreground">See your financial summary visually in the Dashboard.</p>
            </div>
          </div>
        </div>

        {/* <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Buat tutorial 3-5 langkah menggunakan aplikasi
        </p> */}
      </section>

      {/* FOOTER INFO
      <div className="text-center text-sm text-gray-500 mt-8 p-4 border border-gray-300">
        📄 LANDING PAGE - Dikerjakan oleh <strong>Person 1</strong> | Poin: 3pts
      </div> */}
    </div>
  );
}

export default LandingPage;
