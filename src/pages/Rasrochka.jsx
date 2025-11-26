import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu } from "lucide-react"; // mobile menu icon
import RowProductCard from "../components/ui/cards/RowProductCard";

const Rasrochka = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    if (highlight) setSelectedCategory(highlight);
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
    <div className="min-h-screen flex flex-col bg-white  text-gray-800">

      {/* SEO */}
      <Helmet>
        <title>Рассрочка — ShopMarket</title>
        <meta
          name="description"
          content="AION V, AION S, AION MAX avtomobillari va boshqa mahsulotlar uchun eng qulay hisob-kitobli rassrochka."
        />
        <meta name="keywords" content="AION rassrochka, kredit, bo‘lib to‘lash, AION V, AION S" />
      </Helmet>

      {/* HEADER + MOBILE MENU BUTTON */}
      <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-300 bg-white">
        <h1 className="text-xl font-bold">{selectedCategory === "new" ? "Новинки" : "Рассрочка"}</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-1">

        {/* SIDEBAR (Desktop) */}
        <aside className="hidden lg:block w-72 border-r border-gray-300 p-6">
          <h3 className="text-2xl font-bold mb-6">Категории</h3>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-gray-200"
                      : "text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* SIDEBAR (Mobile Drawer) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className="relative w-64 bg-white h-full p-6 overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">Категории</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => { setSelectedCategory(cat.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition ${
                        selectedCategory === cat.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-900 hover:bg-gray-200"
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

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{selectedCategory === "new" ? "Новинки" : "Товары в рассрочку"}</h1>
            <div className="text-gray-500">Найдено {products.length} товаров</div>
          </div>

          {/* PRODUCTS GRID */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-lg">
              Товары не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
