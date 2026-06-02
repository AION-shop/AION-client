import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { BatteryCharging, Gauge, ArrowUpRight, Zap } from "lucide-react";

function Card3D({ product, darkBg }) {
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    active: false,
    curRX: 0, curRY: 0,
    tarRX: 0, tarRY: 0,
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    const s = stateRef.current;
    const card = cardRef.current;
    if (!card) return;

    s.curRX = lerp(s.curRX, s.tarRX, 0.1);
    s.curRY = lerp(s.curRY, s.tarRY, 0.1);
    card.style.transform = `rotateX(${s.curRX}deg) rotateY(${s.curRY}deg) scale(1.02)`;

    if (s.active || Math.abs(s.curRX) > 0.05 || Math.abs(s.curRY) > 0.05) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      card.style.transform = "";
      rafRef.current = null;
    }
  }

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    stateRef.current.tarRX = -dy * 14;
    stateRef.current.tarRY = dx * 14;

    const mx = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const my = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    card.style.setProperty("--mx", mx + "%");
    card.style.setProperty("--my", my + "%");

    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }

  function handleMouseEnter() {
    stateRef.current.active = true;
    cardRef.current?.classList.add("is-hovered");
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }

  function handleMouseLeave() {
    const s = stateRef.current;
    s.active = false;
    s.tarRX = 0;
    s.tarRY = 0;
    cardRef.current?.classList.remove("is-hovered");
    cardRef.current?.style.removeProperty("--mx");
    cardRef.current?.style.removeProperty("--my");
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate);
  }

  return (
    <Link
      to={`/about-car/${product.id}`}
      className="block no-underline w-full h-full"
      style={{ perspective: "1000px" }}
    >
      {/* Wrap: float animation + mouse events */}
      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="float-card"
        style={{
          animation: `floatCard 5s ease-in-out infinite`,
        }}
      >
        {/* Card: 3D tilt target */}
        <div
          ref={cardRef}
          className="relative rounded-[32px] overflow-hidden aspect-[3/4] cursor-pointer select-none"
          style={{
            background: "#0d1117",
            border: "0.5px solid rgba(255,255,255,0.08)",
            transformStyle: "preserve-3d",
            transition: "box-shadow 0.4s",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            willChange: "transform",
          }}
        >
          {/* Mouse spotlight glow */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-0 hover-glow"
            style={{
              background:
                "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(99,140,255,0.18) 0%, transparent 60%)",
              transition: "opacity 0.4s",
            }}
          />

          {/* Image */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ transform: "translateZ(20px)" }}
          >
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out scale-[1.04] hover:scale-110"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,7,15,0.95) 0%, rgba(5,7,15,0.45) 50%, rgba(5,7,15,0.08) 100%)",
              }}
            />
          </div>

          {/* Shine overlay */}
          <div
            className="shine-overlay absolute inset-0 rounded-[32px] pointer-events-none z-[3]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />

          {/* Border ring */}
          <div
            className="ring-overlay absolute pointer-events-none z-[4]"
            style={{
              inset: -1,
              borderRadius: 33,
              background:
                "linear-gradient(135deg, rgba(79,138,255,0.35), transparent 50%, rgba(255,255,255,0.06))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: 1,
              opacity: 0,
              transition: "opacity 0.4s",
            }}
          />

          {/* Badge */}
          <div
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-4 py-2"
            style={{
              background: "rgba(10,12,20,0.65)",
              backdropFilter: "blur(12px)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: 100,
              transform: "translateZ(35px)",
            }}
          >
            <span
              className="badge-pulse"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4f8aff",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#7eb8ff",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {product.badge}
            </span>
          </div>

          {/* Body */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white"
            style={{
              transform: "translateZ(55px)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Stats */}
            <div className="flex gap-2 mb-3">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 100,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 500,
                }}
              >
                <BatteryCharging size={12} style={{ color: "#4ade80" }} />
                {product.range}
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 100,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 500,
                }}
              >
                <Gauge size={12} style={{ color: "#60a5fa" }} />
                {product.power}
              </div>
            </div>

            {/* Title */}
            <h3
              className="uppercase mb-2 leading-none"
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {product.title}
            </h3>

            {/* Description */}
            <p
              className="mb-4 line-clamp-2"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.55,
              }}
            >
              {product.description}
            </p>

            {/* Footer */}
            <div
              className="flex items-center justify-between pt-4"
              style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Starting at
                </span>
                <span
                  style={{
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {product.price}
                </span>
              </div>

              <div
                className="arrow-btn flex items-center justify-center"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "background 0.3s, transform 0.3s",
                  flexShrink: 0,
                }}
              >
                <ArrowUpRight size={20} style={{ color: "#0d1117", strokeWidth: 2.5 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card3D;