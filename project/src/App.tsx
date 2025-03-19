import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { GraduationCap, Search, BookOpen, Building2, FileText, X } from 'lucide-react';

function Dashboard() {
  const [filters, setFilters] = React.useState({
    name: '',
    section: 'All Sections',
    branch: 'All Branches',
    registration: ''
  });

  const resetFilters = () => {
    setFilters({
      name: '',
      section: 'All Sections',
      branch: 'All Branches',
      registration: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-black/40 rounded-t-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Student Search Portal</h1>
          </div>
          <p className="text-gray-400">Search and filter student records</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Name Search */}
            <div className="relative">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4" />
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Enter student name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Section Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4" />
                Section
              </label>
              <select
                value={filters.section}
                onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Sections</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </div>

            {/* Branch Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4" />
                Branch
              </label>
              <select
                value={filters.branch}
                onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All Branches</option>
                <option>Computer Science</option>
                <option>Mechanical</option>
                <option>Electrical</option>
              </select>
            </div>

            {/* Registration Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                Registration No
              </label>
              <input
                type="text"
                placeholder="Enter registration number"
                value={filters.registration}
                onChange={(e) => setFilters({ ...filters, registration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing 0 of 0 students
              </p>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Reset Filters
              </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-12 text-center text-gray-500" colSpan={4}>
                      <div className="flex flex-col items-center">
                        <Search className="w-8 h-8 text-gray-400 mb-2" />
                        <p>No students found matching your filters.</p>
                        <button
                          onClick={resetFilters}
                          className="mt-2 text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
          <SignIn routing="path" path="/" afterSignInUrl="/dashboard" />
        </div>
      } />
      <Route path="/sign-up" element={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
          <SignUp routing="path" path="/sign-up" afterSignUpUrl="/dashboard" />
        </div>
      } />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;