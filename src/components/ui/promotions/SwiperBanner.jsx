import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";


SwiperCore.use([Navigation, Pagination, Autoplay]);

const SwiperBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/banners/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBanners(data.banners);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bannerlarni olishda xato:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center my-5 text-white font-medium">
        Loading banners...
      </p>
    );

  if (banners.length === 0)
    return (
      <p className="text-center my-5 text-white font-medium">
        Bannerlar mavjud emas
      </p>
    );

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {banners.length === 1 ? (
        <a
          href={banners[0].link || "#"}
          target={banners[0].link ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="block w-full h-full cursor-pointer relative"
        >
          <img
            src={banners[0].image}
            alt={banners[0].title || "Promotion Banner"}
            className="w-full h-full object-cover"
          />
          {banners[0].title && (
            <h2 className="absolute bottom-10 left-10 text-white font-bold text-4xl drop-shadow-lg">
              {banners[0].title}
            </h2>
          )}
        </a>
      ) : (
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          slidesPerView={1}
          className="w-full h-full"
          style={{ zIndex: 0 }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id} className="w-full h-full">
              <a
                href={banner.link || "#"}
                target={banner.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <img
                  src={banner.image}
                  alt={banner.title || "Promotion Banner"}
                  className="w-full h-full object-cover"
                />
                {banner.title && (
                  <h2 className="absolute bottom-10 left-10 text-white font-bold text-4xl drop-shadow-lg">
                    {banner.title}
                  </h2>
                )}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Swiper navigation buttons always centered */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 -translate-y-1/2 pointer-events-none">
        <button className="swiper-button-prev pointer-events-auto text-white text-3xl font-bold drop-shadow-lg">
          &#10094;
        </button>
        <button className="swiper-button-next pointer-events-auto text-white text-3xl font-bold drop-shadow-lg">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SwiperBanner;
