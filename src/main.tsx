import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoute from './app/routes/MainRoute.tsx'
import { PaymentProvider } from './app/context/PaymentContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PaymentProvider>
      <MainRoute />
      <ToastContainer position="top-right" autoClose={3000} />
    </PaymentProvider>
  </StrictMode>,
)
