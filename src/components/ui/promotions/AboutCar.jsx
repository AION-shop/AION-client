import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Zap,
  Gauge,
  Activity,
  ArrowRight,
  ChevronRight,
  Leaf,
  BatteryCharging,
  DollarSign,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

export default function AboutCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/popular/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setCar(d);
        setLoading(false);
        setTimeout(() => setShow(true), 80);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOrder = () => {
    const isAuth = localStorage.getItem("token");
    navigate(isAuth ? "/offerta" : "/login");
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!car) return <div className="h-screen grid place-items-center">Topilmadi</div>;

  const { title, images = [], acceleration, topSpeed, power, price, category } = car;

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-8 lg:pt-16 grid lg:grid-cols-2 gap-14">
        {/* IMAGE SIDE */}
        <div
          className={`space-y-5 transition-all duration-1000 ${
            show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <div className="relative aspect-[16/10] rounded-[36px] overflow-hidden bg-gray-100 shadow-sm group">
            {images[activeImage] && (
              <img
                src={images[activeImage]}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1600ms]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent" />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pt-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-24 h-20 rounded-2xl overflow-hidden transition-all shrink-0
                    ${
                      activeImage === i
                        ? "ring-2 ring-blue-600 scale-105"
                        : "opacity-50 hover:opacity-100"
                    }`}
                >
                  <img src={img} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO SIDE */}
        <div
          className={`flex flex-col justify-center transition-all duration-1000 delay-150 ${
            show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600 text-white text-[10px] px-3 py-1 font-black tracking-[0.2em] uppercase rounded">
              {category || "Premium"}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Model 2025
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold italic tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-3xl font-light text-blue-600 mb-10">
            ${Number(price).toLocaleString()}
          </p>

          <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100 mb-10">
            {acceleration && <QuickStat label="0-100" value={`${acceleration}s`} icon={<Zap size={14} />} />}
            {topSpeed && <QuickStat label="Speed" value={`${topSpeed}km/h`} icon={<Gauge size={14} />} />}
            {power && <QuickStat label="Power" value={`${power}kW`} icon={<Activity size={14} />} />}
          </div>

          <button
            onClick={handleOrder}
            className="group bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-blue-200"
          >
            Buyurtma berish
            <ArrowRight className="group-hover:translate-x-1 transition" size={18} />
          </button>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-24">
        <div className="border-t pt-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-6 uppercase">
            Nima uchun {title.split(" ")[0]}?
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16">
            Kelajak texnologiyasi, maksimal qulaylik va ekologik toza yechimlar.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Benefit icon={<Leaf className="text-green-500" />} title="Eco Friendly" />
            <Benefit icon={<DollarSign className="text-blue-500" />} title="Tejamkor" />
            <Benefit icon={<BatteryCharging className="text-orange-500" />} title="Fast Charge" />
            <Benefit icon={<Smartphone className="text-purple-500" />} title="Smart Control" />
          </div>
        </div>

        {/* WARRANTY */}
        <div className="mt-24 p-10 rounded-[36px] bg-slate-50 flex flex-col md:flex-row gap-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow grid place-items-center">
              <ShieldCheck className="text-blue-600" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">3 yillik rasmiy kafolat</h3>
              <p className="text-gray-500 text-sm">
                To‘liq servis va texnik yordam bilan
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-blue-600 font-bold uppercase text-sm hover:gap-3 transition-all">
            Batafsil <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTS */

const QuickStat = ({ label, value, icon }) => (
  <div className="flex flex-col items-center sm:items-start">
    <div className="flex items-center gap-1 text-gray-400 mb-1">
      {icon}
      <span className="text-[10px] font-black uppercase">{label}</span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Benefit = ({ icon, title }) => (
  <div className="p-8 rounded-[30px] border border-gray-100 hover:bg-blue-50/40 hover:-translate-y-2 transition-all duration-500">
    <div className="w-12 h-12 bg-white rounded-2xl shadow flex items-center justify-center mb-6">
      {icon}
    </div>
    <h4 className="font-bold text-lg">{title}</h4>
  </div>
);
