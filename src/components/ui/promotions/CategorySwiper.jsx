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

  // BEAUTIFUL GRADIENTS FOR CATEGORY ICON CIRCLES
  const generateGradient = (index) => {
    const gradients = [
      "from-rose-400 to-rose-600",
      "from-indigo-400 to-indigo-600",
      "from-blue-400 to-blue-600",
      "from-emerald-400 to-emerald-600",
      "from-yellow-400 to-yellow-600",
      "from-orange-400 to-orange-600",
      "from-fuchsia-400 to-fuchsia-600",
    ];
    return gradients[index % gradients.length];
  };

  // RASROCHKA NAVIGATION
  const openCategory = (model) => {
    navigate(`/rasrochka?model=${encodeURIComponent(model)}`);
  };

  // LOADING SKELETON
  if (loading) {
    return (
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-32 gap-3">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-lg text-gray-700">Kategoriya yuklanmoqda...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 relative">

        {/* MAIN WHITE CARD */}
        <div className="bg-white rounded-3xl shadow-[0_4px_18px_rgba(0,0,0,0.12)] p-4 relative">

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow border 
            flex items-center justify-center transition z-10
            ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow border 
            flex items-center justify-center transition z-10
            ${currentIndex >= maxIndex ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>

          {/* CATEGORY ITEMS */}
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
                    onClick={() => openCategory(category.model)}
                    className="group cursor-pointer flex flex-col items-center"
                  >
                    <div className="relative mb-2">
                      <div className="w-16 h-16 rounded-full border-[2.5px] border-red-400 p-[3px] group-hover:border-red-500 transition">
                        <div
                          className={`w-full h-full rounded-full bg-gradient-to-br ${generateGradient(
                            index
                          )} flex items-center justify-center shadow`}
                        >
                          <img
                            src={category.icon}
                            alt={category.name}
                            className="w-10 h-10 object-contain drop-shadow"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-center text-gray-700 max-w-[80px] leading-tight 
                      font-medium group-hover:text-red-500 transition">
                      {category.model}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOTS INDICATOR */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-3 gap-1">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all 
                    ${currentIndex === i ? "bg-red-500" : "bg-gray-300"}`}
                ></button>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
