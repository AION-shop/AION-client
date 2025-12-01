import React from "react";
import { Helmet } from "react-helmet-async";

const Offerta = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <Helmet>
        <title>Offerta — AION Uzbekistan</title>
      </Helmet>

      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Offerta shartlari
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          Ushbu offerta orqali siz AION Uzbekistan tomonidan taqdim etilgan 
          mahsulotni rezervga olish jarayoni, shartlari va majburiyatlari bilan 
          tanishasiz. Rezerv qilish — bu xaridni yakuniy tasdiqlash emas, balki 
          mahsulotni ma’lum muddat davomida siz uchun band qilib turish tizimidir.
        </p>

        <div className="space-y-5 mb-8">
          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              1. Rezerv haqida umumiy ma’lumot
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Rezervga olingan mahsulot 24–72 soat davomida faqat siz uchun 
                band qilib qo‘yiladi. Bu vaqt ichida operator siz bilan bog‘lanadi.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              2. To‘lov shartlari
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                To‘lov naqd, terminal yoki bank orqali amalga oshiriladi. 
                Rezervlash jarayoni bepul.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              3. Yetkazib berish
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Mahsulot yetkazib berish 1–3 ish kuni davomida amalga oshiriladi.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              4. Qaytarish va kafolat
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                14 kun ichida qaytarish mumkin. Barcha mahsulotlar 5 yil rasmiy 
                kafolat bilan taqdim etiladi.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary px-10 text-white text-base"
            onClick={() => window.history.back()}
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offerta;
