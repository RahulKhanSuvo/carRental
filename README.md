# Carola - Car Rental System 🚗

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-green?style=for-the-badge)](https://car-portal-rahul-khan-suvo.netlify.app/)

<div align="center">
  <img height="100%" src="https://i.ibb.co.com/G4ZY60N5/screely-1738736810638.png"  />
</div>

## Project Overview
Carola is a user-friendly car rental platform that allows users to easily browse available cars, make bookings, and manage their bookings and listings. The platform supports secure user authentication, car management, and a seamless booking experience.

### 🚀 Technologies Used
- **Frontend**: React, Tailwind CSS, Framer Motion  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Authentication**: Firebase, JWT  
- **Hosting**: Vercel (Server), Netlify (Client)  

### 🔑 Core Features
- 🔐 **Secure Auth**: Google login + email/password  
- 🚗 **Car Listings Management**: Add/Edit/Delete cars with details  
- 🔍 **Search & Sorting**: Filter cars by model, brand, or location  
- 📅 **Booking System**: Book cars, modify dates, cancel bookings  
- 🎨 **Responsive Design**: Optimized for all devices  
- ⚠️ **Error Handling**: Custom 404 page with navigation  

### 📦 Key Dependencies
#### **Client**
- `react-router-dom`
- `axios`
- `firebase`
- `framer-motion`
- `swiper`
- `react-icons`

#### **Server**
- `express`
- `mongoose`
- `cors`
- `dotenv`
- `jsonwebtoken`

### 🛠 Local Setup Guide

#### **Prerequisites**
- Node.js ≥16.x
- MongoDB Atlas account
- Firebase project

#### **1️⃣ Clone Repository**
```bash
git clone https://github.com/RahulKhanSuvo/carola.git
cd carola
```

## 2️⃣ Install Dependencies

### Client
```bash
cd client
npm install
```

### Server
```bash
cd ../server
npm install
```

## 3️⃣ Configure Environment Variables

Create `.env` files inside both the client and server directories.

### Client `.env`
```ini
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
```

### Server `.env`
```ini
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
Replace all `your-...` values with actual credentials.

## 4️⃣ Start the Application

### Run Backend
```bash
cd server
npm start
```
This starts the backend server at `http://localhost:5000/`.

### Run Frontend
Open a new terminal, then:
```bash
cd client
npm start
```
This starts the frontend at `http://localhost:3000/`. 
