import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegister from './components/User/UserRegister'
import Layout from './components/layout'
import UserLogin from './components/User/UserLogin'
import DashboardLayout from './components/DashboardLayout'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="/dashboard/contacts" element={<div>Contact</div>} />
        </Route>
        
      </Routes>   
    </BrowserRouter>
  </StrictMode>
)
