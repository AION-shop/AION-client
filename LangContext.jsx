import { createContext, useState } from "react";
import uz from "./LocalesUz.json";
import ru from "./LocalesRu.json";
import en from "./LocalesEn.json";

export const LangContext = createContext();

const locales = { uz, ru, en };

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("uz");

  // butun til faylini olish
  const t = locales[lang] || {};

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};
