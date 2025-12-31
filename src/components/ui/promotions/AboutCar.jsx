import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Zap,
  Gauge,
  Activity,
  ArrowRight,
  Leaf,
  BatteryCharging,
  DollarSign,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";

export default function AboutCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_API_URL}/api/popular/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setCar(d);
        setLoading(false);
        setTimeout(() => setShow(true), 100);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOrder = () => {
    const isAuth = localStorage.getItem("token");
    navigate(isAuth ? "/offerta" : "/login");
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-medium animate-pulse italic">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!car)
    return (
      <div className="h-screen grid place-items-center text-xl font-bold bg-gray-50">
        Avtomobil topilmadi
      </div>
    );

  const { title, images = [], acceleration, topSpeed, power, price, category } = car;

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden pb-24">
      {/* HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-16 lg:pt-20 grid lg:grid-cols-2 gap-10 lg:gap-16 relative">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-1.5 text-slate-500 font-bold text-xs sm:text-sm hover:text-blue-600 transition-all z-30 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm active:scale-95"
        >
          <ChevronLeft size={16} /> Orqaga
        </button>

        {/* IMAGE GALLERY */}
        <div className={`space-y-6 transition-all duration-1000 transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden bg-gray-100 shadow-2xl shadow-gray-200 group">
            {images[activeImage] && (
              <img
                src={images[activeImage]}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
          </div>

          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-2xl overflow-hidden transition-all duration-300 shrink-0
                    ${activeImage === i ? "ring-4 ring-blue-600 ring-offset-2 scale-95" : "opacity-60 hover:opacity-100 hover:scale-105"}`}
                >
                  <img src={img} alt={`${title} preview`} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MAIN INFO */}
        <div className={`flex flex-col justify-center transition-all duration-1000 delay-300 transform ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white text-[10px] sm:text-[11px] px-4 py-1.5 font-bold tracking-widest uppercase rounded-full shadow-lg shadow-blue-100">
              {category || "Elektromobil"}
            </span>
            <div className="h-1 w-6 sm:w-10 bg-gray-200 rounded-full" />
            <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
              Premium 2025
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black italic text-slate-900 leading-tight mb-6 tracking-tighter">
            {title}
          </h1>

          <div className="flex items-baseline gap-2 mb-8 sm:mb-10">
             <span className="text-3xl sm:text-5xl font-black text-blue-600 tracking-tight">
               ${Number(price).toLocaleString()}
             </span>
             <span className="text-gray-400 font-bold text-sm italic">/ Bojxona to'lovlari bilan</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 py-8 border-y border-gray-100 mb-10">
            <QuickStat label="Tezlanish" value={acceleration ? `${acceleration}s` : "4.5s"} icon={<Zap size={14} className="text-yellow-500 fill-yellow-500" />} />
            <QuickStat label="Tezlik" value={topSpeed ? `${topSpeed}km/h` : "250km/h"} icon={<Gauge size={14} className="text-blue-500" />} />
            <QuickStat label="Quvvat" value={power ? `${power}kW` : "350kW"} icon={<Activity size={14} className="text-red-500" />} />
          </div>

          <button
            onClick={handleOrder}
            className="group relative overflow-hidden bg-slate-900 hover:bg-blue-600 text-white py-5 sm:py-6 rounded-[24px] font-black uppercase tracking-widest text-xs sm:text-sm transition-all duration-500 shadow-xl hover:shadow-blue-300 active:scale-95"
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              Buyurtma berish
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
            </div>
          </button>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-24 sm:mt-36">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-blue-600 rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-black text-center pt-10 mb-6 uppercase tracking-tight">
            Nima uchun <span className="text-blue-600 italic">{title.split(" ")[0]}</span>?
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 sm:mb-24 font-medium text-sm sm:text-lg">
            Kelajak texnologiyasi va maksimal xavfsizlik uyg'unligi sizning qulayligingiz uchun.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Benefit icon={<Leaf size={28} className="text-green-500" />} title="Ekologik toza" desc="Nol emissiya va atrof-muhitni asrash texnologiyasi." />
            <Benefit icon={<DollarSign size={28} className="text-blue-500" />} title="Tejamkorlik" desc="An'anaviy yoqilg'iga nisbatan 10 barobar ko'p tejash." />
            <Benefit icon={<BatteryCharging size={28} className="text-orange-500" />} title="Tezkor quvvat" desc="Atigi 30 daqiqada 80% quvvat olish imkoniyati." />
            <Benefit icon={<ShieldCheck size={28} className="text-blue-600" />} title="3 Yillik Kafolat" desc="To‘liq rasmiy servis va texnik yordam kafolati." />
          </div>
        </div>
      </section>
    </div>
  );
}

/* SUB-COMPONENTS */
const QuickStat = ({ label, value, icon }) => (
  <div className="flex flex-col items-center sm:items-start group cursor-default">
    <div className="flex items-center gap-1.5 text-gray-400 mb-2 transition-colors group-hover:text-blue-600">
      {icon}
      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </div>
    <p className="text-lg sm:text-2xl font-black tracking-tight">{value}</p>
  </div>
);

const Benefit = ({ icon, title, desc }) => (
  <div className="p-8 rounded-[36px] border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 hover:-translate-y-3 transition-all duration-500 group shadow-sm hover:shadow-xl">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white transition-all duration-500 shadow-sm">
      {icon}
    </div>
    <h4 className="font-black text-lg sm:text-xl mb-3 uppercase tracking-tight">{title}</h4>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">{desc}</p>
  </div>
);
