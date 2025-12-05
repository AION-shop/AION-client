import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON tarjimalarni import qilish
import en from "../LocalesEn.json";
import ru from "../LocalesRu.json";
import uz from "../LocalesUz.json";

// Namespace bo‘yicha JSONlarni birlashtiramiz
const resources = {
  en: {
    subNavbar: en.subNavbar,
    infobar: en.infobar,
    sellCard: en.sellCard,
    home: en.home,
    footer: en.footer,
    products: en.products, // ⚡ shu qo‘shildi
  },
  ru: {
    subNavbar: ru.subNavbar,
    infobar: ru.infobar,
    sellCard: ru.sellCard,
    home: ru.home,
    footer: ru.footer,
    products: ru.products,
  },
  uz: {
    subNavbar: uz.subNavbar,
    infobar: uz.infobar,
    sellCard: uz.sellCard,
    home: uz.home,
    footer: uz.footer,
    products: uz.products,
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "uz", // default til
  fallbackLng: "uz",

  ns: ["subNavbar", "infobar", "sellCard", "home", "footer", "products"], // products qo‘shildi
  defaultNS: "subNavbar", // defaultNS shunchaki default, useTranslation() ichida products ishlatiladi

  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
