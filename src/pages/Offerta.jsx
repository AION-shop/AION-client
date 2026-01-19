import React from "react";
import { MapPin, Phone, Clock, Shield, Package, CreditCard, RotateCcw, Check, ChevronDown } from "lucide-react";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.0467970316663!2d69.2344014155838!3d41.20049897927366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61284896a357%3A0x39082adb468e1c24!2sIndex%20Bazar%2C%20Tashkent!5e0!3m2!1sen!2s!4v1706815975698!5m2!1sen!2s";
const MAP_DIRECTION_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Index+Bazar+Tashkent";

const MapSection = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Map Card */}
      <div className="w-full h-80 rounded-3xl overflow-hidden relative shadow-xl">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Toshkent Index Bazar Xaritasi"
        />
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => window.open(MAP_DIRECTION_URL, "_blank")}
            className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-semibold active:scale-95"
          >
            <MapPin className="w-5 h-5" />
            <span>Yo'nalish olish</span>
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <Phone className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-semibold">Telefon</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">+998 90 123 45 67</p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <Clock className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="font-semibold">Ish vaqti</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">9:00 - 18:00, Dushanba - Shanba</p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <Shield className="w-8 h-8 text-red-600 mb-2" />
          <h3 className="font-semibold">Xavfsizlik</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">100% kafolatlangan mahsulotlar</p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <Package className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="font-semibold">Yetkazib berish</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">Shahar ichida 1-2 kun ichida</p>
        </div>
      </div>

      {/* Oferta / Shartlar */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Oferta & Shartlar</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Mahsulotlar sifat kafolati bilan ta'minlanadi.</li>
          <li>Buyurtma berish va to'lov shartlari veb-sayt orqali amalga oshiriladi.</li>
          <li>Yetkazib berish muddati hududga qarab farq qilishi mumkin.</li>
          <li>Mijozlar shikoyatlari 24 soat ichida ko'rib chiqiladi.</li>
          <li>Har qanday noaniqliklar firma siyosatiga muvofiq hal qilinadi.</li>
        </ul>
      </div>
    </div>
  );
};

export default MapSection;
