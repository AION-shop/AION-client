import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function DiscoverSection() {
  const [discoverItems, setDiscoverItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
        const data = await response.json();
        setDiscoverItems(data); // data: [{id, name, icon, slug}, ...]
      } catch (err) {
        console.error("Error fetching discover items:", err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleItemClick = (item) => {
    // Har bir kartani bosganda category sahifasiga yo'naltiradi
    navigate(`/category/${item.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-3 sm:border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 rounded-full h-12 w-12 sm:h-16 sm:w-16 border-3 sm:border-4 border-blue-200 opacity-20 animate-ping"></div>
          </div>
          <p className="text-gray-600 mt-4 sm:mt-6 font-medium text-sm sm:text-base">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (!discoverItems.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl sm:text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-base sm:text-lg">No discover items available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight px-4">
              Discover
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-600 px-4">
              Explore our curated categories and find what interests you
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {discoverItems.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => handleItemClick(item)}
                className="group relative h-56 sm:h-64 md:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  animation: "slideUp 0.6s ease-out",
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg group-hover:shadow-xl sm:group-hover:shadow-2xl transition-shadow duration-500"></div>

                {/* Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/50 to-transparent sm:from-gray-900/80 sm:via-gray-900/40"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 md:p-8 z-10">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <div className="mb-2 sm:mb-3 hidden sm:block sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>

                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                      {item.name}
                    </h3>

                    <p className="hidden sm:block text-white/90 text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform translate-y-2 group-hover:translate-y-0">
                      Explore our curated collection of {item.name.toLowerCase()} content
                    </p>

                    <div className="flex items-center gap-2 sm:gap-3 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:delay-100">
                      <span className="text-white/90 text-xs sm:text-sm font-medium">Learn more</span>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                        <ArrowRight
                          size={16}
                          className="sm:w-5 sm:h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-blue-400/50"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Optional pagination */}
          {discoverItems.length > 4 && (
            <div className="text-center mt-8 sm:mt-12">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                View All Categories
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
