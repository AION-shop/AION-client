import React, { useState } from 'react';
import { MapPin, Phone, Clock, Shield, Package, CreditCard, RotateCcw, Check, ChevronDown } from 'lucide-react';

// Google Maps URL for "Index Bazar, Tashkent, Uzbekistan"
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.0467970316663!2d69.2344014155838!3d41.20049897927366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61284896a357%3A0x39082adb468e1c24!2sIndex%20Bazar%2C%20Tashkent!5e0!3m2!1sen!2s!4v1706815975698!5m2!1sen!2s";
const MAP_DIRECTION_URL = "https://www.google.com/maps/dir/?api=1&destination=Index+Bazar+Tashkent";

const MapSection = () => {
  return (
    <div className="w-full h-80 rounded-3xl overflow-hidden relative shadow-xl">
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Toshkent Index Bazar Xaritasi"
      />
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() =>
            window.open(MAP_DIRECTION_URL, "_blank")
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-semibold active:scale-95"
        >
          <MapPin className="w-5 h-5" />
          <span>Yo'nalish olish</span>
        </button>
      </div>
    </div>
  );
};

export default MapSection;
