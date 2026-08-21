import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Suspense, lazy, useEffect, useRef } from 'react';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';

// The 3D scene is lazy-loaded so three.js never blocks the first paint.
const HeroScene = lazy(() => import('../three/HeroScene'));

interface HeroSectionProps {
  /** Fired once the WebGL scene has rendered its first frame. */
  onSceneReady?: () => void;
  /** When false, the hero copy waits for the preloader reveal to animate in. */
  revealed?: boolean;
}

/**
 * Cinematic hero: a real-time three.js environment (shader energy core,
 * orbital rings, layered particles, atmosphere) driven by mouse and scroll,
 * with parallax UI on top. Content stays hidden until the boot sequence
 * starts its reveal, so the loader appears to transform into the hero.
 */
export default function HeroSection({ onSceneReady, revealed = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Feed scroll progress into the 3D camera rig without re-rendering React.
  useEffect(
    () =>
      scrollYProgress.on('change', (value) => {
        scrollProgressRef.current = value;
      }),
    [scrollYProgress],
  );

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Real-time 3D environment. The CSS orb doubles as loading fallback. */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div
              className="hero-orb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
          }
        >
          <HeroScene scrollRef={scrollProgressRef} onReady={onSceneReady} />
        </Suspense>
      </div>

      {/* Cinematic vignette keeps the typography readable over the scene. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(12, 12, 12, 0.72) 100%)',
        }}
        aria-hidden="true"
      />

      {revealed && (
        <>
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 text-center sm:px-8 md:pt-32"
          >
            <FadeIn
              as="p"
              delay={0.1}
              y={20}
              className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#D7E2EA]/60 sm:text-xs md:text-sm"
            >
              Welcome to the portfolio of
            </FadeIn>

            <div className="overflow-hidden">
              <FadeIn
                as="h1"
                delay={0.2}
                y={60}
                duration={0.9}
                className="hero-heading whitespace-nowrap font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.2rem, 13.5vw, 12rem)' }}
              >
                Saif Selme
              </FadeIn>
            </div>

            <FadeIn
              as="p"
              delay={0.4}
              y={30}
              className="accent-text mt-4 font-semibold uppercase tracking-wide"
              style={{ fontSize: 'clamp(1rem, 2.6vw, 1.8rem)' }}
            >
              80% was only the beginning.
            </FadeIn>

            <FadeIn
              as="p"
              delay={0.55}
              y={20}
              className="mt-6 max-w-md font-light leading-relaxed text-[#D7E2EA]/70 sm:max-w-xl"
              style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)' }}
            >
              Creative web developer and future data analyst from Egypt — building
              interactive experiences with depth, motion, and a point to prove.
            </FadeIn>

            <FadeIn delay={0.7} y={20} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Magnet padding={60} strength={6}>
                <ContactButton />
              </Magnet>
              <Magnet padding={60} strength={6}>
                <a
                  href="#projects"
                  className="inline-block rounded-full border-2 border-[#D7E2EA]/60 px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
                >
                  Explore My Work
                </a>
              </Magnet>
            </FadeIn>
          </motion.div>

          <div className="relative z-10 flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
            <FadeIn
              as="p"
              delay={0.85}
              y={16}
              className="max-w-[180px] text-left text-[0.6rem] font-light uppercase leading-snug tracking-[0.25em] text-[#D7E2EA]/50 sm:max-w-none sm:text-xs"
            >
              BIS &amp; Data Analytics — Ain Shams University
            </FadeIn>

            <FadeIn delay={0.95} y={16}>
              <a
                href="#about"
                aria-label="Scroll to the About section"
                className="flex flex-col items-center gap-2 text-[#D7E2EA]/60 transition-colors duration-200 hover:text-[#D7E2EA]"
              >
                <span className="hidden text-[0.6rem] font-light uppercase tracking-[0.25em] sm:block sm:text-xs">
                  We&apos;re just getting started
                </span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDown size={18} />
                </motion.span>
              </a>
            </FadeIn>
          </div>
        </>
      )}
    </section>
  );
}
