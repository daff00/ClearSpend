// FAQPage.jsx
// Beginner-friendly FAQ page using React + Tailwind CSS
// Features (unchanged):
// ✅ Category tabs (General / Features / Security / Account)
// ✅ Search within the selected category
// ✅ Accordion (click a question to open/close the answer)
// ✅ Contact form UI (no backend submission yet)

import { useMemo, useState } from "react";

export default function FAQPage() {
  /* ===============================
     1) CATEGORIES (Top buttons)
     - Replaced "Payment & Billing" with "Features & Usage"
  =============================== */
  const categories = useMemo(
    () => [
      { id: "general", label: "General Question", icon: "💡" },
      { id: "features", label: "Features & Usage", icon: "🧩" }, // ✅ replaced
      { id: "security", label: "Safety & Security", icon: "🛡️" },
      { id: "account", label: "Account & Update", icon: "👤" },
    ],
    []
  );

  /* ===============================
     2) FAQ DATA (Questions + Answers)
     - Updated questions that used to be in "billing" into the new "features" category
     - Everything else stays the same
  =============================== */
  const faqData = useMemo(
    () => ({
        general: [
          {
            q: "What is ClearSpend and how does it help me?",
            a:
              "ClearSpend is a personal finance tracker that helps you understand where your money goes. " +
              "Instead of guessing your spending, you record income and expenses and the app summarizes everything automatically.\n\n" +
              "By consistently recording transactions, you can:\n" +
              "• See how much money you actually spend each month\n" +
              "• Identify unnecessary spending habits\n" +
              "• Plan savings more realistically\n" +
              "• Avoid running out of money before the end of the month\n\n" +
              "The goal is simple: clarity. When you clearly see your financial behavior, better decisions become easier."
          },
          {
            q: "Who should use this app?",
            a:
              "ClearSpend is designed for everyday people — not accountants. " +
              "Students, workers, freelancers, or families can all use it to monitor their daily spending.\n\n" +
              "If you ever asked yourself:\n" +
              "“Where did my money go?”\n" +
              "then this app is made for you."
          },
          {
            q: "How often should I record transactions?",
            a:
              "For best results, record transactions as soon as they happen. " +
              "Daily tracking keeps your financial overview accurate and prevents forgotten expenses.\n\n" +
              "If you prefer, you can also update it once per day at night — consistency matters more than timing."
          },
          {
            q: "Do I need financial knowledge to use ClearSpend?",
            a:
              "No financial or accounting knowledge is required. " +
              "You only choose whether the money is income or expense, enter the amount, and select a category.\n\n" +
              "The app automatically calculates totals, balance, and summaries for you."
          },
          {
            q: "What makes ClearSpend different from notes or spreadsheets?",
            a:
              "Unlike manual notes or spreadsheets, ClearSpend automatically organizes and analyzes your data. " +
              "You don't need formulas, calculations, or formatting.\n\n" +
              "You simply enter transactions — the app turns them into meaningful insights."
          }
        ],


      // ✅ NEW CATEGORY (replacing Payment & Billing)
          features: [
      {
        q: "How do I start tracking my expenses?",
        a:
          "Start with three simple steps:\n\n" +
          "1. Add or review categories (Food, Transport, Bills, etc.)\n" +
          "2. Record your first transaction\n" +
          "3. Check your dashboard summary\n\n" +
          "After adding a few transactions, the dashboard will begin showing useful information about your spending habits."
      },
      {
        q: "Can I organize my spending based on my lifestyle?",
        a:
          "Yes. You can create your own categories that match your real life. " +
          "For example: Coffee, Online Shopping, Pets, Subscriptions, or Travel.\n\n" +
          "Using familiar categories helps you understand your financial behavior more clearly."
      },
      {
        q: "What happens when I edit or delete a transaction?",
        a:
          "The dashboard updates instantly. " +
          "Your totals, balance, and charts automatically recalculate to reflect the change.\n\n" +
          "You never need to manually fix numbers."
      },
      {
        q: "How do I understand the dashboard?",
        a:
          "The dashboard is your financial summary:\n\n" +
          "• Balance = Income minus Expenses\n" +
          "• Category chart = Where most money goes\n" +
          "• Totals = Overall financial activity\n\n" +
          "If something looks incorrect, simply review your transactions — the dashboard always reflects your records."
      },
      {
        q: "What is the best way to keep my records accurate?",
        a:
          "Be consistent. Small habits create reliable data:\n\n" +
          "• Record transactions daily\n" +
          "• Use clear categories\n" +
          "• Enter correct dates\n\n" +
          "Accurate input leads to accurate financial insights."
      }
    ],

          security: [
      {
        q: "Is my financial information safe?",
        a:
          "Yes. Your financial data is only used to display your personal records inside the application. " +
          "The app does not sell or share your financial behavior with third parties."
      },
      {
        q: "Can other people see my spending data?",
        a:
          "No. Your data is private and only accessible on the device or account you use."
      },
      {
        q: "What happens if I clear browser or app storage?",
        a:
          "Clearing storage may remove locally saved data. " +
          "This is similar to uninstalling an app that stores files on your device."
      },
      {
        q: "Can I use ClearSpend without internet?",
        a:
          "Yes. Most tracking features work offline after the app loads. " +
          "Internet is only required for future sync or backup features."
      },
      {
        q: "Why does privacy matter in a finance app?",
        a:
          "Your spending habits describe your lifestyle. " +
          "Protecting that information ensures your personal behavior and preferences remain confidential."
      }
    ],

          account: [
      {
        q: "Do I need an account to use the app?",
        a:
          "No account is required for basic usage. " +
          "You can immediately start recording transactions and managing your spending."
      },
      {
        q: "How can I start fresh and reset everything?",
        a:
          "You can delete transactions individually or clear all stored data to begin from zero. " +
          "This is useful when starting a new month or reorganizing categories."
      },
      {
        q: "Will the app continue to improve?",
        a:
          "Yes. Updates may include new analytics, better tracking tools, and improved financial insights " +
          "while keeping your existing records usable."
      },
      {
        q: "How can I get the most benefit from the app long-term?",
        a:
          "Treat ClearSpend like a daily habit, not a monthly task. " +
          "The more consistent you are, the clearer your financial picture becomes."
      },
      ],
    }),
    []
  );

  /* ===============================
     3) STATE (useState)
  =============================== */
  const [activeCat, setActiveCat] = useState("general");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  /* ===============================
     4) FILTER QUESTIONS (within selected category)
  =============================== */
  const items = useMemo(() => {
    const list = faqData[activeCat] || [];
    const q = (search || "").trim().toLowerCase();
    if (!q) return list;

    return list.filter(
      (x) => x.q.toLowerCase().includes(q) || x.a.toLowerCase().includes(q)
    );
  }, [faqData, activeCat, search]);

  /* ===============================
     5) ACCORDION TOGGLE
  =============================== */
  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ===== Top header ===== */}
      <div  className="bg-[radial-gradient(ellipse_100%100%_at_bottom_left,#4169e1,_#87ceeb)] rounded-2xl p-4 mb-2">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-28 text-center">
          <h1 className="text-white text-shadow-black-500 text-shadow-xl text-3xl md:text-4xl font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Choose a category, search a topic, then click a question to see a step-by-step answer.
          </p>

          {/* Search input */}
          <div className="mt-6 max-w-xl mx-auto">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenIndex(null); // close accordion while searching
                }}
                placeholder="Search questions..."
                className="w-full rounded-lg bg-white/20 text-white placeholder:text-white/80 px-4 py-3 outline-none border border-white/30 focus:bg-white/25"
              />
              {search.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setOpenIndex(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-sm"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main card area ===== */}
      <div className="-mt-20 max-w-5xl mx-auto px-6 pb-16 relative z-10">
        {/* Category cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const active = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCat(cat.id);
                  setOpenIndex(null);
                  setSearch(""); // same behavior as before: reset search on category change
                }}
                className={[
                  "rounded-xl bg-white shadow-sm border transition p-4 text-left",
                  active
                    ? "border-blue-400 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300",
                ].join(" ")}
              >
                <div className="text-2xl">{cat.icon}</div>
                <div className="mt-2 text-sm font-semibold text-gray-800">
                  {cat.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Accordion list */}
        <div className="mt-6 space-y-4">
          {items.map((faq, idx) => {
            const open = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-gray-700 font-medium">{faq.q}</span>

                  <span
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center border transition",
                      open
                        ? "bg-gray-100 border-gray-300"
                        : "bg-blue-400 border-blue-400",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-sm transition-transform",
                        open ? "text-gray-700 rotate-180" : "text-white rotate-0",
                      ].join(" ")}
                    >
                      ˅
                    </span>
                  </span>
                </button>

                {open && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-sm text-gray-600">
              No questions found for “{search}”.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
