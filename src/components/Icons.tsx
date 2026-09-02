interface IconProps {
  className?: string;
}

const base = "inline-block shrink-0";

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`${base} ${className}`}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

export function BagIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M5.5 8h13l-1 12.2a1.6 1.6 0 01-1.6 1.3H8.1a1.6 1.6 0 01-1.6-1.3L5.5 8z" />
      <path d="M9 10V6.8a3 3 0 016 0V10" />
    </svg>
  );
}

export function HeartIcon({ className = "w-5 h-5", filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 20.5S4 15.6 4 10.2A4.4 4.4 0 018.4 5.8c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1A4.4 4.4 0 0120 10.2c0 5.4-8 10.3-8 10.3z" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`}>
      <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 16.9 6.3 20l1.2-6.3L2.8 9.3l6.4-.8L12 2.6z" />
    </svg>
  );
}

export function Stars({ value, className = "w-4 h-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-brass-500" aria-label={`التقييم ${value} من 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={`${className} ${i < Math.round(value) ? "text-brass-500" : "text-sand"}`} />
      ))}
    </span>
  );
}

export function TruckIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M2.5 6h12v10h-12zM14.5 9h4l2.5 3.4V16h-6.5" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function ShieldIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 2.8l7.5 2.8v6c0 5-3.2 8.4-7.5 9.6-4.3-1.2-7.5-4.6-7.5-9.6v-6L12 2.8z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </svg>
  );
}

export function ReturnIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4 9h11a5 5 0 010 10H8" />
      <path d="M8 5L4 9l4 4" />
    </svg>
  );
}

export function GiftIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <rect x="3.5" y="8.5" width="17" height="4" />
      <path d="M5.5 12.5v8h13v-8M12 8.5v12" />
      <path d="M12 8.5s-1-4.5-4-4.5a2.1 2.1 0 000 4.2M12 8.5s1-4.5 4-4.5a2.1 2.1 0 010 4.2" />
    </svg>
  );
}

export function FlameIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 2.8s1 2.6 3.2 5.4c2 2.5 3.3 4.8 3.3 7.3a6.5 6.5 0 01-13 0c0-2 .8-3.9 2.2-5.7.6 1 1.3 1.7 2.1 2.1-.3-2.7.5-6.2 2.2-9.1z" />
      <path d="M12 21.2a3.2 3.2 0 01-3.2-3.2c0-1.6 1.3-2.8 3.2-4.5 1.9 1.7 3.2 2.9 3.2 4.5a3.2 3.2 0 01-3.2 3.2z" />
    </svg>
  );
}

export function LeafIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4.5 19.5C4.5 10 11 4.5 20 4.5c0 9-6.5 15-15.5 15z" />
      <path d="M4.5 19.5C8 14 12 10.5 17 8" />
    </svg>
  );
}

export function ChevronIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function PlusIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`${base} ${className}`}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`${base} ${className}`}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

export function XIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`${base} ${className}`}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CheckIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M4.5 12.5l5 5L19.5 7" />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`${base} ${className}`}>
      <path d="M4 7h16M4 12h10M4 17h16" />
    </svg>
  );
}

export function PhoneIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M5.5 3.5h3.6l1.6 4.3-2.2 1.7a12.8 12.8 0 006 6l1.7-2.2 4.3 1.6v3.6a1.9 1.9 0 01-2.1 1.9C10.6 19.6 4.4 13.4 3.6 5.6a1.9 1.9 0 011.9-2.1z" />
    </svg>
  );
}

export function MailIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function PinIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 21.5s7-6.4 7-11.5a7 7 0 10-14 0c0 5.1 7 11.5 7 11.5z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </svg>
  );
}

export function Sparkle({ className = "w-3 h-3" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`}>
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className={`${base} ${className}`}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XSocialIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`}>
      <path d="M17.2 3h3l-6.7 7.7L21.5 21h-6.2l-4.8-6.3L5 21H2l7.2-8.2L2.5 3h6.3l4.4 5.8L17.2 3zm-1 16.2h1.7L7.9 4.7H6L16.2 19.2z" />
    </svg>
  );
}

export function WhatsappIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1012 3.5z" />
      <path d="M9 8.5c-.4 1.9 2.6 6 5.5 6.3.9.1 1.7-.5 1.8-1.2l-2-1.2-1 .9c-1.1-.5-2.2-1.6-2.6-2.7l.9-.9-1.2-2c-.7 0-1.3.3-1.4.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="9" fill={dark ? "#D4AF5E" : "#0B2E23"} />
        <path d="M20 6l3.8 10.2L34 20l-10.2 3.8L20 34l-3.8-10.2L6 20l10.2-3.8L20 6z" fill={dark ? "#0B2E23" : "#D4AF5E"} />
        <circle cx="20" cy="20" r="2.4" fill={dark ? "#D4AF5E" : "#0B2E23"} />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-2xl leading-8 ${dark ? "text-brass-300" : "text-pine-900"}`}>عنبر</span>
        <span className={`block text-[10px] tracking-[0.28em] font-medium ${dark ? "text-pine-100/70" : "text-inksoft"}`}>
          دار العطور والعود
        </span>
      </span>
    </span>
  );
}
