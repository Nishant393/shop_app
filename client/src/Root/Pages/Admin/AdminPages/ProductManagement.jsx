import React, { useState, useMemo, useEffect } from 'react';
import { Edit, Plus, Minus, Delete, DeleteIcon, LucideDelete, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import server from '../../../../cofig/config';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProduct] = useState([]);

  const getAllProduct = ()=>{
    try {
      axios.get(`${server}product/allproducts`).then(({data})=>{
        setProduct(data.products)
        console.log(data.products)
      })
    } catch (error) {
      
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleIncrement = (id) => {
    
  };

  const handleDecrement = (id) => {
   
  };

  const handelDelete=async(id)=>{
    console.log("id",id)
    try {
      axios.post(`${server}product/delete/${id}`).then((data)=>{
        console.log(data)
        toast.success(data.message || "delete succsessfully !!")
        getAllProduct()
      })
    } catch ({error}) {
      console.log(error)
      toast.warning(error.message || "something went wrong !!")
    }
  }

  const handleProductEdit = (id, field, value) => {
    
  };
  
  useEffect(()=>{
    getAllProduct()
  },[])

  return (
    <div className="p-4 min-h-screen max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>

      <input
        type="text"
        placeholder="Search products by name or brand"
        className="w-full px-3 py-2 border rounded-md mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Brand</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Actions</th>
              <th className="border p-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2">{product.brand}</td>
                <td className="border p-2">rs{product.price}</td>
                <td className="border p-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 border rounded hover:bg-gray-100"
                      onClick={() => handleDecrement(product._id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{product.stock}</span>
                    <button
                      className="p-1 border rounded hover:bg-gray-100"
                      onClick={() => handleIncrement(product._id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <button
                    className="p-2 m-1 border rounded hover:bg-gray-100"
                    onClick={() => toggleEdit(product._id)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1  border rounded hover:bg-gray-100"
                    onClick={() => handelDelete(product._id)}
                  >
                    <Trash2 Name="h-2 w-2" />
                  </button>
                </td>
                <td className="border p-2" >{product.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;