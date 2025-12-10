import React, { useCallback, useMemo } from "react";
import { ShoppingBag, Percent, ShoppingCart } from "lucide-react"; // Imported ShoppingCart from previous code context
import { useNavigate, Link } from "react-router-dom"; // Ensure Link is imported
import Container from "../shared/Container";
import { useTranslation } from "react-i18next";

const InfoBar = ({ onStartShopping }) => {
  const { t } = useTranslation("infobar");
  const navigate = useNavigate();


 

  // Use useMemo to prevent recalculating colors on every render
  const colors = useMemo(() => ["text-gray-300", "text-gray-400", "text-gray-500", "text-gray-200"], []);

  return (
    // Added ARIA live region role for accessibility to alert users of important info
    <div
      className="relative bg-gray-900 text-gray-100 overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-4 gap-3 md:gap-6 ">

          {/* Main Offer Message */}
          <div className="flex items-center gap-3 order-1 md:order-none">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-blue-400" /> {/* Changed icon color for better contrast */}
            <p className="text-sm md:text-base font-medium truncate max-w-xs sm:max-w-none">
              {t("specialOffer", "Maxsus chegirma")} {t("from", "dan")} <span className="font-bold text-white">AutoMarket</span> – {t("bestCars", "Eng yaxshi avtomobillar")}
            </p>
          </div>

          {/* Action Buttons Container */}
          <div className="flex items-center gap-4 order-2 md:order-none">

            {/* Shop Now Button (Primary CTA) */}
            <Link
              to="/sell-card"
              className="flex items-center gap-2 p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
              aria-label={t("sell", "Sotish")}
            >
              <ShoppingCart size={18} />
              {/* Text visible on screens medium size and up */}
              <span className=" text-sm font-medium">{t("sell", "Sotish")}</span>
            </Link>

            {/* Secondary Action Link (Sotish/Sell) - Extracted from your Navbar code */}

          </div>
        </div>
      </Container>

      {/* Background decoration elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => { // Increased count for slightly fuller effect
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute opacity-20 animate-float`} // Changed animate-pulse to animate-float for smoother BG effect
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`, // Increased delay range
                transform: `scale(${0.5 + Math.random() * 0.8})` // Added random scaling
              }}
            >
              <Percent className={`w-4 h-4 ${randomColor}`} />
            </div>
          );
        })}
      </div>
      {/* Add keyframes for the 'float' effect if not defined in your Tailwind config */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InfoBar;

