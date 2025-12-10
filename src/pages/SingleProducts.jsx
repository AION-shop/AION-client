import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../components/shared/Container";
import {
  Heart,
  Share2,
  ChevronLeft,
  Star,
  Zap,
  Shield,
  Award,
  Gauge,
  ShoppingCart,
} from "lucide-react";

const getApiUrl = () => import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function SingleColProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const API_URL = useMemo(() => getApiUrl(), []);
  const goBack = useCallback(() => navigate(-1), [navigate]);

  // Product load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/col-products/${id}`);
        const data = await res.json();
        if (!data.success) throw new Error("Product not found");
        setProduct(data.product);
      } catch (err) {
       
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  // Views +1 faqat bir marta
  useEffect(() => {
    if (!product) return;
    const updateViews = async () => {
      try {
        await fetch(`${API_URL}/api/col-products/${id}/view`, { method: "PUT" });
      } catch (err) {
        
      }
    };
    updateViews();
  }, [id, API_URL, product]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail || "https://via.placeholder.com/600"];

  const tabs = [
    { id: "overview", label: "Umumiy ma'lumot", icon: Gauge },
    { id: "specs", label: "Texnik xususiyatlar", icon: Award },
    { id: "features", label: "Xususiyatlari", icon: Zap },
    { id: "warranty", label: "Kafolat", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn text-gray-800">
      <Helmet>
        <title>{product.title} | AutoMarket</title>
        <meta
          name="description"
          content={product.description?.substring(0, 150) || "Product details"}
        />
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">
                Galereyaga qaytish
              </span>
            </button>
            <div className="flex gap-3">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition" />
              <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-500 transition" />
            </div>
          </div>
        </Container>
      </header>

      {/* Product */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 lg:py-12">
          {/* Left - Images */}
          <div className="space-y-4 lg:sticky lg:top-20 h-fit">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-[400px] lg:h-[500px] object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
                    idx === selectedImage
                      ? "border-blue-600 shadow-md"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900">
              {product.title}
            </h1>

            <div className="flex items-center gap-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                {product.reviewsCount || 0} reviews • {product.views || 0} views
              </span>
            </div>

            <p className="text-gray-700">
              {product.description || "Mahsulot tavsifi mavjud emas"}
            </p>

            <div className="py-6 border-t border-b border-gray-200">
              <p className="text-4xl font-bold text-blue-600 mb-3">
                ${product.price?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Yetkazib berish bepul</p>
              <button className="mt-6 w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-transform hover:scale-105">
                <ShoppingCart className="w-5 h-5" /> Savatga qo'shish
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 flex items-center gap-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-b-2 border-blue-600 font-semibold text-gray-900"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" /> {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                {activeTab === "overview" && <div>{product.description}</div>}

                {activeTab === "specs" && (
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span>Max Range (km)</span>{" "}
                      <span>{product.maxRange || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span>Acceleration (0-100 km/h)</span>{" "}
                      <span>{product.acceleration || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span>Power (kW)</span> <span>{product.power || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span>Top Speed (km/h)</span>{" "}
                      <span>{product.topSpeed || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span>Drivetrain</span> <span>{product.drivetrain || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span>Charging Time</span>{" "}
                      <span>{product.chargingTime || "-"}</span>
                    </div>
                  </div>
                )}

                {activeTab === "features" && (
                  <ul className="space-y-2">
                    {product.features?.length > 0 ? (
                      product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-blue-500" /> {f}
                        </li>
                      ))
                    ) : (
                      <p>Qo'shimcha xususiyatlar mavjud emas</p>
                    )}
                  </ul>
                )}

                {activeTab === "warranty" && (
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-lg">
                    <p className="font-semibold mb-2">5 Yillik Kengaytirilgan Kafolat</p>
                    <p>
                      Avtomobilga 5 yil yoki 100,000 km masofagacha kafolat beriladi.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
      `}</style>
    </div>
  );
}
