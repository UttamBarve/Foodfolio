# 🍽️ Foodfolio

**Foodfolio** is a full‑stack MERN restaurant website with a complete **Admin CMS**, built as a **real‑world, production‑ready project**. It allows restaurant owners to manage menus and hero sections dynamically, while users can browse menus and make reservations.

🔗 **Live Website:** [https://foodfolio-uttambarve.vercel.app](https://foodfolio-uttambarve.vercel.app)
🔗 **Backend API:** [https://foodfolio-dzla.onrender.com](https://foodfolio-dzla.onrender.com)

---

## 🚀 Features

### 🌐 Public Website

* Responsive restaurant website
* Dynamic Hero Slider (CMS‑controlled)
* Dynamic Menu with images
* Online Table Reservation form
* Optimized UI for all screen sizes

### 🔐 Admin Panel (CMS)

* Secure Admin Login (JWT Authentication)
* Create / Update / Delete Menu Items
* Upload menu images using **Cloudinary**
* Manage Hero Slider content with image upload
* View and manage reservations
* Loader handling to prevent duplicate submissions

---

## 🧠 Tech Stack

### Frontend

* React (Vite)
* Plain CSS (No UI libraries)
* React Router
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer + Cloudinary

### Deployment

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**
* Image Hosting: **Cloudinary**

---

## 📂 Project Structure (Simplified)

```
Foodfolio/
├── frontend/
│   ├── src/
│   ├── services/
│   ├── pages/
│   └── components/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
```

---

## 🔑 Environment Variables

### Backend (`.env`)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (Vercel Environment Variables)

```
VITE_API_URL=https://foodfolio-dzla.onrender.com
```

---

## 🛠️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/uttambarve/foodfolio.git
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Production Fixes Implemented

* CORS handling for Vercel ↔ Render
* React Router 404 handling using `vercel.json`
* Image size normalization using CSS
* Loader state to prevent duplicate form submissions
* Secure environment variable handling
