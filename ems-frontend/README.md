# 🅰️ EMS Frontend (Angular 21)

Modern web application interface for the **Employee Management System (EMS Portal)**.

[![Angular](https://img.shields.io/badge/Angular-21.x-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![NgRx](https://img.shields.io/badge/NgRx-Store_%26_Effects-BA68C8?style=flat-square&logo=ngrx&logoColor=white)](https://ngrx.io/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-FCC72B?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

---

## 🛠️ Technologies & Libraries

- **Framework**: Angular `21.0.0` (Standalone Components, modern Routing, Resolvers)
- **Reactivity & State**: Angular Signals (`signal<File | null>`), `@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`
- **Styling**: Tailwind CSS `v4.1.12` (`@tailwindcss/postcss`), Custom SCSS Material Theme
- **UI Components**: Angular Material & CDK `21.2.4` (Dialogs, Menus, Selects, Buttons, Icons)
- **Notifications**: `ngx-toastr`
- **Streams**: RxJS `~7.8.0` (`combineLatest`, `debounceTime`, `distinctUntilChanged`)
- **Unit Testing**: Vitest `4.0.8` + JSDOM
- **Production Server**: Multi-stage Docker image serving via **Nginx**

---

## 📌 Features

- **Authentication Flow**: Login and Signup with reactive form validation and dynamic role selection.
- **HTTP Interceptors**:
  - `token-interceptor`: Attaches Bearer JWT token from session storage.
  - `global-error-interceptor`: Catches HTTP 401/403/500 errors and displays toast alerts.
- **Employee Management**:
  - Interactive table with real-time debounced search (300ms) across names and emails.
  - Multi-filtering by department and status (**All**, **Active**, **On Leave**).
  - Dynamic client-side pagination.
  - Add/Edit Employee dialog modal with comprehensive field validation.
  - Admin-only deletion with confirmation modal.
- **Profile Photo Upload**:
  - Drag-and-drop & file browser upload interface powered by Angular Signals.
  - Client-side file preview and size validation (max 5MB).
- **Collapsible Sidebar & Avatar Menu**:
  - Responsive collapsible sidebar with smooth transitions.
  - User session avatar menu displaying logged-in user with instant logout.
- **Interactive Tutorial ("How To Use")**:
  - Dedicated route (`/how-to-use`) featuring an embedded video walkthrough, download button, and feature reference cards.

---

## ⚙️ Development Scripts

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:4200)
npm start

# Run unit tests with Vitest
npm test

# Build production bundle into /dist/ems-frontend
npm run build
```

---

## 🐳 Docker Deployment

The application uses a multi-stage Dockerfile:
1. **Builder Stage**: Node 22 Alpine installs dependencies and compiles the Angular production build (`npm run build -- --configuration=production`).
2. **Serving Stage**: Nginx Alpine serves the compiled assets via `default.conf` on port 80.

To build the Docker image standalone:
```bash
docker build -t ems-frontend .
docker run -p 90:80 ems-frontend
```

---

For full documentation and full-stack setup instructions, refer to the root [README.md](../README.md).
