import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SwiperBanner = ({ isFullHeight = false }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [banners.length, currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const containerHeight = isFullHeight
    ? "min-h-screen"
    : "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]";

  if (loading)
    return (
      <div
        className={`w-full ${containerHeight} flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        <p className="text-white text-lg sm:text-xl font-semibold animate-pulse">
          Loading banners...
        </p>
      </div>
    );

  if (error || banners.length === 0)
    return (
      <div
        className={`w-full ${containerHeight} flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        <p className="text-white text-lg sm:text-xl font-medium px-4 text-center">
          {error || "Bannerlar mavjud emas"}
        </p>
      </div>
    );

  return (
    <div
      className={`w-full relative overflow-hidden rounded-lg border border-white/10 shadow-xl ${containerHeight}`}
    >
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner._id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-20" : "opacity-0 z-0"
            }`}
          >
            <a
              href={banner.link || "#"}
              target={banner.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="block w-full h-full relative"
            >
              {/* Rasmni ekran bo‘yicha ideal qilish */}
              <div className="w-full h-full flex items-center justify-center bg-black/20 overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.title || "Banner"}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Title */}
              {banner.title && (
                <div
                  className={`absolute top-1/4 left-1/2 -translate-x-1/2 z-30 text-center px-4 transition-all duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg leading-tight">
                    {banner.title}
                  </h2>
                </div>
              )}
            </a>
          </div>
        );
      })}

      {/* Navigation */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            disabled={isTransitioning}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full p-2 sm:p-3 transition-all duration-300 group-hover:scale-110">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </button>
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full p-2 sm:p-3 transition-all duration-300 group-hover:scale-110">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </button>
        </>
      )}

      {/* Pagination */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-500 rounded-full disabled:cursor-not-allowed ${
                index === currentIndex
                  ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white shadow-lg"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70 hover:scale-125"
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {banners.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / banners.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SwiperBanner;
