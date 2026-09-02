import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuecomidApp } from './QuecomidApp'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuecomidApp></QuecomidApp>
  </StrictMode>,
)
