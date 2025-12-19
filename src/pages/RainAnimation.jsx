import React, { useEffect, useState } from "react";

export default function RainAnimation() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const newDrops = [];
    for (let i = 0; i < 100; i++) {
      newDrops.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        length: Math.random() * 15 + 10,
        speed: Math.random() * 2 + 2,
      });
    }
    setDrops(newDrops);
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
