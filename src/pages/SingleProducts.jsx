// src/pages/SingleColProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  BatteryCharging,
  Zap,
  MapPin,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

export default function SingleColProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [installmentMonths, setInstallmentMonths] = useState(36);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // 🔹 Productni backenddan olish
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // 1️⃣ Col-Productni tekshirish birinchi
        let res = await fetch(`${API_URL}/col-products/${id}`);
        let data = await res.json();

        // Agar col-product topilsa
        if (data.success && data.product) {
          setProduct(data.product);
          const imgs =
            data.product.images?.length > 0
              ? data.product.images
              : data.product.thumbnail
                ? [data.product.thumbnail]
                : ["https://via.placeholder.com/1200x800?text=No+image"];
          setImages(imgs);
          setSelectedImage(0);
        } else {
          // Agar col-product topilmasa, normal productni fetch qilamiz
          res = await fetch(`${API_URL}/products/${id}`);
          data = await res.json();

          if (data.success && data.product) {
            setProduct(data.product);
            const imgs =
              data.product.images?.length > 0
                ? data.product.images
                : data.product.thumbnail
                  ? [data.product.thumbnail]
                  : ["https://via.placeholder.com/1200x800?text=No+image"];
            setImages(imgs);
            setSelectedImage(0);
          } else {
            // Hech narsa topilmasa
            setProduct(null);
          }
        }
      } catch (err) {
        console.error("Product olishda xato:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-5xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-72 sm:h-96 bg-gray-200 rounded-xl"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2 2 2m0-6l-2 2-2-2"
                />
              </svg>
              <span>
                Mahsulot topilmadi. Bosh sahifaga qaytish uchun{" "}
                <button className="link" onClick={() => navigate("/")}>
                  bu yerni bosing
                </button>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    );

  const basePrice = Number(product.price || 0);
  const discount = Number(product.discountPercentage || 0);
  const discountedPrice = Math.round(basePrice - (basePrice * discount) / 100);

  const handleToggleFavorite = () => {
    setIsFavorite((s) => !s);
    toast(isFavorite ? "Favoritdan o'chirildi" : "Favoritga qo'shildi");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description || "",
          url,
        });
      } catch { }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Havola nusxalandi");
    }
  };

  const handleReserve = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: discountedPrice,
        image: images[0],
        quantity: 1,
      })
    );
    toast.success("Mahsulot savatga qo'shildi (rezerv qilindi)");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>{product.title} — AION Uzbekistan</title>
        <meta
          name="description"
          content={product.description || `${product.title} haqida batafsil ma'lumot.`}
        />
        <meta name="keywords" content={`AION, ${product.title}, ${product.category || ""}`} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description || ""} />
        <meta property="og:image" content={images[0]} />
        <meta property="og:type" content="product" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="mx-auto px-4 lg:px-6 pt-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4 text-gray-500" aria-label="breadcrumb">
          <ol className="flex gap-2 items-center">
            <li>
              <button className="link link-hover" onClick={() => navigate("/")}>
                Bosh sahifa
              </button>
            </li>
            <li>/</li>
            <li className="capitalize">{product.category || "AION"}</li>
            <li>/</li>
            <li className="font-semibold">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Images */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative flex items-center justify-center bg-white p-4">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full max-h-[460px] object-contain"
                />
                <div className="absolute top-3 right-3 flex gap-3 z-20">
                  <button
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition ${isFavorite ? "bg-red-500 text-white" : "bg-gray-700 hover:bg-gray-800"
                      }`}
                  >
                    <Heart size={18} />
                  </button>
                  <button
                    onClick={handleShare}
                    aria-label="Share product"
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-gray-700 hover:bg-gray-800 "
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`min-w-[84px] h-16 rounded-lg overflow-hidden border transition ${idx === selectedImage ? "border-blue-600 shadow-lg" : "border-gray-300"
                    }`}
                >
                  <img src={img} alt={`${product.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-black">{product.title}</h1>
            <p className="text-base text-gray-700">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <Spec title="Narx" value={`${discountedPrice.toLocaleString()} so'm`} />
              <Spec title="Kategoriya" value={product.category || "—"} />
              <Spec title="Asl narxi" value={`${basePrice.toLocaleString()} so'm`} />
              <Spec title="Chegirma" value={`${discount}%`} />
              <Spec title="Battery Options" value={product.batteryOptions?.join(", ") || "—"} />
              <Spec title="Maksimal masofa" value={`${product.maxRange || 0} km`} />
              <Spec title="Tezlanish" value={`${product.acceleration || 0} s`} />
              <Spec title="Kuch" value={`${product.power || 0} kW`} />
              <Spec title="Reviews" value={product.reviewsCount || 0} />
            </div>

            {/* Installment */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Rasrochka muddatini tanlang</p>
              <div className="flex gap-2">
                {[12, 24, 36].map((m) => (
                  <button
                    key={m}
                    onClick={() => setInstallmentMonths(m)}
                    className={`px-3 py-1 rounded-md border text-sm ${installmentMonths === m
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-700"
                      }`}
                  >
                    {m} oy
                  </button>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-700">
                <span className="font-semibold">
                  {Math.round(discountedPrice / installmentMonths).toLocaleString()}
                </span>{" "}
                so'm / oy ({installmentMonths} oy)
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 space-y-3">
              <Feature icon={<Zap />} text="Regenerativ tormozlash" />
              <Feature icon={<MapPin />} text="Navigatsiya va OTA yangilanishlar" />
              <Feature icon={<BatteryCharging />} text="Tez quvvatlashni qo‘llab-quvvatlaydi" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 w-full">
            <div className="rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-200 bg-white sticky top-6 lg:top-28">
              {/* Price */}
              <div className="space-y-1">
                <p className="text-3xl font-bold text-black">{discountedPrice.toLocaleString()} so'm</p>
                {discount > 0 && (
                  <p className="text-sm line-through text-gray-400">{basePrice.toLocaleString()} so'm</p>
                )}
                <p className="text-sm text-gray-600 font-semibold">
                  {Math.round(discountedPrice / installmentMonths).toLocaleString()} so'm / {installmentMonths} oy
                </p>
              </div>

              {/* Reserve button */}
              <button
                onClick={handleReserve}
                className="btn btn-primary w-full py-3 rounded-xl hover:bg-blue-700 transition-colors text-white text-base"
              >
                Rezervga olish
              </button>

              <div className="divider my-2"></div>

              {/* Info */}
              <div className="space-y-3 text-sm">
                <InfoItem icon={<Truck className="text-blue-600" />} text="Tez yetkazib berish" />
                <InfoItem icon={<Shield className="text-blue-600" />} text="5 yil rasmiy kafolat" />
                <InfoItem icon={<RotateCcw className="text-blue-600" />} text="14 kun ichida qaytarish" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper components
function Spec({ title, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <span className="w-5 h-5 flex items-center justify-center text-blue-600">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
