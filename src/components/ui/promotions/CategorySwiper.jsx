// CategorySwiper.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategorySwiper() {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Backenddan categorylarni olish
  const getCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const itemsPerView = 10;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  const generateGradient = (index) => {
    const gradients = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-teal-400 to-teal-600'
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section className="py-6 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-lg text-base-content ml-4">Загрузка категорий...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-base-100">
      <div className="container mx-auto px-4 relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous categories"
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
        >
          <ChevronLeft size={16} className="text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          aria-label="Next categories"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition ${
            currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
        >
          <ChevronRight size={16} className="text-gray-600" />
        </button>

        {/* Categories Container */}
        <div className="overflow-hidden mx-12">
          {categories.length > 0 ? (
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.slug}
                  className="flex-none"
                  style={{ width: `calc(${100 / itemsPerView}% - 16px)` }}
                >
                  <div
                    className="group cursor-pointer flex flex-col items-center"
                    onClick={() => window.open(category.url, '_blank')}
                  >
                    {/* Category circle */}
                    <div className="relative mb-3">
                      <div className="w-16 h-16 rounded-full border-2 border-red-400 p-1 group-hover:border-red-500 transition-colors duration-200">
                        <div className={`w-full h-full rounded-full ${generateGradient(index)} flex items-center justify-center shadow-inner`}>
                          <img src={category.icon} alt={category.name} className="w-10 h-10 object-contain"/>
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>

                    {/* Category name */}
                    <div className="text-center max-w-[80px]">
                      <p className="text-xs text-gray-700 leading-tight font-medium group-hover:text-red-500 transition-colors duration-200">
                        {category.model}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex items-center justify-center">
              <div className="alert alert-warning">
                <span className="text-lg">Категории не найдены.</span>
              </div>
            </div>
          )}
        </div>

        {/* Dots indicator */}
        {maxIndex > 0 && (
          <div className="flex justify-center mt-6 space-x-1">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${currentIndex === index ? 'bg-red-500' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
