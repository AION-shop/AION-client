function SunnyAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Sun rays */}
      <div className="absolute w-64 h-64">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-20 bg-gradient-to-t from-yellow-300/0 to-yellow-400/40 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
              animation: `rotateRays 20s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      
      {/* Sun core with gradient */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 shadow-2xl shadow-yellow-400/50">
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-300/30 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse" />
        
        {/* Inner highlight */}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/40 blur-sm" />
      </div>

      <style>{`
        @keyframes rotateRays {
          0% {
            opacity: 0.3;
            transform: translate(-50%, -100%) rotate(0deg) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -100%) rotate(0deg) scale(1.1);
          }
          100% {
            opacity: 0.3;
            transform: translate(-50%, -100%) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}