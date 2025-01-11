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
        <div className=' min-h-screen max-w-screen-2xl'>

          <Navbar />
          <main className='main h-full mx-auto px-20 py-6'>
            <Outlet />
          </main>

          {/* <Login /> */}
          <Footer />
          <ModalComponent />
        </div>
      </AuthProvider>
    </>
  )
}

export default App
