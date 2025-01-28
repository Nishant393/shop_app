import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const scrollLeft = () => {
    const container = document.getElementById('product-container');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('product-container');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="bg-white p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-center text-blue-800 mb-4">
        Top Products
      </h2>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white hidden md:block"
        >
          <ChevronLeft className="w-6 h-6 text-blue-800" />
        </button>
        
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white hidden md:block"
        >
          <ChevronRight className="w-6 h-6 text-blue-800" />
        </button>

        {/* Products Container */}
        <div
          id="product-container"
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="snap-start flex-none w-[280px] sm:w-[320px] md:w-[300px]"
            >
              <div
                className={`h-full p-3 md:p-4 rounded-lg border-2 transition-all duration-300
                  ${currentIndex === index ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-blue-50'}
                `}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-3">
                  <img
                    className="w-full h-full object-contain"
                    src={product.productURL}
                    alt={product.productName}
                  />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-blue-900 line-clamp-1">
                  {product.productName}
                </h3>
                
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <span className="font-semibold">Price:</span> ₹{product.price}
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <span className="font-semibold">Stock:</span> {product.stock}
                  </div>
                  <div className="bg-blue-50 p-2 rounded col-span-2">
                    <span className="font-semibold">Brand:</span> {product.brand}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;