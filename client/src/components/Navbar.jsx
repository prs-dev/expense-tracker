import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Navbar = () => {
  // const token = localStorage.getItem("token")
  const {user, setUser} = useUser()
  return (
    <nav className='flex items-center h-[70px] mb-2 justify-between p-4 bg-transparent shadow-md'>
      <h1 className='text-[#333] font-semibold text-2xl'>
        {/* logo */}
        <Link to='/'>Expense Tracker {`<Prs-dev>`}</Link>
      </h1>
      <ul className='flex gap-4 items-center text-[#333]'>
        {user ? (
          <>
            <li><Link to="/expenses">All Expenses</Link></li>
            <li><Link to="/new">Add New Expense/Category</Link></li>

            <li className='cursor-pointer' onClick={() => {
              localStorage.removeItem("token")
              setUser(null)
            }}>Logout</li>
            <li className='border-2 border-red-300 p-1 rounded-md'>
              {/* name */}
              {user?.name}
            </li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

      </ul>
    </nav>
  )
}

export default Navbar