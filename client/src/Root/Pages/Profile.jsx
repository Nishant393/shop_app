



import React, { useEffect, useState } from 'react';
import { User, Heart, Receipt, ShoppingCart, MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import { useUserContext } from '../../Provider/AuthContext';
import server from '../../cofig/config';
import axios from 'axios';
import CartProfile from '../../component/CartProfile';
import AddressForm from '../../component/AddressForm';
import WishListProfile from '../../component/WishListProfile';

const Profile = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const { user , isAuthanticated } = useUserContext();

  const EmptyState = ({ icon: Icon, message }) => (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm">
      <Icon size={48} className="mb-4 text-blue-600 opacity-75" />
      <p className="text-lg text-slate-800 font-medium">{message}</p>
    </div>
  );

  const getCartDetail = async () => {
    try {
      await axios.get(`${server}cart/mycart/`, { withCredentials: true }).then((data) => {
        setCarts(data?.data.cartSummary.items)
        console.log(data?.data.cartSummary.items)
      }).catch((e)=>{
        console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  };

  const getWatchlistDetail = async () => {
    try {
      await axios.get(`${server}wishlist/mylist`, { withCredentials: true }).then((data) => {
        setWatchlist(data?.data.wishlist)
        console.log(data?.data.cartSummary)
      }).catch((e)=>{
        console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  };

  const getAddresses = async () => {
    try {
      await axios.get(`${server}address/my/address`, { withCredentials: true }).then((data) => {
        setAddresses(data?.data.data);
        console.log("data",data?.data.data)
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAddress = async (addressData) => {
    console.log(addressData)
    try {
      await axios.post(`${server}address/my/addnew`, addressData, { withCredentials: true }).then((d)=>{
        console.log(d)
        getAddresses();
        setShowAddressForm(false);
      }).catch((e)=>{
        console.log(e)
      })

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAddress = async (addressData) => {
    try {
      await axios.put(`${server}address/my/update"`, addressData, { withCredentials: true });
      getAddresses();
      setEditingAddress(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${server}address/${addressId}`, { withCredentials: true });
      getAddresses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatchlistDetail();
    console.log("kuhliuhpicjhSJNNOIANINFICNSINDISNINASNFNSNF")
    getCartDetail();
    getAddresses();
  },[]);



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

      {/* New Address Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="bg-blue-900 p-4">
          <h2 className="flex items-center text-2xl text-white font-semibold">
            <MapPin className="mr-3" /> Addresses
          </h2>
        </div>
        <div className="p-6">
          {!showAddressForm && !editingAddress && (
            <button
              onClick={() => setShowAddressForm(true)}
              className="mb-4 flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </button>
          )}

          {showAddressForm && (
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setShowAddressForm(false)}
            />
          )}

          {editingAddress && (
            <AddressForm
              address={editingAddress}
              onSubmit={handleUpdateAddress}
              onCancel={() => setEditingAddress(null)}
            />
          )}

          {!showAddressForm && !editingAddress && (
            <div className="space-y-4">
              {addresses.length === 0 ? (
                <EmptyState icon={MapPin} message="No addresses saved yet. Add your first address!" />
              ) : (
                addresses.map(address => (
                  <div key={address._id} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full mb-2">
                          {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                        </span>
                        <p className="text-slate-900 font-medium">{address.street}</p>
                        <p className="text-slate-600">{address.city}, {address.state}</p>
                        <p className="text-slate-600">PIN: {address.pincode}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingAddress(address)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {/* Watchlist Section - New design */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <div className="bg-blue-600 p-4">
          <h2 className="flex items-center text-2xl text-white font-semibold">
            <Heart className="mr-3" /> WishList
          </h2>
        </div>
        <div className="p-6">
          {watchlist.length === 0 ? (
            <EmptyState icon={Heart} message="Your watchlist is empty. Save items you love!" />
          ) : (
            watchlist.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300">
                <WishListProfile/>
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
          {
            carts?.length === 0 ? (
              <EmptyState icon={ShoppingCart} message="Your cart is empty. Start shopping!" />
            ) : (
              <>
                {carts.map(item => (
                  <div key={item._id} className="flex items-center justify-between mb-3 p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">

                    <CartProfile getCartDetail={getCartDetail} cart={item._id} product={item?.product} qty={item.quantity} />
                  </div>
                ))}
                <div className="mt-6 p-4 bg-slate-900 rounded-lg text-white">
                  <span className="text-xl font-bold">
                    Total: ₹{carts.reduce((sum, item) => sum + item.price * item.quantity, 0)}
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