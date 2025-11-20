import React from "react";
import { Heart, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function RowDiscountCard({
  id,
  title = "Redmi 13C",
  price = 1000000,
  discount = 18,
  image = "https://via.placeholder.com/220",
}) {
  const discountedPrice = Math.round(price - (price * discount) / 100);
  const installmentPrice = Math.ceil(discountedPrice / 12);

  return (
    <div className="flex-shrink-0 w-72 sm:w-80 md:w-96">
      <Link
        to={`/product/${id}`}
        aria-label={`Перейти к продукту ${title}`}
        className="card bg-base-100 border-2 border-primary rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl transition-transform duration-300 group hover:-translate-y-1 cursor-pointer"
      >
        {/* Discount badge */}
        <div className="absolute top-2 left-2 z-10">
          <div className="badge badge-primary text-base-100 font-semibold">
            -{discount}%
          </div>
        </div>

        {/* Top right icons */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            type="button"
            aria-label="Добавить в избранное"
            className="btn btn-ghost btn-xs p-1 hover:bg-base-200 transition"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-red-500 group-hover:text-red-600 transition-colors duration-200" />
          </button>
          <button
            type="button"
            aria-label="Сравнить продукт"
            className="btn btn-ghost btn-xs p-1 hover:bg-base-200 transition"
            onClick={(e) => e.preventDefault()}
          >
            <BarChart className="h-4 w-4 text-base-content group-hover:text-primary transition-colors duration-200" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 items-center">
          {/* Product image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="w-full h-40 sm:h-32 md:h-40 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
            <h2 className="text-md font-medium line-clamp-2 text-base-content">
              {title}
            </h2>

            <div className="text-base font-bold text-primary">
              {discountedPrice.toLocaleString("ru-RU")} <span className="text-xs">UZS</span>
            </div>
            <div className="text-xs line-through text-base-content/70">
              {price.toLocaleString("ru-RU")} UZS
            </div>

            <div className="mt-2">
              <div className="badge badge-primary text-[11px] sm:text-xs font-medium whitespace-nowrap">
                {installmentPrice.toLocaleString("ru-RU")} UZS × 12 мес
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
