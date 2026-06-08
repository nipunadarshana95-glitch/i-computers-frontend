  import { useEffect, useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { CgCornerDownRight } from "react-icons/cg";

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

    if (location.pathname === "/about") {
      return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-slate-50 text-slate-800 py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              About <span className="text-cyan-600">i-Computers</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Your ultimate destination for premium computer hardware, accessories, and tech solutions.
            </p>
            <div className="w-24 h-1 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Who We Are</h2>
              <p className="text-md text-justify text-slate-600 leading-relaxed">
                At <strong>i-Computers</strong>, we are passionate about technology and committed to empowering tech enthusiasts, gamers, and professionals with the best hardware in the market. Whether you are building a high-end gaming rig or upgrading your office setup, we supply components that ensure peak performance.
              </p>
              <p className="text-md text-justify text-slate-600 leading-relaxed">
                Our team bridges the gap between quality and affordability, bringing you genuine products from global top-tier tech brands with official manufacturer warranties.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Why Choose i-Computers?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 mt-1 text-lg"><CgCornerDownRight /></span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">100% Genuine Products</h4>
                    <p className="text-xs text-slate-500">Directly sourced from authorized distributors with trusted brand warranties.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 mt-1 text-lg"><CgCornerDownRight /></span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Expert Technical Support</h4>
                    <p className="text-xs text-slate-500">Our tech squad is always ready to guide you for perfect component matching.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-600 mt-1 text-lg"><CgCornerDownRight /></span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Fast & Secure Delivery</h4>
                    <p className="text-xs text-slate-500">Safe packaging and reliable island-wide shipping straight to your doorstep.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center mt-16 pt-8 border-t border-slate-200">
            <div>
              <h5 className="text-3xl font-extrabold text-cyan-600">5K+</h5>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1">Happy Clients</p>
            </div>
            <div>
              <h5 className="text-3xl font-extrabold text-cyan-600">100%</h5>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1">Original Tech</p>
            </div>
            <div>
              <h5 className="text-3xl font-extrabold text-cyan-600">24/7</h5>
              <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1">Support</p>
            </div>
          </div>
        </div>
      );
    }

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
              Isuri Technologies
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Upgrade your{" "}
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
                <p className="mt-2 text-lg font-semibold text-white">Student & Work Packs</p>
                <p className="mt-1 text-xs text-slate-300">Pre-configured laptops tuned for assignments and everyday work.</p>
              </div>
              <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-wide text-cyan-300">Gaming & Creators</p>
                <p className="mt-2 text-lg font-semibold text-white">High FPS Builds</p>
                <p className="mt-1 text-xs text-cyan-100">RTX builds, fast SSDs, and tuned airflow for performance.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-slate-400">Service Promise</p>
                <p className="mt-2 text-sm font-semibold text-white">Transparent pricing and genuine parts for every job.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <Link to="/contact" className="underline-offset-2 hover:underline text-cyan-300">Talk to our team</Link>
                  <span className="text-slate-400">•</span>
                  <Link to="/orders" className="underline-offset-2 hover:underline text-slate-200">Track your orders</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }