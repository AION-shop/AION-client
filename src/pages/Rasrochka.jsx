import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu, X, Filter } from "lucide-react";
// Import single product card you optimized earlier (assuming it handles navigation/design)
import ColProductCard from "../components/ui/cards/Products"; 
import Container from "../components/shared/Container";

const Rasrochka = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  /* ================================
     CATEGORY LIST (Updated for Porsche style)
     ================================= */
  const categories = useMemo(() => [
    { id: "all", name: "Barcha Modellar" },
    { id: "AION V", name: "AION V" },
    { id: "AION Y", name: "AION Y" },
    { id: "AION S", name: "AION S" },
    { id: "AION MAX", name: "AION MAX" },
    { id: "new", name: "Yangi kelganlar" },
  ], []);

  /* ================================
      GET CATEGORY FROM URL (Initial load filter)
     ================================= */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const model = params.get("model");

    if (model) {
      const exists = categories.some((c) => c.id.toUpperCase() === model.toUpperCase());
      if (exists) setSelectedCategory(model);
    }
  }, [location.search, categories]);

  /* ================================
       FETCH & FILTER PRODUCTS LOGIC
     ================================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using environment variable robustly
        const res = await fetch(`${API_URL}/col-products?limit=2000`);
        const data = await res.json();
        let fetched = data.products || [];

        // Category filtering logic moved here to run after fetch
        if (selectedCategory !== "all") {
          if (selectedCategory === "new") {
            const now = new Date();
            fetched = fetched.filter((p) => {
              const createdAt = new Date(p.createdAt);
              const diffDays = (now - createdAt) / (1000 * 3600 * 24);
              return diffDays <= 4;
            });
          } else {
            // Case-insensitive filtering
            fetched = fetched.filter((p) =>
              p.title.toUpperCase().includes(selectedCategory.toUpperCase())
            );
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
  }, [selectedCategory, API_URL]); // Added API_URL to dependency array

  const handleCategoryChange = useCallback((id) => {
    setSelectedCategory(id);
    setSidebarOpen(false); // Close sidebar after selection on mobile
  }, []);

  return (
    // Added subtle fade-in animation
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 animate-fadeIn">

      {/* SEO Optimization */}
      <Helmet>
        <title>{selectedCategory === 'all' ? "Barcha mahsulotlar" : selectedCategory} | Avtomobillar Rassrochka</title>
        <meta
          name="description"
          content={`AION V, AION Y, AION S, AION MAX avtomobillari va boshqa mahsulotlar uchun qulay rassrochka shartlari. ${selectedCategory} modelini ko'rish.`}
        />
      </Helmet>

      <Container>
        {/* Mobile Header/Filter Button */}
        <div className="lg:hidden flex items-center justify-between py-4 border-b bg-white">
          <h1 className="text-xl font-bold">
            {categories.find(c => c.id === selectedCategory)?.name || "Rassrochka"}
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition shadow-md"
            aria-label="Open filters"
          >
            <Filter size={20} />
          </button>
        </div>
      </Container>

      <div className="flex flex-1">
        
        {/* ================================
            SIDEBAR DESKTOP (Porsche Minimal Style)
        ================================= */}
        {/* Fixed positioning gives that high-end catalog feel */}
        <aside className="hidden lg:block w-72 h-screen sticky top-0 p-6 bg-white overflow-y-auto border-r border-gray-100">
          <h3 className="text-2xl font-extrabold mb-6 text-gray-900">Modellar</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300
                    ${
                      selectedCategory === cat.id
                        ? "bg-black text-white shadow-lg font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
              className="bg-black bg-opacity-60 flex-1 transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            ></div>

            <div className="w-64 bg-white h-full p-6 shadow-xl animate-slide-right">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Filtrlar</h3>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X size={22} />
                </button>
              </div>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition duration-200
                        ${
                          selectedCategory === cat.id
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-100"
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
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <Container>
            {/* Top header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                {categories.find(c => c.id === selectedCategory)?.name || "Rassrochka Avtomobillari"}
              </h1>
              <span className="text-gray-500 text-base mt-2 sm:mt-0">
                Topildi: {products.length} avtomobil
              </span>
            </div>

            {/* PRODUCTS GRID */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-xl">
                Bu turkumda avtomobillar topilmadi
              </div>
            ) : (
              <div
                // Updated grid for better responsiveness and visual appeal (closer to Porsche style spacing)
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade"
              >
                {products.map((product) => (
                  // Using the optimized ColProductCard
                  <ColProductCard key={product._id} card={product} />
                ))}
              </div>
            )}
          </Container>
        </main>
      </div>
      {/* Custom CSS for animations if not available in your Tailwind config */}
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes slideRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-right {
          animation: slideRight 0.3s ease-out forwards;
        }
        @keyframes fade {
           from { opacity: 0; }
           to { opacity: 1; }
        }
        .animate-fade {
            animation: fade 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Rasrochka;
