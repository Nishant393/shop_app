import React from 'react'
import { useUserContext } from '../../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'


const Home = () => {

const { isAdmin } = useUserContext()
// console.log(isAdmin)
const navigate = useNavigate()
  return (
    <>
      {
        isAdmin ?
          <>
            { navigate("/dashboard")}
          </>
          :
          <div>Home</div>
      }

    </>
  )
}

export default Home