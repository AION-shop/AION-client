import React, { useContext } from "react";
import { Phone, Mail, Instagram } from "lucide-react";
import { LangContext } from "../../../LangContext";

/* Telegram SVG Icon */
const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M21.964 2.292c-.162-.105-.36-.145-.555-.115L2.31 7.462c-.398.08-.703.378-.783.777-.08.398.078.807.388 1.037l3.05 2.257 1.933 7.28c.117.447.528.748.984.748h.003c.105 0 .21-.015.315-.045.495-.11.888-.483 1.025-.976l2.119-5.642 5.374-4.538c.296-.25.353-.71.135-1.056-.219-.346-.637-.505-1.028-.428l-8.324 1.83 10.21-5.31c.22-.112.4-.29.512-.513.116-.22.15-.476.095-.722-.06-.24-.203-.46-.41-.602z" />
  </svg>
);

const Footer = () => {
  const { t } = useContext(LangContext);

  return (
    <footer className="bg-gray-900 text-gray-200" role="contentinfo" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* About / Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-3">AutoMarket</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t.about || "AutoMarket – Premium sifatli elektron avtomobillar. Eng yaxshi takliflar faqat shu yerda!"}
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer navigation">
          <h3 className="text-lg font-semibold mb-3 text-white">{t.quickLinks || "Quick Links"}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="relative inline-block text-gray-400 hover:text-white transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {t.links?.home || "Home"}
              </a>
            </li>
            <li>
              <a
                href="/Models"
                className="relative inline-block text-gray-400 hover:text-white transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {t.links?.Models || "Car Models"}
              </a>
            </li>
            <li>
              <a
                href="/feedbacks"
                className="relative inline-block text-gray-400 hover:text-white transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {t.links?.feedbacks || "Testimonials"}
              </a>
            </li>
            <li>
              <a
                href="/news"
                className="relative inline-block text-gray-400 hover:text-white transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {t.links?.news || "News"}
              </a>
            </li>
            <li>
              <a
                href="/rasrochka"
                className="relative inline-block text-gray-400 hover:text-white transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {t.links?.installment || "Installment"}
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="relative inline-block text-gray-400 hover:text-white transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {t.links?.about || "About Us"}
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">{t.contact || "Contact"}</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <a href="tel:+998952100550" className="hover:text-white transition">+998 95 210 05 50</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <a href="mailto:Bakhromovv07@gmail.com" className="hover:text-white transition">Bakhromovv07@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">{t.social || "Follow Us"}</h3>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/developerBhk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition transform hover:scale-110"
            >
              <TelegramIcon />
            </a>
            <a
              href="https://instagram.com/14.Bakhromovv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AutoMarket. {t.rights || "Barcha huquqlar himoyalangan."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
