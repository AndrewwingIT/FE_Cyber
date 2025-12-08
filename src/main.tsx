import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoute from './app/routes/MainRoute'
import { PaymentProvider } from './app/context/PaymentContext'
import ToastProvider from './components/Toast/ToastProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <PaymentProvider>
        <MainRoute />
      </PaymentProvider>
    </ToastProvider>
  </StrictMode>,
)
