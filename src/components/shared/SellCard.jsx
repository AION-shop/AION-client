import React, { useState } from "react";
import {
  Zap,
  Shield,
  BarChart2,
  Star,
  Phone,
  AtSign,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Footer from "../layouts/Footer";

const API_URL = "http://localhost:5000/api/sell";

const SellCard = () => {
  const { t } = useTranslation("sellCard");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    region: "",
    carModel: "",
    aboutYou: "",
    aboutCar: "",
    phone: "",
    email: "",
    telegram: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      toast.success(t("successMessage"));
      setOpenModal(false);
      setFormData({
        fullName: "",
        region: "",
        carModel: "",
        aboutYou: "",
        aboutCar: "",
        phone: "",
        email: "",
        telegram: "",
      });
    } catch {
      toast.error(t("errorMessage"));
    }
    setLoading(false);
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{t("pageTitle")}</title>
        <meta
          name="description"
          content="Продажа электромобилей AION. Быстро, безопасно и выгодно."
        />
      </Helmet>

      <Toaster position="top-center" />

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
                {t("heroTitle")}{" "}
                <span className="text-blue-600">
                  {t("heroTitleHighlight")}
                </span>
              </h1>

              <p className="text-lg text-gray-600">
                {t("heroDesc")}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Feature
                  icon={<Zap />}
                  title={t("features.distanceTitle")}
                  desc={t("features.distanceDesc")}
                />
                <Feature
                  icon={<Shield />}
                  title={t("features.warrantyTitle")}
                  desc={t("features.warrantyDesc")}
                />
                <Feature
                  icon={<BarChart2 />}
                  title={t("features.qualityTitle")}
                  desc={t("features.qualityDesc")}
                />
                <Feature
                  icon={<Star />}
                  title={t("features.ratingTitle")}
                  desc={t("features.ratingDesc")}
                />
              </div>

              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-primary px-8 py-3 text-lg rounded-xl shadow-lg hover:scale-105 transition"
              >
                {t("startSelling")}
              </button>
            </div>
          </div>

          {/* TRUST SECTION */}
          <section className="bg-gray rounded-3xl p-10 text-black">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">
                {t("premiumModels")}
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                {t("modelDesc")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
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

      {/* MODAL */}
      {openModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-4">
              {t("modalTitle")}
            </h3>

            <form onSubmit={submitForm} className="space-y-3">
              <input className="input input-bordered w-full" name="fullName" placeholder={t("form.fullName")} onChange={handleChange} />
              <input className="input input-bordered w-full" name="region" placeholder={t("form.region")} onChange={handleChange} />
              <input className="input input-bordered w-full" name="carModel" placeholder={t("form.carModel")} onChange={handleChange} />
              <textarea className="textarea textarea-bordered w-full" name="aboutYou" placeholder={t("form.aboutYou")} onChange={handleChange} />
              <textarea className="textarea textarea-bordered w-full" name="aboutCar" placeholder={t("form.aboutCar")} onChange={handleChange} />

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setOpenModal(false)}>
                  {t("form.cancel")}
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? t("form.sending") : t("form.submit")}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

    
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
