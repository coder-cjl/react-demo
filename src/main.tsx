import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { showVConsole } from './utils/env.ts'
import VConsole from 'vconsole'
import { logger } from './utils/log.ts'

/// 仅仅在开发模式下引入
if (showVConsole) {
  const vconsole = new VConsole()
  logger.debug('VConsole is enabled in development mode.', vconsole)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
