import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoute from './app/routes/MainRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainRoute />
  </StrictMode>,
)
