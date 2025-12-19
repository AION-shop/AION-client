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
    <footer
      className="bg-gray-900 text-gray-200 pt-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            AutoMarket
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t.about}
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer navigation">
          <h3 className="text-lg font-semibold mb-3 text-white">
            {t.quickLinks}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/feedbacks" className="hover:text-white transition">
                {t.links?.feedbacks}
              </a>
            </li>
            <li>
              <a href="/Models" className="hover:text-white transition">
                {t.links?.Models}
              </a>
            </li>
            <li>
              <a href="/news" className="hover:text-white transition">
                {t.links?.news}
              </a>
            </li>
            <li>
              <a href="/rasrochka" className="hover:text-white transition">
                {t.links?.installment}
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            {t.contact}
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <a href="tel:+998952100550" className="hover:text-white transition">
                +998 95 210 05 50
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <a
                href="mailto:Bakhromovv07@gmail.com"
                className="hover:text-white transition"
              >
                Bakhromovv07@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            {t.social}
          </h3>
          <div className="flex items-center gap-4">
            {/* Telegram */}
            <a
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 hover:text-white transition transform hover:scale-110"
            >
              <TelegramIcon />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 hover:text-white transition transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AutoMarket. {t.rights}
      </div>
    </footer>
  );
};

export default Footer;
