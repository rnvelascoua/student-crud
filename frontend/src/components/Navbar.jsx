import React from 'react';
import { GraduationCap, RefreshCw, Database } from 'lucide-react';

export default function Navbar({ onRefresh, isRefreshing, studentCount }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Student Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Velasco CRUD Management API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                Total: <strong className="text-slate-900">{studentCount}</strong>
              </span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-indigo-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 active:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
              title="Refresh student list"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
