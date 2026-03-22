# 🚀 Employee Management System

A modern **Employee Management System (EMS)** built with a clean UI, responsive design, and full-stack architecture. This application helps organizations efficiently manage employees, attendance, leaves, and company insights.

---

## 📌 Features

### 🔐 Authentication

* Secure Sign In / Sign Up
* Google SSO integration
* Role-based access control

### 👨‍💼 Employee Management

* Add, update, delete employees
* View employee profiles
* Search & filter functionality

### 📊 Dashboard

* Overview of total employees, departments, and stats
* Attendance summary
* Leave analytics
* Performance insights

### 🕒 Attendance Management

* Mark daily attendance
* Track working hours
* Attendance history

### 📝 Leave Management

* Apply for leave
* Approve / reject requests (Admin)
* Leave calendar view

### 📱 PWA Mobile Support

* Fully responsive design
* Mobile-friendly interface
* Installable as a Progressive Web App (PWA)

### 📈 Reports & Analytics

* Department-wise reports
* Attendance trends
* Company growth charts

---

## 🛠️ Tech Stack

### Frontend

* Angular
* TypeScript
* HTML5 / CSS3
* Angular Material
* RxJS

### Backend

* Spring Boot
* Java
* REST APIs

### Database

* MySQL / PostgreSQL (configurable)

---

## 📂 Project Structure

```
employee-management-system/
│
├── frontend/        # Angular Application
├── backend/         # Spring Boot APIs
├── docs/            # Documentation & Screenshots
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

---

### 🔹 Frontend Setup (Angular)

```bash
cd frontend
npm install
ng serve
```

App will run at: `http://localhost:4200`

---

### 🔹 Backend Setup (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

API will run at: `http://localhost:8080`

---

## 🔗 API Endpoints (Sample)

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| GET    | /employees      | Get all employees      |
| POST   | /employees      | Add new employee       |
| PUT    | /employees/{id} | Update employee        |
| DELETE | /employees/{id} | Delete employee        |
| GET    | /attendance     | Get attendance records |
| POST   | /leave/apply    | Apply for leave        |

---

## 📸 Screenshots

* Login & Registration UI
* Admin Dashboard
* Employee List
* Attendance Panel
* Leave Management
* Mobile (PWA) Screens

*(Add screenshots here from your project)*

---

## 🚧 Future Enhancements

* Payroll Management
* Notifications & Email Integration
* Role-based dashboards
* AI-based employee insights

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Arjun Khade**

* Angular Developer | Full Stack Enthusiast

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
