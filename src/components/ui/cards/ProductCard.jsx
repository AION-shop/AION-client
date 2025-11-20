import React from "react";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart, addToFavorites }) {
  if (!product) return null;

  const installmentMonths = 12;
  const installmentPrice = Math.ceil(product.price / installmentMonths);

  const images = product.images?.length ? product.images : [product.thumbnail || "https://via.placeholder.com/300"];

  return (
    <div className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 relative overflow-hidden flex flex-col group hover:-translate-y-1">
      {/* Favorites button */}
      <button
        onClick={() => addToFavorites(product)}
        aria-label={`Add ${product?.title} to favorites`}
        className="absolute top-3 right-3 bg-base-100 p-2 rounded-full shadow hover:bg-base-200 transition z-10"
      >
        <HeartIcon className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-200" />
      </button>

      {/* Product image */}
      <Link
        to={`/products/${product._id}`}
        aria-label={`Go to ${product?.title}`}
        className="flex justify-center items-center w-full h-64 sm:h-72 md:h-80 cursor-pointer overflow-hidden"
      >
        <img
          src={images[0]}
          alt={product?.title || "Product image"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product info */}
      <div className="p-4 flex flex-col gap-2 border-t border-base-200">
        {/* Title */}
        <Link
          to={`/products/${product._id}`}
          className="text-sm sm:text-base font-semibold text-base-content hover:underline"
        >
          {product?.title}
        </Link>

        {/* Description */}
        {product?.description && (
          <p className="text-sm sm:text-sm text-gray-600">
            {product.description}
          </p>
        )}

        {/* Price */}
        <p className="text-lg sm:text-xl font-bold text-primary mt-1">
          {product?.price.toLocaleString()} so‘m
        </p>

        {/* Installment info */}
        <span className="badge badge-outline badge-primary text-sm sm:text-base mt-1">
          {installmentPrice.toLocaleString()} so‘m × {installmentMonths} oy
        </span>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <button
            onClick={() =>
              addToCart({
                id: product._id,
                name: product.title,
                price: product.price,
                image: images[0],
                quantity: 1,
              })
            }
            className="btn btn-outline btn-primary flex-1 flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Savatga
          </button>

          <Link
            to={`/products/${product._id}`}
            className="btn btn-primary flex-1 text-center hover:bg-primary/90 transition-colors duration-300"
          >
            Batafsil
          </Link>
        </div>
      </div>
    </div>
  );
}
