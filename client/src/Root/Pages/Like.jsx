import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
// import image from "/home/nishant/VScode/server/Shop-return/client/public/empty-wishlist.svg"
const Like = () => {
  const [cart, setCart] = useState([]);


  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-center">
          <img alt="Empty cart" className="mx-auto h-72 -mt-14" />
          <button className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
            <ShoppingBag className="mr-2" />
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      likes
    </div>
  );
};

export default Like;