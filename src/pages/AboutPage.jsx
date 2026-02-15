// FILE INI: About Page - credits untuk team members
// PERSON: Person 5
// CARA ISI: Styling yang menarik, tambah foto team, interactive elements

function AboutPage() {
  // TODO: Import useState untuk interactive elements (3 POIN!)
  // import { useState } from 'react';
  // const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ===================  HEADER =================== */}
      <section className="border border-black p-6 mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 border-b border-gray-300 pb-4">
          About ClearSpend
        </h1>
        <p className="text-gray-600">Our Team & Project Information</p>
      </section>

      {/* ===================  PROJECT INFO =================== */}
      <section className="border border-black p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          [ PROJECT INFO SECTION ]
        </h2>
        <div className="border border-gray-400 p-4 bg-gray-50">
          <p className="mb-2">
            <strong>Project Name:</strong> ClearSpend - Expense Tracker
          </p>
          <p className="mb-2">
            <strong>Description:</strong> [ Jelaskan project ]
          </p>
          <p className="mb-2">
            <strong>Technologies:</strong> React, Redux, Router, Chart.js,
            Tailwind
          </p>
          <p className="mb-2">
            <strong>Team Size:</strong> 5 Members
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          💡 TODO: Isi informasi lengkap tentang project
        </p>
      </section>

      {/* ===================  TEAM MEMBERS =================== */}
      <section className="border border-black p-6">
        <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-300 pb-2">
          [ TEAM MEMBERS SECTION ]
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Member Card 1 */}
          <div className="border border-gray-400 p-4 hover:bg-gray-50">
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-gray-300 border border-gray-400 mx-auto mb-2 flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-bold text-lg">Person 1</h3>
              <p className="text-sm text-gray-600">Landing Page & Setup</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-sm">
                <strong>Contribution:</strong>
              </p>
              <p className="text-sm text-gray-700">Router, Redux, Navbar</p>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              [ Ganti dengan data asli ]
            </p>
          </div>

          {/* Member Card 2 */}
          <div className="border border-gray-400 p-4 hover:bg-gray-50">
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-gray-300 border border-gray-400 mx-auto mb-2 flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-bold text-lg">Person 2</h3>
              <p className="text-sm text-gray-600">Dashboard</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-sm">
                <strong>Contribution:</strong>
              </p>
              <p className="text-sm text-gray-700">Charts, Visualization</p>
            </div>
          </div>

          {/* Member Card 3 */}
          <div className="border border-gray-400 p-4 hover:bg-gray-50">
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-gray-300 border border-gray-400 mx-auto mb-2 flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-bold text-lg">Person 3</h3>
              <p className="text-sm text-gray-600">Transactions</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-sm">
                <strong>Contribution:</strong>
              </p>
              <p className="text-sm text-gray-700">CRUD, Table, Filter</p>
            </div>
          </div>

          {/* Member Card 4 */}
          <div className="border border-gray-400 p-4 hover:bg-gray-50">
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-gray-300 border border-gray-400 mx-auto mb-2 flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-bold text-lg">Person 4</h3>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-sm">
                <strong>Contribution:</strong>
              </p>
              <p className="text-sm text-gray-700">Category Management</p>
            </div>
          </div>

          {/* Member Card 5 */}
          <div className="border border-gray-400 p-4 hover:bg-gray-50">
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-gray-300 border border-gray-400 mx-auto mb-2 flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="font-bold text-lg">Person 5</h3>
              <p className="text-sm text-gray-600">About Page</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-300">
              <p className="text-sm">
                <strong>Contribution:</strong>
              </p>
              <p className="text-sm text-gray-700">Credits, Styling</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          💡 TODO: Ganti dengan data asli team, tambah foto, implementasi
          onClick toggle dengan useState
        </p>
      </section>

      {/* ===================  FEATURES LIST =================== */}
      <section className="border border-black p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          [ FEATURES IMPLEMENTED ]
        </h2>
        <div className="border border-gray-400 p-4 bg-gray-50">
          <ul className="space-y-2">
            <li>✅ Redux State Management</li>
            <li>✅ Redux Thunk for Async Operations</li>
            <li>✅ React Router for Navigation</li>
            <li>✅ CRUD Operations</li>
            <li>✅ Search & Filter</li>
            <li>✅ Charts with Chart.js</li>
            <li>✅ Responsive Design</li>
          </ul>
        </div>
      </section>

      {/* FOOTER INFO */}
      <div className="text-center text-sm text-gray-500 mt-8 p-4 border border-gray-300">
        📄 ABOUT PAGE - Dikerjakan oleh <strong>Person 5</strong> | Poin:
        useState (3) + 1 page (3) = 6pts
      </div>
    </div>
  );
}

export default AboutPage;
