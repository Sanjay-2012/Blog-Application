import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import AuthContext from './context/Auth.jsx'


createRoot(document.getElementById('root')).render(
     <BrowserRouter>
   <AuthContext>
        <App />
      </AuthContext>
     </BrowserRouter>,
)
