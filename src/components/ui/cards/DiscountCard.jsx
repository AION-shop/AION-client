import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";

export default function Discount() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState(0);

  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchDiscountProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/discount-cards/active/products`);
      const data = await res.json();

      if (data?.products?.length > 0) {
        const p = data.products[0];
        setProduct(p);

        const expires = new Date(p.product1.showProduct1Until).getTime();
        setRemaining(Math.max(expires - Date.now(), 0));
      } else {
        setProduct(null);
      }
    } catch (err) {
      console.error("Discount fetch error:", err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountProduct();
  }, []);

  useEffect(() => {
    if (!product) return;

    const interval = setInterval(() => {
      const expires = new Date(product.product1.showProduct1Until).getTime();
      const diff = Math.max(expires - Date.now(), 0);
      setRemaining(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00:00";
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  if (loading) return <p className="text-center py-20 text-lg">Yuklanmoqda...</p>;
  if (!product) return <p className="text-center py-20 text-lg">Chegirma mavjud emas</p>;

  const { product1, discountPercent } = product;
  const { name, price, originalPrice, image } = product1;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product1._id,
        title: product1.name,
        price: product1.price,
        image: product1.image,
        quantity: 1,
      })
    );
    toast.success("Savatga qo‘shildi!");
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200 mt-10">
      <Helmet>
        <title>{name} — Chegirma | ShopMarket</title>
        <meta name="description" content={`Chegirma: ${name}`} />
      </Helmet>

      {/* IMAGE */}
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt={name}
          className="w-full h-64 object-cover bg-gray-50"
        />

        {/* DISCOUNT BADGE */}
        {discountPercent && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-sm">
            -{discountPercent}%
          </span>
        )}

        {/* TIMER */}
        {remaining > 0 && (
          <span className="absolute top-3 right-3 bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-mono shadow-sm">
            {formatTime(remaining)}
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="font-semibold text-lg text-black line-clamp-2">{name}</h2>

        <div className="flex items-center gap-3 mt-1">
          <p className="text-xl font-bold text-black">
            {price?.toLocaleString("ru-RU")} UZS
          </p>

          {originalPrice && (
            <p className="text-sm line-through text-gray-500">
              {originalPrice?.toLocaleString("ru-RU")} UZS
            </p>
          )}
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Savatga
        </button>
      </div>
    </div>
  );
}
