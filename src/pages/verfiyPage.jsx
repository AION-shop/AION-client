import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); // email LoginPage'dan keladi

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    if (!code || code.length < 4) {
      return toast.error("Tasdiqlash kodini to‘liq kiriting");
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

      if (data.success) {
        dispatch(
          setAuthState({
            user: data.user,
            token: data.token,
          })
        );

        toast.success("Muvaffaqiyatli kirdingiz 🎉");
        setTimeout(() => navigate("/"), 800);
      } else {
        toast.error(data.message || "Kod noto‘g‘ri");
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
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-blue-100">
            <ShieldCheck size={36} className="text-blue-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Email tasdiqlash
        </h1>

        <p className="text-center text-sm text-gray-500">
          <span className="font-medium text-gray-700">{state?.email}</span>
          <br />
          emailiga yuborilgan kodni kiriting
        </p>

        {/* CODE INPUT */}
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="123456"
          className="w-full text-center text-2xl tracking-widest py-3 rounded-xl border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />

        {/* BUTTON */}
        <button
          onClick={verifyCode}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700
          text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate("/login")}
          className="w-full text-sm text-gray-500 hover:text-blue-600 transition"
        >
          ← Orqaga qaytish
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;
