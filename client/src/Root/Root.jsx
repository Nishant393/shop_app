import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../component/NavBar'

const Root = () => {
  return (
    <div>
      Root
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default Root