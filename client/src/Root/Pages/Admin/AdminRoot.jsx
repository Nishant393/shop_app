import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavigation from '../../../component/AdminNavigation'
import { useUserContext } from '../../../Provider/AuthContext'

const AdminRoot = () => {

  const { isAdmin } = useUserContext()
  const naviagate = useNavigate()
  useEffect(()=>{
    console.log(isAdmin)
    if(!isAdmin) naviagate("/")
  },[isAdmin])

  return (
          <>
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
          </>
  )
}

export default AdminRoot