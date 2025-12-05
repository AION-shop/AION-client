import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

// Components
import Container from "../components/shared/Container";
import BannerSection from "../components/ui/promotions/SwiperBanner";
import CategorySwiper from "../components/ui/promotions/CategorySwiper";
import PromotionBanner from "../components/ui/promotions/PromotionBanner";
import ColProductCard from "../components/ui/cards/ColProductCard";
import RowProductCard from "../components/ui/cards/RowProductCard";
import DiscountCard from "../components/ui/cards/DiscountCard";
import BannerCard from "../components/ui/promotions/BannerCard";

const Home = () => {
  const { t } = useTranslation("home"); // <-- namespace: "home"

  const [products, setProducts] = useState([]);
  const [colProducts, setColProducts] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleColProducts, setVisibleColProducts] = useState(6);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchProducts = async () => {
    try {
      const resMain = await fetch(`${API_URL}/products`);
      const dataMain = await resMain.json();

      const resCol = await fetch(`${API_URL}/col-products`);
      const dataCol = await resCol.json();

      setProducts(dataMain.products || []);
      setColProducts(dataCol.products || []);

    } catch (err) {
      console.error("Server error:", err);
      setProducts([]);
      setColProducts([]);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchProducts()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleShowMoreCars = () => setVisibleColProducts(prev => prev + 10);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <main className="bg-white text-black">
      <Helmet>
        <title>{t("pageTitle")}</title>
        <meta name="description" content={t("pageDescription")} />
      </Helmet>

      <Container>

        {/* Banner Section */}
        <section className="py-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {t("banners")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <BannerSection className="bg-white border border-gray-200 shadow-sm rounded-xl" />

              <div className="lg:hidden mt-4">
                <DiscountCard
                  apiUrl={API_URL}
                  className="bg-white text-black border border-gray-200 shadow-sm"
                />
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4">
              <DiscountCard
                apiUrl={API_URL}
                className="bg-white text-black border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Cars Section */}
        {colProducts.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {t("cars")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {colProducts.slice(0, visibleColProducts).map((card) => (
                <ColProductCard
                  key={card._id}
                  card={card}
                  className="bg-white text-black border border-gray-200 shadow-sm hover:shadow-md transition"
                />
              ))}
            </div>

            {/* Load More */}
            {visibleColProducts < colProducts.length && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleShowMoreCars}
                  className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-black/80 transition"
                >
                  {t("loadMore")}
                </button>
              </div>
            )}
          </section>
        )}

        {/* Promo Banner */}
        <section className="py-10">
          <BannerCard
            img="https://cs14.pikabu.ru/post_img/2021/04/06/5/og_og_1617693587238169452.jpg"
            title={t("promoTitle")}
            subtitle={t("promoSubtitle")}
            buttonText={t("promoButton")}
            onClick={() => console.log("Button bosildi")}
            className="rounded-xl"
          />
        </section>

        {/* Category Swiper */}
        <section className="py-10">
          <CategorySwiper className="bg-white text-black" />
        </section>

        {/* Laptops */}
        {laptops.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {t("laptops")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {laptops.map((product) => (
                <RowProductCard
                  key={product._id}
                  product={product}
                  className="bg-white text-black border border-gray-200 shadow-sm hover:shadow-md transition"
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        {products.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {t("allProducts")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, index) => (
                <React.Fragment key={product._id}>
                  <RowProductCard
                    product={product}
                    className="bg-white text-black border border-gray-200 shadow-sm hover:shadow-md transition"
                  />

                  {/* Har 10 ta mahsulotdan keyin banner */}
                  {(index + 1) % 10 === 0 && (
                    <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 my-6">
                      <PromotionBanner className="bg-white border border-gray-200 rounded-xl shadow-sm" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

      </Container>
    </main>
  );
};

export default Home;
