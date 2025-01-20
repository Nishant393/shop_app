import React, { useEffect } from 'react'
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
import { useUserContext } from "../Provider/AuthContext"
import axios from 'axios';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import server from '../cofig/config';

const NavBar = () => {

  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation()
  const matches = useMediaQuery('(min-width: 768px)')
  const { user, isAuthanticated } = useUserContext()


  const handelLogout = async () => {
    axios.post(`${server}user/logout`,{},{withCredentials:true}).then((data)=>{
      console.log(data)
    }).catch((e)=>console.log(e))
  }

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(inOpen);
  };

  useEffect(() => {
    console.log("isAuthenticated", isAuthanticated)
    console.log("user", user)
  }, [user])

  return (
    <nav className="bg-blue-600 w-screen p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left side menu items */}
        <div className="flex items-center text-white space-x-8">
          <h1>Shop Logo</h1>
        </div>
        <div>
          {matches ?

            <div className="flex items-center space-x-8">
              <a href="/" className={`${pathname=="/" ? "text-cyan-200":''} text-white flex items-center gap-2 hover:text-blue-200`}>
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="/products" className={`${pathname=="/products" ? "text-cyan-200":''} text-white flex items-center gap-2 hover:text-blue-200`}>
              <SearchIcon size={10} />
                <span>Products</span>
              </a>
              <a href="/likes" className={`${pathname=="/likes" ? "text-cyan-200":''} text-white flex items-center gap-2 hover:text-blue-200`}>
                <Heart size={20} />
                <span>Likes</span>
              </a>
              <a href="/cart" className={`${pathname=="/cart" ? "text-cyan-200":''} text-white flex items-center gap-2 hover:text-blue-200`}>
                <ShoppingCart size={20} />
                <span>Cart</span>
              </a>
              <a href="/sign-up" className={`${isAuthanticated ? "hidden" : " flex"} text-white flex items-center gap-2 hover:text-blue-200`}>
                <span>register</span>
              </a>
              <li onClick={handelLogout} className={`${isAuthanticated ? "flex" : "hidden"} text-white flex items-center gap-2 hover:text-blue-200`}>
                <LogoutIcon size={10} />
                <span>Logout</span>
              </li>
              <a href="/sign-in" className={`${isAuthanticated ? "hidden" : " flex"} text-white flex items-center gap-2 hover:text-blue-200`}>
                <span>login</span>
              </a>
              <a href="/contact" className={`${pathname=="/contact" ? "text-cyan-200":''} text-white flex items-center gap-2 hover:text-blue-200`}>
                <span>Contact</span>
              </a>
              <Link to={"/profile"} className=" cursor-pointer flex items-center">
                <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">N</span>
                </div>
              </Link>
            </div>
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
                onClose={toggleDrawer(false)}
              >
                <ul className='flex gap-4 my-5 justify-between h-full flex-col '  >
                  <div className='flex gap-4 flex-col' >
                    {isAuthanticated ?
                      <div className=' cursor-pointer bg-blue-700 text-white p-5 gap-3 flex ' >
                        <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xl">n</span>
                        </div>
                        <div className='flex flex-col' >

                        <Link className=' lowercase' to="/">{user.name}</Link>
                        <Link className='lowercase' to="/">{user.email}</Link>
                        </div>
                      </div>
                      :
                      <div className='bg-blue-700 text-white p-5 gap-3 flex ' ><PersonIcon />  <Link to="/sign-up">Login & Sign Up</Link>
                      </div>
                    }

                    <Link to={"/"} className={` ${pathname == "/" ? "bg-gray-200"  : "" } cursor-pointer hover:bg-slate-200  text-gray-700 flex gap-3 p-3`} > <HomeIcon /> Home</Link>
                    <Link to={"/like"} className={` cursor-pointer hover:bg-slate-200  text-gray-700 flex gap-3 p-3 ${pathname == "/like" ? "bg-gray-200"  : "" } `}  > <FavoriteIcon /> My Watchlist</Link>
                    <Link to={"/cart"} className={` cursor-pointer hover:bg-slate-200  text-gray-700 flex gap-3 p-3 ${pathname == "/cart" ? "bg-gray-200"  : "" } `} > <ShoppingCartIcon /> My Cart</Link>
                    <Link to={"/products"} className={` cursor-pointer hover:bg-slate-200  text-gray-700 flex gap-3 p-3 ${pathname == "/products" ? "bg-gray-200"  : "" } `} ><SearchIcon />  Explore</Link>
                    <Link to={"/order"} className={` cursor-pointer hover:bg-slate-200  text-gray-700 flex gap-3 p-3 ${pathname == "/order" ? "bg-gray-200"  : "" } `} > <BookmarkBorderIcon />My order</Link>
                    <Link to={"/contact"} className={` cursor-pointer hover:bg-slate-200  text-gray-700 flex gap-3 p-3 ${pathname == "/contact" ? "bg-gray-200"  : "" } `} > <BookmarkBorderIcon />contact</Link>
                  </div>
                  <button className={` ${isAuthanticated ? "flex" : "hidden"} rounded-xl bg-blue-600 text-white  border-b-slate-800 p-5 mx-7`} >Logout</button>
                </ul>
              </Drawer>
            </>
          }
        </div>
      </div>
    </nav>
    // <div className=' nav w-screen px-6 py-5'>

    //   <div className='flex justify-between'>
    //     <div>
    //       Logo
    //       ShopApp
    //     </div>
    //     <div>
    //       {matches ?
    //         <>
    //           <ul className='flex gap-8 h-10 my-auto ' >
    //             <li className={`duration-200 ${pathname == "/" ? 'border-b-2' : "border-0"}`}  ><Link to="/">  <HomeIcon />  Home</Link></li>
    //             <li className={`duration-200 ${pathname == "/Products" ? 'border-b-2' : "border-0"}`}  ><Link to="/Products"> <SearchIcon /> Products</Link></li>
    //             <li className={`duration-200 ${pathname == "/cart" ? 'border-b-2' : "border-0"}`} ><Link to="/cart"><ShoppingCartIcon /></Link></li>
    //             <li className={`duration-200 ${isAuthanticated ? "flex" : "hidden"} ${pathname == "/like" ? 'border-b-2' : "border-0"}`} ><Link to="/cart">like</Link></li>
    //             <li className={`duration-200 ${isAuthanticated ? "hidden" : "flex"}  ${pathname == "/sign-up" ? 'border-b-2' : "border-0"}`} ><Link to="/sign-up"> <PersonIcon /> register</Link></li>
    //             <li className={`duration-200 ${isAuthanticated ? "hidden" : "flex"} ${pathname == "/sign-in" ? 'border-b-2' : "border-0"}`} ><LoginIcon /><Link to="/sign-in">Login</Link> </li>
    //             <li onClick={handelLogout} className={`${isAuthanticated ? "flex" : "hidden"} cursor-pointer `} > <LogoutIcon /> Logout </li>
    //             <li className=' cursor-pointer'>
    //               <div className='rounded-full h-12 w-12 bg-black text-white flex' >
    //                 <h1 className='m-auto' >n</h1>
    //               </div>
    //             </li>
    //           </ul>
    //         </>

    //         :
    //         <>

    //           <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
    //             Open drawer
    //           </Button>

    //           <Drawer
    //             open={open}
    //             anchor="right"
    //             size="lg"
    //             color="primary"
    //             invertedColors
    //             variant="outlined"
    //             onClose={toggleDrawer(false)}>
    //             <ul className='flex gap-4 my-5 justify-between h-full flex-col '  >
    //               <div className='flex gap-4 flex-col' >
    //                 <div className='bg-blue-700 text-white p-5 gap-3 flex ' ><PersonIcon />  <Link to="/sign-up">Login & Sign Up</Link>
    //                 </div>
    //                 <div className='text-gray-700 flex gap-3 p-3' > <HomeIcon /> <Link to="/">Home</Link>
    //                 <div className='text-gray-700 flex gap-3 p-3' > <FavoriteIcon /> <Link to="/like">My Watchlist</Link>
    //                 <div className='text-gray-700 flex gap-3 p-3' > <ShoppingCartIcon /> <Link to="/cart"> My Cart</Link>
    //                 <div className='text-gray-700 flex gap-3 p-3' ><SearchIcon />  <Link to="/Products">Explore</Link>
    //                 <div className='text-gray-700 flex gap-3 p-3' > <BookmarkBorderIcon /><Link to="/order">My order</Link>
    //               </div>
    //               <button className='rounded-xl bg-blue-600 text-white  border-b-slate-800 p-5 mx-7' >Logout</button>
    //             </ul>
    //           </Drawer>
    //         </>
    //       }

    //     </div>
    //   </div>

    // </div >
  )
}

export default NavBar