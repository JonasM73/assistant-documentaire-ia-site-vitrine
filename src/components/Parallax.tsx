import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Image qui glisse doucement pendant le défilement (transform uniquement,
 * calculé par framer-motion hors du rendu React). Avec `prefers-reduced-motion`,
 * l'image reste fixe.
 */
export function ParallaxImage({
  src,
  alt = "",
  width,
  height,
  className = "",
  amount = 40,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  /** Amplitude du déplacement vertical, en pixels */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y, scale: 1.08 }}
        className="h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}

/**
 * Bande pleine largeur : image en fond qui défile plus lentement que la page,
 * voile sombre, contenu par-dessus.
 */
export function ParallaxBand({
  src,
  width,
  height,
  children,
  className = "",
  position = "center",
}: {
  src: string;
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
  position?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt=""
        aria-hidden
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={reduce ? { objectPosition: position } : { y, scale: 1.25, objectPosition: position }}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover will-change-transform"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-paper via-paper/70 to-paper/20" />
      {/* Sur petit écran, le texte passe devant l'image : voile plus franc */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-paper/55 lg:hidden" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-paper to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-paper to-transparent" />
      {children}
    </section>
  );
}
