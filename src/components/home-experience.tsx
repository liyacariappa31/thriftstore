"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { HeroScene } from "./hero-scene";

const work = [
  {
    id: "01",
    name: "Veloura",
    label: "fashion commerce reboot",
    copy:
      "A high-voltage storefront with cinematic transitions, asymmetric product storytelling, and launch-driven momentum.",
  },
  {
    id: "02",
    name: "Noctis",
    label: "sportswear campaign system",
    copy:
      "Three-dimensional product reveals and scroll tension tuned to feel less like a page and more like a drop event.",
  },
  {
    id: "03",
    name: "Aether Hall",
    label: "culture-led luxury edit",
    copy:
      "Long-form editorial sections, elastic typography, and a visual identity that keeps moving without losing control.",
  },
];

const stats = [
  { value: "09", label: "motion layers per page" },
  { value: "60fps", label: "target interaction feel" },
  { value: "MAX", label: "template energy removed" },
];

gsap.registerPlugin(ScrollTrigger);

export function HomeExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const statsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-kicker]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-hero-title] span", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.1,
      });

      gsap.from("[data-hero-copy]", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.35,
      });

      gsap.from("[data-hero-actions]", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.5,
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        gsap.fromTo(
          card,
          { y: 120, opacity: 0, rotateX: 18 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          },
        );
      });

      statsRef.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        gsap.from(item, {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
          },
        });
      });

      if (heroRef.current) {
        gsap.to(heroRef.current.querySelector(".hero-scene-wrap"), {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="experience-root bg-[var(--bg)] text-[var(--text)]">
      <section
        ref={heroRef}
        className="relative isolate min-h-screen overflow-hidden border-b border-white/10"
      >
        <div className="noise-mask" />
        <div className="hero-spot hero-spot-one" />
        <div className="hero-spot hero-spot-two" />

        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 text-[11px] uppercase tracking-[0.35em] text-white/70 sm:px-8 lg:px-12">
          <span>Riot Pulse</span>
          <nav className="hidden gap-8 md:flex">
            <a href="#work">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40 hover:bg-white/8"
          >
            Build mine
          </a>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-7xl gap-12 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:pb-20">
          <div className="flex flex-col justify-end gap-8 pb-2">
            <p
              data-hero-kicker
              className="max-w-md text-[11px] uppercase tracking-[0.42em] text-white/58"
            >
              Loud enough to stop the scroll. Precise enough to feel expensive.
            </p>

            <h1
              data-hero-title
              className="hero-title max-w-5xl text-[3.8rem] font-black uppercase leading-[0.83] tracking-[-0.08em] text-balance sm:text-[5.6rem] lg:text-[8.8rem]"
            >
              <span>Make</span>
              <span>them</span>
              <span>stare.</span>
            </h1>

            <p
              data-hero-copy
              className="max-w-xl text-base leading-8 text-white/68 sm:text-lg"
            >
              This version leans into bold 3D form, sharper contrast, kinetic
              motion, and an aggressive launch-page attitude. It is built to
              feel custom, not safe.
            </p>

            <div
              data-hero-actions
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              <a
                href="#work"
                className="rounded-full bg-[#f14b2d] px-7 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-white shadow-[0_18px_60px_rgba(241,75,45,0.42)] transition hover:-translate-y-1"
              >
                Enter the reel
              </a>
              <a
                href="#stack"
                className="rounded-full border border-white/15 bg-white/6 px-7 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                View the stack
              </a>
            </div>
          </div>

          <div className="hero-scene-wrap relative flex min-h-[28rem] items-center justify-center lg:min-h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="hero-ring"
            />
            <div className="hero-panel">
              <HeroScene />
              <div className="hero-badge hero-badge-top">
                <span>3D / motion / scroll</span>
              </div>
              <div className="hero-badge hero-badge-bottom">
                <span>Built for &quot;what the hell is this?&quot; energy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kinetic-strip">
        <div className="kinetic-track">
          <span>Three.js</span>
          <span>Framer Motion</span>
          <span>GSAP ScrollTrigger</span>
          <span>React Three Fiber</span>
          <span>Shader-like materials</span>
          <span>Three.js</span>
          <span>Framer Motion</span>
          <span>GSAP ScrollTrigger</span>
          <span>React Three Fiber</span>
          <span>Shader-like materials</span>
        </div>
      </section>

      <section
        id="work"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.42em] text-white/46">
              Featured concepts
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl">
              Not premium.
              <span className="block text-[#ffd7a0]">Predatory premium.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/62">
            Heavy contrast, fast pacing, and layered depth that still holds up
            on mobile. The visual language is tuned to dominate, not just look
            polished.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {work.map((item, index) => (
            <div
              key={item.name}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="work-card"
            >
              <div className="work-card-glow" />
              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.38em] text-white/42">
                  {item.id}
                </p>
                <div className="mt-8 flex h-52 items-end rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.24),transparent_20%),radial-gradient(circle_at_72%_70%,rgba(97,139,255,0.32),transparent_28%),linear-gradient(135deg,rgba(241,75,45,0.58),rgba(11,15,26,0.2)_45%,rgba(4,6,12,1))] p-5">
                  <p className="max-w-[10rem] text-4xl font-black uppercase leading-none tracking-[-0.06em]">
                    {item.name}
                  </p>
                </div>
                <p className="mt-7 text-[11px] uppercase tracking-[0.36em] text-[#ffd7a0]">
                  {item.label}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/68">
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="stack"
        className="relative overflow-hidden border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28">
          <div>
            <p className="text-[11px] uppercase tracking-[0.42em] text-white/46">
              Tech stack
            </p>
            <h2 className="mt-5 max-w-lg text-4xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl">
              Actual motion stack.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/62">
              No placeholder polish. This build now uses real runtime libraries
              for interaction, 3D form, and scroll behavior.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {stats.map((item, index) => (
              <div
                key={item.label}
                ref={(element) => {
                  statsRef.current[index] = element;
                }}
                className="stack-stat"
              >
                <p className="text-5xl font-black uppercase tracking-[-0.08em] text-[#f14b2d]">
                  {item.value}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.34em] text-white/48">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="manifesto-panel">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.42em] text-white/46">
              Direction
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-7xl">
              Built to shut
              <span className="block text-[#ffd7a0]">the room up.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-sm leading-8 text-white/68 sm:text-base">
              If you want, next pass can go even harder with page-level sound
              design, video textures, custom GLSL shaders, or full-on pinned
              storytelling. But this version already moves out of the boring
              template zone and into actual statement territory.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20"
      >
        <div className="contact-shell">
          <div>
            <p className="text-[11px] uppercase tracking-[0.42em] text-white/46">
              Contact
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.88] tracking-[-0.07em] sm:text-6xl">
              Want this pushed even further?
            </h2>
          </div>
          <a
            href="mailto:hello@riotpulse.studio"
            className="rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:-translate-y-1"
          >
            hello@riotpulse.studio
          </a>
        </div>
      </section>
    </main>
  );
}
