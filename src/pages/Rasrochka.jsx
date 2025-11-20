import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import RowProductCard from "../components/ui/cards/RowProductCard";

const Rasrochka = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();

  // Kategoriyalar
  const categories = [
    { id: "all", name: "Все товары" },
    { id: "AION V", name: "AION V" },
    { id: "AION Y", name: "AION Y" },
    { id: "AION S", name: "AION S" },
    { id: "AION MAX", name: "AION MAX" },
    { id: "new", name: "Новинки" },
  ];

  // URL orqali highlight qilish
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get("highlight");
    if (highlight) {
      setSelectedCategory(highlight);
    }
  }, [location.search]);

  // Mahsulotlarni yuklash
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/products?limit=1000`);
        const data = await res.json();
        let fetched = data.products || [];

        // FILTER: Category
        if (selectedCategory !== "all") {
          if (selectedCategory === "new") {
            const now = new Date();
            fetched = fetched.filter((p) => {
              const createdAt = new Date(p.createdAt);
              const diff = (now - createdAt) / (1000 * 60 * 60 * 24);
              return diff <= 4; // faqat 4 kunlik yangilar
            });
          } else {
            // Title orqali filter
            fetched = fetched.filter((p) =>
              p.title.toUpperCase().includes(selectedCategory.toUpperCase())
            );
          }
        }

        setProducts(fetched);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col text-white">

      {/* SEO */}
      <Helmet>
        <title>Рассрочка — ShopMarket</title>
        <meta
          name="description"
          content="AION V, AION S, AION MAX avtomobillari va boshqa mahsulotlar uchun eng qulay hisob-kitobli rassrochka."
        />
        <meta name="keywords" content="AION rassrochka, kredit, bo‘lib to‘lash, AION V, AION S" />
      </Helmet>

      <div className="flex flex-1 flex-col lg:flex-row">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 border-r border-gray-800 p-6">
          <h3 className="text-2xl font-bold mb-6">Рассрочка</h3>

          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition ${
                    selectedCategory === cat.id
                      ? "bg-white text-black"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">
              {selectedCategory === "new" ? "Новинки" : "Товары в рассрочку"}
            </h1>
            <div className="text-gray-300">
              Найдено {products.length} товаров
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-lg">
              Товары не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <RowProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Rasrochka;
