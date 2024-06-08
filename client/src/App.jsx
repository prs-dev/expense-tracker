import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import AddPage from './pages/AddPage'
import Expenses from './pages/Expenses'
import { Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Loader from './components/Loader'

const App = () => {
  // const token = localStorage.getItem("token")
  const {user, loading} = useUser()
  return (
    <div className='bg-[#fdf0de]'>
      {/* <Loader /> */}
      <Navbar />
      <main className='max-w-[1366px] m-auto min-h-[calc(100vh-80px)] flex items-center justify-center'>
        <Routes>
          <Route path='/' element={user ? <Homepage /> : <Login />} />
          <Route path='/expenses' element={user ? <Expenses /> : <Navigate to='/login' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/new' element={user ? <AddPage /> : <Navigate to='/login' />} />
        </Routes>
      </main>
    </div>
  )
}

export default App