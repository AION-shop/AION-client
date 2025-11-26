import React, { useEffect, useState } from "react";
import Container from "../../shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SwiperBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/banners/")
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
      <p className="text-center my-5 text-base-content font-medium">
        Loading banners...
      </p>
    );

  if (banners.length === 0)
    return (
      <p className="text-center my-5 text-base-content font-medium">
        Bannerlar mavjud emas
      </p>
    );

  // ===== Responsive height: mobile 300px, sm 350px, md 400px, lg 450px =====
  const bannerHeightClass = "h-[300px] w-[100%] sm:h-[350px] md:h-[400px] lg:h-[450px]";

  return (

      <div className="my-5 w-full">
        {banners.length === 1 ? (
          <a
            href={banners[0].link || "#"}
            target={banners[0].link ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`block overflow-hidden rounded-2xl w-full cursor-pointer relative ${bannerHeightClass}`}
            aria-label={banners[0].title || "Promotion Banner"}
          >
            <img
              src={banners[0].image}
              alt={banners[0].title || "Promotion Banner"}
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {banners[0].title && (
              <h2 className="absolute bottom-4 left-4 text-white font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-md">
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
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-2xl"
            aria-label="Promotion banners slider"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner._id}>
                <a
                  href={banner.link || "#"}
                  target={banner.link ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={`block overflow-hidden rounded-2xl w-full cursor-pointer relative ${bannerHeightClass}`}
                  aria-label={banner.title || "Promotion Banner"}
                >
                  <img
                    src={banner.image}
                    alt={banner.title || "Promotion Banner"}
                    className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {banner.title && (
                    <h2 className="absolute bottom-4 left-4 text-white font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-md">
                      {banner.title}
                    </h2>
                  )}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

  );
};

export default SwiperBanner;
