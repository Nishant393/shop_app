import { Button } from '@mui/joy'
import { CarTaxiFront, Heart, ShoppingCart } from 'lucide-react'
import React from 'react'

const ProductUiImage = ({product}) => {
    console.log(product)
  return (
    <div className='w-1/5 shadow-lg' >
        <div className=' flex flex-col justify-center h-full my-auto w-full' >
           <img className='sm:h-3/4 h-2/4  mx-auto' src={"https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"} />

      {/* Add to Cart Button */}
      <button 
        className="
          sm:flex hidden items-center justify-center 
          px-4 py-2 
          bg-blue-200 
          text-blue-700 
          hover:bg-blue-300 
          hover:text-blue-800 
          rounded-lg 
          transition-all 
          duration-300 
          transform 
          hover:scale-105 
          shadow-md 
          hover:shadow-lg
          group
        "
      >
        <ShoppingCart 
          className="mr-2 
          text-blue-600 
          group-hover:fill-blue-600 
          group-hover:scale-110 
          transition-all 
          duration-300"
        />
        Add to Cart
      </button>
        </div>
    </div>
  )
}

export default ProductUiImage