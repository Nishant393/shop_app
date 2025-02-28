import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, ShoppingCart, Check, Star, FenceIcon } from 'lucide-react'
import axios from 'axios'
import server from '../../cofig/config'
import FeedBack from '../../component/FeedBack'
import { useUserContext } from "../../Provider/AuthContext.jsx"
import toast from 'react-hot-toast'
import { filledInputClasses } from '@mui/material'

const ProductItem = () => {

  const [product, setProduct] = useState({
    productName: "",
    stock: 0,
    price: "0",
    description: "",
    category: "",
    brand: "",
    productUrl: {
      public_id: "",
      url: ""
    }
  })
  const [isCartAdded, setIsCartAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthanticated } = useUserContext()


  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${server}product/getbyid/${id}`, { withCredentials: true })
      setProduct(response.data.product)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const addToCartHandeler = async (quantity = 1) => {

    if (isAuthanticated) {
      try {
        await axios.post(`${server}cart/addtocart`, {
          productId: id, quantity: 1
        }, { withCredentials: true }).then((data) => {
          toast.success(data?.data.message)
          console.log(data?.data.message)
          console.log(data)
        })
      } catch (error) {
        console.log(error)
        return error
      }
    }
    else {
      navigate("/sign-in")
    }

  }

  const likeHandler = async () => {
    if (isAuthanticated) {
      try {
        await axios.post(`${server}wishlist/add`, {
          productId: id, quantity: 1
        }, { withCredentials: true }).then((data) => {
          toast.success(data?.data.message)
          console.log(data?.data.message)
          console.log(data)
        })
      } catch (error) {
        console.log(error)
        return error
      }
    }
    else {
      navigate("/sign-in")
    }

  }

  const getCart = async () => {
    try {
      await axios.get(`${server}cart/mycart/`,product,user, { withCredentials: true }).then((data) => {

        const filtered = data?.data.cartSummary.items.filter((e) => { return e.product == id })
        console.log("data", filtered, filtered.length === 0 ? false : true)

        setIsCartAdded(filtered.length === 0 ? false : true)

      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    getCart()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="relative group">
            {console.log(product.productUrl.url)}
            <img
              src={product.productUrl.url}
              alt={product.productName}
              className="max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full flex items-center">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1 text-sm"></span>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full flex space-x-4">
            {
              isCartAdded ?
                <button
                  className="flex-1 flex items-center justify-center 
                bg-gradient-to-r from-blue-400 to-blue-600 
                text-white 
                py-3 
                rounded-lg 
                hover:from-blue-500 hover:to-blue-700 
                transition-all 
                group"
                >
                  <Link className='flex' to={"/cart"} >
                    <ShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
                    Go to cart
                  </Link>
                </button>
                :
                <button
                  className="flex-1 flex items-center justify-center 
                bg-gradient-to-r from-blue-400 to-blue-600 
                text-white 
                py-3 
                rounded-lg 
                hover:from-blue-500 hover:to-blue-700 
                transition-all 
                group"
                  onClick={() => addToCartHandeler()}
                >
                  <ShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
            }


            <button
              className="flex-1 flex items-center justify-center 
                bg-gradient-to-r from-rose-400 to-rose-600 
                text-white 
                py-3 
                rounded-lg 
                hover:from-rose-500 hover:to-rose-700 
                transition-all 
                group"
            >
              <Heart className="mr-2 group-hover:scale-110 transition-transform" />
              Wishlist
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold capitalize text-slate-900 mb-4">{product.productName}</h1>

          <div className="flex items-center mb-4">
            <h2 className="text-3xl text-green-600 font-semibold mr-4">₹{product.price}</h2>
            <span className="line-through text-slate-500">₹{parseInt(product.price) + 50}</span>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600">{product.description}</p>
          </div>

          <div className="border-t border-b py-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Product Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-600">Brand:</span>
                <p className="font-medium text-blue-900 ">{product.brand}</p>
              </div>
              <div>
                <span className="text-slate-600">Category:</span>
                <p className="font-medium  capitalize text-blue-900 ">{product.category == 0 ? "no" : product.category}</p>
              </div>
              <div>
                <span className="text-slate-600">Weight:</span>
                <p className="font-medium  text-blue-900 ">{product.quantity}</p>
              </div>
              <div >
                <span className="text-slate-600">Availability:</span>
                <p className="font-medium flex  items-center">
                  {product.stock !== 0 ?
                    <>
                      <Check className="text-green-500 mr-2" /> In Stock
                    </>
                    :
                    <>
                      <span className='text-rose-600' >Out of Stock</span>
                    </>
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              className="flex-1 bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-center my-5' >
        <div className='bg-white w-3/4 p-7 flex justify-center shadow-lg rounded-lg' >
          <FeedBack />
        </div>
      </div>
    </div>
  )
}

export default ProductItem