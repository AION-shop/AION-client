import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ColProductCard from "../components/ui/cards/Products";
import Container from "../components/shared/Container";

const Rasrochka = () => {
  const { t } = useTranslation(); // <-- useTranslation hook
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const categories = useMemo(() => [
    { id: "all", name: t("categories.all") },
    { id: "AION V", name: t("categories.AION V") },
    { id: "AION Y", name: t("categories.AION Y") },
    { id: "AION S", name: t("categories.AION S") }, 
    { id: "AION MAX", name: t("categories.AION MAX") },
    { id: "new", name: t("categories.new") },
  ], [t]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const model = params.get("model");
    if (model) {
      const exists = categories.some(c => c.id.toUpperCase() === model.toUpperCase());
      if (exists) setSelectedCategory(model);
    }
  }, [location.search, categories]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/col-products?limit=2000`);
        const data = await res.json();
        let fetched = data.products || [];

        if (selectedCategory !== "all") {
          if (selectedCategory === "new") {
            const now = new Date();
            fetched = fetched.filter(p => {
              const createdAt = new Date(p.createdAt);
              return (now - createdAt) / (1000 * 3600 * 24) <= 4;
            });
          } else {
            fetched = fetched.filter(p => p.title.toUpperCase().includes(selectedCategory.toUpperCase()));
          }
        }

        setProducts(fetched);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, API_URL]);

  const handleCategoryChange = useCallback((id) => {
    setSelectedCategory(id);
    setIsMobileMenuOpen(false);
  }, []);

  const activeCategoryName = useMemo(() => {
    if (selectedCategory === "all") return t("installment_page.title");
    return categories.find(c => c.id === selectedCategory)?.name || t("installment_page.title");
  }, [selectedCategory, categories, t]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Helmet>
        <title>{activeCategoryName} | AutoMarket</title>
        <meta
          name="description"
          content={`${t("installment_page.meta_description")} ${activeCategoryName} modelini ko'rish.`}
        />
      </Helmet>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-10 bg-white shadow-md">
        <Container>
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-bold">{activeCategoryName}</h1>
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl animate-slideDown overflow-y-auto">
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
          ${selectedCategory === cat.id ? "bg-black text-white shadow-lg font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>

          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-72 h-screen sticky top-0 p-6 bg-white border-r border-gray-100 shadow-sm">
          <h3 className="text-2xl font-extrabold mb-6 text-gray-900">{t("Brands ")}</h3>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
                    ${selectedCategory === cat.id ? "bg-black text-white shadow-lg font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <Container>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{activeCategoryName}</h1>
              <span className="text-gray-500 text-base">
                {t("general.found_products", { count: products.length })}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-xl">{t("general.no_products_found")}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {products.map(product => (
                  <ColProductCard key={product._id} card={product} />
                ))}
              </div>
            )}
          </Container>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }

        @keyframes slideDown { 
          from { opacity: 0; transform: translateY(-20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Rasrochka;
