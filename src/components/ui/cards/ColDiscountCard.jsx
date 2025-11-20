import React from "react";
import { Heart, BarChart2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ColDiscountCard({ card }) {
  // Statik product uchun fallback
  const title = card?.title || "AION V Special Edition";
  const price = card?.price || 150000000;
  const discount = card?.discount || 10; // 10% discount
  const image =
    card?.image || "https://via.placeholder.com/300x300.png?text=AION+V";

  const installmentMonths = 12;
  const installmentPrice = Math.ceil(price / installmentMonths);

  const discountedPrice = price - (price * discount) / 100;

  return (
    <Link
      to={`/products/${card?.id || 101}`}
      className="group card w-full bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 relative"
      aria-label={`Перейти к продукту ${title}`}
    >
      {/* Discount badge */}
      <div className="absolute top-3 left-3">
        <div className="badge badge-gradient font-semibold shadow-md">
          -{discount}%
        </div>
      </div>

      {/* Action icons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          className="btn btn-ghost btn-xs p-1 hover:bg-gray-100"
          aria-label="Добавить в избранное"
        >
          <Heart className="h-4 w-4 text-red-500 group-hover:text-red-600 transition-colors" />
        </button>
        <button
          className="btn btn-ghost btn-xs p-1 hover:bg-gray-100"
          aria-label="Сравнить продукт"
        >
          <BarChart2 className="h-4 w-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
        </button>
      </div>

      {/* Product image */}
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt={title}
          className="rounded-xl object-contain h-48 sm:h-56 md:h-64 w-full mx-auto transition-transform group-hover:scale-105"
        />
      </figure>

      {/* Product info */}
      <div className="card-body px-4 py-4">
        <h3 className="card-title text-sm sm:text-base font-medium line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
          <div>
            <p className="text-lg sm:text-xl font-bold text-primary">
              {discountedPrice.toLocaleString("ru-RU")} <span className="text-xs">UZS</span>
            </p>
            <p className="text-xs sm:text-sm line-through text-gray-400">
              {price.toLocaleString("ru-RU")} UZS
            </p>
          </div>

          <div className="badge badge-primary text-neutral font-medium text-[11px] sm:text-xs whitespace-nowrap shadow-sm">
            {installmentPrice.toLocaleString("ru-RU")} UZS × {installmentMonths} мес
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-between">
          <button
            className="btn btn-ghost btn-sm flex-1 flex items-center justify-center gap-1 hover:bg-primary hover:text-white transition-colors"
            aria-label="Добавить в корзину"
          >
            <ShoppingCart className="h-5 w-5" /> В корзину
          </button>
          <button
            className="btn btn-outline btn-primary btn-sm flex-1 rounded-xl hover:bg-primary hover:text-white transition-colors"
            aria-label="В рассрочку"
          >
            В рассрочку
          </button>
        </div>
      </div>
    </Link>
  );
}
