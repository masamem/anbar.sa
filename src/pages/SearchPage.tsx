import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Reveal, SectionHead } from "../components/Reveal";
import { HeartIcon, SearchIcon, Sparkle } from "../components/Icons";
import { useStore } from "../context/StoreContext";
import { CATEGORIES, PRODUCTS, arNum, productById } from "../data/products";

const POPULAR = ["عود", "مسك", "بخور", "هدية", "ورد"];

export default function SearchPage({ q }: { q: string }) {
  const { navigate, wishlist } = useStore();
  const [query, setQuery] = useState(q);
  const [catFilter, setCatFilter] = useState<string>("all");

  const results = useMemo(() => {
    const t = query.trim();
    let list = PRODUCTS;
    if (t) {
      list = list.filter(
        (p) =>
          p.name.includes(t) ||
          p.latin.toLowerCase().includes(t.toLowerCase()) ||
          p.short.includes(t) ||
          p.description.includes(t) ||
          CATEGORIES.find((c) => c.id === p.category)?.label.includes(t)
      );
    }
    if (catFilter !== "all") list = list.filter((p) => p.category === catFilter);
    return list;
  }, [query, catFilter]);

  const wishProducts = wishlist.map(productById).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkle className="h-3 w-3 text-brass-500" />
            <p className="text-xs font-semibold tracking-[0.24em] text-brass-600">ابحث في الدار</p>
            <Sparkle className="h-3 w-3 text-brass-500" />
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold text-pine-900 sm:text-5xl">عن أي عبقٍ تبحث؟</h1>

          <div className="relative mt-7">
            <div className="flex items-center gap-3 rounded-full border-2 border-sand bg-paper px-6 py-4 shadow-lg shadow-pine-950/6 transition-colors focus-within:border-brass-500">
              <SearchIcon className="w-5 h-5 text-brass-600" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="اكتب: عود، مسك، عنبر الليل…"
                autoFocus
                aria-label="بحث في المنتجات"
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-inksoft/60"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-[12px] font-bold text-brass-700 hover:text-pine-900">
                  مسح
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-inksoft">رائج الآن:</span>
            {POPULAR.map((p) => (
              <button
                key={p}
                onClick={() => setQuery(p)}
                className={`rounded-full border px-4 py-1.5 text-[12px] font-bold transition-all hover:-translate-y-0.5 ${
                  query === p ? "border-pine-800 bg-pine-900 text-brass-300" : "border-sand bg-paper text-ink hover:border-pine-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* wishlist */}
      {wishProducts.length > 0 && !query && (
        <div className="mt-14">
          <SectionHead overline="محفوظاتك" title="قائمة المفضلة" desc={`${arNum(wishProducts.length)} منتجات تنتظر قرار الذوق.`} />
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {wishProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* results */}
      <div className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            overline={query ? `نتائج «${query}»` : "الخزانة كاملة"}
            title={query ? `${arNum(results.length)} نتيجة لبحثك` : "كل ما في الدار"}
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCatFilter("all")}
              className={`rounded-full border-2 px-4 py-2 text-[12.5px] font-bold transition-all ${
                catFilter === "all" ? "border-pine-800 bg-pine-900 text-brass-300" : "border-sand text-ink hover:border-pine-700"
              }`}
            >
              الكل
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCatFilter(catFilter === c.id ? "all" : c.id)}
                className={`rounded-full border-2 px-4 py-2 text-[12.5px] font-bold transition-all ${
                  catFilter === c.id ? "border-pine-800 bg-pine-900 text-brass-300" : "border-sand text-ink hover:border-pine-700"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-sand py-24 text-center">
            <span className="grid h-18 w-18 place-items-center rounded-full bg-parchment text-brass-600">
              <HeartIcon className="h-8 w-8" />
            </span>
            <p className="font-display text-2xl font-bold text-pine-900">لم نجد ما يشبه «{query}»</p>
            <p className="max-w-sm text-[13.5px] leading-6 text-inksoft">
              جرّب كلمة أبسط مثل «عود» أو «مسك»، أو تصفّح الأقسام من الأعلى.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center">
        <button
          onClick={() => navigate({ page: "category", cat: "all" })}
          className="rounded-full border-2 border-pine-800 px-8 py-3.5 text-sm font-bold text-pine-900 transition-colors hover:bg-pine-800 hover:text-brass-200"
        >
          أو تصفّح كل المنتجات بالترتيب
        </button>
      </div>
    </div>
  );
}
