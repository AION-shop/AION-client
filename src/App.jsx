import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import SnowAnimation from "./pages/SnowAnimation";
import WeatherAnimation from "./pages/WeatherAnimation";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ❄️ Animations overlay */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <SnowAnimation />
        <WeatherAnimation locationId="YOUR_LOCATION_ID" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <Header />
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
}
