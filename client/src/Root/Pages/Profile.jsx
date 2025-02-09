import React, { useEffect, useState } from 'react';
import { User, Heart, ShoppingCart, Receipt } from 'lucide-react';
import { useUserContext } from '../../Provider/AuthContext';
import server from '../../cofig/config';
import axios from 'axios';

const Profile = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useUserContext();

  const EmptyState = ({ icon: Icon, message }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm">
      <Icon size={48} className="mb-4 text-blue-600 opacity-75" />
      <p className="text-lg text-slate-800 font-medium">{message}</p>
    </div>
  );

  const getCartDetail = async () => {
    try {
      await axios.get(`${server}cart/mycart/${user.id}`).then((data) => {
        setCart(data?.data.result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWatchlistDetail = async () => {
    try {
      console.log("watchlist");
    } catch (error) {
      console.log(error);
    }
  };

  const handelRemoveCart = async () => {
    try {
      console.log("remove");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartDetail();
    getWatchlistDetail();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Profile Section - Different styling for user profile */}
      <div className="bg-gradient-to-r from-slate-900 to-black rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="flex items-center text-2xl text-white mb-6">
            <User className="mr-3" /> Personal Profile
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Name</label>
                <p className="text-xl font-semibold text-white">
                  {user.name}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <p className="text-xl text-white">
                  {user.email}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Phone</label>
                <p className="text-xl text-white">
                  +91 {user.mobileNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Section - New design */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="bg-blue-600 p-4">
          <h2 className="flex items-center text-2xl text-white font-semibold">
            <Heart className="mr-3" /> Watchlist
          </h2>
        </div>
        <div className="p-6">
          {watchlist.length === 0 ? (
            <EmptyState icon={Heart} message="Your watchlist is empty. Save items you love!" />
          ) : (
            watchlist.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 mr-4 object-cover rounded-lg shadow-sm" />
                  <div>
                    <p className="font-medium text-slate-900 text-lg">{item.name}</p>
                    <p className="text-blue-600 font-semibold">₹{item.price}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:bg-blue-200 p-3 rounded-full transition-all duration-300">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart Section - New design */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="bg-blue-700 p-4">
          <h2 className="flex items-center text-2xl text-white font-semibold">
            <ShoppingCart className="mr-3" /> Shopping Cart
          </h2>
        </div>
        <div className="p-6">
          {cart.length === 0 ? (
            <EmptyState icon={ShoppingCart} message="Your cart is empty. Start shopping!" />
          ) : (
            <>
              {cart.map(item => (
                <div key={item._id} className="flex items-center justify-between mb-3 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                  <div className="flex items-center">
                    <img src={item.img} alt={item.product.productName} className="w-20 h-20 mr-4 object-cover rounded-lg shadow-sm" />
                    <div>
                      <p className="font-medium text-slate-900 text-lg">{item.product.productName}</p>
                      <p className="text-blue-600 font-semibold">₹{item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={item.quantity}
                      className="w-20 text-center border border-blue-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      min="1"
                    />
                    <button onClick={handelRemoveCart} className="text-blue-600 hover:bg-blue-100 p-3 rounded-full transition-all duration-300">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 p-4 bg-slate-900 rounded-lg text-white">
                <span className="text-xl font-bold">
                  Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Orders Section - New design */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="bg-blue-800 p-4">
          <h2 className="flex items-center text-2xl text-white font-semibold">
            <Receipt className="mr-3" /> Order History
          </h2>
        </div>
        <div className="p-6">
          {orders.length === 0 ? (
            <EmptyState icon={Receipt} message="No orders yet. Time to start shopping!" />
          ) : (
            orders.map(order => (
              <div key={order.id} className="mb-4 bg-blue-50 rounded-lg overflow-hidden border border-blue-100">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-slate-900 text-lg">Order #{order.id}</span>
                    <span className={`
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      px-4 py-1 rounded-full text-sm font-medium
                    `}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mb-4 text-slate-600">
                    <p>Date: {order.date}</p>
                    <p className="font-semibold text-slate-900 text-lg mt-2">Total: ₹{order.total}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-3">Items:</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-slate-700 py-2 border-b border-slate-100 last:border-0">
                        <span>{item.name}</span>
                        <span>{item.quantity} x ₹{item.price}</span>
                      </div>
                    ))}
                  </div>
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