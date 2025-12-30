import React, { useMemo, useContext } from "react";
import { ShoppingBag, Percent, ShoppingCart, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import { LangContext } from "../../../LangContext";

const InfoBar = () => {
  const { lang, setLang, t } = useContext(LangContext);

  const colors = useMemo(
    () => ["text-blue-400", "text-purple-400", "text-pink-400", "text-cyan-400"],
    []
  );

  const languages = [
    { code: "uz", label: "UZ" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  const changeLang = (code) => {
    setLang(code);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">

          {/* LEFT: Special Offer */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/20 backdrop-blur">
              <ShoppingBag className="text-blue-400" size={20} />
            </div>
            <p className="text-sm text-gray-200">
              {t.infobar?.specialOffer || "Special Offer"} —{" "}
              <span className="font-semibold text-white">
                {t.infobar?.bestCars || "Best electric cars at best price"}
              </span>
            </p>
          </div>

          {/* RIGHT: Language switch + View button */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* LANGUAGE SWITCH */}
            <div className="flex items-center gap-1 border border-white/20 rounded-lg px-2 py-1">
              <Globe size={16} className="text-blue-400" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md transition ${
                    lang === l.code ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* VIEW BUTTON */}
            <Link
              to="/sell-card"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-transform hover:scale-105"
            >
              <ShoppingCart size={16} />
              {t.infobar?.look || "View"}
            </Link>

          </div>
        </div>
      </Container>

      {/* FLOATING ICONS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Percent
            key={i}
            className={`absolute opacity-20 animate-float ${colors[i % colors.length]}`}
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            size={14}
          />
        ))}
      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default InfoBar;
