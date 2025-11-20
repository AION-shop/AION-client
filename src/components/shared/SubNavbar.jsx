import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Phone,
  Globe,
  Percent,
  Gift,
  CreditCard,
  Sparkles,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

const SubNavbar = ({ lang, onLangChange }) => {
  const navigate = useNavigate();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleSellerClick = () => navigate("/sell-on");

  return (
    <div className="bg-base-100 text-base-content shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2 sm:py-3 gap-3 md:gap-6">

          {/* Left Promo Items */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center md:justify-start">
            {/* 0% Рассрочка */}
            <Link
              to="/rasrochka"
              className="badge badge-outline badge-primary gap-2 font-bold animate-pulse cursor-pointer"
              aria-label="0% Рассрочка"
            >
              <CreditCard className="w-4 h-4" />
              0% Рассрочка
            </Link>

            {/* Скидки */}
            <Link
              to="/discount"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-base-200 transition cursor-pointer"
              aria-label="Скидки до 70%"
            >
              <Percent className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Все товары</span>
                <span className="text-xs text-neutral-content">Полный товар</span>
              </div>
            </Link>

            {/* Розыгрыши */}
            <Link
              to="/lottery"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-base-200 transition cursor-pointer"
              aria-label="Розыгрыши с новыми призами"
            >
              <Gift className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Розыгрыши</span>
                <span className="text-xs text-neutral-content">Новые призы</span>
              </div>
            </Link>

            {/* Новинки */}
            <Link
              to="/news"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-base-200 transition cursor-pointer"
              aria-label="Новинки каждый день"
            >
              <Sparkles className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Новинки</span>
                <span className="text-xs text-neutral-content">Каждый день</span>
              </div>
            </Link>
          </div>

          {/* Right Menu */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center md:justify-end">
            {/* Phone */}
            <a
              href="tel:+998952100550"
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-base-200 transition text-center"
              aria-label="Позвоните сейчас +998952100550"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="flex flex-col">
                <span className="text-xs text-neutral-content">Звоните сейчас</span>
                <span className="font-bold">+998 (95) 210 05 50</span>
              </div>
            </a>

            {/* Seller Button */}
            <button
              onClick={handleSellerClick}
              className="btn btn-primary btn-sm flex items-center gap-2 whitespace-nowrap"
              aria-label="Продавайте на ecommerce"
            >
              <ShoppingBag className="w-4 h-4" />
              Продавайте на ecommerce
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 border border-base-300 rounded-lg px-3 py-1 text-sm hover:bg-base-200 transition"
                aria-label="Выбор языка"
              >
                <Globe className="w-4 h-4" /> {lang}
                <ChevronDown
                  className={`w-3 transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 py-1">
                  {["Ўзб", "O'z", "Рус"].map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        onLangChange(l);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-base-200 rounded-lg ${
                        lang === l ? "btn btn-primary btn-outline w-full text-left" : ""
                      }`}
                      aria-label={`Выбрать язык ${l}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
