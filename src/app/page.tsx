"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

interface Particle {
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
  opacity: number;
}

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const p: Particle[] = [...Array(40)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.08,
      dy: (Math.random() - 0.5) * 0.08,
      opacity: 0.5,
    }));
    setParticles(p);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          const x = p.x + p.dx;
          const y = p.y + p.dy;
          if (x < 0 || x > 100) p.dx = -p.dx;
          if (y < 0 || y > 100) p.dy = -p.dy;
          return { ...p, x, y };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const marqueeTexts: string[] = [
    "Street. Style. Statement.",
    "Urban Vibes, Bold Moves",
    "ACEEIGHT - Dropping Soon",
    "Drip That Talks",
    "Limited Drops. Maximum Hype",
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    // Placeholder API call — replace with your backend endpoint
    try {
      // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
      console.log("Submitted email:", email);
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 text-neutral-900 font-light tracking-widest">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-neutral-800"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              transform: `translate(${p.x}vw, ${p.y}vh)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full">
        {/* Logo */}
        <div className="animate-fade-in-up opacity-0 mb-6 sm:mb-8">
          <Image
            src="/AceLogo.png"
            alt="ACEEIGHT Logo"
            width={128}
            height={128}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain opacity-90 drop-shadow-md hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        {/* Brand Name */}
        <div className="animate-fade-in-up opacity-0 delay-100 mb-4">
          <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.1em] text-center">
            ACEEIGHT
            <span className="absolute left-1/2 -bottom-2 w-48 h-0.5 -translate-x-1/2 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-full animate-light-travel" />
          </h1>
        </div>
        {/* Coming Soon */}
        <div className="animate-fade-in-up opacity-0 delay-200 mt-6 text-center">
          <p className="text-neutral-700 text-xs sm:text-sm uppercase tracking-[0.25em] mb-2">
            Stay Tuned for the Launch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.15em] animate-pulse-slow">
            <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">
              COMING SOON
            </span>
          </h2>
        </div>
        {/* Email Form */}{" "}
        <div className="animate-fade-in-up opacity-0 delay-400 mt-8 w-full flex justify-center px-4">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center w-full max-w-md gap-3 md:gap-0"
            >
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="w-full sm:flex-1 px-4 py-2.5 font-medium text-center sm:text-left bg-transparent border border-neutral-800 text-neutral-900 placeholder-font-light focus:outline-none focus:border-neutral-900 transition duration-300"
              />
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 border border-neutral-800 text-neutral-800 md:border-l-0 hover:bg-neutral-900 hover:text-gray-100 transition-all duration-300 whitespace-nowrap flex items-center justify-center"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <p className="text-neutral-800 text-sm tracking-[0.1em] uppercase text-center animate-fade-in-up opacity-0">
              Thank you! You&apos;ll be the first to know.
            </p>
          )}
        </div>

        {/* Marquee */}
        <div className="animate-fade-in-up opacity-0 delay-500 mt-10 w-full overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap items-center">
            {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
              <div key={i} className="flex items-center gap-6 mx-6">
                <p className="text-neutral-800 text-xs sm:text-sm tracking-[0.25em] uppercase shimmer-text">
                  {text}
                </p>
                <span className="h-0.5 w-6 bg-neutral-400/40" />
              </div>
            ))}
          </div>
        </div>
        {/* Social */}
        <div className="animate-fade-in-up opacity-0 delay-600 mt-8">
          <Link
            href="https://www.instagram.com/aceeight.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-neutral-800 hover:text-neutral-900 transition-transform duration-300 hover:scale-125"
            aria-label="Follow us on Instagram"
          >
            <Image
              src="/insta.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="text-neutral-600"
            />
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
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

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes light-travel {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.03);
          }
        }

        .animate-light-travel {
          background-size: 200% auto;
          animation: light-travel 4s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(60, 60, 60, 0.8) 30%,
            rgba(30, 30, 30, 1) 50%,
            rgba(60, 60, 60, 0.8) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
