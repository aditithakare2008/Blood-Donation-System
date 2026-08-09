# 🩸 Blood Donation System

A full-stack web-based Blood Donation System designed to connect blood donors with people who need blood. The system allows donors to register, manage their availability, search for available donors, and submit emergency blood requests.

## 🌐 Live Website

https://blood-donation-system-yi3e.onrender.com

## 💻 GitHub Repository

https://github.com/aditithakare2008/Blood-Donation-System

---

## 📌 Project Overview

The Blood Donation System provides a centralized platform for managing blood donation activities.

Users can register as blood donors, log in to their accounts, manage their donor profiles, update their availability, search for available donors based on city and blood group, and submit emergency blood requests.

The system uses a React frontend, Node.js/Express backend, and MongoDB Atlas database.

---

## ✨ Features

### 👤 Donor Management
- Donor registration
- Donor login
- Donor profile
- Donor information management
- Update donor availability
- Secure application authentication

### 🔎 Donor Search
- Search donors by city
- Search donors by blood group
- Display only available donors
- View donor contact information

### 🚨 Emergency Blood Requests
- Submit emergency blood requests
- Enter patient information
- Enter hospital information
- Select required blood group
- Specify required blood units
- Set urgency level
- Specify required date

### 📊 Dashboard
- Total donors
- Available donors
- Total blood requests
- Pending requests
- Completed requests
- Total donations
- Total blood units
- Blood request details

### 🩸 Blood Donation Management
- Donation records
- Blood inventory management
- Blood request management
- MongoDB database integration

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- Bootstrap
- HTML
- CSS

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

### Deployment
- Render

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      User Device     │
                    │  Laptop / Mobile     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      Vite            │
                    │     Bootstrap        │
                    └──────────┬───────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas    │
                    │       Database       │
                    └──────────────────────┘
```
## 📂 *Project Structure*

---text
Blood-Donation-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── models/
│
├── routes/
│
├── middleware/
│
├── server.js
├── package.json
├── package-lock.json
└── README.md

---

### ⚙️ *Installation and Setup* 

1. Clone the repository

```bash
git clone https://github.com/aditithakare2008/Blood-Donation-System.git
```

2. Open the project

```bash
cd Blood-Donation-System
```

3. Install backend dependencies

```bash
npm install
```

4. Install frontend dependencies

```bash
cd frontend
npm install
```

5. Start the frontend

```bash
npm run dev
```

6. Start the backend
   From the project root:

```bash
node server.js
```

---

### 🔐 *Environment Variables* 

The backend requires environment variables for configuration. Create a .env file in the backend/project root and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

⚠️ Do not upload your actual .env file or secret keys to GitHub.

---

### 🔑 *User Authentication* 

Users must first register through the registration page. After registration, users can log in using:

· Email: Registered email
· Password: Application password created during registration

The application does not require users to provide their Gmail or other email-account password.

---

### 🚀 *Deployment* 

The project is deployed using Render.

 *Frontend* : https://blood-donation-system-yi3e.onrender.com

 *Backend* : https://blood-donation-backend-xyth.onrender.com

The frontend communicates with the deployed Express backend through REST API requests.

---

### 🔗 *Important API Routes* 

· /api/auth - Authentication routes
· /api/donors - Donor management routes
· /api/requests - Blood request routes
· /api/inventory - Blood inventory routes
· /api/donations - Donation management routes
· /api/dashboard - Dashboard statistics routes

---

### 🎯 *Project Objectives* 

· To create an online platform for blood donor management
· To make available blood donors easier to find
· To allow users to search donors according to blood group and location
· To provide a facility for submitting emergency blood requests
· To maintain blood donation and inventory information
· To provide a centralized database for donor and blood request information
· To make the system accessible through the internet

---

### 🔮 *Future Improvements* 

Possible future improvements include:

· Email notifications for emergency requests
· SMS notifications to nearby donors
· Google Maps integration
· Hospital accounts
· Admin dashboard
· Blood donation appointment scheduling
· Donor verification
· Advanced blood compatibility matching
· Improved security and authentication
· Mobile application

---

### 📚 *Learning Outcomes* 

Through this project, the following concepts were implemented:

· React component development
· React state management
· React Router
· REST API integration
· Node.js backend development
· Express.js routing
· MongoDB database operations
· Authentication
· CRUD operations
· Git and GitHub
· Frontend-backend integration
· Cloud deployment

---

### 👩‍💻 *Author* 

Aditi Thakare

---

### 📄 *License* 

This project is developed for educational and academic purposes.

---

### ❤️ *Acknowledgement* 

This project was developed as an academic project to demonstrate the practical implementation of full-stack web development concepts and database integration.
