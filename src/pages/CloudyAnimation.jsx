import React, { useEffect, useState } from "react";

export default function CloudyAnimation() {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const newClouds = [];
    for (let i = 0; i < 5; i++) {
      newClouds.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 40,
        size: Math.random() * 100 + 100,
        speed: Math.random() * 20 + 20,
      });
    }
    setClouds(newClouds);
  }, []);

  return (
    <>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          style={{
            position: "absolute",
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            width: `${cloud.size}px`,
            height: "60px",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "50%",
            animation: `moveCloud ${cloud.speed}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes moveCloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
    </>
  );
}
