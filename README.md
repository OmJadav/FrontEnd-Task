# 🔒 React User Authentication App 🔒

Live Link :

A simple yet powerful user management app built with **React (Vite)**. This application provides authentication, user listing with pagination, editing, and deletion functionalities.

---

## 📌 Features

- 🔑 User Authentication (Login & Logout)
- 📄 Fetch and display users with pagination
- ✏️ Edit user details
- ❌ Delete users with confirmation
- 📦 Token-based authentication using **TOKEN**
- 🎨 Styled with **Tailwind CSS** and animations with **Framer Motion**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install dependencies

#### 📌 Frontend (React + Vite)

```bash
cd frontend
npm install
```

### 3️⃣ Set up environment variables

Create a **.env** file in the frontend directory and add:

```env
VITE_BASE_URL=https://reqres.in
```

---

## 🚀 Running the Project

### 🌐 Start the Frontend (Vite)

```bash
npm run dev
```

Now, open your browser and visit `http://localhost:5173` 🎉

---

## 📁 Project Structure

```
📦 project-root
 ┣ 📂 frontend       # React + Vite
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 Components # Reusable Components
 ┃ ┃ ┣ 📂 utils      # contains urlhandler and api handler
 ┃ ┃ ┣ App.jsx       # Main App Component
 ┃ ┃ ┗ main.jsx      # Entry Point
 ┣ 📜 README.md      # Project Documentation
 ┗ 📜 package.json   # Dependencies & Scripts
```

---

## 🔥 Assumptions & Considerations

- The App uses **Token authentication**, so ensure you have a valid token stored in `localStorage`.
- Error handling and edge cases have been considered to enhance security and reliability.
- Every pages made with user friendly design and responsiveness as well

---

## 🛠️ Technologies/Libraries Used

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion
- **HTTP Requests:** Axios
- **Navigation:** react-router-dom
- **Form handling:** react-hook-form

---
