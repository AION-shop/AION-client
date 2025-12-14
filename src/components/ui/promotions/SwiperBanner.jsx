import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SwiperBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBanners(data.banners || []);
        else setError("Bannerlarni olishda xatolik yuz berdi");
        setLoading(false);
      })
      .catch(() => {
        setError("Bannerlarni olishda xatolik yuz berdi");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % banners.length);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium">Loading banners...</p>
        </div>
      </div>
    );

  if (error || banners.length === 0)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-center p-4">
        <p className="text-white text-xl font-medium">
          {error || "Bannerlar mavjud emas"}
        </p>
      </div>
    );

  return (
    <div className="w-full relative overflow-hidden rounded-4xl">
      <div className="relative w-full h-[60vh] sm:h-[80vh] md:h-screen">
        {banners.map((banner, index) => (
          <a
            key={banner._id}
            href={banner.link || "#"}
            target={banner.link ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title || "Banner"}
              className="w-full h-full object-cover sm:object-cover md:object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            {banner.title && (
              <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-16 right-4 text-center sm:text-left">
                <h2 className="text-white font-bold text-xl sm:text-4xl md:text-6xl drop-shadow-lg">
                  {banner.title}
                </h2>
                <div className="w-16 h-1 bg-white rounded-full mt-2 mx-auto sm:mx-0"></div>
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Navigation Buttons */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 sm:w-6 h-4 sm:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 sm:p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentIndex
                  ? "w-8 h-2 sm:w-12 sm:h-3 bg-white"
                  : "w-2 h-2 sm:w-3 sm:h-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperBanner;
