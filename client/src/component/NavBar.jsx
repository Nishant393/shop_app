import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {

  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation()
  const matches = useMediaQuery('(min-width: 768px)')
  
  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(inOpen);
  };

  return (
    <div className=' nav w-screen px-6 py-5'>
      <div className='flex justify-between'>
        <div>
          Logo
          ShopApp
        </div>
        <div>
          {matches ?
            <>
              <ul className='flex gap-8 ' >
                <li className={`duration-200 ${pathname == "/" ? 'border-b-2' : "border-0"}`}  ><Link to="/">  <HomeIcon />  Home</Link></li>
                <li className={`duration-200 ${pathname == "/Products" ? 'border-b-2' : "border-0"}`}  ><Link to="/Products"> <SearchIcon /> Products</Link></li>
                <li className={`duration-200 ${pathname == "/cart" ? 'border-b-2' : "border-0"}`} ><Link to="/cart"><ShoppingCartIcon /></Link></li>
                <li className={`duration-200 ${pathname == "/sign-up" ? 'border-b-2' : "border-0"}`} ><Link to="/sign-up"> <PersonIcon /> register</Link></li>
                <li className={`duration-200 ${pathname == "/sign-in" ? 'border-b-2' : "border-0"}`} ><LoginIcon /><Link to="/sign-in">Login</Link> </li>
                {/* <li> <LogoutIcon fontSize='sm' /> <Link to="/sign-in">Logout</Link> </li> */}
              </ul>
            </>

            :
            <>

              <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
                Open drawer
              </Button>

              <Drawer
                open={open}
                anchor="right"
                size="lg"
                color="primary"
                invertedColors
                variant="outlined"
                onClose={toggleDrawer(false)}>
                <ul className='flex gap-4 my-5 justify-between h-full flex-col '  >
                  <div className='flex gap-4 flex-col' >
                    <div className='bg-blue-700 text-white p-5 gap-3 flex ' ><PersonIcon />  <Link to="/sign-up">Login & Sign Up</Link>
                    </div>
                    <div className='text-gray-700 flex gap-3 p-3' > <HomeIcon /> <Link to="/">Home</Link></div>
                    <div className='text-gray-700 flex gap-3 p-3' > <FavoriteIcon /> <Link to="/like">My Watchlist</Link></div>
                    <div className='text-gray-700 flex gap-3 p-3' > <ShoppingCartIcon /> <Link to="/cart"> My Cart</Link></div>
                    <div className='text-gray-700 flex gap-3 p-3' ><SearchIcon />  <Link to="/Products">Explore</Link></div>
                    <div className='text-gray-700 flex gap-3 p-3' > <BookmarkBorderIcon /><Link to="/order">My order</Link></div>
                  </div>
                  <button className='rounded-xl bg-blue-600 text-white  border-b-slate-800 p-5 mx-7' >Logout</button>
                </ul>
              </Drawer>
            </>
          }

        </div>
      </div>

    </div >
  )
}

export default NavBar