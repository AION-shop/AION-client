import React, { useState, useContext } from "react";
import { Zap, Shield, BarChart2, Star, Phone, AtSign } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { LangContext } from "../../../LangContext"; // LangContext import

const SellCard = () => {
  const { t } = useContext(LangContext); // translate ishlatish
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{t.sellCard?.pageTitle}</title>
        <meta
          name="description"
          content="Продажа электромобилей AION. Быстро, безопасно и выгодно."
        />
      </Helmet>

      <section className="bg-white pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-14 space-y-24">
          {/* HERO */}
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/X317Qi911Sk"
                  title="AION Electric Cars"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="space-y-6 text-black">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {t.sellCard?.heroTitle}{" "}
                <span className="text-blue-600">{t.sellCard?.heroTitleHighlight}</span>
              </h1>

              <p className="text-lg text-gray-600">{t.sellCard?.heroDesc}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Feature
                  icon={<Zap />}
                  title={t.sellCard?.features.distanceTitle}
                  desc={t.sellCard?.features.distanceDesc}
                />
                <Feature
                  icon={<Shield />}
                  title={t.sellCard?.features.warrantyTitle}
                  desc={t.sellCard?.features.warrantyDesc}
                />
                <Feature
                  icon={<BarChart2 />}
                  title={t.sellCard?.features.qualityTitle}
                  desc={t.sellCard?.features.qualityDesc}
                />
                <Feature
                  icon={<Star />}
                  title={t.sellCard?.features.ratingTitle}
                  desc={t.sellCard?.features.ratingDesc}
                />
              </div>

              {/* Form tugmasi o'chirildi yoki disable qilindi */}
              <button
                disabled
                className="btn btn-primary px-8 py-3 text-lg rounded-xl shadow-lg opacity-50 cursor-not-allowed"
              >
                {t.sellCard?.startSelling}
              </button>
            </div>
          </div>

          {/* TRUST SECTION */}
          <section className="bg-gray-100 rounded-3xl p-10 text-black">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">{t.sellCard?.premiumModels}</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{t.sellCard?.modelDesc}</p>

              {/* AION rasmlari */}
              <div className="mt-8 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <img src="https://d3jvxfsgjxj1vz.cloudfront.net/news/wp-content/uploads/2025/05/09162244/gac-aion-es-launched-in-uae-price-variants-specs-7-1024x576.jpg" alt="AION S" className="w-full h-64 object-cover" />
                  <div className="p-4 text-center font-semibold text-lg">AION S</div>
                </div>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <img src="https://img.caixin.com/2021-11-01/163575175630998.jpg" alt="AION Y" className="w-full h-64 object-cover" />
                  <div className="p-4 text-center font-semibold text-lg">AION Y</div>
                </div>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <img src="https://www.bigwheels.my/wp-content/uploads/2024/02/GAC-AION-Y-PLUS-2.jpg" alt="AION V" className="w-full h-64 object-cover" />
                  <div className="p-4 text-center font-semibold text-lg">AION V</div>
                </div>
              </div>
            </div>

            {/* TRUST / CONTACT SECTION */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-black mb-8">
              <TrustCard icon={<Shield />} title="100% Безопасно" />
              <TrustCard icon={<BarChart2 />} title="Честная цена" />
              <TrustCard icon={<Star />} title="Высокий рейтинг" />
              <TrustCard icon={<Phone />} title="Поддержка 24/7" />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Phone size={18} /> +998 95 210 0550
              </div>
              <div className="flex items-center gap-2">
                <AtSign size={18} /> 14.bakhromovv
              </div>
            </div>
          </section>

        </div>
      </section>
    </>
  );
};

/* UI COMPONENTS */
const Feature = ({ icon, title, desc }) => (
  <div className="flex gap-4 bg-white p-4 rounded-xl shadow">
    <div className="text-blue-600">{icon}</div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </div>
);

const TrustCard = ({ icon, title }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
    <div className="text-blue-600 mb-3 flex justify-center">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
);

export default SellCard;
