import React, { useContext } from "react";
import { Phone, Mail } from "lucide-react";
import { LangContext } from "../../../LangContext";

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.964 2.292c-.162-.105-.36-.145-.555-.115L2.31 7.462c-.398.08-.703.378-.783.777-.08.398.078.807.388 1.037l3.05 2.257 1.933 7.28c.117.447.528.748.984.748h.003c.105 0 .21-.015.315-.045.495-.11.888-.483 1.025-.976l2.119-5.642 5.374-4.538c.296-.25.353-.71.135-1.056-.219-.346-.637-.505-1.028-.428l-8.324 1.83 10.21-5.31c.22-.112.4-.29.512-.513.116-.22.15-.476.095-.722-.06-.24-.203-.46-.41-.602z"/>
  </svg>
);

const Footer = () => {
  const { t } = useContext(LangContext);

  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">AutoMarket</h3>
          <p className="text-sm text-gray-400">{t.about}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t.quickLinks}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/discount" className="hover:text-white">{t.links?.allProducts}</a></li>
            <li><a href="/lottery" className="hover:text-white">{t.links?.lottery}</a></li>
            <li><a href="/news" className="hover:text-white">{t.links?.news}</a></li>
            <li><a href="/rasrochka" className="hover:text-white">{t.links?.installment}</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t.contact}</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +998 95 210 05 50</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> Bakhromovv07@gmail.com</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">{t.social}</h3>
          <div className="flex items-center gap-4">
            <a href="https://t.me/username" target="_blank" rel="noopener noreferrer"><TelegramIcon /></a>
            {/* qolgan social ikonlar */}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AutoMarket. {t.rights}
      </div>
    </footer>
  );
};

export default Footer;
