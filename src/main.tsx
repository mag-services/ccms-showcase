import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { TourDensityProvider } from './context/TourDensityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TourDensityProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TourDensityProvider>
  </StrictMode>,
)
