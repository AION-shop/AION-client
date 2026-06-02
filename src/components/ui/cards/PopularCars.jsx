import React, { useState, useEffect, useContext } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../../../LangContext";
import { motion } from "framer-motion";

// 1. Backend ishlamayotgan paytda ko'rinadigan chiroyli static avtomobillar ro'yxati
const STATIC_POPULAR_CARS = [
  {
    _id: "aion-y-plus",
    title: "AION Y PLUS",
    subtitle: "Keng qamrovli va aqlli shahar krossoveri. Premium qulaylik va yuqori texnologiyalar uyg'unligi.",
    thumbnail: "https://www.bigwheels.my/wp-content/uploads/2024/02/GAC-AION-Y-PLUS-2.jpg"
  },
  {
    _id: "aion-s-plus",
    title: "AION S PLUS",
    subtitle: "Aerodinamik dizayn va futuristik salon. Tezyurar elektro sedan ishqibozlari uchun.",
    thumbnail: "https://img.caixin.com/2021-11-01/163575175630998.jpg"
  },
  {
    _id: "aion-v-plus",
    title: "AION V PLUS",
    subtitle: "Oilaviy sayohatlar uchun mukammal SUV. Maksimal xavfsizlik va uzoq masofa kafolati.",
    thumbnail: "https://d3jvxfsgjxj1vz.cloudfront.net/news/wp-content/uploads/2025/05/09162244/gac-aion-es-launched-in-uae-price-variants-specs-7-1024x576.jpg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function DiscoverSection() {
  const { t } = useContext(LangContext);
  const [cards, setCards] = useState(STATIC_POPULAR_CARS);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/popular`);
        if (!res.ok) throw new Error("Backend offline");
        const json = await res.json();
        
        if (Array.isArray(json)) {
          setCards(json);
        }
      } catch (error) {
        console.log("Backend ishlamadi, static ma'lumotlar ishlatilmoqda.");
        setCards(STATIC_POPULAR_CARS);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCars();
  }, []);

  const translations = {
    title: t?.discover?.title || "KOLLEKSIYANI KASHF ETING",
    subtitle: t?.discover?.subtitle || "GAC AION'ning eng so'nggi va innovatsion elektromobillari bilan kelajakka qadam qo'ying.",
    more: t?.discover?.more || "Batafsil"
  };

  if (loading) {
    return (
      <section className="py-32 flex justify-center bg-transparent">
        <div className="w-10 h-10 border-4 border-gray-100/20 border-t-blue-600 rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="py-12 md:py-24 bg-transparent transition-colors duration-700"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* HEADER */}
        <header className="mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-4"
          >
            <Sparkles size={16} /> 2026 Collection
          </motion.div>
          
          {/* text-slate-900 o'rniga text-current yoki dinamik rang qo'shildi */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-current leading-[0.9] break-words">
            {translations.title}
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl text-base sm:text-lg font-medium">
            {translations.subtitle}
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {(Array.isArray(cards) ? cards : STATIC_POPULAR_CARS).map((card) => (
            <motion.article
              key={card._id}
              variants={cardVariants}
              onClick={() => navigate(`/about-car/${card._id}`)}
              className="group relative rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer shadow-2xl aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/11] bg-slate-900 border border-white/5"
            >
              {/* NEW BADGE */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  New Model
                </div>
              </div>

              {/* IMAGE */}
              <div className="absolute inset-0">
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                <h3 className="text-white text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-tight group-hover:text-blue-400 transition-colors duration-500">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-white/60 text-sm sm:text-lg max-w-md line-clamp-2 mb-8 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700">
                  {card.subtitle}
                </p>

                {/* BUTTON */}
                <div className="flex items-center">
                  <button className="flex items-center gap-3 text-white px-8 py-4 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest shadow-white/10 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {translations.more}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* SHIMMER EFFECT */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
      `}</style>
    </motion.section>
  );
}