import React, { useState, useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowUpRight, Gauge, BatteryCharging, Zap } from "lucide-react";

import Container from "../components/shared/Container";
import Hero from "../components/shared/Hero";
import CategorySwiper from "../components/ui/cards/PopularCars";
import SwiperBanner from "../components/ui/promotions/SwiperBanner";
import Loading from "../components/layouts/Loading";

import SnowAnimation from "./SnowAnimation";
import WeatherAnimation from "./WeatherAnimation";
import { LangContext } from "../../LangContext";

// 1. Unikal 3D rasmlar va slug-IDlar bilan static ma'lumotlar ombori
const STATIC_PRODUCTS = [
  {
    id: "aion-y-plus",
    title: "GAC AION Y Plus",
    image: "https://avatars.mds.yandex.net/i?id=b54ef19999d2f66daee2d82a2d409c2b05327c27-5310530-images-thumbs&n=13",
    price: "$22,000",
    description: "Zamonaviy, keng va aqlli shahar krossoveri. Premium qulaylik uyg'unligi.",
    range: "430 km",
    power: "150 kW",
    badge: "Ommabop"
  },
  {
    id: "aion-s-plus",
    title: "GAC AION S Plus",
    image: "https://s.auto.drom.ru/i24278/c/photos/fullsize/gac/aion_s_plus/gac_aion_s_plus_1116226.jpg",
    price: "$25,000",
    description: "Aerodinamik dizayn va futuristik salon. Tezyurar sedan ishqibozlari uchun.",
    range: "510 km",
    power: "165 kW",
    badge: "Yangi"
  },
  {
    id: "aion-v-plus",
    title: "GAC AION V Plus",
    image: "https://d3jvxfsgjxj1vz.cloudfront.net/news/wp-content/uploads/2025/05/09162244/gac-aion-es-launched-in-uae-price-variants-specs-7-1024x576.jpg",
    price: "$29,000",
    description: "Oilaviy sayohatlar uchun mukammal SUV. Maksimal xavfsizlik va uzoq masofa.",
    range: "600 km",
    power: "200 kW",
    badge: "Flagman"
  }
];

