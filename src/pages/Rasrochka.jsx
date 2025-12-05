import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu } from "lucide-react";
import RowProductCard from "../components/ui/cards/RowProductCard";

const Rasrochka = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  /* ================================
     CATEGORY LIST (match with Swiper)
     ================================= */
  const categories = [
    { id: "all", name: "Все товары" },
    { id: "AION V", name: "AION V" },
    { id: "AION Y", name: "AION Y" },
    { id: "AION S", name: "AION S" },
    { id: "AION MAX", name: "AION MAX" },
    { id: "new", name: "Новинки" },
  ];

  /* ================================
      GET CATEGORY FROM URL (Swiper)
     ================================= */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const model = params.get("model");

    if (model) {
      const exists = categories.some((c) => c.id.toUpperCase() === model.toUpperCase());
      if (exists) setSelectedCategory(model);
    }
  }, [location.search]);

  /* ================================
       FETCH PRODUCTS
     ================================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/products?limit=2000`);
        const data = await res.json();
        let fetched = data.products || [];

        // Category filtering
        if (selectedCategory !== "all") {
          if (selectedCategory === "new") {
            const now = new Date();
            fetched = fetched.filter((p) => {
              const createdAt = new Date(p.createdAt);
              const diffDays = (now - createdAt) / (1000 * 3600 * 24);
              return diffDays <= 4;
            });
          } else {
            fetched = fetched.filter((p) =>
              p.title.toUpperCase().includes(selectedCategory.toUpperCase())
            );
          }
        }

        setProducts(fetched);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">

      {/* SEO */}
      <Helmet>
        <title>Товары в рассрочку — ShopMarket</title>
        <meta
          name="description"
          content="AION V, AION Y, AION S, AION MAX avtomobillari va boshqa mahsulotlar uchun qulay rassrochka."
        />
      </Helmet>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold">
          {selectedCategory === "new" ? "Новинки" : "Рассрочка"}
        </h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="flex flex-1">

        {/* ================================
            SIDEBAR DESKTOP
        ================================= */}
        <aside className="hidden lg:block w-72 border-r p-6 bg-white">
          <h3 className="text-2xl font-bold mb-5">Категории</h3>

          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all
                    ${
                      selectedCategory === cat.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ================================
            SIDEBAR MOBILE DRAWER
        ================================= */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="bg-black bg-opacity-40 flex-1"
              onClick={() => setSidebarOpen(false)}
            ></div>

            <div className="w-64 bg-white h-full p-6 shadow-xl animate-slide-right">
              <h3 className="text-2xl font-bold mb-6">Категории</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition 
                        ${
                          selectedCategory === cat.id
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-200"
                        }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ================================
              MAIN CONTENT
        ================================= */}
        <main className="flex-1 p-4 sm:p-6">

          {/* Top header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {selectedCategory === "new" ? "Новинки" : "Товары в рассрочку"}
            </h1>
            <span className="text-gray-500 text-sm sm:text-base">
              Найдено: {products.length} товаров
            </span>
          </div>

          {/* PRODUCTS */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-lg">
              Товары не найдены
            </div>
          ) : (
            <div
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 
                         md:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade"
            >
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
