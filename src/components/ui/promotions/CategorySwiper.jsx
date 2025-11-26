import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategorySwiper() {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const getItemsPerView = () => {
    if (window.innerWidth < 380) return 5;
    if (window.innerWidth < 640) return 7;
    return 10;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const resizeHandler = () => setItemsPerView(getItemsPerView());
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () =>
    setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const generateGradient = (index) => {
    const gradients = [
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-green-400 to-green-600",
      "from-red-400 to-red-600",
      "from-yellow-400 to-yellow-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
    ];
    return gradients[index % gradients.length];
  };

  const openCategory = (model) => {
    navigate(`/rasrochka?model=${encodeURIComponent(model)}`);
  };

  if (loading) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-lg text-gray-700 ml-4">Загрузка категорий...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="container mx-auto px-4  relative">

        {/* BOX WRAPPER — white + shadow */}
        <div className="bg-white rounded-3xl shadow-[0_4px_18px_rgba(0,0,0,0.1)] p-4 relative">

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute  top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full 
              bg-white shadow-md border border-gray-200 flex items-center justify-center transition 
              ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"}`}
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full 
              bg-white shadow-md border border-gray-200 flex items-center justify-center transition 
              ${currentIndex >= maxIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"}`}
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>

          {/* Categories */}
          <div className="overflow-hidden px-6">  
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.slug}
                  className="flex-none"
                  style={{
                    width: `calc(${100 / itemsPerView}% - 16px)`,
                  }}
                >
                  <div
                    className="group cursor-pointer flex flex-col items-center"
                    onClick={() => openCategory(category.model)}
                  >
                    <div className="relative mb-3">
                      <div className="w-16 h-16 rounded-full border-[2.5px] border-red-400 p-[3px] group-hover:border-red-500 transition">
                        <div
                          className={`w-full h-full rounded-full bg-gradient-to-br ${generateGradient(
                            index
                          )} flex items-center justify-center shadow-md`}
                        >
                          <img
                            src={category.icon}
                            alt={category.name}
                            className="w-10 h-10 object-contain drop-shadow"
                          />
                        </div>
                      </div>

                      {/* red dot */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>

                    <p className="text-xs text-gray-700 text-center max-w-[80px] leading-tight font-medium group-hover:text-red-500 transition">
                      {category.model}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-4 space-x-1">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-red-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
