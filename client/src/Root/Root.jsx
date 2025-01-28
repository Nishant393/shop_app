import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'
import { useUserContext } from '../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'
import AdminNavigation from '../component/AdminNavigation'
import Footer from '../component/Footer'
// import Dashboard from './Pages/Admin/Dashboard'

const Root = () => {

  const { isAdmin } = useUserContext()
  const naviagate = useNavigate()
  // useEffect(()=>{
  //   if(isAdmin) naviagate("/ashboard")
  // },[])
  return (
    <div className='w-screen' >
      {isAdmin ?
        <div className='w-full' >
          <div className="  w-full bg-gray-100 shadow-lg">
            <nav className="p-4 w-full bg-slate-900">
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </nav>
            <div className="flex">
              <AdminNavigation />
              <div className="flex-1">
                <div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <>
          <NavBar />
          <Outlet />
          <Footer/>
        </>}
    </div >
  )
}

export default Root