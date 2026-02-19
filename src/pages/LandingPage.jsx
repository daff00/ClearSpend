// FILE INI: Landing Page - halaman pertama saat buka aplikasi
// PERSON: Person 1
// CARA ISI: Ganti semua text placeholder dengan konten asli, tambah gambar, styling

import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3,  Zap, Banknote } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  // radial-gradient(ellipse_200%_100%_at_bottom_left,_#4169e1,_#87ceeb)]
  return (
    <div className="bg-gray-50 flex flex-col gap-20 min-h-screen p-8  ">
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
            <button onClick={()=> navigate("/dashboard")} className="rounded-xl bg-cyan-300 bg-blur-md border border-cyan-200 px-8 py-4 mx-5 hover:bg-gray-100">
              Get Started <ArrowRight className="inline-block h-5 w-5 ml-2" />
            </button>
            
            <button onClick={()=> navigate("/faq")} className="rounded-xl bg-cyan-100 bg-blur-md border border-cyan-200 px-8 py-4 mx-5 hover:bg-gray-100">
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
          <div className="relative overflow-hidden bg-white border border-cyan-200 border-l-4 border-l-cyan-400 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/15 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-300">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-cyan-500 font-bold text-lg mt-2 mb-2"> Fast and Easy </h3>
            <p className="text-sm text-gray-600">Track Income & Expenses. Simple interface for everyone.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="relative overflow-hidden bg-white border border-sky-200 border-l-4 border-l-sky-500 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-sky-400/15 rounded-full blur-2xl group-hover:bg-sky-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center text-sky-300">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-sky-500 font-bold text-lg mt-2 mb-2">Visualize Data</h3>
            <p className="text-sm text-gray-600">See your spending patterns with interactive charts and graphs.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="relative overflow-hidden bg-white border border-blue-200 border-l-4 border-l-blue-400 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/15 rounded-full blur-2xl group-hover:bg-blue-400/25 transition-all duration-300" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-300">
              <Banknote className="h-6 w-6" />
            </div>
            <h3 className="text-blue-500 font-bold text-lg mt-2 mb-2">Categorize Spending</h3>
            <p className="text-sm text-gray-600">Easily categorize your income and expenses for better financial tracking.</p>
          </div>

      </section>

      <section className="bg-white border border-slate-200 p-10 mb-6 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 border-b border-slate-100 pb-3 text-center">
          STEP-BY-STEP GUIDE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* step 1 add cathegory */}
          <div className="bg-gradient-to-r from-white to-indigo-500/10 gap-4 border-r border-gray-200 p-8 rounded-lg shadow-sm">
            <div className="text-5xl font-black text-transparent bg-clip-text
                  bg-gradient-to-br from-blue-300 to-blue-200 mb-3 leading-none">
                    01
            </div>
            <button onClick={()=> navigate("/categories")} 
            className="rounded-lg bg-blue-200 bg-blur-md border border-cyan-200 shadow-sm px-3 py-2 hover:bg-gray-100 font-medium text-sky-900">
              Add Category <ArrowRight className="inline-block h-4 w-4 ml-1" /> 
            </button>  
            <div>

              <p className="mt-2 text-muted-foreground">Add category of your transaction if it doesn't exist yet.</p>
            </div>
          </div>

          {/* step 2 add transaction */}
          <div className="bg-gradient-to-r from-white to-indigo-500/10 gap-4 border border-gray-200 p-8 rounded-lg shadow-sm">
            <div className="text-5xl font-black text-transparent bg-clip-text
                  bg-gradient-to-br from-blue-300 to-blue-200 mb-3 leading-none">
            02
            </div>
            <button onClick={()=> navigate("/transactions")} 
            className="rounded-lg bg-blue-200 bg-blur-md border border-cyan-200 shadow-sm px-3 py-2 hover:bg-gray-100 font-medium text-sky-900">
              Add Transaction <ArrowRight className="inline-block h-4 w-4 ml-1" /> 
            </button>              
            <div>

              <p className="mt-2 text-muted-foreground">Add income or expense details in the Transactions page.</p>
            </div>
          </div>

          {/* step 3 analyze data */}
          <div className="bg-gradient-to-r from-white to-indigo-500/10 gap-4 border border-gray-200 p-8 rounded-lg shadow-sm">
            <div className="text-5xl font-black text-transparent bg-clip-text
                  bg-gradient-to-br from-blue-300 to-blue-200 mb-3 leading-none">
              03
            </div>
            <button onClick={()=> navigate("/dashboard")} 
            className="rounded-lg bg-blue-200 bg-blur-md border border-cyan-200 shadow-sm px-3 py-2 hover:bg-gray-100 font-medium text-sky-900">
              Analyze Data <ArrowRight className="inline-block h-4 w-4 ml-1" /> 
            </button>              
            <div>
              <p className="mt-2 text-muted-foreground">See your financial summary visually in the Dashboard.</p>
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
