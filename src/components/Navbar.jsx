import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import apiHandler from '../utils/apiHandler';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { logout } from '../features/user/AuthSlice';

const Navbar = () => {
  const { isAuthenticated} = useSelector((state) => state.user);
  let dispatch = useDispatch();

  async function logoutHandler() {
    const res = await apiHandler('/logout', 'PUT', true);
    if(res.success){
      Cookies.remove('cookieName');
      toast.success(res.message);
      dispatch(logout());
    }
    else{
      toast.error(res.message);
    }
  }

  return (
    <div className='w-full shadow-sm bg-gray-100 flex justify-between items-center px-8'>
        <Link to='/'>
            <img
                src={Logo}
                alt='logo'
                className='w-40'
            />
        </Link>

        {!isAuthenticated &&(<div className='flex items-center gap-4'>
            <Link to='/login' className='py-1 px-3 text-base border border-blue-500 text-blue-500 rounded-md transition-all duration-200 ease-in hover:bg-blue-500 hover:text-white'>Login</Link>
            <Link to='/signup' className='py-1 px-3 text-base border border-blue-500 text-blue-500 rounded-md transition-all duration-200 ease-in hover:bg-blue-500 hover:text-white'>Sign up</Link>
        </div>)}

        {isAuthenticated && (
            <div className='flex items-center gap-4'>
                <Link to='/dashboard' className='py-1 px-3 text-base border border-blue-500 text-blue-500 rounded-md transition-all duration-200 ease-in hover:bg-blue-500 hover:text-white'>Dashboard</Link>
                {/* logout btn  */}
                <button onClick={logoutHandler} className='py-1 px-3 text-base border border-red-500 text-red-500 rounded-md transition-all duration-200 ease-in hover:bg-red-500 cursor-pointer hover:text-white'>Logout</button>
            </div>
        )}
    </div>
  )
}

export default Navbar