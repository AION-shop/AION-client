import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Container from "../components/shared/Container";
import CategorySwiper from "../components/ui/cards/PopularCars";
import ColProductCard from "../components/ui/cards/Products";
import Hero from "../components/shared/Hero";
import Loading from "../components/layouts/Loading";
import SwiperBanner from "../components/ui/promotions/SwiperBanner";
import SnowAnimation from "./SnowAnimation";
import WeatherAnimation from "./WeatherAnimation";

const getApiUrl = () => import.meta.env.VITE_API_URL;

export default function Home() {
  const { t } = useTranslation();
  const [colProducts, setColProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkBg, setDarkBg] = useState(false); // bg-black flag

  const API_URL = useMemo(() => getApiUrl(), []);

  // Products fetch qilish
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/col-products`);
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        const items = Array.isArray(json) ? json : json.products || [];
        setColProducts(items);
      } catch (error) {
        setColProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  // Scroll bo'yicha bg-black / bg-white logikasi
  useEffect(() => {
    if (!colProducts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let isAnyVisible = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isAnyVisible = true;
          }
        });

        setDarkBg(isAnyVisible);
      },
      { threshold: 0.7 }
    );

    const cards = document.querySelectorAll(".observe-card");
    cards.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [colProducts]);

  if (loading) return <Loading />;

  return (
    <main
      className={`overflow-x-hidden relative transition-colors duration-700 ease-in-out ${
        darkBg ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* ❄️ Animations as overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <SnowAnimation />
        <WeatherAnimation locationId="YOUR_LOCATION_ID" />
      </div>

      <Helmet>
        <title>Gac Aion</title>
        <meta name="description" content={t("discoverCollection")} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative z-10">
        <Hero />
      </div>

      <Container>
        {/* Popular Products */}
        <section className="py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t("popularModels")}</h2>
            <span
              className={`text-sm px-4 py-2 rounded-full border transition-colors duration-700 ease-in-out ${
                darkBg ? "bg-white/10 border-white/20 text-white" : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {t("itemsAvailable", { count: colProducts.length })}
            </span>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
            {colProducts.map((card, idx) => (
              <div
                key={idx}
                className="observe-card animate-fade-up"
                data-index={idx}
              >
                <ColProductCard card={card} />
              </div>
            ))}
          </div>

          {/* Mobile Scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {colProducts.map((card, idx) => (
              <div
                key={idx}
                className="min-w-[80vw] snap-center observe-card animate-fade-up"
                data-index={idx}
              >
                <ColProductCard card={card} />
              </div>
            ))}
          </div>
        </section>

        {/* Swiper Banner */}
        <section className="py-5 relative z-10">
          <SwiperBanner />
        </section>

        {/* Discover Section */}
        <section className="py-16 relative z-10">
          <h2
            className={`text-4xl md:text-6xl font-bold mb-12 text-center transition-colors duration-700 ease-in-out ${
              darkBg ? "text-white" : "text-gray-900"
            }`}
          >
            {t("discoverCollection")}
          </h2>
          <div className="max-w-7xl mx-auto px-4">
            <CategorySwiper darkMode={darkBg} />
          </div>
        </section>
      </Container>

      {/* Animations CSS */}
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
