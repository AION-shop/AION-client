import React from "react";
import { ShoppingCart, Globe, Star, BarChart2, Shield, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SellCard = () => {
    return (
        <section className="bg-white py-16">
            {/* SEO */}
            <Helmet>
                <title>AION Elektron Mashinalar — Sotishni Boshlang</title>
                <meta
                    name="description"
                    content="AION elektron mashinalar platformasi orqali mahsulotlaringizni keng mijozlarga yetkazing. Tez, xavfsiz va ishonchli savdo."
                />
                <meta
                    name="keywords"
                    content="aion, elektron mashina, elektromobil, sotuv, avtomobil platforma, eco cars"
                />
            </Helmet>

            <div className="container mx-auto px-4 lg:px-14 space-y-20">

                {/* ------------------------------- 1. HERO (Video + Text) ------------------------------- */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Video */}
                    <div className="w-full flex justify-center my-10">
                        <div className="w-full sm:w-[90%] lg:w-[80%] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative pb-[56.25%] h-0">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/X317Qi911Sk"
                                    title="AION S 580 Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>


                    {/* Text */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-black">
                            AION Elektron Mashinalar Bilan
                            <span className="text-blue-600"> Sotishni Boshlang</span>
                        </h1>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            AION — yangi avlod elektron mashinalari. Sifat, quvvat va ekologik xavfsizlikni
                            birlashtirgan premium platforma. Bizning savdo tizimimiz orqali mahsulotlaringizni
                            butun O‘zbekiston bo‘ylab mijozlarga yetkazishingiz mumkin.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Feature
                                icon={<Zap size={24} />}
                                title="450 km masofa"
                                desc="Bir quvvatlashda uzoq masofa masofaga ega."
                            />
                            <Feature
                                icon={<Shield size={24} />}
                                title="5 yillik kafolat"
                                desc="Rasmiy kafolat va servis xizmatlari."
                            />
                            <Feature
                                icon={<BarChart2 size={24} />}
                                title="Premium sifat"
                                desc="AION avtomobillari sifat bo‘yicha sinovlardan o‘tgan."
                            />
                            <Feature
                                icon={<Star size={24} />}
                                title="Yuqori baholangan"
                                desc="Mijozlar tomonidan eng ishonchli brend sifatida tan olingan."
                            />
                        </div>

                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105">
                            Sotishni Boshlash
                        </button>
                    </div>
                </div>

                {/* ------------------------------- 2. MAIN CAR GALLERY ------------------------------- */}
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900">AION Premium Modellari</h2>

                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        {/* Car 1 */}
                        <div className="rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src="https://avatars.mds.yandex.net/i?id=ca858cb7ff703466f39574488529e456_l-4449821-images-thumbs&n=13"
                                className="w-full h-[340px] object-cover"
                                alt="AION Model S"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-5">
                            <h3 className="text-3xl font-bold text-gray-900">AION S — Premium Sedan</h3>
                            <p className="text-gray-700 text-lg">
                                Elektr quvvatlash texnologiyalari va zamonaviy dizayn uyg‘unligi bilan yaratilgan.
                                AION S — qulay, xavfsiz va iqtisodiy elektromobil.
                            </p>

                            <ul className="space-y-2 text-gray-900">
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

                {/* ------------------------------- 3. MINI GALLERY ------------------------------- */}
                <div className="space-y-10">
                    <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
                        AION Model Galereyasi
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <GalleryCard img="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/GAC_Aion_S_Max_20231120.jpg/1200px-GAC_Aion_S_Max_20231120.jpg" />
                        <GalleryCard img="https://avatars.mds.yandex.net/i?id=2558e1e2bf0bf300b5df14e5d6753c53_l-5221012-images-thumbs&n=13" />
                        <GalleryCard img="https://avatars.mds.yandex.net/i?id=b30ba7c0931c97dbe25170f106c0e7bf_l-9203655-images-thumbs&n=13" />
                    </div>
                </div>

            </div>
        </section>
    );
};

/* ------------------------- Reusable Components ------------------------- */

const Feature = ({ icon, title, desc }) => (
    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-black">{title}</h4>
            <p className="text-gray-600 text-sm">{desc}</p>
        </div>
    </div>
);

const GalleryCard = ({ img }) => (
    <div className="rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition-all duration-500">
        <img src={img} className="w-full h-52 object-cover" />
    </div>
);

export default SellCard;
