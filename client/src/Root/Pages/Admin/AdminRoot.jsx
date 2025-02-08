import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavigation from '../../../component/AdminNavigation'
import { useUserContext } from '../../../Provider/AuthContext'
import server from '../../../cofig/config'
import axios from 'axios'
import { LayoutDashboardIcon, LogOut, LucideLayoutDashboard } from 'lucide-react'
import { Button } from '@mui/joy'

const AdminRoot = () => {

  const { setIsAuthenticated , isAuthanticated } = useUserContext()

  const handelLogout = async () => {
    await axios.post(`${server}user/logout`,{}, { withCredentials: true }).then((data) => {
      setIsAuthenticated(false)
        navigate("/")
        getAuthUser()
    }).catch((e) => console.log(e))
  }

  return (
    <>
      <div className='w-full' >
        <div className="  w-full bg-gray-100 shadow-lg">
          <nav className="p-4 w-full bg-slate-900 flex justify-between">
            <h1 className="text-xl flex gap-3 font-bold text-white"> 
            <LucideLayoutDashboard /> Admin Dashboard</h1>

                
            <Button onClick={handelLogout} variant="solid" color="primary" className={` ${isAuthanticated ? "flex" : "hidden"} shadow-md  text-white  border-b-slate-800 p-2 mx-7`} > <LogOut className="mr-2" size={20} />Logout</Button>
          </nav>
          <div className="flex">
            <AdminNavigation />
            <div className=" bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex-1">
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