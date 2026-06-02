import React, { useState, useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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

// 1. Static ma'lumotlar ombori
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
      
      <div className="pointer-events-none fixed inset-0 z-[20] opacity-40">
        <SnowAnimation />
        <WeatherAnimation locationId="YOUR_LOCATION_ID" />
      </div>

      <Helmet>
        <title>GAC AION | Kelajak Energiyasi</title>
        <meta name="description" content={translations.home.discoverCollection} />
      </Helmet>

      <Hero
        heading={translations.hero.heroHeading}
        subheading={translations.hero.heroSub}
        buttonText={translations.hero.heroButton}
        scrollText={translations.hero.scrollText}
      />

      <Container>
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

          {/* Grid */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {colProducts.map((product) => (
              <Card3D key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="sm:hidden flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {colProducts.map((product) => (
              <div key={product.id} className="min-w-[85vw] snap-center">
                <Card3D product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 relative">
          <SwiperBanner isFullHeight={false} />
        </section>

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

// 🔥 YANGILANGAN VA TO'LIQ ISHLOVCHI 3D CARD KOMPONENTI (Framer Motion orqali LERP va Glow effekti)
function Card3D({ product }) {
  const cardRef = useRef(null);

  // Sichqoncha koordinatalari uchun Motion qiymatlari
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // LERP effekti uchun Spring (Silliq harakatlanish)
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  // Dinamik nurlanish (Glow effect) joylashuvi
  const glowX = useMotionValue("50%");
  const glowY = useMotionValue("50%");
  const glowOpacity = useMotionValue(0);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // 3D og'ish burchagini hisoblash (0 atrofida -0.5 dan 0.5 gacha)
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);

    // Glow effekti uchun foizli koordinatalar
    glowX.set(`${px * 100}%`);
    glowY.set(`${py * 100}%`);
  }

  function handleMouseEnter() {
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  }

  return (
    <Link to={`/about-car/${product.id}`} className="block no-underline w-full h-full group" style={{ perspective: "1200px" }}>
      {/* Suzish (Float) va 3D harakat bloki */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[32px] overflow-hidden aspect-[3/4] cursor-pointer select-none bg-[#0d1117] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] will-change-transform"
      >
        
        {/* DINAMIK SICHQONCHA NURI (GLOW EFFECT) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            opacity: glowOpacity,
            background: useTransform(() => `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(99, 140, 255, 0.2) 0%, transparent 60%)`)
          }}
        />

        {/* PREMIUM CHEGARA YORUG'LIGI (BORDER GLOW) */}
        <div className="absolute inset-0 pointer-events-none z-20 rounded-[32px] border border-transparent bg-gradient-to-br from-blue-500/30 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* 3D RASM QATLAMI */}
        <div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover scale-[1.04] group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
            loading="lazy"
          />
          {/* Gradient qoplamasi */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f]/95 via-[#05070f]/45 to-[#05070f]/08" />
        </div>

        {/* HIGH-TECH BADGE */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-4 py-2 bg-[#0a0c14]/65 backdrop-blur-xl border border-white/12 rounded-full" style={{ transform: "translateZ(35px)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8aff] animate-ping absolute left-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8aff]" />
          <span className="text-[10px] font-semibold text-[#7eb8ff] tracking-[0.12em] uppercase">
            {product.badge}
          </span>
        </div>

        {/* MATNLAR VA INTERFEYS BLOKI */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-30 text-white" style={{ transform: "translateZ(55px)", transformStyle: "preserve-3d" }}>
          
          {/* Texnik xarakteristikalar */}
          <div className="flex gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/08 text-[10px] text-white/70 font-medium">
              <BatteryCharging size={12} className="text-emerald-400" />
              <span>{product.range}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/08 text-[10px] text-white/70 font-medium">
              <Gauge size={12} className="text-blue-400" />
              <span>{product.power}</span>
            </div>
          </div>

          {/* Sarlavha */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase mb-2 leading-none group-hover:text-blue-400 transition-colors duration-300">
            {product.title}
          </h3>
          
          {/* Tavsif */}
          <p className="text-white/50 text-[11px] leading-[1.55] max-w-sm line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Narx va Tugma */}
          <div className="flex items-center justify-between border-t border-white/08 pt-4">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/35 font-semibold">Starting at</span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                {product.price}
              </span>
            </div>

            {/* Doiraviy strelka */}
            <div className="w-10 h-10 rounded-full bg-white text-[#0d1117] flex items-center justify-center shadow-xl group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
              <ArrowUpRight size={20} className="stroke-[2.5]" />
            </div>
          </div>

        </div>
      </motion.div>
    </Link>
  );
}