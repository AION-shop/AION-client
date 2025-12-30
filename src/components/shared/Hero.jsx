import React, { useEffect, useState, useContext } from "react";
import { LangContext } from "../../../LangContext";

// --- Weather Animation ---
function WeatherAnimation({ weather }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {weather === "Clouds" && (
        <div className="absolute top-24 left-[-20%] w-72 h-36 bg-white/40 rounded-full blur-xl animate-cloud" />
      )}
      {weather === "Rain" &&
        Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-6 bg-blue-400 opacity-70 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
    </div>
  );
}

// --- Hero Component ---
const Hero = () => {
  const { t } = useContext(LangContext); // translation
  const [weather, setWeather] = useState("Clear");

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`
        );
        const data = await res.json();
        setWeather(data.weather[0].main);
      } catch { }
    });
  }, []);

  return (
    <section className="pt-16 relative z-0 w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] bg-gray-900">

      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Responsive Video */}
        <div className="relative w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/Xl6uvzKwBkI?autoplay=1&mute=1&controls=0&loop=1&playlist=Xl6uvzKwBkI"
            title="AION HYPER SSR | Highlights from the Aion Day Launch Event"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-full min-h-full"
            style={{
              aspectRatio: '16/9',
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.78vh', // 16:9 aspect ratio
            }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>



      {/* WEATHER */}
      <WeatherAnimation weather={weather} />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-3xl px-6 sm:px-10 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t.hero?.heroHeading || "Zamonaviy va Aqlli Avtomobillar"}
          </h1>
          <p className="mt-4 text-gray-200 max-w-xl">
            {t.hero?.heroSub || "Eng so‘nggi texnologiyalar va qulay to‘lov"}
          </p>

        </div>
      </div>

      <style>{`
        .animate-rain {
          animation: rain 1s linear infinite;
        }
        @keyframes rain {
          from { transform: translateY(-100%); }
          to { transform: translateY(100vh); }
        }

        .animate-cloud {
          animation: cloud 60s linear infinite;
        }
        @keyframes cloud {
          from { transform: translateX(-30%); }
          to { transform: translateX(130%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
