# saif-portfolio

Personal developer portfolio built with React, TypeScript, React Three Fiber, Framer Motion, and Tailwind CSS.

Live: [saif-portofolioupdatev3.vercel.app](https://saif-portofolioupdatev3.vercel.app)

## Architecture Notes

- **Deferred WebGL loading:** `src/three/HeroScene.tsx` is code-split with `React.lazy` and wrapped in `Suspense` so Three.js does not block initial paint.
- **Custom GLSL shader hero:** Renders a 3D orb displaced with Ashima 3D simplex noise, orbital geometry, and particle layers inside React Three Fiber, using `@react-three/drei`'s `AdaptiveDpr` to scale pixel ratio under load.
- **Zero-rerender scroll coupling:** Scroll progress from Framer Motion's `useScroll` is written directly into a mutable `scrollProgressRef` consumed inside Three.js `useFrame`, keeping React out of the 60fps animation loop.
- **Motion accessibility:** `usePrefersReducedMotion` and `useIsMobile` hooks scale down GPU work and disable heavy motion on mobile devices or when reduced motion is enabled.

## Stack

- React 18, TypeScript 5, Vite 5
- Three.js, `@react-three/fiber`, `@react-three/drei`
- Framer Motion, Tailwind CSS, Lucide Icons

## Project Structure

```text
src/
├── three/       # WebGL scene and GLSL simplex-noise shader orb
├── sections/    # Hero, About, Journey, Services, Skills, Projects, Marquee, Contact
├── components/  # Motion primitives (FadeIn, Magnet, TiltCard, Preloader, Navbar)
├── data/        # Structured content modules (projects, skills, services, journey, socials)
└── hooks/       # Media query, mobile detection, and reduced-motion hooks
```

## Local Development

```bash
npm install
npm run dev
```

Verification:

```bash
npm run typecheck
npm run build
```

## License

[MIT](./LICENSE)
