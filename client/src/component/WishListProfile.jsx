import React from 'react'

const WishListProfile = () => {
  return (
    <>
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
    </>
  )
}

export default WishListProfile