import React, { useEffect, useState } from "react";

function WeatherAnimation({ weather }) {
  // weather: "Clear", "Clouds", "Rain", etc.
  return (
    <div className="w-full h-full pointer-events-none relative">
      {weather === "Clouds" && (
        <div className="absolute w-40 h-20 bg-white/70 rounded-full blur-sm animate-[moveCloud_60s_linear_infinite]" />
      )}
      {weather === "Rain" && (
        <div className="absolute w-full h-full">
          {/* Yomg‘ir chiziqlari */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-6 bg-blue-400 opacity-70 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
      {/* Clear weather bo‘lsa hech narsa yoki quyosh animatsiyasi */}
    </div>
  );
}

const Hero = () => {
  const [weather, setWeather] = useState("Clear");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Geolocation olish
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // OpenWeatherMap API chaqiruv
        const apiKey = "YOUR_OPENWEATHER_API_KEY";
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const data = await res.json();
        setWeather(data.weather[0].main); // "Clear", "Clouds", "Rain", etc.
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.urbandrive.uz/images/brand/main-images/1729937832390_GAC-Aion_(En).webp"
          alt="GAC Aion"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <WeatherAnimation weather={weather} />
      </div>
    </section>
  );
};

export default Hero;
