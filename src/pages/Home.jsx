import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

// Components
import Container from "../components/shared/Container";
import BannerSection from "../components/ui/promotions/SwiperBanner";
import CategorySwiper from "../components/ui/promotions/CategorySwiper";
import PromotionBanner from "../components/ui/promotions/PromotionBanner";
import ColProductCard from "../components/ui/cards/ColProductCard";
import RowProductCard from "../components/ui/cards/RowProductCard";
import DiscountCard from "../components/ui/cards/DiscountCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [colProducts, setColProducts] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleColProducts, setVisibleColProducts] = useState(6);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const resMain = await fetch(`${API_URL}/products`);
      const dataMain = await resMain.json();

      const resCol = await fetch(`${API_URL}/col-products`);
      const dataCol = await resCol.json();

      setProducts(dataMain.products || []);
      setColProducts(dataCol.products || []);
    } catch (err) {
      console.error("Server error (products):", err);
    }
  };

  // Fetch laptops
  const fetchLaptops = async () => {
    try {
      const res = await fetch(`${API_URL}/products/category/laptops`);
      const data = await res.json();
      setLaptops(data.products || []);
    } catch (err) {
      console.error("Server error (laptops):", err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchLaptops()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleShowMoreCars = () => setVisibleColProducts(prev => prev + 10);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="bg-base-200">
      {/* SEO */}
      <Helmet>
        <title>ShopMarket | Barcha mahsulotlar</title>
        <meta
          name="description"
          content="ShopMarket onlayn do‘kon. Mahsulotlarni ko‘rib chiqish, chegirmalar, avtomobillar va texnologiya mahsulotlari."
        />
        <meta
          name="keywords"
          content="ShopMarket, onlayn do‘kon, mahsulotlar, avtomobillar, laptops, elektronika, savatga qo‘shish"
        />
      </Helmet>

      {/* Banner + Discount */}
      <section className="py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <BannerSection />
            </div>
            <div className="flex flex-col gap-4">
              <DiscountCard />
            </div>
          </div>
        </Container>
      </section>

      {/* ColProducts Section */}
      {colProducts.length > 0 && (
        <section className="py-10">
          <Container>
            <h2 className="text-2xl font-bold mb-5">Avtomobillar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* First 2 ColProduct highlight */}
              {colProducts.slice(0, 2).map(card => (
                <ColProductCard key={card._id} card={card} />
              ))}

              {/* Remaining RowProducts */}
              {colProducts.slice(2, visibleColProducts).map(product => (
                <RowProductCard key={product._id} product={product} />
              ))}
            </div>

            {visibleColProducts < colProducts.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleShowMoreCars}
                  className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
                >
                  Yana 10 mashina
                </button>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Promotion Banner */}
      <section className="py-10">
        <PromotionBanner />
      </section>

      {/* Category Swiper */}
      <section className="py-10">
        <Container>
          <CategorySwiper />
        </Container>
      </section>

      {/* Laptops Section */}
      {laptops.length > 0 && (
        <section className="py-10">
          <Container>
            <h2 className="text-2xl font-bold mb-5">Laptops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {laptops.map(product => (
                <RowProductCard key={product._id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Products Section */}
      {products.length > 0 && (
        <section className="py-10">
          <Container>
            <h2 className="text-2xl font-bold mb-5">Barcha mahsulotlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map(product => (
                <RowProductCard key={product._id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Another Promotion Banner */}
      <section className="py-10">
        <PromotionBanner />
      </section>
    </main>
  );
};

export default Home;
