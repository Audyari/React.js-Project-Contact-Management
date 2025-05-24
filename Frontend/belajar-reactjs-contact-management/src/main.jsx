import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegister from './components/User/UserRegister'
import Layout from './components/layout'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
        </Route>

        <Route path="/dashboard" element={<div>Dashboard</div>} >
        
        </Route>
        
      </Routes>   
    </BrowserRouter>
  </StrictMode>
)
