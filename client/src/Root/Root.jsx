import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'
import { useUserContext } from '../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'
import AdminNavigation from '../component/AdminNavigation'
import Footer from '../component/Footer'

const Root = () => {

  const { isAdmin , isAuthanticated,user ,getAuthUser } = useUserContext()
  const naviagate = useNavigate()
  console.log("auth",isAuthanticated,user)
  useEffect(()=>{
    getAuthUser()
    console.log("admin",isAdmin)
    if(isAdmin) 
      {
        naviagate("/dashboard")
      }
  },[isAdmin,isAuthanticated])
  return (
    <div className='w-screen' >
          <NavBar />
          <Outlet />
          <Footer/>
    </div >
  )
}

export default Root