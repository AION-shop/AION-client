// AllProducts.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToFavorites } from "../redux/slices/favoritesSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = `${API}/products?limit=12&skip=${page * 12}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.success) throw new Error(data.message || "Server error");

        if (page === 0) setProducts(data.products);
        else setProducts((prev) => [...prev, ...data.products]);

        setHasMore(data.products.length >= 12);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title} добавлен в корзину 🛒`);
  };

  const handleAddToFavorites = (product, e) => {
    e.stopPropagation();
    dispatch(addToFavorites(product));
    toast.success(`${product.title} добавлен в избранное ❤️`);
  };

  const handleGoToSingle = (id) => navigate(`/products/${id}`);

  return (
    <div className="min-h-screen bg-base-300 p-6">
      <h1 className="text-3xl font-bold mb-6">Все товары</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-base-content/70 py-16">Товары не найдены</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-base-100 rounded-xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
              onClick={() => handleGoToSingle(p._id)}
            >
              <div className="relative h-48 bg-base-200 flex items-center justify-center overflow-hidden">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="object-contain h-full w-full p-4 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-semibold text-base-content mb-2 line-clamp-2">{p.title}</h3>
                <p className="text-base-content/70 text-sm mb-3 line-clamp-3">{p.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xl font-bold text-primary">{p.price.toLocaleString()} сум</p>
                  <button
                    onClick={(e) => handleAddToCart(p, e)}
                    className="bg-primary hover:bg-primary-focus text-primary-content py-2 px-4 rounded-lg transition font-medium"
                  >
                    🛒 В корзину
                  </button>
                </div>
                <button
                  onClick={(e) => handleAddToFavorites(p, e)}
                  className="w-full bg-base-200 hover:bg-base-300 text-base-content py-2 px-3 rounded-lg transition text-sm font-medium"
                >
                  ❤️ В избранное
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2 bg-primary hover:bg-primary-focus text-primary-content rounded-lg font-medium"
          >
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
