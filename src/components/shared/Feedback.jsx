import React, { useState, useEffect } from "react";
import { MessageSquare, Star, X, Send, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
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
      console.error("Feedbacklarni olishda xato:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async () => {
    if (!comment) {
      alert("Iltimos, feedback yozing");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.firstName || user?.email || "Anonymous",
          comment,
          rating,
        }),
      });
      if (!res.ok) throw new Error("Server error");

      fetchFeedbacks();
      setComment("");
      setRating(5);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Feedback yuborishda xato:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black p-3 rounded-xl">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Customer Feedback</h1>
              <p className="text-gray-500 mt-1">Share your experience with us</p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r bg-black text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
          >
            <Send className="w-5 h-5" />
            Add Feedback
          </button>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No feedbacks yet</p>
              <p className="text-gray-400 mt-2">Be the first to share your experience!</p>
            </div>
          ) : (
            feedbacks.map((fb, index) => (
              <div
                key={fb._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{fb.name}</h4>
                      <p className="text-gray-400 text-sm">{new Date(fb.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed pl-15">{fb.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {!isAuth ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Iltimos, login qiling</h3>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    className="text-black w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none"
                    value={user.firstName || user.email}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Comment</label>
                  <textarea
                    className="text-black w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 focus:outline-none resize-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
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
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Feedback
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
