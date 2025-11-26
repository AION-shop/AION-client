import React from "react";
import { ShoppingBag, Phone, Mail } from "lucide-react";

// Telegram SVG (lucide-react-da yo'q)
const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21.964 2.292c-.162-.105-.36-.145-.555-.115L2.31 7.462c-.398.08-.703.378-.783.777-.08.398.078.807.388 1.037l3.05 2.257 1.933 7.28c.117.447.528.748.984.748h.003c.105 0 .21-.015.315-.045.495-.11.888-.483 1.025-.976l2.119-5.642 5.374-4.538c.296-.25.353-.71.135-1.056-.219-.346-.637-.505-1.028-.428l-8.324 1.83 10.21-5.31c.22-.112.4-.29.512-.513.116-.22.15-.476.095-.722-.06-.24-.203-.46-.41-.602z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">AutoMarket</h3>
          <p className="text-sm text-gray-400">
            AutoMarket – Электронные автомобили высшего качества. Самые выгодные предложения только у нас!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Быстрые ссылки</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/discount" className="hover:text-white">Все товары</a></li>
            <li><a href="/lottery" className="hover:text-white">Розыгрыши</a></li>
            <li><a href="/news" className="hover:text-white">Новинки</a></li>
            <li><a href="/rasrochka" className="hover:text-white">Рассрочка</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">Контакты</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +998 95 210 05 50
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> ElectrAuto@gmail.com
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Мы в социальных сетях</h3>
          <div className="flex items-center gap-4">
            <a href="https://t.me/username" target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="w-5 h-5 text-white" />
            </a>
            <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 011.708 1.112 4.92 4.92 0 011.112 1.708c.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 01-1.112 1.708 4.92 4.92 0 01-1.708 1.112c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 01-1.708-1.112 4.92 4.92 0 01-1.112-1.708c-.163-.46-.349-1.26-.403-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 011.112-1.708 4.92 4.92 0 011.708-1.112c.46-.163 1.26-.349 2.43-.403 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.333.013 7.052.072 5.775.13 4.85.322 4.042.654a6.917 6.917 0 00-2.517 1.633 6.917 6.917 0 00-1.633 2.517c-.332.808-.524 1.733-.582 3.01C-.013 8.333 0 8.756 0 12c0 3.244.013 3.667.072 4.948.058 1.277.25 2.202.582 3.01a6.917 6.917 0 001.633 2.517 6.917 6.917 0 002.517 1.633c.808.332 1.733.524 3.01.582C8.333 23.987 8.756 24 12 24s3.667-.013 4.948-.072c1.277-.058 2.202-.25 3.01-.582a6.917 6.917 0 002.517-1.633 6.917 6.917 0 001.633-2.517c.332-.808.524-1.733.582-3.01.059-1.281.072-1.704.072-4.948s-.013-3.667-.072-4.948c-.058-1.277-.25-2.202-.582-3.01a6.917 6.917 0 00-1.633-2.517A6.917 6.917 0 0019.958.654c-.808-.332-1.733-.524-3.01-.582C15.667.013 15.244 0 12 0z"/>
                <circle cx="12" cy="12" r="3.5"/>
              </svg>
            </a>
            <a href="https://facebook.com/username" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987H7.898v-2.892h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 01-2.828.775A4.932 4.932 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.558 4.897 4.897 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.919 4.919 0 004.596 3.417 9.867 9.867 0 01-6.102 2.104c-.396 0-.788-.023-1.176-.068a13.945 13.945 0 007.557 2.212c9.054 0 14.001-7.496 14.001-13.986 0-.21-.005-.423-.014-.634A9.936 9.936 0 0024 4.557z"/>
              </svg>
            </a>
            <a href="https://wechat.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.484 2 12c0 2.21.719 4.25 1.924 5.896L2 22l4.231-1.923C7.746 21.281 9.78 22 12 22c5.52 0 10-4.484 10-10S17.52 2 12 2zm-4 12c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm6 0c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AutoMarket. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
