import React, { useState } from 'react';
import { MapPin, Phone, Clock, Shield, Package, CreditCard, RotateCcw, Check } from 'lucide-react';

const MapSection = () => {
  return (
    <div className="w-full h-80 rounded-xl overflow-hidden relative shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.2!2d69.285147!3d41.276832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8c7a1c5bfa9f%3A0x4d6edc1f9b7e6d3b!2sIndex%20Bazar%2C%20Sergeli%2C%20Toshkent%2C%20O%27zbekiston!5e0!3m2!1sen!2s!4v1700000000000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Toshkent Index Bazar"
      />
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() =>
            window.open(
              "https://www.google.com/maps/dir/?api=1&destination=41.276832,69.285147",
              "_blank"
            )
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
        >
          <MapPin className="w-5 h-5 text-white" />
          <span>Yo'nalish olish</span>
        </button>
      </div>
    </div>
  );
};

const Offerta = () => {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (index) =>
    setOpenSection(openSection === index ? null : index);

  const sections = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Rezerv haqida umumiy ma'lumot",
      content:
        "Rezervga olingan mahsulot 24–72 soat davomida faqat siz uchun band qilib qo'yiladi. Operator siz bilan bog'lanadi va barcha zarur ma'lumotlarni taqdim etadi. Rezerv muddati o'tgandan keyin mahsulot yana sotuvga chiqariladi.",
      color: "blue",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "To'lov shartlari",
      content:
        "To'lov naqd, terminal yoki bank o'tkazmasi orqali amalga oshiriladi. Rezervlash jarayoni mutlaqo bepul. Kredit va bo'lib-bo'lib to'lash imkoniyati mavjud.",
      color: "green",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Yetkazib berish",
      content:
        "Mahsulot yetkazib berish 1–3 ish kuni davomida amalga oshiriladi. Toshkent shahri bo'ylab bepul yetkazib berish xizmati mavjud. Viloyatlarga yetkazish alohida kelishiladi.",
      color: "purple",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Qaytarish va kafolat",
      content:
        "14 kun ichida mahsulotni qaytarish mumkin (agar foydalanilmagan bo'lsa). Barcha mahsulotlar 5 yil rasmiy kafolat bilan taqdim etiladi.",
      color: "orange",
    },
  ];

  const features = [
    "Rasmiy kafolat - 5 yil",
    "Bepul yetkazib berish",
    "Professional maslahat",
    "Test-drive imkoniyati",
    "Kredit bo'lib to'lash",
    "Sifat nazorati",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div
        className="relative w-full h-80 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD8oDzeV8K0-Scs8q_4KmqOrvunLT7bMzig&s)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="relative text-5xl md:text-6xl font-extrabold text-white">
          Offerta Shartlari
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Introduction Card */}
        <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-200">
          <div className="flex items-start gap-5 mb-6">
            <div className="bg-gray-100 p-4 rounded-2xl">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Xush kelibsiz!
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ushbu offerta orqali siz AION Uzbekistan tomonidan taqdim
                etilgan mahsulotni rezervga olish jarayoni, shartlari va
                majburiyatlari bilan tanishasiz. Rezerv qilish — bu xaridni
                yakuniy tasdiqlash emas, balki mahsulotni ma'lum muddat davomida
                siz uchun band qilib turish tizimidir.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`bg-${section.color}-100 p-3 rounded-lg text-${section.color}-500`}
                  >
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {index + 1}. {section.title}
                  </h3>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openSection === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openSection === index && (
                <div className="px-6 pb-5 pt-2">
                  <div className="pl-16">
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Biz bilan bog'laning
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Telefon</p>
                <p className="font-semibold text-gray-900 text-lg">
                  +998 (71) 123-45-67
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Ish vaqti</p>
                <p className="font-semibold text-gray-900 text-lg">
                  Dush - Yak: 9:00 - 19:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-blue-500" />
            Bizning manzil
          </h3>
          <p className="text-gray-700 mb-4">
            Toshkent, Oʻzbekiston, Sergeli tumani, Index Bazar
          </p>
          <MapSection />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-full transition-colors shadow-md"
          >
            Orqaga qaytish
          </button>
          <button
            onClick={() => window.open("tel:+998711234567")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Qo'ng'iroq qilish
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white text-gray-500 py-8 px-4 text-center">
        <p className="text-sm">© 2024 AION Uzbekistan. Barcha huquqlar himoyalangan.</p>
      </div>
    </div>
  );
};

export default Offerta;
