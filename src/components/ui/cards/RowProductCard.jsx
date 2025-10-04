import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/favoritesSlice";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiBarChart } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

export default function RowProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔸 Favorites holatini olish
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);

  // ❤️ Sevimlilarga qo‘shish / olib tashlash
  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.error("Удалено из избранного ❤️");
    } else {
      dispatch(addToFavorites(product));
      toast.success("Добавлено в избранное 💖");
    }
  };

  // 🛒 Savatga qo‘shish
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Добавлено в корзину 🛒");
  };

  // 🔗 Single sahifaga o‘tish
  const goToSingle = () => {
    navigate(`/products/${product.id}`);
  };

  // 💰 Рассрочка (12 мес)
  const installmentMonths = 12;
  const installmentPrice = Math.ceil(product.price / installmentMonths);

  return (
    <div className="flex bg-white rounded-xl shadow hover:shadow-lg transition m-4 overflow-hidden">
      Mahsulot rasmi (klik bilan single sahifaga olib boradi)
      <div
        onClick={goToSingle}
        className="cursor-pointer bg-gray-50 flex justify-center items-center p-4 min-w-[200px]"
      >
        <img
          src={product?.thumbnail || product?.image || product?.images?.[0]}
          alt={product?.title}
          className="max-h-[180px] object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

     
      <div className="flex flex-col justify-between flex-1 p-4">
       
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{product?.category}</p>
            <h2
              onClick={goToSingle}
              className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-500 transition line-clamp-2"
            >
              {product?.title}
            </h2>
            <p className="text-xl font-bold text-black mt-2">
              {product?.price.toLocaleString()} so‘m
            </p>
            <p className="bg-yellow-300 inline-block px-2 py-1 rounded text-sm font-semibold mt-1">
              {installmentPrice.toLocaleString()} so‘m × {installmentMonths} мес
            </p>
          </div>

        
          <div className="flex flex-col gap-2 items-end">
            <button
              onClick={handleFavorite}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              {isFavorite ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
              <BiBarChart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

       
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition text-sm"
          >
            <FiShoppingCart className="w-4 h-4" />
            В корзину
          </button>

          <Link
            to={`/products/${product.id}`}
            className="bg-red-500 text-white text-center rounded-lg px-4 py-2 hover:bg-red-600 transition text-sm flex items-center justify-center"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}
