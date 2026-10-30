import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FeedbackProvider from './contexts/FeedbackProvider.tsx'
import UsuarioProvider from './contexts/UsuarioProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FeedbackProvider>
      <UsuarioProvider>
        <App />
      </UsuarioProvider>
    </FeedbackProvider>
  </StrictMode>,
)