import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegister from './components/User/UserRegister'
import Layout from './components/layout'
import UserLogin from './components/User/UserLogin'
import DashboardLayout from './components/DashboardLayout'
import UserProfile from './components/User/UserProfile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
         
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
       
       
        <Route path="/dashboard/users/profile" element={<UserProfile />} />
        {/* <Route path="/dashboard/users/contacts" element={<div>testing</div>} /> */}
        </Route>
        
      </Routes>   
    </BrowserRouter>
  </StrictMode>
)
