import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON tarjimalarni import qilish
// JSON fayllaringiz joylashgan manzilni to'g'ri ekanligiga ishonch hosil qiling
import en from "../LocalesEn.json";
import ru from "../LocalesRu.json";
import uz from "../LocalesUz.json";
import SingleProductPage from "./pages/SingleProducts";

// Namespace bo‘yicha JSONlarni birlashtiramiz
const resources = {
  en: {
    subNavbar: en.subNavbar,
    infobar: en.infobar,
    sellCard: en.sellCard,
    home: en.home,
    footer: en.footer,
    products: en.products, 
    korzinka: en.korzinka,
    hero: en.hero,
    brake:en.brake,
    singleProduct:en.singleProduct
  },
  ru: {
    subNavbar: ru.subNavbar,
    infobar: ru.infobar,
    sellCard: ru.sellCard,
    home: ru.home,
    footer: ru.footer,
    products: ru.products,
    korzinka: ru.korzinka,
    hero: ru.hero,
    brake:ru.brake,
    singleProduct:ru.singleProduct
  },
  uz: {
    subNavbar: uz.subNavbar,
    infobar: uz.infobar,
    sellCard: uz.sellCard,
    home: uz.home,
    footer: uz.footer,
    products: uz.products,
    korzinka: uz.korzinka,
    hero: uz.hero,
    brake: uz.brake,
    singleProduct:uz.singleProduct
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "uz", // default til
  fallbackLng: "uz",
  debug: false, // O'chirilgan holatda yaxshiroq

  ns: ["subNavbar", "infobar", "sellCard", "home", "footer", "products" , "korzinka" ,"hero" , "brake", "singleProduct"],
  defaultNS: "home", // defaultNS ni 'home' ga o'zgartirdim, 'subNavbar' o'rniga

  interpolation: {
    escapeValue: false,
  },
});


export default i18n;
