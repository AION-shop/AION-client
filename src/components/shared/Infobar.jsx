import React from "react";
import { ShoppingBag, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "../shared/Container";
import { useTranslation } from "react-i18next";

const InfoBar = ({ onStartShopping }) => {
  const { t } = useTranslation("infobar");
  const navigate = useNavigate();

  const handleClick = () => {
    if (onStartShopping) onStartShopping();
    navigate("/login");
  };

  const colors = ["text-gray-300", "text-gray-400", "text-gray-500", "text-gray-200"];

  return (
    <div className="relative bg-gray-900 text-gray-100 overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <div className="text-sm sm:text-lg font-semibold">
              {t("specialOffer")} {t("from")} <span className="font-bold text-gray-200">AutoMarket</span> – {t("bestCars")}
            </div>
          </div>

          <button onClick={handleClick} className="flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium shadow-md transition">
            <ShoppingBag className="w-4 h-4" />
            {t("shopNow")}
          </button>
        </div>
      </Container>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div key={i} className="absolute opacity-20 animate-pulse" style={{ top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`, animationDelay: `${Math.random() * 2}s` }}>
              <Percent className={`w-4 h-4 ${randomColor}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoBar;
