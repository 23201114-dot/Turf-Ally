import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ExploreTurfs from './ExploreTurfs.jsx'
import Bookings from './Bookings.jsx'
import Profile from './Profile.jsx'
import Login from './Login.jsx'
import './index.css'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token')
  return token ? children : <Navigate to="/login" replace />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="/explore" element={<ExploreTurfs />} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
