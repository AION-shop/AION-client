// DiscountCard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function DiscountCard() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({ hours: 6, minutes: 0, seconds: 0 });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Fetch one discounted product
  useEffect(() => {
    const fetchDiscountProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products?discount=true&limit=1`);
        const data = await res.json();
        if (data.success && data.products.length > 0) {
          setProduct(data.products[0]);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Discount product olishda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountProduct();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds -= 1;
        else {
          seconds = 59;
          if (minutes > 0) minutes -= 1;
          else {
            minutes = 59;
            if (hours > 0) hours -= 1;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 font-medium">
        Loading discount product...
      </p>
    );

  if (!product)
    return (
      <p className="text-center py-10 text-gray-500 font-medium">
        Discount product not available
      </p>
    );

  return (
    <article
      className="flex flex-col bg-base-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 w-full sm:w-64 md:w-72 lg:w-80 group hover:-translate-y-1"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Header: Title + Timer */}
      <header className="flex justify-between items-center p-4 border-b border-base-200">
        <h2 className="font-bold text-lg" itemProp="name">
          Товар дня
        </h2>
        <div className="flex gap-1 text-sm font-mono" aria-label="Time left for discount">
          <span className="px-1 py-0.5 border border-base-300 rounded">{formatTime(time.hours)}</span>:
          <span className="px-1 py-0.5 border border-base-300 rounded">{formatTime(time.minutes)}</span>:
          <span className="px-1 py-0.5 border border-base-300 rounded">{formatTime(time.seconds)}</span>
        </div>
      </header>

      {/* Product Image */}
      <Link
        to={`/products/${product._id}`}
        aria-label={`Перейти к продукту ${product.title}`}
        className="relative w-full"
        itemProp="url"
      >
        <img
          src={product.thumbnail || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product.title}
          className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          itemProp="image"
          loading="lazy"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/products/${product._id}`} className="hover:underline" itemProp="url">
          <h3 className="text-md font-semibold line-clamp-2" itemProp="name">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-3" itemProp="description">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-lg font-bold text-primary" itemProp="price">
            {Number(product.price).toLocaleString("ru-RU")} UZS
          </p>
          {product.discountPercentage > 0 && (
            <p className="text-xs line-through text-gray-400">
              {Number(product.price * (1 + product.discountPercentage / 100)).toLocaleString("ru-RU")} UZS
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex gap-2">
          <button
            className="btn btn-outline btn-primary flex-1 hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Savatga qo'shish"
            onClick={() => toast.success(`${product.title} savatga qo‘shildi`)}
          >
            Savatga
          </button>
          <button
            className="btn btn-outline btn-secondary flex-1 hover:bg-secondary hover:text-white transition-colors duration-300"
            aria-label="Bo‘lib to‘lash"
            onClick={() => toast.success(`Bo‘lib to‘lash funksiyasi hozircha demo`)}
          >
            Bo‘lib to‘lash
          </button>
        </div>
      </div>
    </article>
  );
}
