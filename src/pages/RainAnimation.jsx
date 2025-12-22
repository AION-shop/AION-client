import React, { useEffect, useState } from "react";

export default function RainAnimation() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 50 : 100; // mobilga kamroq
    const tempDrops = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      length: window.innerWidth < 768 ? 8 + Math.random() * 10 : 10 + Math.random() * 15,
      speed: 2 + Math.random() * 2,
    }));
    setDrops(tempDrops);
  }, []);

  return (
    <>
      {drops.map((drop) => (
        <div
          key={drop.id}
          style={{
            position: "absolute",
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            width: "2px",
            height: `${drop.length}px`,
            backgroundColor: "rgba(174,194,224,0.5)",
            animation: `fall ${drop.speed}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </>
  );
}
