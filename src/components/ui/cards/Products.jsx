import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, DollarSign } from "lucide-react";

export default function ColProductCard({ card }) {
  const navigate = useNavigate();
  if (!card) return null;

  const imageSrc = card.images?.[0] || card.thumbnail || "https://via.placeholder.com/400";
  const productTitle = card.title || card.name || "Unnamed Product";
  const productDescription = card.description || "High performance vehicle details.";
  const formattedPrice = card.price ? `$${card.price.toLocaleString()}` : "Price on request";

  const handleNavigation = useCallback(() => {
    if (card._id) navigate(`/col-products/${card._id}`);
  }, [navigate, card._id]);

  return (
    <div
      onClick={handleNavigation}
      className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg aspect-square
        transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl bg-gray-800"
      role="link"
      aria-label={`Explore details for ${productTitle}`}
    >
      {/* IMAGE */}
      <img
        src={imageSrc}
        alt={productTitle}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          {card.type && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                {card.type}
              </span>
            </div>
          )}
          <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight line-clamp-2">{productTitle}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            {productDescription}
          </p>

          <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            {card.price && (
              <span className="text-xl sm:text-2xl font-bold flex items-center">
                <DollarSign className="w-5 h-5 mr-1 text-green-400" />
                {formattedPrice}
              </span>
            )}
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Explore
              </button>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                <ArrowRight size={20} className="text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
