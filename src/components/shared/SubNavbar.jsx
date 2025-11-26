import React, { useState } from "react";
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

const SubNavbar = ({ lang = "Рус", onLangChange = () => {} }) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Все товары", subLabel: "Полный товар", icon: <BarChart2 />, link: "/row-product" },
    { label: "Розыгрыши", subLabel: "Новые призы", icon: <Gift />, link: "/lottery" },
    { label: "Новинки", subLabel: "Каждый день", icon: <Star />, link: "/news" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <Container>
          <div className="px-2 sm:px-4 py-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              
              {/* Left — Menu + Installment */}
              <div className="flex items-center gap-2">
                {/* Mobile Menu Trigger */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden btn btn-ghost btn-square btn-sm"
                >
                  <Menu size={22} className="text-black" />
                </button>

                {/* Installment */}
                <Link
                  to="/rasrochka"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 
                  text-black font-semibold rounded-lg text-xs sm:text-sm transition"
                >
                  <span className="font-bold text-sm">0%</span> Рассрочка
                </Link>
              </div>

              {/* Center — Menu Items */}
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

              {/* Right — Phone + Sell + Lang */}
              <div className="flex items-center gap-2">
                {/* Phone */}
                <a
                  href="tel:+998952100550"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg
                  hover:bg-gray-100 transition"
                >
                  <Phone size={18} className="text-black" />
                  <div>
                    <p className="text-xs text-gray-600">Звоните</p>
                    <p className="text-sm font-semibold text-black">+998 95 210 05 50</p>
                  </div>
                </a>

                {/* Sell Button */}
                <Link
                  to="/sell-card"
                  className="btn btn-sm px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  <ShoppingCart size={16} />
                  <span className="text-sm">Продавайте</span>
                </Link>

                {/* Language */}
                <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-1 border border-gray-300 rounded-lg px-2 py-1 
                    text-sm hover:bg-gray-100 transition text-black"
                  >
                    <Globe size={16} /> {lang}
                    <ChevronDown
                      size={14}
                      className={`${isLangDropdownOpen ? "rotate-180" : ""} transition`}
                    />
                  </button>

                  {isLangDropdownOpen && (
                    <div className="absolute bottom-10 right-0 w-28 bg-white border border-gray-300 rounded-lg shadow-md py-1 z-50 animate-slide-up">
                      {["China", "O'z", "Рус"].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            onLangChange(item);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`px-3 py-1 w-full text-left text-sm hover:bg-gray-100 ${
                            lang === item ? "font-bold text-blue-600" : "text-black"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-72 bg-white shadow-2xl h-full flex flex-col z-50 animate-slide-right">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-black">Меню</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={22} className="text-black" />
              </button>
            </div>

            {/* Items */}
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
                <span className="text-sm font-medium text-black">+998 95 210 05 50</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubNavbar;
