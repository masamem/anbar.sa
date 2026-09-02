import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Reveal, SectionHead } from "../components/Reveal";
import {
  ArrowIcon,
  BagIcon,
  ChevronIcon,
  GiftIcon,
  ReturnIcon,
  ShieldIcon,
  Sparkle,
  Stars,
  TruckIcon,
} from "../components/Icons";
import { useStore } from "../context/StoreContext";
import {
  CATEGORIES,
  IMG,
  PRODUCTS,
  TESTIMONIALS,
  arNum,
  money,
  productById,
} from "../data/products";

/* ---------- helpers ---------- */

function useCountdown(hours: number) {
  const target = useMemo(() => Date.now() + hours * 3600 * 1000, [hours]);
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(t);
  }, [target]);
  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`spin-slower ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="59" className="fill-pine-950" />
        <circle cx="60" cy="60" r="46" fill="none" className="stroke-brass-500/40" strokeDasharray="3 4" />
        <text className="fill-brass-300 text-[10.5px] font-semibold tracking-[0.18em]">
          <textPath href="#badge-circle">دار عنبر • عود وعطور فاخرة • صنع في السعودية •</textPath>
        </text>
        <path d="M60 44l4.4 11.6L76 60l-11.6 4.4L60 76l-4.4-11.6L44 60l11.6-4.4L60 44z" className="fill-brass-400" />
      </svg>
    </div>
  );
}

function DriftSparkle({ top, left, delay }: { top: string; left: string; delay: number }) {
  return (
    <span
      className="pointer-events-none absolute"
      style={{ top, left, animation: `drift-up 8s ease-in-out ${delay}s infinite`, opacity: 0 }}
    >
      <Sparkle className="h-3.5 w-3.5 text-brass-500/70" />
    </span>
  );
}

/* ---------- sections ---------- */

function Hero() {
  const { navigate, addToCart } = useStore();
  const heroProduct = productById("royal-oud-elixir")!;

  return (
    <section className="relative overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[11rem] font-bold leading-none text-pine-900/6 sm:text-[17rem] lg:text-[22rem]"
      >
        عنبر
      </span>
      <DriftSparkle top="18%" left="8%" delay={0} />
      <DriftSparkle top="55%" left="4%" delay={2.6} />
      <DriftSparkle top="30%" left="55%" delay={4.4} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        {/* copy */}
        <div className="lg:col-span-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-brass-500" />
              <p className="text-xs font-semibold tracking-[0.24em] text-brass-600">
                دار سعودية · منذ {arNum(1998)}
              </p>
            </div>
          </Reveal>

          <h1 className="mt-5 font-display text-[2.9rem] font-bold leading-[1.25] text-pine-900 sm:text-6xl lg:text-[4.2rem]">
            <Reveal delay={80}>
              <span className="mask-line">
                <span className="mask-inner">عبقٌ يَسكُنُ</span>
              </span>
            </Reveal>
            <Reveal delay={200}>
              <span className="mask-line">
                <span className="mask-inner text-brass-600">الذاكرة…</span>
              </span>
            </Reveal>
          </h1>

          <Reveal delay={320}>
            <p className="mt-5 max-w-lg text-[15.5px] leading-8 text-inksoft">
              من قلب الرياض ننتقي العود والعنبر والمسك من مصادرها الأولى، ونُقطّر تركيباتنا على مهلٍ
              يليق بأهل الذوق — عطورٌ لا تمرّ مرور الكرام، بل تبقى أثراً يُسأل عنه.
            </p>
          </Reveal>

          <Reveal delay={430}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate({ page: "category", cat: "all" })}
                className="sheen group flex items-center gap-2.5 rounded-full bg-pine-900 px-8 py-4 text-[15px] font-bold text-brass-300 shadow-lg shadow-pine-900/25 transition-all hover:-translate-y-0.5 hover:bg-pine-800"
              >
                تسوّق المجموعة
                <ArrowIcon className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
              </button>
              <button
                onClick={() => navigate({ page: "product", id: heroProduct.id })}
                className="rounded-full border-2 border-pine-800 px-8 py-[14px] text-[15px] font-bold text-pine-900 transition-all hover:-translate-y-0.5 hover:bg-pine-800 hover:text-brass-200"
              >
                اكتشف دهن العود
              </button>
            </div>
          </Reveal>

          <Reveal delay={540}>
            <dl className="mt-11 flex max-w-md items-stretch justify-between divide-x divide-x-reverse divide-sand border-t border-sand pt-6">
              {[
                { v: `${arNum(26)}+`, l: "عاماً من الخبرة" },
                { v: `${arNum(48)} ألف`, l: "عميلٍ وفيّ" },
                { v: `${arNum(120)}`, l: "تركيبة حصرية" },
              ].map((s) => (
                <div key={s.l} className="flex-1 px-4 first:pr-0">
                  <dt className="font-display text-2xl font-bold text-pine-900 sm:text-3xl">{s.v}</dt>
                  <dd className="mt-1 text-[11.5px] font-medium text-inksoft">{s.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* image */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
          <Reveal delay={200} y={40}>
            <div className="relative">
              <div className="absolute -inset-3 arch-frame border-2 border-brass-500/50" aria-hidden />
              <div className="relative overflow-hidden arch-frame shadow-2xl shadow-pine-950/30">
                <img
                  src={IMG.hero}
                  alt="قارورة عود فاخرة من دار عنبر"
                  className="kenburns aspect-[4/5] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/50 via-transparent to-transparent" />
              </div>

              <RotatingBadge className="absolute -bottom-8 right-2 h-28 w-28 drop-shadow-xl sm:-right-8 sm:h-32 sm:w-32" />

              {/* floating product chip */}
              <div className="floaty absolute -left-2 top-10 w-52 overflow-hidden rounded-xl border border-brass-400/50 bg-pine-950/85 p-3.5 shadow-xl shadow-pine-950/40 backdrop-blur-sm sm:-left-10 sm:top-16">
                <p className="text-[10px] font-semibold tracking-widest text-brass-400">توقيع الدار</p>
                <p className="mt-1 text-sm font-bold text-paper">{heroProduct.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-brass-300">{money(heroProduct.price)}</span>
                  <button
                    onClick={() => addToCart(heroProduct.id, heroProduct.sizes[0], 1)}
                    className="flex items-center gap-1.5 rounded-full bg-brass-400 px-3 py-1.5 text-[11px] font-bold text-pine-950 transition-all hover:scale-105 hover:bg-brass-300"
                  >
                    <BagIcon className="w-3.5 h-3.5" /> أضف
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: <TruckIcon />, t: "توصيل مجاني", d: "للطلبات فوق ٢٠٠ ر.س" },
    { icon: <ShieldIcon />, t: "أصلي بضمان الدار", d: "مدى، Apple Pay وتقسيم" },
    { icon: <ReturnIcon />, t: "إرجاع بلا أسئلة", d: "خلال ١٤ يوماً من الاستلام" },
    { icon: <GiftIcon />, t: "تغليف هدية", d: "مخملي مع كرت بخط اليد" },
  ];
  return (
    <section className="border-y border-sand bg-parchment/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-x-reverse divide-sand px-4 sm:px-6 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 90} y={16} className="flex items-center gap-3.5 px-4 py-6 first:pr-0 lg:px-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-pine-900 text-brass-300 transition-transform duration-300 hover:rotate-6 hover:scale-110">
              {it.icon}
            </span>
            <span>
              <span className="block text-[13.5px] font-bold text-pine-900">{it.t}</span>
              <span className="mt-0.5 block text-[11.5px] text-inksoft">{it.d}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CategoryMosaic() {
  const { navigate } = useStore();
  const countOf = (id: string) => PRODUCTS.filter((p) => p.category === id).length;

  const Tile = ({ id, tall = false }: { id: string; tall?: boolean }) => {
    const c = CATEGORIES.find((x) => x.id === id)!;
    return (
      <button
        onClick={() => navigate({ page: "category", cat: c.id })}
        className={`group relative block w-full overflow-hidden arch-frame text-start ${tall ? "h-full min-h-[26rem]" : "aspect-[4/3.1]"}`}
      >
        <img
          src={c.image}
          alt={c.label}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/25 to-transparent transition-colors group-hover:from-pine-950/95" />
        <span className="absolute inset-0 arch-frame border-2 border-transparent transition-colors duration-300 group-hover:border-brass-400/70" />
        <span className="absolute top-4 right-1/2 translate-x-1/2 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-bold text-pine-800">
          {arNum(countOf(c.id))} {countOf(c.id) === 1 ? "منتج" : "منتجات"}
        </span>
        <span className="absolute inset-x-0 bottom-0 p-5">
          <span className="block text-[10px] font-semibold tracking-[0.25em] text-brass-400">{c.latin}</span>
          <span className="mt-1 block font-display text-3xl font-bold text-paper">{c.label}</span>
          <span className="mt-1.5 block max-h-0 overflow-hidden text-[12px] leading-5 text-pine-100/80 opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">
            {c.tagline}
          </span>
        </span>
      </button>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHead overline="أقسام الدار" title="تسوّق بحسب الذوق" desc="أربعة عوالم عطرية، لكل مجلسٍ وذوقٍ منها نصيب." />
        <Reveal delay={150}>
          <button
            onClick={() => navigate({ page: "category", cat: "all" })}
            className="group flex items-center gap-2 rounded-full border-2 border-pine-800 px-6 py-3 text-sm font-bold text-pine-900 transition-colors hover:bg-pine-800 hover:text-brass-200"
          >
            كل المنتجات
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </button>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2"><Tile id="oud" tall /></Reveal>
        <Reveal delay={100}><Tile id="perfume" /></Reveal>
        <Reveal delay={200}><Tile id="bakhoor" /></Reveal>
        <Reveal delay={150} className="sm:col-span-2 lg:col-span-2"><Tile id="gifts" /></Reveal>
      </div>
    </section>
  );
}

function FeaturedSlider() {
  const { navigate } = useStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const featured = PRODUCTS.filter((p) => p.featured);

  const scroll = (dirSign: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dirSign * -(el.clientWidth * 0.66), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-pine-950 py-20 text-paper lg:py-24">
      <div className="girih absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-brass-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            light
            overline="مختارات بعناية"
            title="مختارات الدار لهذا الموسم"
            desc="ما يقترحه العطّارون على ضيوفهم قبل أي شيء آخر."
          />
          <Reveal delay={150}>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => scroll(-1)}
                aria-label="السابق"
                className="grid h-12 w-12 place-items-center rounded-full border border-brass-500/50 text-brass-300 transition-all hover:bg-brass-400 hover:text-pine-950"
              >
                <ChevronIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="التالي"
                className="grid h-12 w-12 place-items-center rounded-full border border-brass-500/50 text-brass-300 transition-all hover:bg-brass-400 hover:text-pine-950"
              >
                <ChevronIcon className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6"
        >
          {featured.map((p, i) => (
            <div key={p.id} className="w-[78%] shrink-0 snap-start rounded-2xl bg-paper p-4 shadow-xl shadow-pine-950/40 sm:w-[300px] sm:p-5">
              <Reveal delay={i * 60} y={18} className="h-full">
                <ProductCard product={p} compact />
              </Reveal>
            </div>
          ))}
          <button
            onClick={() => navigate({ page: "category", cat: "all" })}
            className="group flex w-[70%] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brass-500/40 text-brass-300 transition-colors hover:border-brass-400 hover:bg-pine-900 sm:w-[240px]"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brass-400 text-pine-950 transition-transform group-hover:rotate-90 duration-500">
              <ArrowIcon className="w-6 h-6" />
            </span>
            <span className="font-display text-xl font-bold">عرض كل المنتجات</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function OfferBanner() {
  const { navigate } = useStore();
  const { d, h, m, sec } = useCountdown(2 * 24 + 11);
  const pad = (n: number) => arNum(String(n).padStart(2, "0"));

  const cells = [
    { v: pad(d), l: "يوم" },
    { v: pad(h), l: "ساعة" },
    { v: pad(m), l: "دقيقة" },
    { v: pad(sec), l: "ثانية" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="girih relative overflow-hidden rounded-[2rem] bg-pine-900 text-paper">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brass-500/15 blur-3xl" />
        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-3">
                <Sparkle className="h-3.5 w-3.5 text-brass-400" />
                <span className="text-xs font-semibold tracking-[0.24em] text-brass-300">عرض الموسم — لفترة محدودة</span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.3] sm:text-5xl">
                المجموعة الملكية
                <span className="block text-brass-300">بخصم {arNum(18)}٪</span>
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-7 text-pine-100/80">
                صندوق الهدايا الأشهر لدى الدار: ثلاث قوارير توقيع ومبخرة سفر نحاسية وتغليف مخملي —
                بسعرٍ لا يتكرر إلا في المواسم.
              </p>

              <div className="mt-7 flex items-center gap-3" dir="ltr">
                {cells.map((c) => (
                  <div key={c.l} className="w-[74px] rounded-xl border border-brass-500/30 bg-pine-950/70 py-3 text-center">
                    <div className="font-display text-3xl font-bold leading-none text-brass-300">{c.v}</div>
                    <div className="mt-1.5 text-[10.5px] font-medium text-pine-100/70">{c.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate({ page: "product", id: "royal-coffret" })}
                  className="sheen rounded-full bg-brass-400 px-8 py-4 text-[15px] font-bold text-pine-950 transition-all hover:-translate-y-0.5 hover:bg-brass-300"
                >
                  اقتنِ المجموعة — {money(640)}
                </button>
                <span className="text-sm text-pine-100/70 line-through">{money(780)}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180} y={40}>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 arch-frame border-2 border-brass-400/40" aria-hidden />
              <div className="relative overflow-hidden arch-frame">
                <img src={IMG.giftSet} alt="المجموعة الملكية" loading="lazy" className="kenburns aspect-[4/4.6] w-full object-cover" />
              </div>
              <span className="absolute -top-3 left-6 rotate-6 rounded-full bg-brass-400 px-4 py-2 text-xs font-bold text-pine-950 shadow-lg">
                وفّر {money(140)}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  const best = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-24">
      <SectionHead
        center
        overline="ثقةٌ تتجدد كل يوم"
        title="الأكثر مبيعاً في الدار"
        desc="المنتجات التي يعود إليها عملاؤنا مرة بعد مرة — الحكم لك."
      />
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {best.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="overflow-hidden border-t border-sand bg-parchment/60 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          center
          overline="قالوا عنّا"
          title="أثرٌ يبقى في الذاكرة"
          desc="آراء موثّقة من عملاء اشتروا من المتجر — بلا مونتاج."
        />
      </div>
      <Reveal delay={150}>
        <div className="marquee mt-12" dir="ltr">
          <div className="marquee-track gap-5 px-5">
            {row.map((t, i) => (
              <figure
                key={i}
                dir="rtl"
                className="w-[320px] shrink-0 rounded-xl border border-sand bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pine-950/10 sm:w-[360px]"
              >
                <div className="flex items-center justify-between">
                  <Stars value={t.rating} />
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-brass-400/60">
                    <path d="M4 13.5C4 8.8 7.2 5.6 11 5v2.6c-2 .6-3.6 2.2-3.9 4H10v7H4v-5.1zm10 0C14 8.8 17.2 5.6 21 5v2.6c-2 .6-3.6 2.2-3.9 4H20v7h-6v-5.1z" />
                  </svg>
                </div>
                <blockquote className="mt-4 text-[14px] leading-7 text-ink">«{t.text}»</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-sand pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-pine-900 font-display text-lg font-bold text-brass-300">
                    {t.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-pine-900">{t.name}</span>
                    <span className="block text-[11px] text-inksoft">
                      {t.city} · اشترى {t.bought}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryMosaic />
      <FeaturedSlider />
      <OfferBanner />
      <BestSellers />
      <Testimonials />
    </>
  );
}
