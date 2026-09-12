import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { printConsoleNote } from '@/lib/console-note'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

printConsoleNote()
