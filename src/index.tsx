import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ReduxProvider } from './UI/redax-provider/RedaxProvider'

import { App } from 'app/App'

createRoot(document.querySelector('#root') as HTMLElement).render(
  <BrowserRouter>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </BrowserRouter>
)
