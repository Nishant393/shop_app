import React, { useState, useMemo } from 'react';
import { Edit, Plus, Minus } from 'lucide-react';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProduct] = useState([
    {
      productName: "Ghee",
      stock: 3,
      price: "200",
      description: "hello its my first ghee product",
      category: "fngc",
      brand: "mooku",
      qty: 0,
      productURL: "https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"
    },
    ...Array(9).fill({
      productName: "Sample Product",
      stock: 5,
      price: "150",
      qty: 0,
      description: "Sample product description",
      category: "misc",
      brand: "Generic",
      productURL: "https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"
    })
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleIncrement = (id) => {
    setProduct(products.map(product =>
      product.id === id
        ? { ...product, stock: product.stock + 1 }
        : product
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.stock > 1
        ? { ...product, stock: product.stock - 1 }
        : product
    ));
  };

  const toggleEdit = (id) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, isEditing: !product.isEditing }
        : product
    ));
  };

  const handleProductEdit = (id, field, value) => {
    setProduct(products.map(product =>
      product.id === id
        ? { ...product, [field]: value }
        : product
    ));
  };

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
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2">{product.brand}</td>
                <td className="border p-2">rs{product.price}</td>
                <td className="border p-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 border rounded hover:bg-gray-100"
                      onClick={() => handleDecrement(product.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{product.stock}</span>
                    <button
                      className="p-1 border rounded hover:bg-gray-100"
                      onClick={() => handleIncrement(product.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <button
                    className="p-1 border rounded hover:bg-gray-100"
                    onClick={() => toggleEdit(product.id)}
                  >
                    <Edit className="h-4 w-4" />
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