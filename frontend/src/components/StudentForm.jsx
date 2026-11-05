import React, { useState, useEffect } from 'react';
import { UserPlus, Edit3, X, Save, RotateCcw, AlertCircle } from 'lucide-react';

export default function StudentForm({
  selectedStudent,
  onSave,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        firstname: selectedStudent.firstname || '',
        lastname: selectedStudent.lastname || '',
        course: selectedStudent.course || '',
        section: selectedStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleReset = () => {
    if (selectedStudent) {
      onCancelEdit();
    } else {
      setFormData({ firstname: '', lastname: '', course: '', section: '' });
      setErrors({});
    }
  };

  const isEditing = Boolean(selectedStudent);

  return (
    <div
      id="student-form-card"
      className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
        isEditing
          ? 'border-amber-300 ring-2 ring-amber-400/20'
          : 'border-slate-200'
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-4 flex items-center justify-between border-b ${
          isEditing ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50/70 border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isEditing ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            {isEditing ? <Edit3 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              {isEditing ? `Edit Student (ID: ${selectedStudent.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Update student information and save changes'
                : 'Fill in details to register a new student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs font-medium text-amber-700 bg-amber-100/80 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            title="Cancel editing mode"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="e.g. Juan"
              value={formData.firstname}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all ${
                errors.firstname
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            {errors.firstname && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.firstname}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="e.g. Dela Cruz"
              value={formData.lastname}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all ${
                errors.lastname
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            {errors.lastname && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.lastname}
              </p>
            )}
          </div>
        </div>

        {/* Course & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="course"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="course"
              name="course"
              placeholder="e.g. BSIT or BSCS"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all ${
                errors.course
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.course}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="section"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="section"
              name="section"
              placeholder="e.g. 3A or 3B"
              value={formData.section}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all ${
                errors.section
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="order-2 sm:order-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isEditing ? 'Cancel Edit' : 'Clear Form'}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`order-1 sm:order-2 px-5 py-2 text-sm font-semibold rounded-lg text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 focus:ring-2 focus:ring-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          >
            <Save className="w-4 h-4" />
            {isSubmitting
              ? isEditing
                ? 'Saving Changes...'
                : 'Adding Student...'
              : isEditing
              ? 'Update Student'
              : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
}
