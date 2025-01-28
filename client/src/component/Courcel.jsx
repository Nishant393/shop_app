import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { 
      src: 'https://picsum.photos/800/400?random=1', 
      caption: 'Explore Beautiful Landscapes' 
    },
    { 
      src: 'https://picsum.photos/800/400?random=2', 
      caption: 'Discover Stunning Views' 
    },
    { 
      src: 'https://picsum.photos/800/400?random=3', 
      caption: 'Embrace Nature\'s Beauty' 
    }
  ];

  const goToSlide = (slideIndex) => {
    setCurrentSlide((slideIndex + slides.length) % slides.length);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    const autoSlideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(autoSlideInterval);
  }, [currentSlide]);

  return (
    <div className="relative w-full my-3 max-w-4xl mx-auto overflow-hidden">
      <div className="absolute z-10 flex space-x-2 bottom-4 left-1/2 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white opacity-100' : 'bg-white opacity-50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative carousel-item min-w-full flex-shrink-0">
            <img 
              src={slide.src} 
              className="w-full object-cover" 
              alt={`Slide ${index + 1}`} 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
              <p className="text-lg">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide} 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-2 z-10"
      >
        <span className="text-2xl">‹</span>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-2 z-10"
      >
        <span className="text-2xl">›</span>
      </button>
    </div>
  );
};

export default ImageCarousel;