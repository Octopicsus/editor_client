import { createRoot } from 'react-dom/client'
import './components/styles/fonts.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './components/pages/app/App.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <App />
  </BrowserRouter>
)
