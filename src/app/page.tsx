"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { submitToWaitlist } from "./utils/waitlist";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const marqueeTexts: string[] = [
    "Not just a brand - its a vibe",
    "ACEEIGHT - Dropping Soon",
    "Drip That Talks",
    "Limited Drops. Maximum Hype",
  ];

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const STAR_COUNT = 220;
    type Star = { x: number; y: number; z: number; r: number; tw: number };
    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      tw: Math.random() * 2 * Math.PI,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = (t: number) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      const px = (mouseRef.current.x - 0.5) * 0.06;
      const py = (mouseRef.current.y - 0.5) * 0.06;

      for (const s of stars) {
        s.z -= 0.0012;
        if (s.z <= 0) s.z = 1;

        const scale = 300;
        const x = (s.x + px) / s.z;
        const y = (s.y + py) / s.z;
        const sx = x * scale + cx;
        const sy = y * scale + cy;

        const twinkle = 0.6 + 0.4 * Math.sin(s.tw + t * 0.002);
        const r = Math.max(0.2, s.r * twinkle);

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();

        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 4);
        grad.addColorStop(0, "rgba(255,255,255,0.5)");
        grad.addColorStop(1, "rgba(255,255,255,0.0)");
        ctx.beginPath();
        ctx.arc(sx, sy, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        s.tw += 0.02;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Mouse/touch movement
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouseRef.current.x = e.touches[0].clientX / window.innerWidth;
      mouseRef.current.y = e.touches[0].clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // Email submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    const data = await submitToWaitlist(email, false);

    if (data) {
      console.log("Email submitted:", email, data.message);
      setSubmitted(true);
      setEmail("");
    } else {
      alert("Failed to submit email. Please try again!");
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 md:opacity-100" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/logowhite.png"
            alt="ACEEIGHT Logo"
            height={140}
            width={140}
            className="opacity-0 rounded-full drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-fade-in-up delay-100"
          />
          <h1 className="opacity-0 text-4xl md:text-6xl font-light tracking-[0.18em] text-white animate-fade-in-up delay-200">
            ACEEIGHT
          </h1>
          <p className="opacity-0 text-sm md:text-base text-gray-400 tracking-[0.3em] uppercase text-center animate-fade-in-up delay-300">
            Brace yourself for the drop
          </p>

          <span className="opacity-0 mt-2 inline-flex items-center rounded-full border border-gray-700 px-3 py-1 text-lg md:text-xl tracking-[0.25em] font-semibold uppercase text-white animate-fade-in-up delay-400">
            <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-[var(--color-chart-2)] shadow-[0_0_12px_var(--color-chart-2)] animate-blink self-center" />
            Coming Soon
          </span>

          {/* Email Form */}
          <div className="opacity-0 w-full flex justify-center px-4 pt-6 animate-fade-in-up delay-500">
            {submitted ? (
              <p className="opacity-0 animate-fade-in-up delay-100 text-white transition-transform text-sm md:text-lg tracking-widest uppercase text-center">
                Thank you! You&apos;ll be the first to know.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row w-full max-w-xs sm:max-w-lg gap-3"
              >
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Your Email"
                  className="flex-1 px-4 text-center sm:text-left bg-transparent border border-neutral-700 text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-0 text-sm rounded"
                />
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 bg-white text-black font-medium hover:bg-gray-100 transition-colors text-sm rounded"
                >
                  Notify Me
                </Button>
              </form>
            )}

          </div>

          {/* Marquee */}
          <div className="opacity-0 mt-10 w-full overflow-hidden animate-fade-in-up delay-600">
            <div className="flex marquee-content w-max">
              {Array.from({ length: 4 }).flatMap(() => marqueeTexts).map((text, i) => (
                <div key={i} className="flex items-center gap-6 mx-6 shrink-0">
                  <p className="text-xs sm:text-sm tracking-[0.25em] uppercase">{text}</p>
                  <span className="h-0.5 w-6 bg-neutral-400/40" />
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="animate-fade-in-up delay-700 opacity-0 mt-6 ">
            <a
              href="https://www.instagram.com/aceeight.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-transform duration-300 "
              aria-label="Follow us on Instagram"
            >
              <Image
                src="/insta.svg"
                alt="Instagram"
                width={28}
                height={28}
                className="invert transition-transform duration-300 hover:scale-110"
              />
              <span className="text-sm transition-transform duration-300 hover:scale-105">
                @aceeight.in
              </span>
            </a>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .marquee-content {
          display: flex;
          animation: marquee 120s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .flex > * { flex-shrink: 0; }

        @keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 1.2s ease forwards;
}
  

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
.delay-700 { animation-delay: 0.7s; }

 @keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0; }
  }
  .animate-blink {
    animation: blink 2.5s infinite;
  }

      `}</style>
    </section>
  );
}