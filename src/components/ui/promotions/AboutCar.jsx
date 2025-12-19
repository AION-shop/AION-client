import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Battery, Zap, Shield, Wind, Gauge, Timer, Home, Disc, TrendingUp, Sparkles, Check } from "lucide-react";

// Animated Feature Card
const FeatureCard = ({ icon: Icon, title, value, description, delay }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white/90 backdrop-blur-md shadow-lg p-6 rounded-3xl border border-gray-100 transition-all duration-700 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} hover:scale-105 hover:shadow-2xl`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-4 bg-gray-100 rounded-xl">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xl font-semibold text-gray-600">{value}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

// Animated Spec Item
const SpecItem = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-3 p-4 bg-white/90 backdrop-blur-md shadow-md rounded-2xl transition-all transform hover:scale-105 hover:shadow-xl">
    {Icon && <Icon className="w-5 h-5 text-gray-700" />}
    <div className="flex-1">
      <span className="text-gray-500 text-sm">{label}</span>
      <p className="text-gray-900 font-semibold">{value}</p>
    </div>
    <Check className="w-5 h-5 text-green-500" />
  </div>
);

// Section Header with subtle animation
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-up">
    <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-2xl mb-4 animate-pulse">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600">{subtitle}</p>
  </div>
);

const AboutCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/popular/${id}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <p className="text-gray-900 p-4 text-center">Loading car information...</p>;
  if (!car) return <p className="text-gray-900 p-4 text-center">Car not found</p>;

  return (
    <div className="min-h-screen  text-gray-900">
      <div className="container mx-auto px-4 py-12 space-y-16">

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="flex flex-col justify-center text-center md:text-left space-y-4 animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">{car.title}</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">{car.description}</p>
            <div className="flex gap-4 justify-center md:justify-start mt-4">
              <span className="px-5 py-2 bg-gray-900 text-white rounded-full font-semibold">Electric</span>
              <span className="px-5 py-2 bg-gray-200 text-gray-900 rounded-full font-semibold">{car.power ?? "N/A"} kW</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl animate-fade-up">
            <img
              src={car.images?.[0] || "https://via.placeholder.com/600"}
              alt={car.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <FeatureCard icon={Battery} title="Battery Options" value={car.batteryOptions?.join(", ") || "N/A"} description="Available battery types" delay={0} />
          <FeatureCard icon={Zap} title="Power" value={`${car.power ?? "N/A"} kW`} description="Motor power output" delay={150} />
          <FeatureCard icon={Gauge} title="Top Speed" value={`${car.topSpeed ?? "N/A"} km/h`} description="Maximum speed" delay={300} />
          <FeatureCard icon={Timer} title="Acceleration" value={`${car.acceleration ?? "N/A"}s`} description="0-100 km/h" delay={450} />
          <FeatureCard icon={Wind} title="Max Range" value={`${car.maxRange ?? "N/A"} km`} description="Full battery distance" delay={600} />
          <FeatureCard icon={Shield} title="Drivetrain" value={car.drivetrain || "N/A"} description="Drive type" delay={750} />
        </div>

        {/* Brake Section */}
        <div>
          <SectionHeader icon={Disc} title="Brake System" subtitle="Front & Rear, ABS, EBD, ESP" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-4">
              <SpecItem label="Front Brake" value="Disc" icon={Disc} />
              <SpecItem label="Rear Brake" value="Disc" icon={Disc} />
              <SpecItem label="ABS" value="Yes" icon={Shield} />
              <SpecItem label="EBD" value="Yes" icon={Zap} />
              <SpecItem label="ESP" value="Yes" icon={TrendingUp} />
              <SpecItem label="Brake Assist" value="Yes" icon={Timer} />
            </div>
            <img src={car.images?.[1] || car.images?.[0] || ""} alt="Brake system" className="rounded-3xl shadow-lg w-full h-72 md:h-full object-cover animate-fade-up" />
          </div>
        </div>

        {/* Interior Section */}
        <div>
          <SectionHeader icon={Home} title="Interior Features" subtitle="Comfort and digital dashboard" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={Gauge} title="Digital Panel" value="10.25”" description="High resolution dashboard" delay={0} />
            <FeatureCard icon={Home} title="Sensor Screen" value="14.6”" description="Central touch display" delay={150} />
            <FeatureCard icon={Wind} title="Climate Control" value="Auto" description="Automatic climate system" delay={300} />
            <FeatureCard icon={Sparkles} title="Panoramic Sunroof" value="Yes" description="Wide panoramic roof" delay={450} />
          </div>
        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutCar;
