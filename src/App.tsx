import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegistrationForm } from "./pages/RegistrationForm";
import { SuccessPage } from "./pages/SucessPage";
import { Login } from './pages/Login';
import OTPInputPage from './pages/OTP';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<RegistrationForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPInputPage />} />
      </Routes>
    </Router>
  )
}

export default App
