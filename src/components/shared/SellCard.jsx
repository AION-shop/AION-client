import React, { useState } from "react";
import { ShoppingCart, Globe, Star, BarChart2, Shield, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const API_URL = "http://localhost:5000/api/sell"; // 🔥 backend URL

const SellCard = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        region: "",
        carModel: "",
        aboutYou: "",
        aboutCar: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(API_URL, formData);

            toast.success("Ma'lumotlar muvaffaqiyatli yuborildi!");

            setOpenModal(false);

            setFormData({
                fullName: "",
                region: "",
                carModel: "",
                aboutYou: "",
                aboutCar: "",
            });
        } catch (error) {
            toast.error("Xatolik yuz berdi!");

        }

        setLoading(false);
    };

    return (
        <section className="bg-white py-16">

            <Toaster position="top-center" />

            <Helmet>
                <title>AION Elektron Mashinalar — Sotishni Boshlang</title>
            </Helmet>

            <div className="container mx-auto px-4 lg:px-14 space-y-20">

                {/* HERO */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Video */}
                    <div className="w-full flex justify-center my-10">
                        <div className="w-full sm:w-[90%] lg:w-[80%] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative pb-[56.25%] h-0">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/X317Qi911Sk"
                                    title="AION S 580 Video"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-6 text-gray-900">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-black">
                            AION Elektron Mashinalar Bilan
                            <span className="text-blue-600"> Sotishni Boshlang</span>
                        </h1>

                        <p className="text-lg text-gray-700">
                            AION — yangi avlod elektron mashinalari. Premium sifat, quvvat va ekologik xavfsizlik.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Feature icon={<Zap size={24} />} title="450 km masofa" desc="Bir quvvatlashda uzoq masofa." />
                            <Feature icon={<Shield size={24} />} title="5 yillik kafolat" desc="Rasmiy servis xizmati." />
                            <Feature icon={<BarChart2 size={24} />} title="Premium sifat" desc="Sinovdan o'tgan." />
                            <Feature icon={<Star size={24} />} title="Yuqori baho" desc="Eng ishonchli brend." />
                        </div>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="btn btn-primary text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition"
                        >
                            Sotishni Boshlash
                        </button>
                    </div>
                </div>

                {/* CAR GALLERY */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900">AION Premium Modellari</h2>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform">
                            <img
                                src="https://avatars.mds.yandex.net/i?id=ca858cb7ff703466f39574488529e456_l-4449821-images-thumbs&n=13"
                                className="w-full h-[340px] object-cover"
                            />
                        </div>

                        <div className="space-y-5 text-gray-900">
                            <h3 className="text-3xl font-bold">AION S — Premium Sedan</h3>
                            <p className="text-lg">Elektr texnologiyalari va zamonaviy dizayn uyg‘unligi bilan yaratilgan.</p>

                            <ul className="space-y-2">
                                <li className="flex gap-2 items-center">
                                    <Star className="text-blue-600" /> 4.9 yulduzli reyting
                                </li>
                                <li className="flex gap-2 items-center">
                                    <Zap className="text-blue-600" /> 0–100 km/h: 6.7s
                                </li>
                                <li className="flex gap-2 items-center">
                                    <Globe className="text-blue-600" /> Online servis monitoring
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MINI GALLERY */}
                <div className="space-y-10">
                    <h2 className="text-4xl font-bold text-center text-gray-900">AION Model Galereyasi</h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <GalleryCard img="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/GAC_Aion_S_Max_20231120.jpg/1200px-GAC_Aion_S_Max_20231120.jpg" />
                        <GalleryCard img="https://avatars.mds.yandex.net/i?id=2558e1e2bf0bf300b5df14e5d6753c53_l-5221012-images-thumbs&n=13" />
                        <GalleryCard img="https://avatars.mds.yandex.net/i?id=b30ba7c0931c97dbe25170f106c0e7bf_l-9203655-images-thumbs&n=13" />
                    </div>
                </div>
            </div>

            {/* MODAL FORM */}
            {openModal && (
                <dialog open className="modal modal-open">
                    <div className="modal-box bg-gr">

                        <h2 className="text-2xl font-bold mb-4 text-white">Sotuvchi Ma'lumotlari</h2>

                        <form onSubmit={submitForm} className="space-y-4">

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Ism Familiya"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />

                            <input
                                type="text"
                                name="region"
                                placeholder="Qayerdansiz? (Toshkent, Samarqand...)"
                                value={formData.region}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />

                            <input
                                type="text"
                                name="carModel"
                                placeholder="Mashinangiz modeli (AION S, AION Y...)"
                                value={formData.carModel}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />

                            <textarea
                                name="aboutYou"
                                placeholder="O'zingiz haqingizda qisqacha"
                                value={formData.aboutYou}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full h-24"
                                required
                            />

                            <textarea
                                name="aboutCar"
                                placeholder="Mashinangiz haqida"
                                value={formData.aboutCar}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full h-24"
                                required
                            />

                            <div className="modal-action flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(false)}
                                    className="btn btn-error text-white"
                                >
                                    Bekor qilish
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary text-white"
                                    disabled={loading}
                                >
                                    {loading ? "Yuborilmoqda..." : "Yuborish"}
                                </button>
                            </div>
                        </form>

                    </div>
                </dialog>
            )}
        </section>
    );
};

/* COMPONENTS */
const Feature = ({ icon, title, desc }) => (
    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    </div>
);

const GalleryCard = ({ img }) => (
    <div className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition">
        <img src={img} className="w-full h-52 object-cover" />
    </div>
);

export default SellCard;
