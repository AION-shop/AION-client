// src/pages/TelegramCallback.jsx
import { useEffect } from "react";

export default function TelegramCallback() {
  useEffect(() => {
    try {
      // URL query paramlarini olish
      const params = new URLSearchParams(window.location.search);
      const payload = {};
      params.forEach((value, key) => {
        payload[key] = value;
      });

      // Agar bu window boshqa windowdan ochilgan bo'lsa
      if (window.opener) {
        window.opener.postMessage(
          { type: "tg_oauth", payload },
          "*" // Xohlasa originni cheklash mumkin, masalan: "https://example.com"
        );
        window.close();
      }
    } catch (error) {
      console.error("Telegram callback error:", error);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 text-gray-700 p-4">
      <div className="card bg-base-100 shadow-lg p-6 rounded-lg text-center">
        <p className="font-medium mb-2">Processing Telegram…</p>
        <p className="text-sm text-gray-500">You can safely close this tab.</p>
      </div>
    </div>
  );
}
