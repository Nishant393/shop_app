import React, { useState } from 'react';

const TopProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products] = useState([
    {
      productName: "Ghee",
      stock: 3,
      price: "200",
      description: "hello its my first ghee product",
      category: "fngc",
      brand: "mooku",
      productURL: "https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"
    },
    ...Array(9).fill({
      productName: "Sample Product",
      stock: 5,
      price: "150",
      description: "Sample product description",
      category: "misc",
      brand: "Generic",
      productURL: "https://rukminim2.flixcart.com/image/280/280/kkwwu4w0/edible-oil/c/b/s/lite-pouch-sunflower-oil-priya-original-imagy5hsjbqyfhhh.jpeg?q=70"
    })
  ]);

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Top Products</h2>

      <div className="flex space-x-4 overflow-x-auto">
        {products.map((product, index) => (
          <div>
            <div
              key={index}
              className={`min-w-[300px] p-4 rounded-lg border-2 transition-all duration-300 
              ${currentIndex === index ? 'bg-blue-100 border-blue-500 ' : 'bg-white border-gray-200 hover:bg-blue-50'}
            `}
              onClick={() => setCurrentIndex(index)}
            >
            <div className='w-full ' >
              <img className='mx-auto h-52' src={product.productURL} alt="" srcset="" />
            </div>
              <h3 className="text-xl font-semibold text-blue-900">{product.productName}</h3>
              <p className="text-black mt-2">{product.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-blue-50 p-2 rounded">
                  <span className="font-bold">Price:</span> ₹{product.price}
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <span className="font-bold">Stock:</span> {product.stock}
                </div>
                <div className="bg-blue-50 p-2 rounded col-span-2">
                  <span className="font-bold">Brand:</span> {product.brand}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;