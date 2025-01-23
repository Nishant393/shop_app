import React, { useEffect } from 'react'
import { useUserContext } from '../../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'


const Home = () => {

const { isAdmin } = useUserContext()
console.log(isAdmin)
const navigate = useNavigate()

useEffect(()=>{
    isAdmin ? navigate("/dashboard") : ""

},[])

  return (
          <div>
            {

              console.log("isAdmin")

            }
            Home
            </div>
  )
}

export default Home