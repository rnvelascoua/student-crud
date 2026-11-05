# Student CRUD Fullstack Application

A fullstack Student Management CRUD application featuring a **Spring Boot 3 / Java 21 REST API** backend, a **Vite + React 19 + Tailwind CSS** frontend, and **Render.com Cloud Infrastructure with PostgreSQL**.

---

## 🌐 Live Production Links

* **Frontend App:** [https://student-frontend-fhf1.onrender.com](https://student-frontend-fhf1.onrender.com)
* **Backend API:** [https://student-backend-zzc9.onrender.com/velasco/students](https://student-backend-zzc9.onrender.com/velasco/students)
* **GitHub Repository:** [https://github.com/rnvelascoua/student-crud](https://github.com/rnvelascoua/student-crud)

---

## 📁 Project Architecture

```
STUDENT-CRUD/
├── render.yaml                    # Render Blueprint (Infrastructure as Code)
├── CONTEXT.md                     # Context & Handover guide for developers
├── README.md                      # Project documentation
├── .gitignore                     # Root Git exclusions
│
├── student/                       # Spring Boot Backend
│   ├── Dockerfile                 # Multi-stage Docker build (Java 21)
│   ├── pom.xml                    # Maven configuration
│   ├── src/main/java/com/velasco/student/
│   │   ├── Student.java           # JPA Entity (id, firstname, lastname, course, section)
│   │   ├── StudentRepository.java # Spring Data JPA repository
│   │   ├── StudentController.java # REST Controller with @CrossOrigin
│   │   └── StudentApplication.java
│   └── src/main/resources/
│       └── application.properties # Dynamic env config for Local & Cloud
│
└── frontend/                      # Vite + React Frontend
    ├── package.json               # React 19, Tailwind CSS v4, Lucide Icons
    ├── vite.config.js             # Dev reverse proxy (/velasco -> localhost:8080)
    └── src/
        ├── api/
        │   └── studentService.js  # Dynamic API client (local proxy & remote URL)
        ├── components/
        │   ├── Navbar.jsx         # Sticky header with counter & refresh
        │   ├── StudentForm.jsx    # Inline card form (Add & Edit modes, no modal)
        │   ├── StudentTable.jsx   # Searchable table with inline delete confirmation
        │   └── Notification.jsx   # Auto-dismissing feedback toasts
        ├── App.jsx                # Main coordinator & state management
        └── index.css              # Tailwind CSS styles
```

---

## 🚀 Running on Another Computer

### 1. Clone the Repository
```bash
git clone https://github.com/rnvelascoua/student-crud.git
cd student-crud
```

### 2. Run the Backend (`student/`)
#### Requirements:
* Java JDK 17+ (JDK 21 recommended)
* PostgreSQL running locally (default database: `db_student`, user: `postgres`, password: `admin`)

#### Start Server:
```bash
cd student
./mvnw spring-boot:run
```
*(On Windows: `.\mvnw.cmd spring-boot:run`)*

Backend will start at: `http://localhost:8080/velasco/students`

---

### 3. Run the Frontend (`frontend/`)
#### Requirements:
* Node.js v18+ and npm

#### Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

> **Note for Windows PowerShell:** If you see script execution errors running `npm`, use `npm.cmd run dev` or run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once.

Frontend will start at: `http://localhost:5173`

---

## 📡 API Reference

Base Endpoint: `/velasco/students`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/velasco/students` | Get all students | None |
| `GET` | `/velasco/students/{id}` | Get student by ID | None |
| `POST` | `/velasco/students` | Add new student | `{ firstname, lastname, course, section }` |
| `PUT` | `/velasco/students/{id}` | Update student | `{ firstname, lastname, course, section }` |
| `DELETE` | `/velasco/students/{id}` | Delete student | None |

---

## ☁️ Deployment on Render

This project uses Render Blueprints (`render.yaml`):
1. **Database:** `student-db` (PostgreSQL)
2. **Backend:** `student-backend` (Docker container using `student/Dockerfile`)
3. **Frontend:** `student-frontend` (Static site built via `npm run build`)
