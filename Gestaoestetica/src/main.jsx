import { StrictMode } from 'react'
import {useState} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Cadastro from './Cadastro.jsx'
import Service from './Service.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
