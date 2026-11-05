# Developer & Assistant Context Handover

This file captures the full state, architectural decisions, credentials structure, and workflow context of the **Student CRUD** fullstack project. Use this file to continue work seamlessly on another computer.

---

## 📌 Project Overview & Current State

* **Repository:** [https://github.com/rnvelascoua/student-crud](https://github.com/rnvelascoua/student-crud)
* **Default Branch:** `main`
* **Status:** Fully developed, connected, and deployed to Render.com with an active cloud PostgreSQL database.

### Active Cloud Deployments:
* **Frontend:** [https://student-frontend-fhf1.onrender.com](https://student-frontend-fhf1.onrender.com)
* **Backend:** [https://student-backend-zzc9.onrender.com/velasco/students](https://student-backend-zzc9.onrender.com/velasco/students)
* **Database:** Render PostgreSQL (`student-db`, database name: `db_student`)

---

## 📐 Key Architectural Decisions

1. **Frontend UI/UX:**
   * **Framework:** React 19 bootstrapped with Vite 8.
   * **Styling:** Tailwind CSS v4 using `@tailwindcss/vite` plugin.
   * **Layout:** Strictly **No Modals** (as requested by user). Add and Edit operations are performed in an inline responsive sticky card form.
   * **Delete Flow:** Inline two-step confirmation right in the table row ("Sure? Yes, Delete / Cancel") — avoids popup modals completely.
   * **Icons:** `lucide-react`.

2. **Backend API:**
   * **Framework:** Spring Boot (Java 21) with Spring Data JPA.
   * **Entity (`Student`):**
     * `id`: Integer (Auto-generated)
     * `firstname`: String
     * `lastname`: String
     * `course`: String
     * `section`: String
   * **Controller:** [`StudentController.java`](student/src/main/java/com/velasco/student/StudentController.java) mapped to `/velasco/students`.
   * **CORS:** Configured via `@CrossOrigin(origins = "*")` at the controller level to allow requests from the static frontend domain on Render.

3. **API Routing & Dynamic Environment Handling:**
   * In [`frontend/src/api/studentService.js`](frontend/src/api/studentService.js):
     * **Local Development:** When `VITE_API_BASE_URL` is empty, API requests use relative paths (`/velasco/students`), which are forwarded to `http://localhost:8080` by the Vite development proxy defined in [`frontend/vite.config.js`](frontend/vite.config.js).
     * **Production (Render):** When `VITE_API_BASE_URL` is set (e.g. `student-backend-zzc9` or `https://student-backend-zzc9.onrender.com`), the function automatically resolves the URL to `https://student-backend-zzc9.onrender.com/velasco/students`.

4. **Render Blueprint Infrastructure (`render.yaml`):**
   * Follows the template from `https://github.com/rnvelascoua/my-youtube/blob/main/render.yaml`.
   * Provisions:
     * `student-db`: Free tier PostgreSQL database.
     * `student-backend`: Web service built via `student/Dockerfile` (`eclipse-temurin:21-jdk-alpine` -> `eclipse-temurin:21-jre-alpine`). Environment variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` are injected automatically from `student-db`.
     * `student-frontend`: Static site web service building via `cd frontend && npm install && npm run build`, publishing from `frontend/dist`, with SPA rewrite rule (`/*` -> `/index.html`) and `VITE_API_BASE_URL` pointing to `student-backend`.

---

## 💻 How to Resume Development on Another Computer

### 1. Clone & Git Status
```bash
git clone https://github.com/rnvelascoua/student-crud.git
cd student-crud
git checkout main
```

### 2. Frontend Development Setup
```bash
cd frontend
npm install
npm run dev
# (or npm.cmd run dev on Windows if execution policy prevents .ps1 scripts)
```
Frontend runs at `http://localhost:5173`.

### 3. Backend Development Setup
Ensure PostgreSQL is running locally with a database named `db_student` (or customize credentials in `student/src/main/resources/application.properties`):
```bash
cd student
./mvnw spring-boot:run
# (or .\mvnw.cmd spring-boot:run on Windows)
```
Backend runs at `http://localhost:8080`.

---

## 🗂️ File Directory & Responsibility Map

* `render.yaml` — Infrastructure as Code for Render.
* `student/`
  * `Dockerfile` — Multi-stage container definition for backend deployment.
  * `pom.xml` — Maven dependencies (Java 21, Spring Boot Web, Spring Data JPA, PostgreSQL).
  * `src/main/resources/application.properties` — Dual local/cloud datasource config using `${ENV_VAR:fallback}`.
  * `src/main/java/com/velasco/student/Student.java` — Entity definition.
  * `src/main/java/com/velasco/student/StudentRepository.java` — JPA CRUD Repository.
  * `src/main/java/com/velasco/student/StudentController.java` — REST Controller with endpoints.
* `frontend/`
  * `vite.config.js` — Vite configuration with Tailwind CSS plugin and localhost:8080 proxy.
  * `src/api/studentService.js` — Fetch API wrapper for all CRUD calls.
  * `src/components/StudentForm.jsx` — Inline card form (Add/Edit mode, validation, clear/cancel).
  * `src/components/StudentTable.jsx` — Responsive table, search filter, inline delete confirmation.
  * `src/components/Navbar.jsx` — Header with total count and refresh action.
  * `src/components/Notification.jsx` — Toast alert component.
  * `src/App.jsx` — Root component coordinating state, network calls, and layout.