export default function Home() {
  const { t } = useContext(LangContext);
  const [colProducts] = useState(STATIC_PRODUCTS);
  const [loading] = useState(false);
  const [darkBg, setDarkBg] = useState(false);

  // Tarjimalar zaxirasi
  const translations = {
    home: {
      discoverCollection: t?.home?.discoverCollection || "Kolleksiyani kashf eting",
      popularModels: t?.home?.popularModels || "Ommabop Modellar",
      itemsAvailable: t?.home?.itemsAvailable || "Mavjud modellar: {{count}}"
    },
    hero: {
      heroHeading: t?.hero?.heroHeading || "GAC AION Kelajak Energiyasi",
      heroSub: t?.hero?.heroSub || "Yangi avlod elektromobillari bilan tanishing",
      heroButton: t?.hero?.heroButton || "Batafsil ma'lumot",
      scrollText: t?.hero?.scrollText || "Pastga varoqlang"
    }
  };

  // Fon o'zgarishi uchun Intersection Observer
  useEffect(() => {
    if (!colProducts.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setDarkBg(anyVisible);
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".observe-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [colProducts]);

  if (loading) return <Loading />;

  return (
    <main className={`relative transition-colors duration-[1000ms] ease-out ${darkBg ? "bg-slate-950 text-white" : "bg-white text-gray-900"}`}>
      
      {/* Orqa fondagi chiroyli qor va ob-havo effektlari */}
      <div className="pointer-events-none fixed inset-0 z-[20] opacity-40">
        <SnowAnimation />
        <WeatherAnimation locationId="YOUR_LOCATION_ID" />
      </div>

      <Helmet>
        <title>GAC AION | Kelajak Energiyasi</title>
        <meta name="description" content={translations.home.discoverCollection} />
      </Helmet>

      {/* Hero Section */}
      <Hero
        heading={translations.hero.heroHeading}
        subheading={translations.hero.heroSub}
        buttonText={translations.hero.heroButton}
        scrollText={translations.hero.scrollText}
      />

      <Container>
        {/* POPULAR MODELS SECTION */}
        <section className="py-24 observe-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-3">
                <Sparkles size={14} className="animate-pulse" /> 2026 Smart Lineup
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                {translations.home.popularModels}
              </h2>
            </div>
            <span className={`text-xs font-bold px-5 py-2.5 rounded-full border transition-all duration-500 ${
              darkBg ? "bg-white/5 border-white/10 text-blue-400" : "bg-slate-50 border-gray-200 text-gray-600"
            }`}>
              {translations.home.itemsAvailable.replace("{{count}}", colProducts.length)}
            </span>
          </div>

          {/* Grid: Kattaroq, uzunchoq va maxsus 2 talik ustunli dizayn */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {colProducts.map((product) => (
              <Card3D key={product.id} product={product} darkBg={darkBg} />
            ))}
          </div>

          {/* Mobile Carousel: Telefonlar uchun moslashuvchan swipe */}
          <div className="sm:hidden flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {colProducts.map((product) => (
              <div key={product.id} className="min-w-[85vw] snap-center">
                <Card3D product={product} darkBg={darkBg} />
              </div>
            ))}
          </div>
        </section>

        {/* Swiper Banner Section */}
        <section className="py-12 relative">
          <SwiperBanner isFullHeight={false} />
        </section>

        {/* DISCOVER COLLECTION SECTION */}
        <section className="py-24 observe-card">
          <h2 className={`text-4xl md:text-7xl font-black mb-16 text-center tracking-tight uppercase transition-colors duration-700 ${
            darkBg ? "text-white" : "text-slate-900"
          }`}>
            {translations.home.discoverCollection}
          </h2>
          <div className="max-w-7xl mx-auto">
            <CategorySwiper darkMode={darkBg} cards={colProducts} />
          </div>
        </section>
      </Container>
    </main>
  );
}

// 🔥 NAFIS VA KUCHLI 3D PORTRAIT (UZUNCHOQ) KARTA KOMPONENTI
function Card3D({ product, darkBg }) {
  const cardRef = useRef(null);
  const x = useMotionValue(250);
  const y = useMotionValue(350);

  // Kattaroq va sezgirroq 3D og'ish burchaklari (-12 dan 12 gacha)
  const rotateX = useTransform(y, [0, 700], [12, -12]);
  const rotateY = useTransform(x, [0, 500], [-12, 12]);

  // Sichqoncha o'rniga qarab siljiydigan neon Glow effekt koordinatalari
  const glowX = useTransform(x, (val) => `${val}px`);
  const glowY = useTransform(y, (val) => `${val}px`);

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(250);
    y.set(350);
  }

  return (
    <Link to={`/about-car/${product.id}`} className="block perspective-1000 no-underline w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className={`relative rounded-[40px] overflow-hidden aspect-[3/4] border transition-all duration-500 cursor-pointer shadow-2xl select-none ${
          darkBg 
            ? "bg-slate-900 border-white/5 shadow-black/80" 
            : "bg-slate-900 border-slate-200/10 shadow-slate-300/40"
        }`}
      >
        
        {/* DINAMIK SICHQONChA NURI (GLOW EFFECT) */}
        <motion.div 
          className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(59, 130, 246, 0.2), transparent 45%)`
          }}
        />

        {/* 3D RASM QATLAMI (TranslateZ orqali chuqurlik berilgan) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out scale-100 hover:scale-105"
            loading="lazy"
          />
          {/* To'q gradient qoplamasi */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* HIGH-TECH BADGE */}
        <div className="absolute top-6 left-6 z-20" style={{ transform: "translateZ(35px)" }}>
          <span className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/50 backdrop-blur-xl text-white border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            <Zap size={12} className="text-blue-400" />
            {product.badge}
          </span>
        </div>

        {/* MATNLAR VA INTERFEYS BLOKI (Egilganda oldinga bo'rtib chiqadi) */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 text-white z-20" style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}>
          
          {/* Texnik xarakteristikalar qatori (Hoverda suzib chiqadi) */}
          <div className="flex gap-3 mb-4 text-[11px] font-bold text-gray-300">
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5">
              <BatteryCharging size={13} className="text-emerald-400" />
              <span>{product.range}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5">
              <Gauge size={13} className="text-blue-400" />
              <span>{product.power}</span>
            </div>
          </div>

          {/* Avtomobil Sarlavhasi */}
          <h3 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase mb-3 leading-none transition-colors duration-300 hover:text-blue-400">
            {product.title}
          </h3>
          
          {/* Qisqa tavsif */}
          <p className="text-gray-300/80 text-xs sm:text-sm font-medium leading-relaxed max-w-sm line-clamp-2 mb-6">
            {product.description}
          </p>

          {/* Pastki qism: Narx va premium tugma */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black">STARTING AT</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {product.price}
              </span>
            </div>

            {/* Doiraviy strelka belgisi */}
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-all duration-500 hover:bg-blue-600 hover:text-white hover:rotate-45">
              <ArrowUpRight size={22} className="stroke-[2.5]" />
            </div>
          </div>

        </div>

        {/* Hover qilinganda konturni yorituvchi neon chiziq */}
        <div className="absolute -inset-px bg-gradient-to-tr from-blue-500/20 via-transparent to-white/5 opacity-0 hover:opacity-100 rounded-[40px] transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </Link>
  );
}