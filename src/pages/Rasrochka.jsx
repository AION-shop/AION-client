import React, { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu, X, ArrowLeft } from "lucide-react";
import { LangContext } from "../../LangContext";
import ColProductCard from "../components/ui/cards/Products";
import Container from "../components/shared/Container";

const Rasrochka = () => {
  const { lang } = useContext(LangContext);
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = useMemo(() => [
    { id: "all", name: lang.categories?.all || "Barchasi" },
    { id: "AION V", name: lang.categories?.["AION V"] || "AION V" },
    { id: "AION Y", name: lang.categories?.["AION Y"] || "AION Y" },
    { id: "AION S", name: lang.categories?.["AION S"] || "AION S" },
    { id: "AION MAX", name: lang.categories?.["AION MAX"] || "AION MAX" },
    { id: "new", name: lang.categories?.new || "Yangi" },
  ], [lang]);

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
            fetched = fetched.filter(p => (now - new Date(p.createdAt)) / (1000 * 3600 * 24) <= 4);
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
    if (selectedCategory === "all") return lang.installment_page?.title || "Rassrochka";
    return categories.find(c => c.id === selectedCategory)?.name || lang.installment_page?.title || "Rassrochka";
  }, [selectedCategory, categories, lang]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

      <Helmet>
        <title>{activeCategoryName} | AutoMarket</title>
      </Helmet>

      {/* Modern SubNavbar */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 z-50">
        <Container>
          <div className="flex items-center justify-between py-3">

            {/* CHAP TOMON: Orqaga qaytish */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Orqaga"
            >
              <ArrowLeft size={22} className="text-gray-900"/>
            </button>

            {/* O'NG TOMON: Burger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} className="text-gray-900"/> : <Menu size={22} className="text-gray-900"/>}
            </button>

          </div>
        </Container>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl w-full absolute z-40 top-full left-0 p-4 space-y-2 animate-slideDown">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
              {lang.categoriesTitle || "Kategoriyalar"}
            </p>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all
                  ${selectedCategory === cat.id ? "bg-blue-600 text-white shadow-md" : "bg-gray-50 text-gray-700 hover:bg-gray-200"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] sticky top-16 p-6 bg-white border-r border-gray-200 shadow-sm">
          <h3 className="text-xl font-black mb-6 text-gray-900 uppercase tracking-tight">
            {lang.categoriesTitle || "Kategoriyalar"}
          </h3>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all duration-200
                    ${selectedCategory === cat.id 
                      ? "bg-gray-900 text-white shadow-lg scale-[1.02]" 
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}
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
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{activeCategoryName}</h1>
              <div className="px-4 py-1.5 bg-gray-200 rounded-full text-gray-600 text-sm font-bold">
                {lang.general?.found_products?.replace("{count}", products.length) || `${products.length} ta mahsulot`}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 text-xl font-medium">
                {lang.general?.no_products_found || "Mahsulot topilmadi"}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => <ColProductCard key={product._id} card={product} />)}
              </div>
            )}
          </Container>
        </main>
      </div>

      <style>{`
        @keyframes slideDown { 
          0% { opacity: 0; transform: translateY(-15px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-slideDown { animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Rasrochka;
