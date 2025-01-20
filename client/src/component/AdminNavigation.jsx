import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useUserContext } from '../Provider/AuthContext';
import { Image, LayoutDashboard, Mail, Plus, ShoppingBag } from 'lucide-react';

const AdminNavigation = () => {
        const [currentPage, setCurrentPage] = useState('dashboard');
    
    const { user } = useUserContext()
  return (
            <div className="w-64 bg-white h-screen shadow-lg">
                <nav className=" flex flex-col gap-2">
                    <div className=' cursor-pointer bg-blue-700 text-white p-5 gap-3 flex ' >
                        <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xl">n</span>
                        </div>
                        <div className='flex flex-col' >

                            <Link className=' lowercase' to="/">{user.name}</Link>
                            <Link className='lowercase' to="/">{user.email}</Link>
                        </div>
                    </div>
                    <button
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${currentPage === 'dashboard' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <LayoutDashboard className="mr-2" size={20} />
                        Dashboard
                    </button>
                    <button
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${currentPage === 'add-product' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <Plus className="mr-2" size={20} />
                        Add Product
                    </button>
                    <button
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${currentPage === 'add-carousel' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <Image className="mr-2" size={20} />
                        Add Carousel
                    </button>
                    <button
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${currentPage === 'send-email' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <Mail className="mr-2" size={20} />
                        Send Email
                    </button>
                    <button
                        className={`flex items-center w-full p-3 hover:bg-gray-100 ${currentPage === 'product-management' ? 'bg-gray-100' : ''
                            }`}
                    >
                        <ShoppingBag className="mr-2" size={20} />
                        Product Management
                    </button>
                </nav>
            </div>
);
}

export default AdminNavigation