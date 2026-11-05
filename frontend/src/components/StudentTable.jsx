import React, { useState } from 'react';
import {
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
  Users,
  GraduationCap,
} from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  selectedStudentId,
  onEdit,
  onDelete,
  deletingId,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Filter students based on search term
  const filteredStudents = (students || []).filter((s) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const fullName = `${s.firstname || ''} ${s.lastname || ''}`.toLowerCase();
    const course = (s.course || '').toLowerCase();
    const section = (s.section || '').toLowerCase();
    const id = String(s.id || '');
    return (
      fullName.includes(term) ||
      course.includes(term) ||
      section.includes(term) ||
      id.includes(term)
    );
  });

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDeleteId(null);
    onDelete(id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Student Directory</h2>
            <p className="text-xs text-slate-500">
              Showing {filteredStudents.length} of {students.length} students
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, course, section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-900 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4 w-16">ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Course</th>
              <th className="py-3.5 px-4">Section</th>
              <th className="py-3.5 px-4 text-right w-48">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              // Loading State Skeleton
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 px-4">
                    <div className="h-4 bg-slate-200 rounded-sm w-8"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-slate-200 rounded-sm w-36 mb-1"></div>
                    <div className="h-3 bg-slate-100 rounded-sm w-20"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-6 bg-slate-200 rounded-full w-14"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-8 bg-slate-200 rounded-lg w-24 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : filteredStudents.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {searchTerm ? 'No matching students found' : 'No students recorded yet'}
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm">
                      {searchTerm
                        ? `Try adjusting your query "${searchTerm}" or clear the search.`
                        : 'Use the form above to add your first student record to the database.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              filteredStudents.map((student) => {
                const isSelected = selectedStudentId === student.id;
                const isDeleting = deletingId === student.id;
                const isConfirming = confirmDeleteId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-amber-50/60 font-medium'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      #{student.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900">
                        {student.firstname} {student.lastname}
                      </div>
                      <div className="text-xs text-slate-400">
                        {student.course} - {student.section}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                        {student.course}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {student.section}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isConfirming ? (
                        // Inline confirmation (strictly no modal)
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <span className="text-xs font-medium text-rose-600 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Sure?
                          </span>
                          <button
                            onClick={() => handleConfirmDelete(student.id)}
                            disabled={isDeleting}
                            className="px-2.5 py-1 text-xs font-semibold bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
                          >
                            {isDeleting ? '...' : 'Yes, Delete'}
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            disabled={isDeleting}
                            className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        // Standard Edit & Delete Buttons
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            onClick={() => {
                              onEdit(student);
                              const card = document.getElementById('student-form-card');
                              if (card) card.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`p-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-indigo-600'
                            }`}
                            title="Edit student"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteClick(student.id)}
                            disabled={isDeleting}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            title="Delete student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
