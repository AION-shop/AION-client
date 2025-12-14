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
  ShoppingCart,
} from "lucide-react";
import { useSelector } from "react-redux";

const getApiUrl = () => import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function SingleProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("features"); // default tab features
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(() => {
    const saved = localStorage.getItem(`product-${id}-rating`);
    return saved ? Number(saved) : 0;
  });
  const [submittingRating, setSubmittingRating] = useState(false);

  const API_URL = useMemo(() => getApiUrl(), []);
  const goBack = useCallback(() => navigate(-1), [navigate]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/col-products/${id}`);
        const data = await res.json();
        if (res.ok && data.success && data.product) {
          setProduct(data.product);
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  // Update views once per page load
  useEffect(() => {
    const updateViews = async () => {
      try {
        await fetch(`${API_URL}/api/col-products/${id}/view`, { method: "PUT" });
        setProduct((prev) =>
          prev ? { ...prev, views: (prev.views || 0) + 1 } : prev
        );
      } catch (err) {
        console.error(err);
      }
    };
    updateViews();
  }, [id, API_URL]);

  // Handle rating
  const handleRating = async (rate) => {
    if (!isAuth) return navigate("/login");
    if (userRating || submittingRating) return;

    setSubmittingRating(true);
    try {
      const res = await fetch(`${API_URL}/api/col-products/${id}/rating`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: rate }),
      });
      const data = await res.json();
      if (data.success) {
        setProduct((prev) => ({
          ...prev,
          rating: data.rating,
          reviewsCount: (prev.reviewsCount || 0) + 1,
        }));
        setUserRating(rate);
        localStorage.setItem(`product-${id}-rating`, rate);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingRating(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center animate-fadeIn">
        Loading...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center animate-fadeIn">
        Product not found
      </div>
    );

  const images =
    product.images?.length > 0
      ? product.images
      : [product.thumbnail || "https://via.placeholder.com/600"];

  const tabs = [
    { id: "features", label: "Xususiyatlar", icon: Zap },
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
              

              <Share2
                className="w-5 h-5 text-gray-600 hover:text-blue-500 transition cursor-pointer"
                onClick={async () => {
                  const shareData = {
                    title: product.title,
                    text: `Check out this product: ${product.title}`,
                    url: window.location.href,
                  };

                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                      console.log("Product shared successfully");
                    } catch (err) {
                      console.error("Share failed:", err);
                    }
                  } else {
                    // Fallback: linkni nusxalash
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    } catch (err) {
                      alert("Failed to copy link");
                    }
                  }
                }}
              />
            </div>

          </div>
        </Container>
      </header>

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
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${idx === selectedImage
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

            {/* Rating & Add Rating */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => {
                  const isFilled = i < Math.round(product.rating || 0);
                  const clickable = i + 1;
                  return (
                    <Star
                      key={i}
                      className={`w-5 h-5 cursor-pointer ${clickable <= userRating
                          ? "text-yellow-500"
                          : isFilled
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      onClick={() => handleRating(clickable)}
                    />
                  );
                })}
                <span className="text-sm text-gray-600 ml-2">
                  {product.reviewsCount || 0} reviews • {product.views || 0} views
                </span>
              </div>
              {!userRating && (
                <button
                  onClick={() => handleRating(5)}
                  disabled={submittingRating}
                  className="mt-2 w-32 px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  Add Rating
                </button>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              {product.description || "Mahsulot tavsifi mavjud emas"}
            </p>

            {/* Specs - doimiy ko‘rinadi */}
            <div className="space-y-2 mb-6">
              <h2 className="text-xl font-semibold mb-3">Texnik xususiyatlar</h2>
              {[
                { label: "Max Range (km)", value: product.maxRange },
                { label: "Acceleration (0-100 km/h)", value: product.acceleration },
                { label: "Power (kW)", value: product.power },
                { label: "Top Speed (km/h)", value: product.topSpeed },
                { label: "Drivetrain", value: product.drivetrain },
                { label: "Charging Time", value: product.chargingTime },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-2 px-4 bg-white rounded-lg shadow-sm"
                >
                  <span>{item.label}</span>
                  <span>{item.value || "-"}</span>
                </div>
              ))}
            </div>

            {/* Price & Offerta */}
            <div className="py-6 border-t border-b border-gray-200">
              <p className="text-4xl font-bold text-blue-600 mb-3">
                ${product.price?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Yetkazib berish bepul</p>
              <button
                onClick={() => {
                  if (!isAuth) return navigate("/login");
                  navigate("/offerta");
                }}
                className="mt-6 w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" /> Offerta otkazish
              </button>
            </div>

            {/* Tabs - faqat qo‘shimcha ma’lumotlar */}
            <div>
              <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
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

      {/* Animation style */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        /* Scrollbar responsive tabs */
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #d1d5db #f9fafb; }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 8px; }
        .scrollbar-thumb-gray-300::-webkit-scrollbar { height: 6px; }
      `}</style>
    </div>
  );
}
