import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className=' nav w-screen px-6 py-3'>
      <div className='flex justify-between'>
        <div>
          Logo
          ShopApp
        </div>
        <div>
          <ul className='flex gap-4 ' >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">cart</Link></li>
            <li><Link to="/Products">Products</Link></li>
            <li><Link to="/order">order</Link></li>
            <li><Link to="/sign-up">register</Link></li>
            <li><Link to="/sign-in">Login</Link> </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default NavBar