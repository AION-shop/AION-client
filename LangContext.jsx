import { createContext, useState } from "react";
// JSON fayllaringiz joylashgan manzilni to'g'ri ekanligiga ishonch hosil qiling
import uz from "./LocalesUz.json";
import ru from "./LocalesRu.json";
import en from "./LocalesEn.json";

export const LangContext = createContext();

// Barcha til obyektlarini birlashtiramiz
const locales = { uz, ru, en };

export const LangProvider = ({ children }) => {

  const [lang, setLang] = useState("uz");


  const t = locales[lang] || {};

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}, 
    </LangContext.Provider>
  );
};
