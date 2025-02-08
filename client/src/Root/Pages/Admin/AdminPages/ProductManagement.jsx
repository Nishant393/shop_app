import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Plus, Minus, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import server from '../../../../cofig/config';
import { Link } from 'react-router-dom';
import { Button } from '@mui/joy';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProduct] = useState([]);

  const getAllProduct = () => {
    try {
      axios.get(`${server}product/allproducts`).then(({data}) => {
        setProduct(data.products)
      })
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

  const handelIncrement = async (id , stock)=>{
    console.log(id,stock)
    try {
      stock++
      console.log(id,stock)
        await axios.put(`${server}product/update/${id}`, {
          quantity:stock
        },{withCredentials:true})
            .then((e) => {
                if (e.data.success) {
                    naviagate("/product-management")
                }
                console.log(e.data.message)
                toast.success(e.data.message);
            }).catch((e) => {
                toast.error(e.response.data.error.message);
                console.log(e.response.data.error.message)
                console.log(e.response.data.success)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-4 text-white">
          <Search className="text-white" /> 
          Product Management
        </h1>

        <input
          type="text"
          placeholder="Search products by name or brand"
          className="w-full px-4 py-3 bg-white/20 text-white rounded-md mb-6 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredProducts.length === 0 ? (
          <div className='w-full flex flex-col items-center gap-5 text-white'>
            <h1>No products available</h1>
            <Link to="/add-product">
              <Button variant="solid" color="primary">Add Product</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-white">
              <thead>
                <tr className="bg-white/20">
                  {['Name', 'Brand', 'Price', 'Stock', 'Actions', 'Quantity'].map((header) => (
                    <th key={header} className="border border-white/30 p-3 text-left">{header}</th>
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
                        <button className="p-1 rounded hover:bg-white/20">
                          <Minus className="h-4 w-4 text-white" />
                        </button>
                        <span>{product.stock}</span>
                        <button onClick={()=>handelIncrement(product._id , product.stock)}  className="p-1 rounded hover:bg-white/20">
                          <Plus className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </td>
                    <td className="border border-white/30 p-3">
                      <Link to={`/edit-product/${product._id}`} 
                      className="inline-block rounded hover:bg-white/20">
                        <button 
                        className="p-2 m-1 mx-3 rounded"
                      >

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
        )}
      </div>
    </div>
  );
};

export default ProductManagement;