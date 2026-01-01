import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // App.jsx da Toaster bo'lishi kerak
import { Mail, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendCode = async () => {
    if (loading) return;
    if (!email) return toast.error("Email kiriting");

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/userClient/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Kod emailingizga yuborildi 📩");
        navigate("/verify-account", { state: { email } });
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("Server bilan aloqa yo‘q");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-blue-100">
            <Mail size={34} className="text-blue-600" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 text-center">
          Kirish
        </h1>

        <p className="text-gray-600 text-center text-sm">
          Emailingizni kiriting va tasdiqlash kodini oling
        </p>

        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />

        <button
          onClick={sendCode}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Yuborilmoqda..." : "Kod yuborish"}
          {!loading && <ArrowRight size={18} />}
        </button>

        <p className="text-xs text-center text-gray-500">
          Kod emailingizga yuboriladi. Parol talab qilinmaydi.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
