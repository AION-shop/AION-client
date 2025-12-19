import React from "react";

export default function SunnyAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-32 h-32 rounded-full bg-yellow-400 shadow-xl animate-pulse"></div>
    </div>
  );
}
