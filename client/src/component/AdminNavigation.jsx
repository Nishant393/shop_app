import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Provider/AuthContext';
import { Image, LayoutDashboard, Mail, Plus, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import server from '../cofig/config';

const AdminNavigation = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { user,isAuthanticated,setIsAuthenticated , getAuthUser } = useUserContext()
    const handelLogout = async () => {
        await axios.post(`${server}user/logout`,{}, { withCredentials: true }).then((data) => {
          setIsAuthenticated(false)
            navigate("/")
            getAuthUser()
        }).catch((e) => console.log(e))
      }
    return (
        <div className="w-64 bg-white  min-h-screen flex justify-between flex-col  shadow-lg">
            <nav className=" flex justify-between  h-screen flex-col gap-2">
                <div>
                    <div className=' cursor-pointer bg-blue-700 text-white p-5 gap-3 flex ' >
                        <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xl">n</span>
                        </div>
                        <div className='flex flex-col' >

                            <Link className=' lowercase' to="/">{user.name}</Link>
                            <Link className='lowercase' to="/">{user.email}</Link>
                        </div>
                    </div>
                    <Link to={"/dashboard"}
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${pathname === '/dashboard' ? 'bg-gray-100' : ''}`}
                    >
                        <LayoutDashboard className="mr-2" size={20} />
                        Dashboard
                    </Link>
                    <Link to={"/add-product"}
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${pathname === '/add-product' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <Plus className="mr-2" size={20} />
                        Add Product
                    </Link>
                    <Link to={"add-carousel"}
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${pathname === 'add-carousel' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <Image className="mr-2" size={20} />
                        Add Carousel
                    </Link>
                    <Link to={"send-email"}
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${pathname === 'send-email' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <Mail className="mr-2" size={20} />
                        Send Notification
                    </Link>
                    <Link to={"product-management"}
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${pathname === 'product-management' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <ShoppingBag className="mr-2" size={20} />
                        Product Management
                    </Link>

                    
                </div>
            <button onClick={handelLogout} className={` ${isAuthanticated ? "flex" : "hidden"} rounded-xl bg-blue-600 text-white  border-b-slate-800 p-5 mx-7`} >Logout</button>
            </nav>
        </div>
    );
}

export default AdminNavigation