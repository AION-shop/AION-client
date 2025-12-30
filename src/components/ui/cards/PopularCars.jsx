import React, { useState, useEffect, useContext } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../../../LangContext";
import { motion } from "framer-motion";

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
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/popular`)
      .then((res) => res.json())
      .then(setCards)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-32 flex justify-center bg-white">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white py-12 md:py-24"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* HEADER */}
        <header className="mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-blue-600 font-bold tracking-[0.3em] uppercase text-xs mb-4"
          >
            <Sparkles size={16} /> 2025 Collection
          </motion.div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
            {t.discover?.title}
          </h2>
          <p className="mt-6 text-gray-500 max-w-xl text-base sm:text-lg font-medium">
            {t.discover?.subtitle}
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {cards.map((card) => (
            <motion.article
              key={card._id}
              variants={cardVariants}
              onClick={() => navigate(`/about-car/${card._id}`)}
              className="group relative rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer shadow-2xl aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/11]"
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

                {/* Subtitle: Mobilda ham ko'rinadi, faqat opasitisi biroz pastroq */}
                <p className="text-white/60 text-sm sm:text-lg max-w-md line-clamp-2 mb-8 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700">
                  {card.subtitle}
                </p>

                {/* BUTTON: Responsive mantiq bilan */}
                <div className="flex items-center">
                  <button className="flex items-center gap-3  text-white px-8 py-4 rounded-full border text-xs font-black uppercase tracking-widest shadow-white/10 hover:bg-blue-600 hover:text-white transition-all duration-300 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {t.discover?.more}
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
