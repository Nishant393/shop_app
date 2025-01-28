import { Check, Cross, FileWarning, Heart, NotepadTextIcon, WifiZeroIcon, WormIcon } from 'lucide-react'
import React from 'react'

const ProductUiDetail = ({ product }) => {
  console.log(product)
  return (
    <div className='w-3/5 shadow-lg' >
      <div className=' flex flex-col  px-12 w-full' >

        <h1 className='text-slate-900  ' >{product.productName}</h1>
        <h2 className='text-slate-900 text-2xl '>₹{product.price} </h2>
        <span>Descripton</span>
        <p className='text-slate-500 text-sm'>{product.description}</p>
        <div className='border-slate-100 p-3 flex-col flex gap-8 my-3 border-2' >

          <h2>Specifications</h2>
        <div className='border-slate-100 border-2'>
          <div className='flex gap-10' >
            <span className='text-slate-700' >Brand:</span>
            <p className='text-blue-900 text-sm' > {product.brand} </p>
          </div>
          <div className='flex gap-10' >
            <span className='text-slate-700' >Category:</span>
            <p className='text-blue-900 text-sm' > {product.category} </p>
          </div>
          <div className='flex gap-10' >
            <span className='text-slate-700' >Availablaty:</span>
            <p className='text-blue-900 text-sm' > {product.stock == 0 ? "False" : <Check/>    } </p>
          </div>
        </div>
        </div>
        <button 
        className="flex  items-center justify-center px-4 py-2 bg-rose-300 text-rose-700 hover:bg-rose-40000 hover:text-rose-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group
        "
      >
        <Heart 
          className="mr-2 
          text-red-600 
          group-hover:fill-red-600 
          group-hover:scale-110 
          transition-all 
          duration-300"
        />
        Like
      </button>
      </div>
    </div>
  )
}

export default ProductUiDetail