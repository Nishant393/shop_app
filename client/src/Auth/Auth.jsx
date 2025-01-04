import Button from '@mui/joy/Button';
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const Auth = () => {

  const { id } = useParams()
  return (
    // <div className='w-full h-full flex align-middle  justify-center'>
    <div className=' bg-gray-700 h-4/5 w-4/5 m-auto flex  rounded-2xl justify-between'>
      <div className='w-2/6 rounded-ss-2xl  bg-red  '>
        <div className=' flex flex-col justify-center w-full h-full align-middle my-auto gap-5 mx-5'>
          <h1>Welcome To Shop App</h1>
          <p className='text-white' >he best things in life are purchased.</p>
         <Link sx={{width:"100%"}} to={"./"}>  <Button className='back_button' sx={{backgroundColor:"#ef9a9a"}}> Go Back</Button></Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Auth