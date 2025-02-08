import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../Provider/AuthContext';
import { Image, LayoutDashboard, Mail, Plus, ShoppingBag, LogOut } from 'lucide-react';

const AdminNavigation = () => {
    const { pathname } = useLocation()
    const { user, isAuthenticated, setIsAuthenticated } = useUserContext()

    const navItems = [
        { 
            to: "/dashboard", 
            icon: LayoutDashboard, 
            label: "Dashboard" 
        },
        { 
            to: "/add-product", 
            icon: Plus, 
            label: "Add Product" 
        },
        { 
            to: "/add-carousel", 
            icon: Image, 
            label: "Add Carousel" 
        },
        { 
            to: "/send-notification", 
            icon: Mail, 
            label: "Send Notification" 
        },
        { 
            to: "/product-management", 
            icon: ShoppingBag, 
            label: "Product Management" 
        }
    ];

    const handleLogout = () => {
        setIsAuthenticated(false);
    }

    return (
        <div className="w-44 sm:w-96 min-h-screen flex justify-between flex-col shadow-lg bg-gradient-to-br from-slate-900  to-slate-800 text-white">
            <nav className="flex justify-between h-screen flex-col">
                <div>
                    {/* User Profile Header */}
                    <div className='cursor-pointer bg-white/10 p-5 gap-3 flex items-center'>
                        <div className="bg-white/20 rounded-full h-10 w-10 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                {user.name ? user.name[0].toUpperCase() : 'N'}
                            </span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-white'>{user.name}</span>
                            <span className='text-white/75 text-sm'>{user.email}</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    {navItems.map((item) => (
                        <Link 
                            key={item.to}
                            to={item.to}
                            className={`flex items-center w-full p-3 hover:bg-white/10 ${
                                pathname === item.to 
                                    ? 'bg-white/20 rounded-s-xl' 
                                    : ''
                            }`}
                        >
                            <item.icon className="mr-2" size={20} />
                            {item.label}
                        </Link>
                    ))}
                </div>

            </nav>
        </div>
    );
}

export default AdminNavigation