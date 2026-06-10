import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SLOGANS = [
  "Custom-built rigs for work, study, and play.",
  "Genuine parts. Reliable service. Zero drama.",
  "From student laptops to pro workstations — we’ve got you."
];

export default function HomeContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Render About Us content when URL path is exactly "/about"
  if (location.pathname === "/about") {
    return (
      <section className="w-full py-20 bg-[#0e1424] min-h-[calc(100vh-100px)] text-white flex flex-col justify-center">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent sm:text-5xl">
              About I-Computer Technologies
            </h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              We are your trusted tech partner, dedicated to providing high-quality computer hardware, personalized custom PC builds, and world-class repair services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mt-12">
            <div className="bg-black/30 p-8 rounded-2xl border border-white/5 space-y-4 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-cyan-300">Who We Are</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Founded with a passion for performance and reliability, I-Computer Technologies has grown into a premier tech destination. Whether you are a student looking for a reliable laptop, a professional needing a high-end workstation, or a hard-core gamer chasing maximum FPS, we build solutions tailored just for you.
              </p>
            </div>

            <div className="bg-black/30 p-8 rounded-2xl border border-white/5 space-y-4 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-cyan-300">Why Choose Us?</h3>
              <ul className="text-sm text-slate-300 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-lg">✓</span> 100% Genuine Brands & Industry Warranties.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-lg">✓</span> Expert Diagnostics & Data-Safe Repair Standards.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-lg">✓</span> Transparent Pricing with Zero Hidden Costs.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-lg">✓</span> Dedicated After-Sales Customer Support.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/20 text-center">
            <p className="text-base text-cyan-200 italic">
              "Our mission is simple: To provide premium, zero-drama tech solutions and hardware upgrades backed by honest service that keeps Sri Lanka connected and productive."
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Render Default Home Page Content
  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/home.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/80 to-black/90" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-6xl flex-col justify-center px-4 py-10 md:flex-row md:items-center md:gap-10">
        <div className="w-full text-center md:w-1/2 md:text-left space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            I-Computer Technologies
          </p>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Upgrade your {" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              tech game
            </span>{" "}
            with trusted hardware & service.
          </h1>
          <p className="min-h-[2.5rem] text-base sm:text-lg font-medium text-cyan-100 animate-pulse">
            {SLOGANS[activeIndex]}
          </p>
          <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row md:items-start">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400 hover:shadow-cyan-400/40"
            >
              Shop Products
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/70 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition hover:border-cyan-400 hover:bg-white/10"
            >
              Learn About Us
            </Link>
          </div>
          <div className="mt-6 grid w-full gap-3 text-sm text-slate-100 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Laptops & Desktops</p>
              <p className="mt-1 text-sm font-semibold">Branded & Custom Builds</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Repairs & Upgrades</p>
              <p className="mt-1 text-sm font-semibold">Diagnostics, SSD, RAM & more</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Support</p>
              <p className="mt-1 text-sm font-semibold">Friendly guidance for everyone</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full md:mt-0 md:w-1/2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wide text-slate-400">Hot Right Now</p>
              <p className="mt-2 text-lg font-semibold text-white">Student & Work-from-Home Packs</p>
              <p className="mt-1 text-xs text-slate-300">Pre-configured laptops tuned for assignments, Zoom, and everyday work.</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Gaming & Creators</p>
              <p className="mt-2 text-lg font-semibold text-white">High FPS, Low Latency Builds</p>
              <p className="mt-1 text-xs text-cyan-100">RTX builds, fast SSDs, and tuned airflow for serious performance.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">Our Service Promise</p>
              <p className="mt-2 text-sm font-semibold text-white">Transparent pricing, genuine parts, and clear communication for every job.</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1">Warranty-backed hardware</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Data-safe repairs</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Island-wide customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}