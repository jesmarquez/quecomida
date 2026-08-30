import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QuecomidApp } from './QuecomidApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuecomidApp></QuecomidApp>
  </StrictMode>,
)
