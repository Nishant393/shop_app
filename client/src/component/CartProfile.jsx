import React, { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import server from '../cofig/config';
import toast from 'react-hot-toast';


const CartProfile = ({ product, qty, cart, getCartDetail }) => {
  const [cartDetail, setCartDetail] = useState(product)
  const [isLoading, setIsLoading] = useState(true)

  const handelRemoveCart = async () => {
    try {
      await axios.delete(`${server}cart/cart/item/delete/${product._id}`, { withCredentials: true }).then(async (d) => {
        toast.success(d?.data.message)
        await getCartDetail()
      }).catch((e) => {
        console.log(e)
      })
    } catch (error) {
      console.log(error);
    }
  };
  const handelIncrement = async () => {
    try {
      qty++
      console.log(qty)
      await axios.patch(`${server}cart/update-quantity/${cart}`, {
        quantity: qty
      }, { withCredentials: true })
        .then(async (e) => {
          console.log(e.data)
          if (e.data.success) {
            toast.success(e.data.message);
            await getCartDetail()
          }
        }).catch((e) => {
          console.log(e)
          // toast.error(e.response.data.error.message);
        })
    } catch (error) {
      console.log(error)
    }
  }
  const handelDecrement = async () => {
    try {
      if (qty > 0) {
        qty--
      }
      await axios.patch(`${server}cart/update-quantity/${cart}`, {
        quantity: qty
      }, { withCredentials: true })
        .then(async (e) => {
          console.log(e.data)
          if (e.data.success) {
            toast.success(e.data.message);
            await getCartDetail()
          }
        }).catch((e) => {
          console.log(e)
          // toast.error(e.response.data.error.message);
        })

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="flex items-center">
        <img src={cartDetail?.productUrl?.url} alt={cartDetail.productName} className="w-20 h-20 mr-4 object-cover rounded-lg shadow-sm" />
        <div>
          <p className="font-medium text-slate-900 text-lg">{cartDetail.productName}</p>
          <p className="text-blue-600 font-semibold">₹{cartDetail.price}</p>
        </div>
      </div>
      <div className='flex gap-4' >
        <div className="flex items-center space-x-2">
          <button onClick={() => handelDecrement()}
            className="p-1 rounded hover:bg-white/20">
            <Minus className="h-4 w-4" />
          </button>
          <span className="">{qty}</span>
          <button onClick={() => handelIncrement()}
            className="p-1 rounded hover:bg-white/20">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button onClick={handelRemoveCart} className="text-blue-600 hover:bg-blue-100 p-3 rounded-full transition-all duration-300">
          Remove
        </button>
      </div>
    </>
  )
}

export default CartProfile
