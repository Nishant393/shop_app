import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavigation from '../../../component/AdminNavigation'

const AdminRoot = () => {
  return (
    <div>
      <div className="min-h-screen  w-screen bg-gray-100 shadow-lg">
        <nav className="p-4 bg-slate-900">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        </nav>
        <div className="flex">
          <AdminNavigation />
          <div className="flex-1">
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRoot