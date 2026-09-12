import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { installConsoleNote } from '@/lib/console-note'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

installConsoleNote()
