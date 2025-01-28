import React, { useState } from 'react';
import { User, Heart, ShoppingCart, Receipt } from 'lucide-react';
import { useUserContext } from '../../Provider/AuthContext';


const Profile = () => {

  const [watchlist, setWatchlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useUserContext()
  const EmptyState = ({ icon: Icon, message }) => (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500 bg-slate-50 rounded-lg">
      <Icon size={48} className="mb-4 text-blue-600" />
      <p className="text-lg text-slate-900 font-medium">{message}</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Profile Section */}
      <div className="border-none p-6 hover:shadow-2xl shadow-lg bg-white">
        <div className=" text-white bg-sky-900 rounded-md">
          <h2 className="flex items-center text-2xl p-1 ">
            <User className="mr-2" /> Personal Profile
          </h2>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Name</label>
              <p className="text-lg font-semibold text-slate-900">{user.name}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Email</label>
              <p className="text-lg text-slate-900">{user.email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Phone</label>
              <p className="text-lg text-slate-900">+91 {user.mobileNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="  p-6 hover:shadow-2xl border-none shadow-lg">
        <div className="bg-sky-900 text-white rounded-md">
          <h2 className="flex items-center text-2xl p-1 ">
            <Heart className="mr-2" /> Watchlist
          </h2>
        </div>
        <div className="mt-4">
          {watchlist.length === 0 ? (
            <EmptyState 
              icon={Heart} 
              message="Your watchlist is empty. Save items you love!" 
            />
          ) : (
            watchlist.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-2 p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 object-cover rounded" />
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="border-none  p-6 hover:shadow-2xl shadow-lg">
        <div className="bg-sky-900 text-white rounded-md">
          <h2 className="flex items-center text-2xl p-1 ">
            <ShoppingCart className="mr-2 " /> Shopping Cart
          </h2>
        </div>
        <div className="mt-4">
          {cart.length === 0 ? (
            <EmptyState 
              icon={ShoppingCart} 
              message="Your cart is empty. Start shopping!" 
            />
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-2 p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 object-cover rounded" />
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      value={item.quantity} 
                      className="w-16 text-center border border-slate-300 rounded p-1" 
                      min="1"
                    />
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right mt-4 p-4 bg-slate-50 rounded-lg">
                <span className="text-xl font-bold text-slate-900">
                  Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Orders Section */}
      <div className="border-none  p-6 hover:shadow-2xl shadow-lg">
        <div className="bg-sky-900 text-white rounded-md">
          <h2 className="flex items-center text-2xl p-1 ">
            <Receipt className="mr-2" /> Order History
          </h2>
        </div>
        <div className="mt-4">
          {orders.length === 0 ? (
            <EmptyState 
              icon={Receipt} 
              message="No orders yet. Time to start shopping!" 
            />
          ) : (
            orders.map(order => (
              <div key={order.id} className="border border-slate-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-900">Order #{order.id}</span>
                  <span className={`
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    px-3 py-1 rounded-full text-sm font-medium
                  `}>
                    {order.status}
                  </span>
                </div>
                <div className="mb-2 text-slate-600">
                  <p>Date: {order.date}</p>
                  <p className="font-semibold text-slate-900">Total: ${order.total.toFixed(2)}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-2">Items:</h3>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-slate-700">
                      <span>{item.name}</span>
                      <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;