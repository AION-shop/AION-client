// ColProductCard.jsx
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ColProductCard({ card }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [months, setMonths] = useState(12);
  const navigate = useNavigate();

  if (!card) return null;

  const images = card.images?.length
    ? card.images
    : [card.thumbnail || "https://via.placeholder.com/300"];
  const installmentPrice = Math.floor(card.price / months);

  return (
    <>
      {/* SEO for individual product */}
      <Helmet>
        <title>{card.title} | Mahsulot</title>
        <meta
          name="description"
          content={`${card.title} haqida to‘liq ma'lumot, narxi va oylik to‘lov variantlari.`}
        />
        <meta
          name="keywords"
          content={`${card.title}, ${card.category}, avtomobil, onlayn sotib olish`}
        />
      </Helmet>

      <article
        onClick={() => navigate(`/col-products/${card._id}`)}
        className="group bg-white rounded-xl shadow-md hover:shadow-xl
          border border-gray-200 hover:border-blue-500 transition-all duration-300 
          cursor-pointer flex flex-col w-full sm:w-auto"
      >
        {/* IMAGE */}
        <div className="relative bg-gray-50 h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden rounded-t-xl flex items-center justify-center">
          <img
            src={images[0]}
            alt={`${card.title} rasmi`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {/* FAVORITE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            aria-label="Yoqtirish"
            className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center 
              rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200
              ${isFavorite ? "text-red-500" : "text-gray-600"}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 flex flex-col flex-1">
          {card.category && (
            <p className="text-xs sm:text-sm text-gray-500">{card.category}</p>
          )}

          <h2 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 
            group-hover:text-blue-600 transition-colors mt-1">
            {card.title}
          </h2>

          {/* PRICE */}
          <div className="mt-2 flex flex-col gap-1">
            <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
              text-transparent bg-clip-text">
              {card.price.toLocaleString()} UZS
            </p>

            <span className="text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 px-2 py-1 
              rounded-full shadow-sm inline-block w-fit">
              {installmentPrice.toLocaleString()} × {months} oy
            </span>
          </div>

          {/* MONTHS */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {[12, 18, 24].map((m) => (
              <button
                key={m}
                onClick={(e) => {
                  e.stopPropagation();
                  setMonths(m);
                }}
                aria-label={`${m} oy bo‘lib to‘lash`}
                className={`px-3 py-1 text-xs rounded-md border transition-all
                  ${months === m
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {m} oy
              </button>
            ))}
          </div>

          {/* ADD TO CART */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 
              bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Savatga
          </button>
        </div>
      </article>
    </>
  );
}
