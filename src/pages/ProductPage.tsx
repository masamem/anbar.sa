import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Reveal, SectionHead } from "../components/Reveal";
import {
  ArrowIcon,
  BagIcon,
  CheckIcon,
  ChevronIcon,
  FlameIcon,
  HeartIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShieldIcon,
  Stars,
  TruckIcon,
} from "../components/Icons";
import { useStore } from "../context/StoreContext";
import { PRODUCTS, arNum, categoryById, money, productById } from "../data/products";

const VIEWS = [
  { label: "المنتج", pos: "50% 38%", scale: 1 },
  { label: "تفاصيل", pos: "50% 18%", scale: 1.75 },
  { label: "القاعدة", pos: "50% 82%", scale: 1.9 },
];

function Breadcrumbs({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav aria-label="مسار التنقل" className="flex flex-wrap items-center gap-2 text-[12.5px] text-inksoft">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronIcon className="w-3 h-3 rotate-180 text-sand" />}
          {it.onClick ? (
            <button onClick={it.onClick} className="transition-colors hover:text-brass-600">
              {it.label}
            </button>
          ) : (
            <span className="font-semibold text-pine-900">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function Accordion({ title, icon, children, defaultOpen = false }: { title: string; icon?: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-sand">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 py-4 text-start"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3 text-[15px] font-bold text-pine-900">
          {icon && <span className="text-brass-600">{icon}</span>}
          {title}
        </span>
        <ChevronIcon className={`w-4 h-4 text-inksoft transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`} />
      </button>
      <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden text-[13.5px] leading-7 text-inksoft">{children}</div>
      </div>
    </div>
  );
}

export default function ProductPage({ id }: { id: string }) {
  const { navigate, addToCart, wishlist, toggleWish } = useStore();
  const product = productById(id);

  const [view, setView] = useState(0);
  const [size, setSize] = useState(0);
  const [qty, setQtyState] = useState(1);
  const [added, setAdded] = useState(false);

  const related = useMemo(
    () =>
      PRODUCTS.filter((p) => p.id !== id)
        .sort((a, b) => {
          const sameA = a.category === product?.category ? 1 : 0;
          const sameB = b.category === product?.category ? 1 : 0;
          return sameB - sameA || b.reviews - a.reviews;
        })
        .slice(0, 4),
    [id, product?.category]
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <p className="font-display text-4xl font-bold text-pine-900">المنتج غير موجود</p>
        <button
          onClick={() => navigate({ page: "category", cat: "all" })}
          className="mt-6 rounded-full bg-pine-900 px-7 py-3 text-sm font-bold text-brass-300"
        >
          العودة إلى المتجر
        </button>
      </div>
    );
  }

  const cat = categoryById(product.category)!;
  const wished = wishlist.includes(product.id);
  const discountPct = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const v = VIEWS[view];

  const handleAdd = () => {
    addToCart(product.id, product.sizes[size], qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumbs
        items={[
          { label: "الرئيسية", onClick: () => navigate({ page: "home" }) },
          { label: cat.label, onClick: () => navigate({ page: "category", cat: cat.id }) },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* gallery */}
        <Reveal y={20}>
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="absolute -inset-3 arch-frame border-2 border-brass-500/40" aria-hidden />
            <div className="relative overflow-hidden arch-frame bg-parchment shadow-2xl shadow-pine-950/20">
              <img
                key={view}
                src={product.image}
                alt={product.name}
                className="backdrop-in aspect-[4/4.7] w-full object-cover transition-all duration-700"
                style={{ objectPosition: v.pos, transform: `scale(${v.scale})` }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/35 via-transparent to-transparent" />
              {product.badge && (
                <span className="absolute top-5 right-1/2 translate-x-1/2 rounded-full bg-pine-900 px-4 py-1.5 text-xs font-bold text-brass-300 shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="mt-5 flex justify-center gap-3">
              {VIEWS.map((vv, i) => (
                <button
                  key={vv.label}
                  onClick={() => setView(i)}
                  className={`group w-20 overflow-hidden rounded-lg border-2 transition-all ${
                    i === view ? "border-brass-500 shadow-md" : "border-sand opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`عرض ${vv.label}`}
                >
                  <img src={product.image} alt="" className="aspect-square w-full object-cover" style={{ objectPosition: vv.pos }} />
                  <span className={`block py-1 text-center text-[10px] font-bold ${i === view ? "bg-brass-400 text-pine-950" : "bg-parchment text-inksoft"}`}>
                    {vv.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* info */}
        <Reveal delay={120} y={20}>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate({ page: "category", cat: cat.id })}
                className="rounded-full bg-pine-100 px-4 py-1.5 text-[12px] font-bold text-pine-800 transition-colors hover:bg-pine-800 hover:text-brass-200"
              >
                {cat.label}
              </button>
              <span className="flex items-center gap-1.5 text-[12.5px] text-inksoft">
                <span className={`h-2 w-2 rounded-full ${product.stock <= 10 ? "bg-brass-500 pulse-dot" : "bg-pine-600"}`} />
                {product.stock <= 10 ? `باقي ${arNum(product.stock)} قطع فقط` : "متوفر في المستودع"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.3] text-pine-900 sm:text-5xl">{product.name}</h1>
            <p className="mt-1 text-sm italic tracking-wide text-inksoft">{product.latin}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Stars value={product.rating} className="w-4.5 h-4.5" />
              <span className="text-sm font-bold text-pine-900">{arNum(product.rating)}</span>
              <span className="text-[12.5px] text-inksoft">({arNum(product.reviews)} تقييم)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-pine-900">{money(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-base text-inksoft line-through">{money(product.oldPrice)}</span>
                  <span className="rounded-md bg-brass-400/30 px-2 py-1 text-xs font-bold text-brass-700">وفّر {arNum(discountPct)}٪</span>
                </>
              )}
            </div>
            <p className="mt-1 text-[11.5px] text-inksoft">السعر شامل الضريبة · {product.sizes.length > 1 ? "يُحسب حسب الحجم المختار" : "قطعة واحدة"}</p>

            <p className="mt-6 border-r-2 border-brass-500 pr-4 text-[14.5px] leading-8 text-ink">{product.short}</p>

            {/* sizes */}
            {product.sizes.length > 1 && (
              <div className="mt-7">
                <p className="text-[13px] font-bold text-pine-900">
                  الحجم: <span className="font-medium text-brass-600">{product.sizes[size]}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSize(i)}
                      className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all ${
                        i === size
                          ? "border-pine-800 bg-pine-900 text-brass-300 shadow-md"
                          : "border-sand bg-paper text-ink hover:border-pine-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* qty + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <div className="flex items-center rounded-full border-2 border-sand bg-paper">
                <button onClick={() => setQtyState((q) => Math.min(9, q + 1))} className="p-3.5 text-pine-800 transition-colors hover:text-brass-600" aria-label="زيادة الكمية">
                  <PlusIcon />
                </button>
                <span className="w-9 text-center text-lg font-bold text-pine-900">{arNum(qty)}</span>
                <button onClick={() => setQtyState((q) => Math.max(1, q - 1))} className="p-3.5 text-pine-800 transition-colors hover:text-brass-600" aria-label="إنقاص الكمية">
                  <MinusIcon />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`sheen flex flex-1 items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold shadow-lg transition-all sm:flex-none sm:min-w-56 ${
                  added
                    ? "bg-pine-700 text-brass-200 shadow-pine-700/30"
                    : "bg-brass-400 text-pine-950 shadow-brass-500/30 hover:-translate-y-0.5 hover:bg-brass-300"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="w-5 h-5" /> أُضيفت إلى السلة
                  </>
                ) : (
                  <>
                    <BagIcon className="w-5 h-5" /> أضف إلى السلة — {money(product.price * qty)}
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWish(product.id)}
                aria-label="حفظ في المفضلة"
                className={`grid h-[54px] w-[54px] place-items-center rounded-full border-2 transition-all hover:scale-105 ${
                  wished ? "border-brass-500 bg-brass-400 text-pine-950" : "border-sand text-inksoft hover:border-brass-500 hover:text-brass-600"
                }`}
              >
                <HeartIcon filled={wished} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-inksoft">
              <span className="flex items-center gap-2"><TruckIcon className="w-4 h-4 text-pine-700" /> شحن خلال ٢٤ ساعة</span>
              <span className="flex items-center gap-2"><ShieldIcon className="w-4 h-4 text-pine-700" /> أصلي بضمان الدار</span>
              <span className="flex items-center gap-2"><LeafIcon className="w-4 h-4 text-pine-700" /> مكونات طبيعية ١٠٠٪</span>
            </div>

            {/* accordions */}
            <div className="mt-8 border-t border-sand">
              <Accordion title="الوصف الكامل" icon={<FlameIcon className="w-5 h-5" />} defaultOpen>
                <p>{product.description}</p>
              </Accordion>
              {product.notes && (
                <Accordion title="هرم العطر" icon={<LeafIcon className="w-5 h-5" />}>
                  <div className="space-y-4">
                    {[
                      { l: "المقدمة", notes: product.notes.top, w: "w-2/5", d: "أول ١٥ دقيقة" },
                      { l: "القلب", notes: product.notes.heart, w: "w-3/5", d: "حتى ٣ ساعات" },
                      { l: "القاعدة", notes: product.notes.base, w: "w-4/5", d: "الأثر الباقي" },
                    ].map((tier) => (
                      <div key={tier.l}>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[13px] font-bold text-pine-900">{tier.l}</span>
                          <span className="text-[11px] text-inksoft">{tier.d}</span>
                        </div>
                        <div className={`mt-1.5 ${tier.w} rounded-full bg-gradient-to-l from-brass-500/70 to-pine-800/80 px-3 py-2`}>
                          <span className="text-[12px] font-semibold text-paper">{tier.notes.join(" · ")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Accordion>
              )}
              <Accordion title="الشحن والإرجاع" icon={<TruckIcon className="w-5 h-5" />}>
                <ul className="list-inside space-y-1.5">
                  <li>• الشحن خلال ٢٤ ساعة من التأكيد، والتوصيل خلال ١–٣ أيام عمل لجميع مناطق المملكة.</li>
                  <li>• توصيل مجاني للطلبات فوق {money(200)}، وما دونها برسم {money(25)}.</li>
                  <li>• إرجاع أو استبدال خلال ١٤ يوماً ما دام المنتج بحالته الأصلية — بلا أسئلة.</li>
                </ul>
              </Accordion>
            </div>
          </div>
        </Reveal>
      </div>

      {/* related */}
      <div className="mt-20">
        <SectionHead overline="أكمل التجربة" title="قد يعجبك أيضاً" />
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => navigate({ page: "category", cat: "all" })}
          className="group inline-flex items-center gap-2.5 rounded-full border-2 border-pine-800 px-8 py-3.5 text-sm font-bold text-pine-900 transition-colors hover:bg-pine-800 hover:text-brass-200"
        >
          تصفّح كل المنتجات
          <ArrowIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
    </div>
  );
}
