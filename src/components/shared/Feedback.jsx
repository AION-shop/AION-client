import React, { useState, useEffect, useContext } from "react";
import { MessageSquare, Star, X, Send, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../../../LangContext";

const Feedback = () => {
  const { t } = useContext(LangContext); // SUBNAVBAR bilan bir xil usul
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const isAuth = auth?.isAuth;
  const user = auth?.user;

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL + "/api/feedbacks";

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error(t.feedback?.fetchError || "Feedbacklarni yuklashda xatolik", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert(t.feedback?.writeComment || "Iltimos, izoh kiriting");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.firstName || user?.email || t.feedback?.anonymous || "Anonim",
          comment,
          rating,
          date: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Server error");

      fetchFeedbacks();
      setComment("");
      setRating(5);
      setIsModalOpen(false);
    } catch (error) {
      console.error(t.feedback?.submitError || "Izoh jo'natishda xatolik", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 sm:p-3 rounded-xl">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                {t.subNavbar?.allProducts || "Barcha feedbacklar"}
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                {t.feedback?.shareExperience || "Foydalanuvchilar o'z tajribalarini qoldiradilar"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold text-sm sm:text-base"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            {t.feedback?.addFeedback || "Izoh qoldirish"}
          </button>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center border border-gray-100">
              <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-base sm:text-lg font-medium">
                {t.feedback?.noFeedbacks || "Hali izohlar mavjud emas"}
              </p>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                {t.feedback?.beFirst || "Birinchi bo‘ling va izoh qoldiring"}
              </p>
            </div>
          ) : (
            feedbacks
              .slice()
              .reverse()
              .map((fb) => (
                <div
                  key={fb._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-6 border border-gray-100 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm sm:text-lg">{fb.name}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {new Date(fb.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-1 sm:mt-0">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < fb.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed pl-12 sm:pl-15 text-sm sm:text-base">{fb.comment}</p>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-lg p-4 sm:p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {!isAuth ? (
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  {t.feedback?.loginPrompt || "Izoh qoldirish uchun login qiling"}
                </h3>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
                >
                  {t.subNavbar?.login || "Login"}
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.feedback?.yourName || "Ismingiz"}
                  </label>
                  <input
                    type="text"
                    className="text-black w-full border-2 border-gray-200 rounded-xl p-2 sm:p-3 text-sm sm:text-base focus:border-indigo-500 focus:outline-none"
                    value={user.firstName || user.email}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.feedback?.yourComment || "Izohingiz"}
                  </label>
                  <textarea
                    className="text-black w-full border-2 border-gray-200 rounded-xl p-2 sm:p-3 focus:border-indigo-500 focus:outline-none resize-none text-sm sm:text-base"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.feedback?.commentPlaceholder || "Izoh kiriting..."}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    {t.feedback?.rating || "Baholash"}
                  </label>
                  <div className="flex gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 sm:w-10 sm:h-10 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 hover:text-yellow-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.feedback?.submitFeedback || "Izohni jo'natish"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
