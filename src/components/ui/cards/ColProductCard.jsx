import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function ColProductCard({ card }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [months, setMonths] = useState(12);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!card) return null;

  const images = card.images?.length
    ? card.images
    : [card.thumbnail || "https://via.placeholder.com/300"];

  const installmentPrice = Math.floor(card.price / months);

  const handleAddCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: card._id,
        title: card.title,
        price: card.price,
        image: images[0],
        quantity: 1,
      })
    );

    toast.success(`${card.title} savatga qo‘shildi!`);
  };

  return (
    <article
      onClick={() => navigate(`/col-products/${card._id}`)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer 
      bg-white border border-gray-200 shadow-sm hover:shadow-md
      transition-all duration-300 flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative h-36 sm:h-44 md:h-48 flex items-center justify-center bg-gray-50 rounded-t-2xl overflow-hidden">
        <img
          src={images[0]}
          alt={card.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* FAVORITE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);

            !isFavorite
              ? toast.success("Sevimlilarga qo‘shildi!")
              : toast("Sevimlilardan olib tashlandi");
          }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
          rounded-full bg-white border border-gray-200 hover:bg-gray-100 
          text-gray-700 shadow-sm transition-all
          ${isFavorite ? "text-red-500" : ""}`}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* BODY */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[9px] text-gray-500 uppercase">
          {card.brand || card.category}
        </p>

        <h2 className="font-semibold text-sm text-black line-clamp-2 mt-1 group-hover:text-gray-700">
          {card.title}
        </h2>

        <div className="mt-2 flex flex-col gap-1">
          <p className="text-xl font-bold text-black">
            {card.price.toLocaleString()} UZS
          </p>

          <span className="text-[11px] text-gray-800 px-2 py-[3px] rounded-full bg-gray-100 w-fit">
            {installmentPrice.toLocaleString()} × {months} oy
          </span>
        </div>

        {/* MONTH BUTTONS */}
        <div className="flex gap-2 mt-2">
          {[12, 18, 24].map((m) => (
            <button
              key={m}
              onClick={(e) => {
                e.stopPropagation();
                setMonths(m);
              }}
              className={`px-2 py-[5px] text-[10px] rounded-md border transition-all
              ${
                months === m
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {m} oy
            </button>
          ))}
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddCart}
          className="mt-3 w-full flex items-center justify-center gap-2 text-sm px-3 py-2 
          bg-black hover:bg-gray-800 text-white rounded-xl transition shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Savatga
        </button>
      </div>
    </article>
  );
}
