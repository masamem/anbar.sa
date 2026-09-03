import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Sparkle } from "./Icons";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className = "", delay = 0, y = 26 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    transitionDelay: `${delay}ms`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

interface SectionHeadProps {
  overline: string;
  title: string;
  desc?: string;
  light?: boolean;
  center?: boolean;
}

export function SectionHead({ overline, title, desc, light = false, center = false }: SectionHeadProps) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <Sparkle className={`w-3 h-3 ${light ? "text-brass-400" : "text-brass-500"}`} />
        <span className={`text-xs font-semibold tracking-[0.22em] ${light ? "text-brass-300" : "text-brass-600"}`}>
          {overline}
        </span>
        {!center && <span className={`h-px w-14 ${light ? "bg-brass-400/50" : "bg-brass-500/50"}`} />}
      </div>
      <h2
        className={`font-display font-bold mt-3 text-4xl md:text-5xl leading-[1.35] ${
          light ? "text-paper" : "text-pine-900"
        }`}
      >
        <span className="mask-line">
          <span className="mask-inner">{title}</span>
        </span>
      </h2>
      {desc && (
        <p className={`mt-3 max-w-xl text-[15px] leading-7 ${center ? "mx-auto" : ""} ${light ? "text-pine-100/75" : "text-inksoft"}`}>
          {desc}
        </p>
      )}
    </Reveal>
  );
}
