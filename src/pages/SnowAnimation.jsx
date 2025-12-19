import React, { useEffect, useState } from "react";

export default function SnowAnimation() {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const flakesCount = 50; // qancha flakes
    const tempFlakes = Array.from({ length: flakesCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // %
      size: 8 + Math.random() * 8, // px
      delay: Math.random() * 5, // animatsiya delay
      duration: 5 + Math.random() * 5, // animatsiya duration
      drift: (Math.random() - 0.5) * 50, // horizontal siljish
      color: `hsl(200, 100%, ${70 + Math.random() * 20}%)`, // ko‘k-oq rang
    }));
    setFlakes(tempFlakes);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            transform: `translateX(${flake.drift}px)`,
            backgroundColor: flake.color,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      ))}
    </div>
  );
}
