# Student CRUD Frontend (Vite + React + Tailwind CSS)

Frontend application for the Student Management CRUD API built with Vite, React 19, and Tailwind CSS.

## 🚀 Getting Started

### 1. Prerequisites
Ensure the Spring Boot backend in `student/` is running on `http://localhost:8080`.

### 2. Run the Development Server
Navigate to the `frontend/` directory and start Vite:

```bash
cd frontend
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

## 🛠️ Features
- **Vite Reverse Proxy**: Automatically proxies `/velasco` requests to `http://localhost:8080` to eliminate CORS issues.
- **Tailwind CSS Styling**: Modern, clean, responsive UI.
- **Inline Card Form (No Modal)**: Add and Edit students directly from the page layout with form validation and edit cancellation.
- **Student Directory Table**:
  - Live search / filter by name, course, section, or ID.
  - Inline confirmation for delete (two-step inline check, no popup modal needed).
  - Badges for courses and sections.
  - Loading skeleton indicators.
- **Toast Notifications**: Feedback banners for create, update, and delete actions.
