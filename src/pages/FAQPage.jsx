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
          q: "How do I start using ClearSpend for the first time?",
          a:
            "Start with this simple setup:\n" +
            "1) Open the Categories page and review the default categories.\n" +
            "2) Add your own categories if needed (Rent, Groceries, Transport).\n" +
            "3) Go to Transactions and click Add Transaction.\n" +
            "4) Choose Income or Expense, then enter amount, date, category, and a short description.\n" +
            "5) Save and return to the Dashboard to confirm totals and charts update.\n\n" +
            "Tip: Add 3–5 transactions first so the dashboard becomes meaningful quickly.",
        },
        {
          q: "Can I create my own expense categories?",
          a:
            "Yes—categories are customizable.\n" +
            "1) Go to Categories\n" +
            "2) Click Add Category\n" +
            "3) Type a clear, unique name (e.g., “Gym”, “Skincare”)\n" +
            "4) Save — the category will appear immediately when adding a transaction.\n\n" +
            "Tip: Keep categories simple at first (8–12) to avoid messy reports.",
        },
        {
          q: "How do I add a transaction correctly so reports stay clean?",
          a:
            "Use these steps for consistent records:\n" +
            "1) Pick the correct type (Income vs Expense).\n" +
            "2) Enter the amount carefully (avoid extra zeros).\n" +
            "3) Select the most accurate category.\n" +
            "4) Use the real transaction date (not the day you remember it).\n" +
            "5) Write a specific description (e.g., “Lunch - Chicken rice” instead of “Food”).\n\n" +
            "Consistency helps your charts and monthly summaries make sense.",
        },
        {
          q: "How do I fix mistakes in a transaction?",
          a:
            "No problem—just edit it.\n" +
            "1) Open Transactions\n" +
            "2) Find the incorrect item\n" +
            "3) Click Edit\n" +
            "4) Update amount/type/category/date/description\n" +
            "5) Save — the Dashboard recalculates automatically.",
        },
        {
          q: "How do I understand the Dashboard and charts?",
          a:
            "The Dashboard is a summary view:\n" +
            "• Total Income: all money received\n" +
            "• Total Expense: all money spent\n" +
            "• Balance: income minus expense\n" +
            "• Category chart: where your spending is highest\n\n" +
            "If something looks wrong, check whether a transaction was marked as Income vs Expense, or whether its category/date is correct.",
        },
      ],

      // ✅ NEW CATEGORY (replacing Payment & Billing)
      features: [
        {
          q: "What are the main features of ClearSpend?",
          a:
            "ClearSpend focuses on simple expense tracking and clear summaries.\n" +
            "Key features include:\n" +
            "• Adding income and expense transactions\n" +
            "• Creating and managing categories\n" +
            "• Viewing dashboard totals and charts\n" +
            "• Searching transactions (if implemented in your Transactions page)\n\n" +
            "As you improve the project, you can add export, backup, and budgeting tools as advanced features.",
        },
        {
          q: "How do categories help me track spending more accurately?",
          a:
            "Categories organize your spending so your dashboard can show meaningful insights.\n" +
            "To use categories well:\n" +
            "1) Create categories that match your lifestyle (Food, Transport, Bills).\n" +
            "2) Use the same category consistently for the same type of expense.\n" +
            "3) Avoid creating too many categories too early.\n\n" +
            "This makes charts clearer and helps you spot where your money goes most.",
        },
        {
          q: "Can I export my data to Excel or CSV?",
          a:
            "Export is not included by default in many learning versions.\n\n" +
            "If you want to add it later, a common approach is:\n" +
            "1) Convert your transaction list into a table format\n" +
            "2) Export as CSV (simple) or XLSX (more advanced)\n" +
            "3) Use a library like 'xlsx' for Excel exports\n\n" +
            "For now, the best focus is making your tracking and dashboard stable first.",
        },
        {
          q: "Will my data stay saved after I refresh the page?",
          a:
            "It depends on your storage setup.\n\n" +
            "• If your project only uses React state/Redux without persistence, data can reset after refresh.\n" +
            "• If you add persistence (localStorage or Firebase), your data can remain saved.\n\n" +
            "A good next step for learning is saving Redux state into localStorage.",
        },
        {
          q: "Can I customize the dashboard to show different charts?",
          a:
            "Yes, you can customize it depending on your implementation.\n" +
            "Common chart upgrades include:\n" +
            "• Spending by category (pie/doughnut chart)\n" +
            "• Income vs expense over time (line chart)\n" +
            "• Monthly totals (bar chart)\n\n" +
            "Start simple: one category chart + totals is already a strong foundation.",
        },
      ],

      security: [
        {
          q: "Where is my data stored?",
          a:
            "In a basic learning version, data is typically stored locally (Redux state or browser storage).\n\n" +
            "If you later add Firebase, you can store data in the cloud with authentication and user-based access rules.",
        },
        {
          q: "What happens if I clear my browser data?",
          a:
            "If your app stores data locally, clearing browser storage can remove saved transactions.\n\n" +
            "To prevent this, you can implement cloud backup (future feature) or export your data.",
        },
        {
          q: "Is my data shared with anyone?",
          a:
            "No. ClearSpend should not share your financial data with third parties.\n\n" +
            "Your data is only used to display your personal dashboard and transaction history.",
        },
        {
          q: "Can I use the app offline?",
          a:
            "Yes—if your data is stored locally, the app can work offline after it loads.\n\n" +
            "Cloud sync features require internet because they communicate with a server.",
        },
        {
          q: "How can cloud backup stay secure (if I add it later)?",
          a:
            "A secure cloud setup typically includes:\n" +
            "1) User authentication (login)\n" +
            "2) Encrypted storage\n" +
            "3) Security rules: each user can only access their own data\n\n" +
            "This prevents other users from reading or changing your records.",
        },
      ],

      account: [
        {
          q: "Do I need an account to use ClearSpend?",
          a:
            "Not necessarily. Many learning projects let you use the app without login.\n\n" +
            "An account is usually required only if you add multi-device sync or cloud backup later.",
        },
        {
          q: "How do I reset everything and start from zero?",
          a:
            "There are two common approaches:\n" +
            "• Delete transactions individually (safe and controlled)\n" +
            "• Clear browser storage (full reset if you store locally)\n\n" +
            "If you build a “Clear All” button, it’s the easiest option for users.",
        },
        {
          q: "Can I change a transaction category after it’s created?",
          a:
            "Yes.\n" +
            "1) Go to Transactions\n" +
            "2) Click Edit on the transaction\n" +
            "3) Change the category\n" +
            "4) Save — charts update automatically.",
        },
        {
          q: "Will new features be added in future updates?",
          a:
            "Yes. Common updates include:\n" +
            "• Export to CSV/Excel\n" +
            "• Cloud backup\n" +
            "• Multi-device sync\n" +
            "• Improved analytics\n\n" +
            "Your existing data can stay compatible if you keep consistent fields (type, amount, date, category, description).",
        },
        {
          q: "What technologies power this application?",
          a:
            "ClearSpend is built using:\n" +
            "• React for the UI\n" +
            "• Redux Toolkit/Redux for state management\n" +
            "• React Router for navigation\n" +
            "• Chart.js for charts\n" +
            "• Tailwind CSS for styling",
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
