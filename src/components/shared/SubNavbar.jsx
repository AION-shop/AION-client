import React, { useState, useContext } from "react";
import {
  ShoppingCart,
  Phone,
  Globe,
  Gift,
  Star,
  BarChart2,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { LangContext } from "../../../LangContext";
import i18n from "../../i18n";

const SubNavbar = () => {
  const { lang, setLang, t } = useContext(LangContext);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu items
  const menuItems = [
    {
      label: t.subNavbar?.allProducts || "Barcha mahsulotlar",
      subLabel: t.subNavbar?.allProductsSub || "",
      icon: <BarChart2 />,
      link: "/row-product",
    },
    {
      label: t.subNavbar?.lottery || "O‘yinlar",
      subLabel: t.subNavbar?.lotterySub || "",
      icon: <Gift />,
      link: "/lottery",
    },
    {
      label: t.subNavbar?.new || "Yangi",
      subLabel: t.subNavbar?.newSub || "",
      icon: <Star />,
      link: "/news",
    },
  ];

  return (
    <>
      {/* --- Desktop Navbar --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <Container>
          <div className="px-2 sm:px-4 py-2 flex items-center justify-between flex-wrap gap-3">

            {/* Left side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden btn btn-ghost btn-square btn-sm"
              >
                <Menu size={22} className="text-black" />
              </button>

              <Link
                to="/rasrochka"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-black font-semibold rounded-lg text-xs sm:text-sm transition"
              >
                <span className="font-bold text-sm">0%</span> {t.subNavbar?.installment || "Rassrochka"}
              </Link>
            </div>

            {/* Center menu */}
            <div className="hidden lg:flex gap-4 flex-1 justify-center">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-lg text-black">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-black">{item.label}</p>
                    <p className="text-xs text-gray-600">{item.subLabel}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">

              <a
                href="tel:+998952100550"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <Phone size={18} className="text-black" />
                <div>
                  <p className="text-xs text-gray-600">{t.subNavbar?.phoneLabel || "Qo‘ng‘iroq qiling"}</p>
                  <p className="text-sm font-semibold text-black">
                    +998 95 210 05 50
                  </p>
                </div>
              </a>

              <Link
                to="/sell-card"
                className="btn btn-sm px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                <ShoppingCart size={16} />
                <span className="text-sm">{t.subNavbar?.sell || "Sotish"}</span>
              </Link>

              {/* Language Switch */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1 border border-gray-300 rounded-lg px-2 py-1 text-sm hover:bg-gray-100 transition text-black"
                >
                  <Globe size={16} /> {lang.toUpperCase()}
                  <ChevronDown
                    size={14}
                    className={`${isLangDropdownOpen ? "rotate-180" : ""} transition`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute bottom-10 right-0 w-28 bg-white border border-gray-300 rounded-lg shadow-md py-1 z-50 animate-slide-up">
                    {["uz", "ru", "en"].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          i18n.changeLanguage(l);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`px-3 py-1 w-full text-left text-sm hover:bg-gray-100 ${lang === l ? "font-bold text-blue-600" : "text-black"}`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </nav>

      {/* --- Mobile Sidebar --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-72 max-w-[300px] bg-white shadow-2xl h-full flex flex-col z-50 animate-slide-right">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-black">{t.subNavbar?.menu || "Menyu"}</h2>

              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={22} className="text-black" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={item.link}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-xl text-black">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-black">{item.label}</p>
                    <p className="text-xs text-gray-600">{item.subLabel}</p>
                  </div>
                </Link>
              ))}

              <div className="divider"></div>

              <a
                href="tel:+998952100550"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
              >
                <Phone size={18} className="text-black" />
                <span className="text-sm font-medium text-black">
                  +998 95 210 05 50
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubNavbar;
