import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const Kart = () => {
  const [cart, setCart] = useState([
    {
      productName: "Ghee",
      stock: 3,
      price: "200",
      originalPrice: "250",
      description: "hello its my first ghee product",
      category: "fngc",
      brand: "mooku",
      qty: 0,
      productURL: "https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"
    },
    {
      productName: "oil",
      stock: 3,
      price: "500",
      originalPrice: "600",
      description: "hello its my first ghee product",
      category: "now",
      brand: "moku",
      qty: 9,
      productURL: "https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"
    }
  ]);

  const updateQuantity = (index, change) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const newQty = newCart[index].qty + change;
      
      if (newQty >= 0 && newQty <= newCart[index].stock) {
        newCart[index].qty = newQty;
      }
      return newCart;
    });
  };

  const removeItem = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (Number(item.originalPrice) * item.qty), 0);
  };

  const getTotalDiscount = () => {
    return cart.reduce((total, item) => {
      const discount = (Number(item.originalPrice) - Number(item.price)) * item.qty;
      return total + discount;
    }, 0);
  };

  const getFinalTotal = () => {
    return cart.reduce((total, item) => total + (Number(item.price) * item.qty), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="text-center">
          <img src="/api/placeholder/400/400" alt="Empty cart" className="mx-auto mb-6" />
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
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-blue-900">Shopping Cart ({getTotalItems()} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cart.map((item, index) => (
                <div key={index} className="border-b last:border-0 p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.productURL}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.productName}</h3>
                      <p className="text-gray-600">{item.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium text-lg">₹{item.price}</span>
                        <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                        <span className="text-green-600 text-sm">
                          {Math.round(((Number(item.originalPrice) - Number(item.price)) / Number(item.originalPrice)) * 100)}% off
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(index, -1)}
                        className="p-1 rounded hover:bg-gray-100"
                        disabled={item.qty === 0}
                      >
                        <Minus size={18} />
                      </button>
                      
                      <span className="w-8 text-center">{item.qty}</span>
                      
                      <button 
                        onClick={() => updateQuantity(index, 1)}
                        className="p-1 rounded hover:bg-gray-100"
                        disabled={item.qty === item.stock}
                      >
                        <Plus size={18} />
                      </button>

                      <button 
                        onClick={() => removeItem(index)}
                        className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4 text-blue-900">Price Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Price ({getTotalItems()} items)</span>
                  <span>₹{getSubtotal()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- ₹{getTotalDiscount()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 font-semibold text-lg flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{getFinalTotal()}</span>
                </div>
                <p className="text-green-600 text-sm">You will save ₹{getTotalDiscount()} on this order</p>
              </div>
              <button className="mt-4 w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 font-medium">
                Proceed to Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kart;