import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

/* ---------- Helpers ---------- */
const isMobile = window.innerWidth < 768;

/* ---------- ❄️ Snow ---------- */
const Snow = () => {
  const flakes = useMemo(
    () =>
      Array.from({ length: isMobile ? 35 : 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </>
  );
};

/* ---------- 🌧 Rain ---------- */
const Rain = () => {
  const drops = useMemo(
    () =>
      Array.from({ length: isMobile ? 50 : 120 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        height: Math.random() * 18 + 10,
        duration: Math.random() * 1.5 + 1,
      })),
    []
  );

  return (
    <>
      {drops.map((d) => (
        <span
          key={d.id}
          className="raindrop"
          style={{
            left: `${d.left}%`,
            height: d.height,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </>
  );
};

/* ---------- ☀️ Sunny ---------- */
const Sunny = () => (
  <div className="sun-wrapper">
    <div className="sun-core" />
  </div>
);

/* ---------- ☁️ Cloudy ---------- */
const Cloudy = () => {
  const clouds = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        top: Math.random() * 40,
        size: Math.random() * 120 + 120,
        duration: Math.random() * 40 + 40,
        delay: Math.random() * 10,
      })),
    []
  );

  return (
    <>
      {clouds.map((c) => (
        <div
          key={c.id}
          className="cloud"
          style={{
            top: `${c.top}%`,
            width: c.size,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </>
  );
};

/* ---------- 🌦 Main ---------- */
export default function WeatherAnimation() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_WEATHER_URL}/weather`,
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: import.meta.env.VITE_WEATHER_API_KEY,
            },
          }
        );
        setWeather(res.data.weather[0].main);
      } catch (e) {
        console.log("Weather error:", e);
      }
    });
  }, []);

  if (!weather) return null;

  return (
    <div className="weather-layer">
      {weather === "Snow" && <Snow />}
      {weather === "Rain" && <Rain />}
      {weather === "Clear" && <Sunny />}
      {weather === "Clouds" && <Cloudy />}
    </div>
  );
}
