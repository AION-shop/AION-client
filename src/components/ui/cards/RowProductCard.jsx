// RowProductCard.jsx
import React, { useState } from "react";
import { Heart, ShoppingCart, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function RowProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [months, setMonths] = useState(12);
  const navigate = useNavigate();

  if (!product) return null;

  const installmentPrice = Math.floor(product.price / months);

  return (
    <>
      {/* SEO HELMET */}
      <Helmet>
        <title>{product.title} | Row Product</title>
        <meta name="description" content={`${product.title} narxi, tavsifi va oylik to‘lov shartlari.`} />
        <meta name="keywords" content={`${product.title}, ${product.category}, mahsulot, sotib olish`} />
      </Helmet>

      <article
        onClick={() => navigate(`/products/${product._id}`)}
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl
        border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col"
      >
        {/* IMAGE */}
        <figure className="relative bg-gray-50 h-56 sm:h-64 overflow-hidden flex items-center justify-center">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={`${product.title} rasmi`}
            loading="lazy"
            className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />

          {/* FAVORITE */}
          <button
            aria-label="Yoqtirish"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center 
            rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
              isFavorite ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500" : ""}`} />
          </button>

          {/* COMPARE BAG */}
          <button
            aria-label="Taqqoslash"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-16 w-10 h-10 flex items-center justify-center 
            rounded-full bg-white shadow-md hover:shadow-lg"
          >
            <BarChart3 className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </button>
        </figure>

        {/* BODY */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2 
          group-hover:text-blue-600 transition-colors">
            {product.title}
          </h2>

          <p className="text-xs text-gray-500 mt-1">{product.category}</p>

          {/* PRICE + INSTALLMENT */}
          <div className="mt-3 flex flex-col gap-2">
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
            text-transparent bg-clip-text">
              {product.price.toLocaleString()} UZS
            </p>

            <span className="text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 
            rounded-full shadow-sm inline-block w-fit">
              {installmentPrice.toLocaleString()} UZS × {months} oy
            </span>
          </div>

          {/* MONTHS */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[12, 18, 24].map((m) => (
              <button
                key={m}
                onClick={(e) => {
                  e.stopPropagation();
                  setMonths(m);
                }}
                aria-label={`${m} oy bo‘lib to‘lash`}
                className={`px-3 py-1 text-xs rounded-md border transition-all ${
                  months === m
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {m} oy
              </button>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex items-center justify-center gap-2 px-4 py-2 
            bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all w-full"
          >
            <ShoppingCart className="w-5 h-5" />
            Savatga
          </button>
        </div>
      </article>
    </>
  );
}
