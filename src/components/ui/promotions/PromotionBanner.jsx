import React from "react";

const PromotionBanner = ({ img }) => {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border">
      <img
        src={img || "https://i.ytimg.com/vi/HxjfFoVfcpU/maxresdefault.jpg"}
        alt="reklama uchun joy"
        className="w-full h-[300px] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer bg-amber-200 object-cover"
      />
    </div>
  );
};

export default PromotionBanner;
