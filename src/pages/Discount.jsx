// src/pages/discount.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

export default function Discount() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL ;

  // Mahsulotni olish
  useEffect(() => {
    const fetchDiscountCard = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/discount-cards/active/products`);
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        const data = await res.json();

        if (data?.products?.length > 0) {
          const productData = data.products[0];
          setProduct(productData);

          const now = Date.now();
          const expires = new Date(productData.product1.showProduct1Until).getTime();
          setRemaining(Math.max(expires - now, 0));
        } else {
          setProduct(null);
        }
      } catch (err) {
      
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountCard();
  }, [apiUrl]);

  // Countdown timer
  useEffect(() => {
    if (!product) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const expires = new Date(product.product1.showProduct1Until).getTime();
      const diff = Math.max(expires - now, 0);
      setRemaining(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00:00";
    let sec = Math.floor(ms / 1000);
    let h = Math.floor(sec / 3600);
    sec %= 3600;
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (loading) return <p className="text-center py-10">Yuklanmoqda...</p>;
  if (!product) return <p className="text-center py-10">Chegirma yo‘q</p>;

  const { product1, discountPercent } = product;
  const { name, price, originalPrice, image } = product1;

  return (
    <div className="max-w-sm mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300 hover:shadow-2xl transition-all duration-300 mt-10">
      <Helmet>
        <title>{name} — Chegirma | ShopMarket</title>
        <meta
          name="description"
          content={`Chegirma: ${name}. Narx: ${price?.toLocaleString("ru-RU") || 0} UZS`}
        />
      </Helmet>

      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt={name || "Chegirma mahsuloti"}
          className="w-full h-64 object-cover"
        />
        {discountPercent && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold shadow-md">
            -{discountPercent}%
          </span>
        )}
        {remaining > 0 && (
          <span className="absolute top-2 right-2 bg-base-200 text-primary px-2 py-1 rounded-md text-sm font-mono shadow-md">
            {formatTime(remaining)}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-bold text-lg line-clamp-2">{name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-xl font-bold text-primary">{price?.toLocaleString("ru-RU") || 0} UZS</p>
          {originalPrice && (
            <p className="text-sm line-through text-gray-400">{originalPrice?.toLocaleString("ru-RU") || 0} UZS</p>
          )}
        </div>
        <button
          onClick={() => toast.success("Savatga qo'shildi")}
          className="btn btn-primary w-full mt-3"
        >
          Savatga
        </button>
      </div>
    </div>
  );
}
