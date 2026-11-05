import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Notification from './components/Notification';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './api/studentService';
import { ServerCrash } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [notification, setNotification] = useState(null);
  const [backendError, setBackendError] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const fetchStudentsList = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
      setBackendError(null);
      if (isManualRefresh) {
        showNotification('success', 'Student list refreshed successfully');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setBackendError(
        'Unable to connect to the Student API backend at http://localhost:8080. Please ensure the Spring Boot server is running.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentsList();
  }, [fetchStudentsList]);

  const handleSave = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedStudent) {
        // Update Existing
        await updateStudent(selectedStudent.id, formData);
        showNotification(
          'success',
          `Student "${formData.firstname} ${formData.lastname}" updated successfully!`
        );
        setSelectedStudent(null);
      } else {
        // Create New
        await createStudent(formData);
        showNotification(
          'success',
          `Student "${formData.firstname} ${formData.lastname}" registered successfully!`
        );
      }
      await fetchStudentsList();
    } catch (err) {
      console.error('Save failed:', err);
      showNotification('error', err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteStudent(id);
      showNotification('success', `Student #${id} removed successfully.`);
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
      await fetchStudentsList();
    } catch (err) {
      console.error('Delete failed:', err);
      showNotification('error', err.message || 'Failed to delete student.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleCancelEdit = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      <Notification
        notification={notification}
        onDismiss={() => setNotification(null)}
      />

      {/* Navigation Header */}
      <Navbar
        onRefresh={() => fetchStudentsList(true)}
        isRefreshing={isRefreshing}
        studentCount={students.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Backend Warning Banner if offline */}
        {backendError && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 flex items-start gap-3 shadow-xs">
            <ServerCrash className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-amber-950">Backend Connection Warning</p>
              <p className="mt-0.5 text-amber-800">{backendError}</p>
              <p className="mt-2 text-xs text-amber-700">
                Tip: Run <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">./mvnw spring-boot:run</code> inside the <code className="font-mono">student</code> folder.
              </p>
            </div>
          </div>
        )}

        {/* 2-Column Responsive Layout: Form on Left / Top, Table on Right / Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inline Form (No Modal) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <StudentForm
              selectedStudent={selectedStudent}
              onSave={handleSave}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Directory Table */}
          <div className="lg:col-span-7 xl:col-span-8">
            <StudentTable
              students={students}
              isLoading={isLoading}
              selectedStudentId={selectedStudent?.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-12 text-center text-xs text-slate-500">
        Student CRUD Application &bull; Vite + React + Tailwind CSS &bull; Powered by Spring Boot API
      </footer>
    </div>
  );
}
