import React, { useMemo } from "react";
import {
  ShoppingBag,
  Percent,
  ShoppingCart,
  LogOut,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../shared/Container";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

const InfoBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["infobar", "subNavbar"]); // MUHIM
  const { user, isAuth } = useSelector((state) => state.auth);

  const colors = useMemo(
    () => ["text-blue-400", "text-purple-400", "text-pink-400", "text-cyan-400"],
    []
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-white/10">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">

          {/* LEFT */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/20 backdrop-blur">
              <ShoppingBag className="text-blue-400" size={20} />
            </div>

            <p className="text-sm text-gray-200">
              {t("infobar:specialOffer")} —{" "}
              <span className="font-semibold text-white">
                {t("infobar:bestCars")}
              </span>
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 mt-2 sm:mt-0 flex-wrap">
            <Link
              to="/sell-card"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-blue-600 hover:bg-blue-700 transition hover:scale-105"
            >
              <ShoppingCart size={16} />
              {t("infobar:Look")}
            </Link>

            {isAuth ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
                  {user?.firstName?.[0]?.toUpperCase() ||
                    user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </div>

                <span className="text-sm font-medium max-w-[120px] truncate text-white">
                  {user?.firstName || user?.email}
                </span>

                <button
                  onClick={() => dispatch(logout())}
                  className="p-2 rounded-lg hover:bg-red-500/20 transition"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/5 transition"
              >
                <User size={16} />
                {t("subNavbar:login")}
              </Link>
            )}
          </div>
        </div>
      </Container>

      {/* FLOAT ICONS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Percent
            key={i}
            className={`absolute opacity-20 animate-float ${
              colors[i % colors.length]
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            size={14}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
          100% { transform: translateY(0) }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InfoBar;
