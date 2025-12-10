import React, { useState, useContext } from "react";
import { Phone, Globe, Gift, Star, BarChart2, Menu, X, ChevronDown, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { LangContext } from "../../../LangContext";
import i18n from "../../i18n";

const SubNavbar = () => {
  const { lang, setLang, t } = useContext(LangContext);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const toggleLangDropdown = () => setIsLangDropdownOpen(prev => !prev);
  const handleLangChange = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
    setIsLangDropdownOpen(false);
  };

  const menuItems = [
    { label: t.subNavbar?.allProducts || "Barcha mahsulotlar", subLabel: t.subNavbar?.allProductsSub || "Keng assortiment", icon: <BarChart2 className="w-5 h-5" />, link: "/col-product" },
    { label: t.subNavbar?.lottery || "O‘yinlar", subLabel: t.subNavbar?.lotterySub || "Sovg'alar yutib oling", icon: <Gift className="w-5 h-5" />, link: "/lottery" },
    { label: t.subNavbar?.new || "Yangi", subLabel: t.subNavbar?.newSub || "Eng so'nggi modellar", icon: <Star className="w-5 h-5" />, link: "/news" },
  ];

  return (
    <section className="w-full">
      <nav className="relative w-full z-50 bg-black/50 backdrop-blur-md">
        <Container>
          {/* Umumiy padding va gapni ixchamladik */}
          <div className="px-2 py-4 flex items-center justify-between gap-1">

            {/* Left Section - gap-1 ga o'zgartirildi */}
            <div className="flex items-center gap-1">
              {/* Home Icon */}
              <Link to="/" className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200">
                <HomeIcon size={24} className="text-white" />
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
              </button>

              <Link
                to="/rasrochka"
                // Padding px-2.5 va text-xs ni saqlab qoldik
                className="flex items-center gap-1.5 px-2.5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg text-xs sm:text-sm transition-all duration-300 whitespace-nowrap"
              >
                <span className="font-bold text-sm sm:text-base">0%</span>
                {t.subNavbar?.installment || "Rassrochka"}
              </Link>
            </div>

            {/* Center Menu - Desktop (o'zgarishsiz) */}
            <div className="hidden lg:flex gap-4 justify-center flex-1">
              {menuItems.map(item => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                >
                  <span className="text-white group-hover:text-blue-400">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400">{item.label}</p>
                    <p className="hidden xl:block text-xs text-gray-200 group-hover:text-blue-200">{item.subLabel}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Section - gap-1 ga o'zgartirildi, endi til tanlash va telefon yonma-yon turadi */}
            <div className="flex items-center gap-1">
              <a
                href="tel:+998952100550"
                // Telefon raqami bloki endi faqat md ekranlarda ko'rinadi (mobil uchun yashirin)
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 group whitespace-nowrap"
              >
                <Phone size={18} className="text-white group-hover:animate-bounce" />
                <div>
                  <p className="text-xs text-gray-200">{t.subNavbar?.phoneLabel || "Qo'ng'iroq qiling"}</p>
                  <p className="text-sm font-semibold text-white">+998 95 210 05 50</p>
                </div>
              </a>

              <div className="relative">
                <button
                  onClick={toggleLangDropdown}
                  // Til tugmasi paddingini yanada ixchamladik: px-2
                  className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-2 py-2 text-sm hover:bg-white/20 hover:border-blue-400 transition-all duration-300 text-white shadow-sm"
                >
                  <Globe size={16} className="text-blue-200" />
                  <span className="font-medium">{lang.toUpperCase()}</span>
                  <ChevronDown
                    size={14}
                    className={`transform transition-transform duration-300 ${isLangDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-2xl py-1 z-50 animate-slideDown">
                    {["uz", "ru", "en"].map(l => (
                      <button
                        key={l}
                        onClick={() => handleLangChange(l)}
                        className={`px-4 py-2 w-full text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${lang === l ? "font-bold text-blue-600 bg-blue-50" : "text-gray-700"}`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu (o'zgarishsiz) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-lg mt-2 rounded-lg overflow-hidden animate-slideDown">
              {menuItems.map(item => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-gray-800">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </nav>
    </section>
  );
};

export default SubNavbar;
