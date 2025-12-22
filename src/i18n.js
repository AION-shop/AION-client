import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON tarjimalar
import en from "../LocalesEn.json";
import ru from "../LocalesRu.json";
import uz from "../LocalesUz.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  uz: { translation: uz }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz", // default til
    fallbackLng: "uz",
    debug: false,
    interpolation: { escapeValue: false }
  });

export default i18n;
