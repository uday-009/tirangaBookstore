import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
// import { AuthProvide } from './context/AuthContext'

function App() {


  return (
    <>
      {/* <AuthProvide > */}
        <Navbar />
        <main className='main min-h-screen max-w-screen-2xl mx-auto px-20 py-6'>
          <Outlet />
        </main>

        {/* <Login /> */}
        <Footer />
      {/* </AuthProvide> */}
    </>
  )
}

export default App
