  import React from "react";
  import { HeartIcon, ShoppingCartIcon } from "lucide-react";
  import { Link } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { addToCart } from "../../../redux/slices/cartSlice";
  import toast from "react-hot-toast";

  export default function ProductCard({ product, addToFavorites }) {
    const dispatch = useDispatch();

    if (!product) return null;

    const installmentMonths = 12;
    const installmentPrice = Math.ceil(product.price / installmentMonths);

    const images = product.images?.length
      ? product.images
      : [product.thumbnail || "https://via.placeholder.com/300"];

    const handleAddCart = () => {
      dispatch(
        addToCart({
          id: product._id,
          title: product.title,
          price: product.price,
          image: images[0],
          quantity: 1,
        })
      );

      toast.success(`${product.title} savatga qo‘shildi!`);
    };

    return (
      <div className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 relative overflow-hidden flex flex-col group hover:-translate-y-1">

        {/* Favorites */}
        <button
          onClick={() => {
            addToFavorites && addToFavorites(product);
            toast.success("Sevimlilarga qo‘shildi!");
          }}
          className="absolute top-3 right-3 bg-base-100 p-2 rounded-full shadow hover:bg-base-200 transition z-10"
        >
          <HeartIcon className="w-5 h-5 text-red-500 group-hover:text-red-600" />
        </button>

        {/* Image */}
        <Link
          to={`/products/${product._id}`}
          className="flex justify-center items-center w-full h-64 sm:h-72 md:h-80 overflow-hidden"
        >
          <img
            src={images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="p-4 flex flex-col gap-2 border-t border-base-200">
          <Link to={`/products/${product._id}`} className="text-base font-semibold hover:underline">
            {product.title}
          </Link>

          {product.description && (
            <p className="text-sm text-gray-600">
              {product.description}
            </p>
          )}

          <p className="text-xl font-bold text-primary">
            {product.price.toLocaleString()} so‘m
          </p>

          <span className="badge badge-outline badge-primary text-sm">
            {installmentPrice.toLocaleString()} so‘m × {installmentMonths} oy
          </span>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddCart}
              className="btn btn-outline btn-primary flex-1 flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Savatga
            </button>

            <Link
              to={`/products/${product._id}`}
              className="btn btn-primary flex-1 text-center hover:bg-primary/90"
            >
              Batafsil
            </Link>
          </div>
        </div>
      </div>
    );
  }
