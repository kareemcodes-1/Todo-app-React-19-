import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { TodoProvider } from './provider/TodoProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <TodoProvider>
              <App />
          </TodoProvider>
  </StrictMode>,
)
