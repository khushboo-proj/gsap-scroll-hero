"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Intro Animation
    gsap.fromTo(
  headlineRef.current ? Array.from(headlineRef.current.children) : [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      statsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        delay: 0.8,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Scroll Animation
    const handleScroll = () => {
      if (!heroRef.current || !imageRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const scrollProgress = Math.min(
        Math.max(-rect.top / rect.height, 0),
        1
      );

      gsap.to(imageRef.current, {
        y: scrollProgress * 200,
        scale: 1 + scrollProgress * 0.3,
        rotate: scrollProgress * 15,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden"
    >
      {/* Headline */}
      <div
        ref={headlineRef}
        className="text-5xl md:text-7xl font-light tracking-[0.6em] text-center"
      >
        {"WELCOME ITZ FIZZ".split("").map((letter, index) => (
          <span key={index} className="inline-block">
            {letter}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-10 mt-12 text-center">
        {[
          { value: "120%", label: "Growth Rate" },
          { value: "85%", label: "Customer Satisfaction" },
          { value: "60%", label: "Repeat Orders" },
        ].map((stat, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) statsRef.current[index] = el;
            }}
          >
            <h2 className="text-3xl font-semibold">{stat.value}</h2>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Scroll Image */}
      <img
        ref={imageRef}
        src="/bottle.png"
        alt="Visual"
        className="absolute bottom-[-100px] w-72 pointer-events-none"
      />
    </section>
  );
}