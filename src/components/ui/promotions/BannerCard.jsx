import React from "react";
import Container from "../../shared/Container";

const BannerCard = ({
  img,
  title,
  subtitle,
  buttonText,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-md ${className}`}
    >
      {/* Rasm */}
      <img
        src={img}
        alt="Banner"
        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      {/* Text */}
      <div className="absolute bottom-5 left-5 text-white">
        {title && <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>}
        {subtitle && (
          <p className="text-sm sm:text-base opacity-90 mt-1">{subtitle}</p>
        )}

        {buttonText && (
          <button
            onClick={onClick}
            className="mt-4 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium shadow-sm hover:bg-gray-200 transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default BannerCard;
