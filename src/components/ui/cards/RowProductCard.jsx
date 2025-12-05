import React, { useState } from "react";
import { Heart, ShoppingCart, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function RowProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [months, setMonths] = useState(12);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("products"); // products namespace ishlatiladi



  if (!product) return null;

  const installmentPrice = Math.floor(product.price / months);
  const productImage =
    product.images?.[0] ||
    product.thumbnail ||
    "https://via.placeholder.com/300";

  const handleCardClick = () => navigate(`/products/${product._id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        image: productImage,
        quantity: 1,
      })
    );

    toast.success(`${product.title} ${t.addedToCart}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      toast.success(t.addedToFavorite);
    } else {
      toast(t.removedFromFavorite);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300 cursor-pointer flex flex-col"
      aria-label={`${t.gotoProduct} ${product.title}`}
    >
      {/* IMAGE */}
      <figure className="relative bg-gray-50 h-56 sm:h-64 overflow-hidden flex items-center justify-center rounded-t-2xl">
        <img
          src={productImage}
          alt={product.title}
          className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* LIKE */}
        <button
          aria-label={t.toggleFavorite}
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full 
            bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all
            ${isFavorite ? "text-red-500" : "text-gray-700"}
          `}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
        </button>

        {/* COMPARE */}
        <button
          aria-label={t.compareProduct}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-14 w-9 h-9 flex items-center justify-center rounded-full 
            bg-white border border-gray-200 shadow-md hover:shadow-lg text-gray-700"
        >
          <BarChart3 className="w-5 h-5" />
        </button>
      </figure>

      {/* BODY */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-black text-base sm:text-lg line-clamp-2 group-hover:text-gray-800">
          {product.title}
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          {product.category || product.brand}
        </p>

        <div className="mt-3 flex flex-col gap-2">
          <p className="text-xl font-bold text-black">
            {product.price.toLocaleString()} UZS
          </p>

          <span className="text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-300 inline-block w-fit">
            {installmentPrice.toLocaleString()} × {months} {t.months}
          </span>
        </div>

        {/* MONTH BUTTONS */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {[12, 18, 24].map((m) => (
            <button
              key={m}
              onClick={(e) => {
                e.stopPropagation();
                setMonths(m);
              }}
              className={`px-3 py-1 text-xs rounded-md border transition-all
                ${months === m
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {m} {t.months}
            </button>
          ))}
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="mt-4 flex items-center justify-center gap-2 px-4 py-2 
            bg-black text-white rounded-xl hover:bg-gray-800 transition-all w-full"
        >
          <ShoppingCart className="w-5 h-5" />
          {t.addToCart}
        </button>
      </div>
    </article>
  );
}
