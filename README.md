# 🚀 FullStack Auth SYS

A **complete full-stack authentication system** built with **React (frontend)** and **Node.js + Express (backend)**.  
This project demonstrates **real-world authentication workflows** like signup, login, email verification, password reset, and protected routes 🔐.

---

## ✨ Features

✅ User Registration  
✅ User Login (JWT Authentication)  
✅ Email Verification  
✅ Forgot Password Flow  
✅ Reset Password with Token  
✅ Protected Routes  
✅ Secure Password Hashing (bcrypt)  
✅ REST API Architecture  
✅ Full Frontend + Backend Integration  

---

## 🛠 Tech Stack

### 🔹 Frontend
- React
- React Router
- React Hook Form
- Axios
- Tailwind CSS / Custom CSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Bcrypt
- Nodemailer
- dotenv

---

## 📁 Project Structure

FullStack_Auth_SYS/
├── Client/ # Frontend (React)
│ ├── src/
│ ├── public/
│ └── package.json
│
├── Server/ # Backend (Node.js + Express)
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── utils/
│ ├── app.js
│ └── server.js
│
├── .gitignore
└── README.md


### 1️⃣ Clone Repository
git clone https://github.com/Code-With-Ali-Mansoori/FullStack_Auth_SYS.git


## 🔐 Authentication Flow

- Passwords are hashed using bcrypt
- JWT tokens are generated on login
- Tokens are used to protect private routes
- Email verification & password reset handled securely

## 🔁 Authentication Flow Diagram

<p align="center">
  <img src="./assets/auth-flow-diagram.jpg" alt="Auth Flow Diagram" width="700"/>
</p>

<p align="center">
  <i>Complete authentication flow including Register, Login, OAuth, JWT, OTP verification and Password Reset</i>
</p>

---
## 🧠 What This Diagram Explains (Good for Reviewers)

- User Registration → DB
- Login → JWT → Dashboard
- Google OAuth → JWT → Dashboard
- Forgot Password → Email → OTP
- OTP Verification → Set New Password
- Secure Redirects after Auth


## 📄 License
- MIT License
- © 2025 Ali Mansoori
