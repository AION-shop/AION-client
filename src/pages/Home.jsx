import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../components/shared/Container";
import CategorySwiper from "../components/ui/promotions/Discover";
import ColProductCard from "../components/ui/cards/Products";
import SubNavbar from "../components/shared/SubNavbar";
import Hero from "../components/shared/Hero";

const getApiUrl = () => import.meta.env.VITE_API_URL ;

export default function Home() {
  const [colProducts, setColProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCardIndex, setVisibleCardIndex] = useState(null);

  const API_URL = useMemo(() => getApiUrl(), []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/col-products`);
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        const items = Array.isArray(json) ? json : json.products || [];
        setColProducts(items);
      } catch (error) {
        console.error("Error fetching:", error);
        setColProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  // Intersection Observer for darkBg effect
  useEffect(() => {
    if (!colProducts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = parseInt(entry.target.dataset.index, 10);
          if (entry.isIntersecting) setVisibleCardIndex(idx);
          else setVisibleCardIndex((prev) => (prev === idx ? null : prev));
        });
      },
      { threshold: 0.7 }
    );

    document.querySelectorAll(".observe-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [colProducts]);

  const darkBg = visibleCardIndex !== null;

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-black rounded-full"></div>
      </main>
    );

  return (
    <main className={`overflow-x-hidden transition-colors duration-700 ${darkBg ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <Helmet>
        <title>GAC Aion</title>
        <meta
          name="description"
          content="Discover popular cars and latest electric vehicles from our selection."
        />
      </Helmet>

    
      {/* Hero Section */}
      <Hero />

      {/* Content */}
      <Container>
        {/* Popular Products */}
        <section className="py-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">Popular GAC Aion Models</h2>
            <span className={`text-sm px-4 py-2 rounded-full border ${darkBg ? "bg-white/10 border-white/20 text-white" : "bg-gray-100 border-gray-300 text-gray-700"}`}>
              {colProducts.length} items available
            </span>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
            {colProducts.map((card, idx) => (
              <div key={idx} className="observe-card" data-index={idx}>
                <ColProductCard card={card} />
              </div>
            ))}
          </div>

          {/* Mobile Scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {colProducts.map((card, idx) => (
              <div key={idx} className="min-w-[80vw] snap-center observe-card" data-index={idx}>
                <ColProductCard card={card} />
              </div>
            ))}
          </div>
        </section>

        {/* Discover Section */}
        <section className="py-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-12 text-center ${darkBg ? "text-white" : "text-gray-900"}`}>
            Discover Our Collection
          </h2>
          <div className="max-w-7xl mx-auto px-4">
            <CategorySwiper darkMode={darkBg} />
          </div>
        </section>
      </Container>
    </main>
  );
}
