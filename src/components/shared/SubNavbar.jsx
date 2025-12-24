import React, { useState, useContext } from "react";
import {
  Phone,
  Globe,
  Gift,
  Star,
  BarChart2,
  Menu,
  X,
  ChevronDown,
  Home as HomeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { LangContext } from "../../../LangContext";
import i18n from "../../i18n";

const SubNavbar = () => {
  const { lang, setLang, t } = useContext(LangContext);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleLangDropdown = () => setIsLangDropdownOpen((prev) => !prev);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
    setIsLangDropdownOpen(false);
  };

  const menuItems = [
    {
      label: t.subNavbar?.allProducts || "Barcha feedbacklar",
      subLabel: t.subNavbar?.allProductsSub || "Foydalanuvchi izohlari",
      icon: <BarChart2 className="w-5 h-5" />,
      link: "/feedbacks",
    },
    {
      label: t.subNavbar?.lottery || "Modellar",
      subLabel: t.subNavbar?.lotterySub || "Modellarni ko‘ring",
      icon: <Gift className="w-5 h-5" />,
      link: "/models",
    },
    {
      label: t.subNavbar?.new || "Yangi",
      subLabel: t.subNavbar?.newSub || "Eng so‘nggi modellar",
      icon: <Star className="w-5 h-5" />,
      link: "/news",
    },
  ];

  return (
    <section className="w-full">
      <nav className="relative w-full z-50 bg-gray-900 backdrop-blur-md overflow-visible">
        <Container>
          <div className="px-2 py-4 flex items-center justify-between gap-2">
            {/* LEFT */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-white/20 transition"
              >
                <HomeIcon size={24} className="text-white" />
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </button>

              <Link
                to="/rasrochka"
                className="flex items-center gap-1.5 px-2.5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg text-xs sm:text-sm"
              >
                <span className="font-bold text-sm sm:text-base">0%</span>
                {t.subNavbar?.installment || "Rassrochka"}
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex gap-4 justify-center flex-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition group"
                >
                  <span className="text-white group-hover:text-blue-400">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400">
                      {item.label}
                    </p>
                    <p className="hidden xl:block text-xs text-gray-200 group-hover:text-blue-200">
                      {item.subLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+998952100550"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition group"
              >
                <Phone size={18} className="text-white" />
                <div>
                  <p className="text-xs text-gray-200">
                    {t.subNavbar?.phoneLabel || "Qo‘ng‘iroq qiling"}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    +998 95 210 05 50
                  </p>
                </div>
              </a>

              {/* 🌍 LANGUAGE */}
              <div className="relative">
                <button
                  onClick={toggleLangDropdown}
                  className="
                    flex items-center gap-1.5
                    border border-white/30
                    rounded-lg
                    px-3 py-2
                    text-sm sm:text-base
                    text-white
                    hover:bg-white/20
                    transition
                  "
                >
                  <Globe size={16} />
                  <span className="font-semibold">{lang.toUpperCase()}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isLangDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <div
                    className="
                      absolute right-0
                      bottom-full mb-2
                      w-28 sm:w-32
                      bg-white
                      border border-gray-200
                      rounded-xl
                      shadow-2xl
                      py-1
                      z-50
                      animate-langUp
                    "
                  >
                    {["uz", "ru", "en"].map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLangChange(l)}
                        className={`
                          w-full px-4 py-2
                          text-left text-sm sm:text-base
                          transition
                          ${
                            lang === l
                              ? "font-bold text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                        `}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-lg mt-2 rounded-lg overflow-hidden animate-slideDown">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-gray-800">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </nav>

      {/* 🔹 Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes langUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.25s ease-out forwards;
        }

        .animate-langUp {
          animation: langUp 0.25s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SubNavbar;
