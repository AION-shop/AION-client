import React, { useState, useContext } from "react";
import { Phone, Gift, Star, BarChart2, Menu, X, Home, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { LangContext } from "../../../LangContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const SubNavbar = () => {
  const { t } = useContext(LangContext);
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: t.subNavbar?.allProducts || "Barcha feedbacklar",
      subLabel: t.subNavbar?.allProductsSub || "Foydalanuvchi izohlari",
      icon: <BarChart2 className="w-5 h-5" />,
      link: "/feedbacks",
    },
    {
      label: t.subNavbar?.lottery || "Modellar",
      subLabel: t.subNavbar?.lotterySub || "Modellarni ko'ring",
      icon: <Gift className="w-5 h-5" />,
      link: "/models",
    },
    {
      label: t.subNavbar?.new || "Yangi",
      subLabel: t.subNavbar?.newSub || "Eng so'nggi modellar",
      icon: <Star className="w-5 h-5" />,
      link: "/news",
    },
  ];

  return (
    <section className="w-full relative z-50">
      <nav className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md shadow-lg">
        <Container>
          <div className="flex items-center justify-between gap-2 py-4">

            {/* LEFT: Home + Rasrochka + Hamburger */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Home size={24} className="text-white" />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <Menu size={24} className="text-white" />
                )}
              </button>

              <Link
                to="/rasrochka"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg text-xs sm:text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="font-bold text-sm sm:text-base">0%</span>
                {t.subNavbar?.installment || "Rassrochka"}
              </Link>
            </div>

            {/* CENTER: Desktop menu */}
            <div className="hidden lg:flex gap-4 justify-center flex-1 mx-4 overflow-x-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group whitespace-nowrap"
                >
                  <span className="text-white group-hover:text-blue-400 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {item.label}
                    </p>
                    <p className="hidden xl:block text-xs text-gray-300 group-hover:text-blue-200 transition-colors duration-300">
                      {item.subLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT: Phone + Login/User */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+998952100550"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group whitespace-nowrap"
              >
                <Phone size={18} className="text-white group-hover:text-blue-400 transition-colors duration-300" />
                <div>
                  <p className="text-xs text-gray-300">{t.subNavbar?.phoneLabel || "Qo'ng'iroq qiling"}</p>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    +998 95 210 05 50
                  </p>
                </div>
              </a>

              {isAuth ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/50 whitespace-nowrap">
                  <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
                    {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate text-white">
                    {user?.firstName || user?.email}
                  </span>
                  <button onClick={() => dispatch(logout())} className="p-2 rounded-lg hover:bg-red-500/20 transition">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/5 transition whitespace-nowrap"
                >
                  <User size={16} />
                  {t.subNavbar?.login || "Login"}
                </Link>
              )}
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
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors duration-200"
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-gray-800 font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </nav>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.25s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default SubNavbar;
