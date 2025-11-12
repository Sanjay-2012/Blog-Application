import './App.css'
import Navbar from './components/Navbar'
import Routing from './components/Routing'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
     <Navbar/>
     <Routing/>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  )
}

export default App
