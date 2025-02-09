import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Plus, Minus, Trash2, Search, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import server from '../../../../cofig/config';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProduct] = useState([]);
  let sortOption = "";
  const navigate = useNavigate()
  const getAllProduct = () => {
    try {
      if(sortOption =='a-z'){
        setProduct([])
        console.log("prize a")
        axios.get(`${server}product/allproducts?sort=productName`).then(({data}) => {
          setProduct(data.products)
          console.log(data.products)
        })
      }
      else if(sortOption =='z-a'){
        console.log("prize z")
        axios.get(`${server}product/allproducts?sort=-productName`).then(({data}) => {
          setProduct(data.products)
          console.log(data.products)
        })
      }
      else if(sortOption =='price-low'){
        console.log("prize l")
        axios.get(`${server}product/allproducts?sort=price`).then(({data}) => {
          setProduct(data.products)
          console.log(data.products)
        })
      }
      else if(sortOption =='price-high'){
        axios.get(`${server}product/allproducts?sort=-price`).then(({data}) => {
          setProduct(data.products)
          console.log(data.products)
        })
      }
      else{
        axios.get(`${server}product/allproducts`).then(({data}) => {
          setProduct(data.products)
          console.log(data.products)
        })
        
      }

    } catch (error) {
      toast.error("Failed to fetch products")
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handelIncrement = async (id, stock) => {
    try {
      stock++
      await axios.patch(`${server}product/update/${id}`, {
        stock: stock
      }, {withCredentials: true})
        .then((e) => {
          console.log(e.data.updatedProduct)
          if (e.data.success) {
            toast.success(e.data.message);
            getAllProduct()
          }
        }).catch((e) => {
          console.log(e)
          // toast.error(e.response.data.error.message);
        })
    } catch (error) {
      console.log(error)
    }
  }
  const handelDecrement = async (id, stock) => {
    try {
      if(stock >= 0 ){
        stock--
      }
      await axios.patch(`${server}product/update/${id}`, {
        stock: stock
      }, {withCredentials: true})
        .then((e) => {
          console.log(e.data.updatedProduct)
          if (e.data.success) {
            toast.success(e.data.message);
            getAllProduct()
          }
        }).catch((e) => {
          console.log(e)
          // toast.error(e.response.data.error.message);
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handelDelete = async(id) => {
    try {
      await axios.post(`${server}product/delete/${id}`, {}, {withCredentials:true});
      toast.success("Product deleted successfully");
      getAllProduct()
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }
  
  useEffect(() => {
    getAllProduct()
  }, []) 


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-full md:max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-6 md:p-8 shadow-2xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-4 text-white">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> 
          Product Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) =>{sortOption=e.target.value; getAllProduct()} }
              className="w-full appearance-none px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="a-z" className="bg-slate-800">Name A-Z</option>
              <option value="z-a" className="bg-slate-800">Name Z-A</option>
              <option value="price-low" className="bg-slate-800">Price: Low to High</option>
              <option value="price-high" className="bg-slate-800">Price: High to Low</option>
            </select>
            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ArrowUpDown className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className='w-full flex flex-col items-center gap-4 sm:gap-5 text-white'>
            <h1>No products available</h1>
            <Link to="/add-product">
              <Button variant="solid" color="primary" size="sm" className="text-sm sm:text-base">Add Product</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                {/* Mobile View - Card Layout */}
                <div className="block sm:hidden">
                  {products.map((product) => (
                    <div key={product._id} className="bg-white/5 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-medium">{product.productName}</h3>
                          <p className="text-white/70 text-sm">{product.brand}</p>
                        </div>
                        <p className="text-white font-medium">₹{product.price}</p>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handelDecrement(product._id, product.stock)} 
                            className="p-1 rounded hover:bg-white/20">
                            <Minus className="h-4 w-4 text-white" />
                          </button>
                          <span className="text-white">{product.stock}</span>
                          <button onClick={() => handelIncrement(product._id, product.stock)} 
                            className="p-1 rounded hover:bg-white/20">
                            <Plus className="h-4 w-4 text-white" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link to={`/edit-product/${product._id}`} 
                            className="p-2 rounded hover:bg-white/20">
                            <Edit className="h-4 w-4 text-white" />
                          </Link>
                          <button onClick={() => handelDelete(product._id)}
                            className="p-2 rounded hover:bg-white/20">
                            <Trash2 className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View - Table Layout */}
                <table className="hidden sm:table w-full border-collapse text-white">
                  <thead>
                    <tr className="bg-white/20">
                      {['Name', 'Brand', 'Price', 'Stock', 'Actions', 'Quantity'].map((header) => (
                        <th key={header} className="border border-white/30 p-3 text-left text-sm">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-white/10 transition-colors">
                        <td className="border border-white/30 p-3">{product.productName}</td>
                        <td className="border border-white/30 p-3">{product.brand}</td>
                        <td className="border border-white/30 p-3">₹ {product.price}</td>
                        <td className="border border-white/30 p-3">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => handelDecrement(product._id, product.stock)} 
                              className="p-1 rounded hover:bg-white/20">
                              <Minus className="h-4 w-4 text-white" />
                            </button>
                            <span>{product.stock}</span>
                            <button onClick={() => handelIncrement(product._id, product.stock)} 
                              className="p-1 rounded hover:bg-white/20">
                              <Plus className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        </td>
                        <td className="border border-white/30 p-3">
                          <Link to={`/edit-product/${product._id}`} 
                            className="inline-block rounded hover:bg-white/20">
                            <button className="p-2 m-1 mx-3 rounded">
                              <Edit className="h-4 w-4 text-white" />
                            </button>
                          </Link>
                          <button 
                            className="p-2 m-1 mx-3 rounded hover:bg-white/20"
                            onClick={() => handelDelete(product._id)}
                          >
                            <Trash2 className="h-4 w-4 text-white" />
                          </button>
                        </td>
                        <td className="border border-white/30 p-3">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;