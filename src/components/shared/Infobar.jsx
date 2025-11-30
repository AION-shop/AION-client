import React from "react";
import { ShoppingBag, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "../shared/Container"; // <-- Container import qildik

const InfoBar = ({ onStartShopping }) => {
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
          
          {/* Left Info */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <div className="text-sm sm:text-lg font-semibold">
              Специальное предложение от{" "}
              <span className="font-bold text-gray-200">AutoMarket</span> – Лучшие автомобили
              по выгодной цене
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium shadow-md transition"
          >
            <ShoppingBag className="w-4 h-4" />
            елестромаркет
          </button>
        </div>
      </Container>

      {/* Animated Percent Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className="absolute opacity-20 animate-pulse"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Percent className={`w-4 h-4 ${randomColor}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoBar;
