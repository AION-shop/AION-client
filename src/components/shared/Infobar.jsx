import React, { useMemo } from "react";
// ShoppingCart ikonkasi endi lucide-react dan import qilinadi
import { ShoppingBag, Percent, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import { useTranslation } from "react-i18next";

const InfoBar = () => {
  const { t } = useTranslation("infobar");
  // navigate va onStartShopping propslari ishlatilmayotganligi sababli olib tashlandi

  // Use useMemo to prevent recalculating colors on every render
  const colors = useMemo(() => ["text-gray-300", "text-gray-400", "text-gray-500", "text-gray-200"], []);

  return (
    <div
      className="relative bg-gray-900 text-gray-100 overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <Container>
        {/* Asosiy konteyner: flex-wrap qildik va gap-3 ga kamaytirdik */}
        <div className="flex flex-wrap items-center justify-between py-3 md:py-4 gap-3">

          {/* Main Offer Message */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
            {/* Matn endi pastga tushadi, truncate olib tashlandi, text-xs sm:text-sm o'lcham berildi */}
            <p className="text-xs sm:text-sm font-medium">
              {t("specialOffer", "Maxsus chegirma")} {t("from", "dan")} <span className="font-bold text-white">AutoMarket</span> – {t("bestCars", "Eng yaxshi avtomobillar")}
            </p>
          </div>

          {/* Action Buttons Container */}
          {/* Bu div flex-shrink-0 bo'lib qoladi, u o'z joyini saqlab qoladi */}
          <div className="flex items-center gap-4 flex-shrink-0">

            {/* Shop Now Button (Primary CTA) */}
            <Link
              to="/sell-card"
              // Paddingni ixchamladik: px-3 py-2
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
              aria-label={t("sell", "Sotish")}
            >
              <ShoppingCart size={16} />
              <span className="text-sm font-medium">{t("sell", "Sotish")}</span>
            </Link>
          </div>
        </div>
      </Container>

      {/* Background decoration elements (o'zgarishsiz qoldi) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute opacity-20 animate-float`}
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `scale(${0.5 + Math.random() * 0.8})`
              }}
            >
              <Percent className={`w-4 h-4 ${randomColor}`} />
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(10deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InfoBar;
