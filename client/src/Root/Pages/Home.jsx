import React, { useEffect } from 'react'
import { useUserContext } from '../../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'
import SearchProducts from '../../component/SearchProducts'
import { CategoryOutlined } from '@mui/icons-material'
import Category from '../../component/Category'
import Courcel from '../../component/Courcel'
import TopProduct from '../../component/TopProduct'


const Home = () => {

  const { isAdmin } = useUserContext()
  console.log(isAdmin)
  const navigate = useNavigate()

  useEffect(() => {
    isAdmin ? navigate("/dashboard") : ""
  }, [])

  return (
    <div className='flex flex-col' > 
      <div className='min-h-screen bg-stone-50' >
        <div className='bg-white shadow-md flex gap-2 w-full justify-center align-middle p-4'  >
          <div>
          <SearchProducts/>
          <Category/>
          </div>
        </div>
        <Courcel/>
      </div>
      <TopProduct/>
    </div>
  )
}

export default Home