import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'
import { useUserContext } from '../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'
// import Dashboard from './Pages/Admin/Dashboard'

const Root = () => {

  const { isAdmin } = useUserContext()
  const naviagate = useNavigate()
  return (
    <div>
      {isAdmin ?
        <>{
        naviagate("/dashboard")
        }
        <Outlet/>
        </>
        :
        <>
          <NavBar />
          <Outlet />
        </>}
    </div>
  )
}

export default Root