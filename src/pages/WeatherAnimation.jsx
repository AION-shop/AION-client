// WeatherAnimation.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// ❄️ Snow Animation
const Snow = () => {
  const [flakes, setFlakes] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 3 + 2,
    }));
    setFlakes(arr);
  }, []);
  return (
    <>
      {flakes.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: "white",
            borderRadius: "50%",
            opacity: 0.8,
            animation: `fall ${f.speed}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </>
  );
};

// 🌧 Rain Animation
const Rain = () => {
  const [drops, setDrops] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      length: Math.random() * 15 + 10,
      speed: Math.random() * 2 + 2,
    }));
    setDrops(arr);
  }, []);
  return (
    <>
      {drops.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: 0,
            width: "2px",
            height: `${d.length}px`,
            backgroundColor: "rgba(174,194,224,0.5)",
            animation: `fall ${d.speed}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </>
  );
};

// ☀️ Sunny Animation
const Sunny = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-32 h-32 rounded-full bg-yellow-400 shadow-xl animate-pulse"></div>
  </div>
);

// ☁️ Cloudy Animation
const Cloudy = () => {
  const [clouds, setClouds] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 40,
      size: Math.random() * 100 + 100,
      speed: Math.random() * 20 + 20,
    }));
    setClouds(arr);
  }, []);
  return (
    <>
      {clouds.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.size}px`,
            height: "60px",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "50%",
            animation: `moveCloud ${c.speed}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes moveCloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
    </>
  );
};

// 🌦 Main Component
export default function WeatherAnimation() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // 1️⃣ Foydalanuvchining geolokatsiyasini olish
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 2️⃣ OpenWeatherMap API orqali ob-havoni olish
          const res = await axios.get(
            `${import.meta.env.VITE_API_WEATHER_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
          );

          const mainWeather = res.data.weather[0].main; // Snow, Rain, Clear, Clouds
          setWeather(mainWeather);
        } catch (err) {
          console.log("Weather fetch error:", err);
        }
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  if (!weather) return null;

  return (
    <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
      {weather === "Snow" && <Snow />}
      {weather === "Rain" && <Rain />}
      {weather === "Clear" && <Sunny />}
      
    </div>
  );
}
