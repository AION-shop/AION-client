import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

export default function VerifyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Toast dublikatlarini oldini olish uchun ID saqlaymiz
  const toastId = useRef(null);

  // 🔒 Agar email bo‘lmasa → login sahifasiga qaytarish
  useEffect(() => {
    if (!state?.email) {
      navigate("/login", { replace: true });
    }
  }, [state, navigate]);

  const verifyCode = async () => {
    // Avvalgi toast bo'lsa o'chirib tashlaymiz
    if (toastId.current) toast.dismiss(toastId.current);

    if (loading) return;

    if (code.length !== 6) {
      toastId.current = toast.error("Kod 6 xonali bo‘lishi kerak");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userClient/verify-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: state?.email,
            code,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toastId.current = toast.error(data.message || "Kod noto‘g‘ri");
        setLoading(false);
        return;
      }

      // Hamma eski toastlarni tozalash
      toast.dismiss();
      
      dispatch(setAuthState({ user: data.user, token: data.token }));
      toast.success("Muvaffaqiyatli kirdingiz 🎉");

      // Sahifaga o'tish
      navigate("/", { replace: true });

    } catch (err) {
      toastId.current = toast.error("Server bilan aloqa yo‘q");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-100">

        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-blue-50">
            <ShieldCheck size={36} className="text-blue-600" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
          Email tasdiqlash
        </h1>

        <p className="text-center text-sm text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700 block sm:inline">{state?.email}</span>
          <br className="hidden sm:block" />
          manziliga yuborilgan kodni kiriting
        </p>

        <div className="space-y-4">
          <input
            type="text"
            inputMode="numeric" // Mobil klaviaturada raqamlar chiqishi uchun
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full text-center text-3xl tracking-[0.3em] sm:tracking-[0.5em] py-3 sm:py-4
            rounded-2xl border border-gray-200 focus:border-blue-500 
            focus:ring-4 focus:ring-blue-500/10 focus:outline-none 
            text-gray-900 transition-all font-mono"
          />

          <button
            onClick={verifyCode}
            disabled={loading}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-blue-600 hover:bg-blue-700
            text-white font-bold text-base sm:text-lg transition-all active:scale-95
            disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-200"
          >
            {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
          </button>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="w-full text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors"
        >
          ← Orqaga qaytish
        </button>
      </div>
    </div>
  );
}
