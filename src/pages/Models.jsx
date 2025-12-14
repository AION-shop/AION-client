import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Skeleton loading component
const Loading = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-20">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 w-[300px] md:w-[350px] lg:w-[400px] rounded-2xl bg-gray-100 p-4 animate-pulse"
        >
          <div className="h-48 md:h-56 lg:h-64 w-full bg-gray-300 rounded-xl"></div>
          <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          <div className="h-5 w-1/3 bg-gray-300 rounded-full mt-2"></div>
          <div className="h-10 w-full bg-gray-300 rounded-full mt-1"></div>
        </div>
      ))}
    </div>
  );
};

// Model Card
const ModelCard = ({ model, index }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (model._id) {
      navigate(`/col-products/${model._id}`);
    }
  }, [navigate, model._id]);


  const imageSrc = model.images?.[0] || model.thumbnail || "https://via.placeholder.com/300x200";

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white
                 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
    >
      <img
        src={imageSrc}
        alt={model.title}
        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        ${model.price}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 rounded-2xl">
        <h3 className="text-white font-bold text-xl mb-2">{model.title}</h3>
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white/90 text-sm">View Details</span>
          <svg
            className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Models Page
const ModelsPage = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/col-products`);
        const data = await res.json();
        setModels(data.colProducts || data.products || []);
      } catch (err) {
        console.error(err);
        setModels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">GAC AION Modellar</h1>

        {loading ? (
          <Loading />
        ) : models.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <ModelCard key={model._id} model={model} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">Modellar topilmadi</div>
        )}

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ModelsPage;
