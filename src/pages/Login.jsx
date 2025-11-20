import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [telegram, setTelegram] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!telegram || !password) {
      toast.error("Barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/userClient/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegram, password }),
      });

      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      dispatch(setAuthState({ user: data.user, token: data.token }));
      toast.success("Kirish muvaffaqiyatli!");
      navigate("/"); // Kirishdan keyin bosh sahifaga

    } catch (err) {
      console.error(err);
      toast.error("Server xatosi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Login | ShopMarket</title>
        <meta name="description" content="Login sahifasi ShopMarket ilovasi uchun" />
      </Helmet>

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-200 transition-all hover:shadow-2xl">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Kirish
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Telegram username (@username)</span>
              </label>
              <input
                type="text"
                placeholder="@username"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
            >
              {loading ? "Yuklanmoqda..." : "Kirish"}
            </button>
          </form>

          <p
            onClick={() => navigate("/register")}
            className="text-center mt-4 text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200"
          >
            Ro‘yxatdan o‘tish sahifasiga o‘tish
          </p>
        </div>
      </div>
    </>
  );
}
