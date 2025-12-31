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
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { label: t.subNavbar?.allProducts || "Barcha feedbacklar", subLabel: t.subNavbar?.allProductsSub || "Foydalanuvchi izohlari", icon: <BarChart2 className="w-5 h-5" />, link: "/feedbacks" },
    { label: t.subNavbar?.lottery || "Modellar", subLabel: t.subNavbar?.lotterySub || "Modellarni ko'ring", icon: <Gift className="w-5 h-5" />, link: "/models" },
    { label: t.subNavbar?.new || "Yangi", subLabel: t.subNavbar?.newSub || "Eng so'nggi modellar", icon: <Star className="w-5 h-5" />, link: "/news" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsLogoutModalOpen(false);
  };

  return (
    <section className="w-full relative z-50">
      <nav className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md shadow-lg">
        <Container>
          <div className="flex items-center justify-between gap-2 sm:gap-3 py-3 sm:py-4 flex-wrap">

            {/* LEFT: Home + Hamburger + Rassrochka */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/" className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <Home size={20} className="text-white sm:w-6 sm:h-6" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X size={20} className="text-white sm:w-6 sm:h-6" /> : <Menu size={20} className="text-white sm:w-6 sm:h-6" />}
              </button>
              <Link
                to="/rasrochka"
                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                <span className="font-bold text-xs sm:text-base">0%</span>
                <span>{t.subNavbar?.installment || "Rassrochka"}</span>
              </Link>
            </div>

            {/* CENTER: Desktop menu */}
            <div className={`flex-1 ${isMobileMenuOpen ? 'flex flex-col gap-2 mt-2 lg:flex-row lg:justify-center lg:gap-4 lg:mt-0' : 'hidden lg:flex gap-4 justify-center mx-4'}`}>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group whitespace-nowrap"
                >
                  <span className="text-white group-hover:text-blue-400 transition-colors duration-300">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{item.label}</p>
                    <p className="hidden xl:block text-xs text-gray-300 group-hover:text-blue-200 transition-colors duration-300">{item.subLabel}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT: Phone + Login/User */}
            <div className="flex items-center gap-1 sm:gap-2 relative">
              <a href="tel:+998952100550" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group whitespace-nowrap">
                <Phone size={18} className="text-white group-hover:text-blue-400 transition-colors duration-300" />
                <div className="hidden xl:block">
                  <p className="text-xs text-gray-300">{t.subNavbar?.phoneLabel || "Qo'ng'iroq"}</p>
                  <p className="text-sm font-semibold text-white">+998 95 210 05 50</p>
                </div>
              </a>

              {isAuth ? (
                <div className="relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gray-800/50 border border-white/5">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-white max-w-[80px] truncate">{user?.firstName || user?.email}</span>
                  
                  <button
                    onClick={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${isLogoutModalOpen ? 'bg-red-500 text-white' : 'hover:bg-red-500/20 text-white/70'}`}
                  >
                    <LogOut size={16} />
                  </button>

                  {isLogoutModalOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsLogoutModalOpen(false)}></div>
                      <div className="absolute bottom-0 right-0 mb-12 w-44 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-20 p-4 animate-slideDown origin-top-right">
                        <p className="text-white text-sm mb-3 text-center font-medium">
                          {t.subNavbar?.logoutConfirm || "Chiqishni xohlaysizmi?"}
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setIsLogoutModalOpen(false)}
                            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold py-2 rounded-xl transition"
                          >
                            {t.subNavbar?.no || "Yo'q"}
                          </button>
                          <button
                            onClick={handleLogout}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 rounded-xl transition"
                          >
                            {t.subNavbar?.yes || "Ha"}
                          </button>
                        </div>
                        <div className="absolute -top-2 right-5 w-3 h-3 bg-gray-900 border-b border-r border-gray-700 rotate-45"></div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/20 text-white hover:bg-white/5 transition text-sm">
                  <User size={14} className="sm:w-4 sm:h-4" />
                  <span>{t.subNavbar?.login || "Login"}</span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </nav>

      <style>{`
        @keyframes slideDown { 
          0% { opacity: 0; transform: translateY(-10px) scale(0.95); } 
          100% { opacity: 1; transform: translateY(0) scale(1); } 
        }
        .animate-slideDown { animation: slideDown 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </section>
  );
};

export default SubNavbar;
