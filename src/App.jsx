import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AuthProvider } from './context/AuthContext'
import ModalComponent from './components/modalComponent'

function App() {


  return (
    <>
      <AuthProvider >
        <Navbar />
        <main className='main min-h-screen max-w-screen-2xl mx-auto px-20 py-6'>
          <Outlet />
        </main>

        {/* <Login /> */}
        <Footer />
        <ModalComponent />
      </AuthProvider>
    </>
  )
}

export default App
