import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { ChevronIcon, SearchIcon, Stars, XIcon } from "../components/Icons";
import { useStore } from "../context/StoreContext";
import { CATEGORIES, PRODUCTS, arNum, categoryById } from "../data/products";

type SortKey = "featured" | "reviews" | "rating" | "price-asc" | "price-desc" | "newest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "مختارات الدار" },
  { key: "reviews", label: "الأكثر مبيعاً" },
  { key: "rating", label: "الأعلى تقييماً" },
  { key: "price-asc", label: "السعر: من الأقل" },
  { key: "price-desc", label: "السعر: من الأعلى" },
  { key: "newest", label: "وصل حديثاً" },
];

export default function CategoryPage({ cat }: { cat: string }) {
  const { navigate } = useStore();
  const [selectedCats, setSelectedCats] = useState<string[]>(cat === "all" ? [] : [cat]);
  const [priceMax, setPriceMax] = useState(800);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeCat = cat === "all" ? null : categoryById(cat);

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => (selectedCats.length ? selectedCats.includes(p.category) : true));
    list = list.filter((p) => p.price <= priceMax);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter((p) => p.stock > 10);
    switch (sort) {
      case "reviews":
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
    }
    return list;
  }, [selectedCats, priceMax, minRating, inStockOnly, sort]);

  const toggleCat = (id: string) =>
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const clearAll = () => {
    setSelectedCats(cat === "all" ? [] : [cat]);
    setPriceMax(800);
    setMinRating(0);
    setInStockOnly(false);
    setSort("featured");
  };

  const hasActiveFilters =
    selectedCats.length > 0 || priceMax < 800 || minRating > 0 || inStockOnly;

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="font-display text-xl font-bold text-pine-900">الأقسام</h3>
        <ul className="mt-3.5 space-y-2.5">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            const checked = selectedCats.includes(c.id);
            return (
              <li key={c.id}>
                <label className="group flex cursor-pointer items-center justify-between text-[13.5px]">
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded border-2 transition-all ${
                        checked ? "border-pine-800 bg-pine-900" : "border-sand bg-paper group-hover:border-pine-700"
                      }`}
                    >
                      {checked && (
                        <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-brass-300" fill="none" strokeWidth="3" strokeLinecap="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      )}
                    </span>
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleCat(c.id)} />
                    <span className={checked ? "font-bold text-pine-900" : "text-ink"}>{c.label}</span>
                  </span>
                  <span className="text-[11px] text-inksoft">{arNum(count)}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold text-pine-900">السعر الأقصى</h3>
        <input
          type="range"
          min={100}
          max={800}
          step={10}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="mt-4 w-full"
          aria-label="الحد الأقصى للسعر"
        />
        <div className="mt-2 flex items-center justify-between text-[12px] text-inksoft">
          <span>{arNum(100)} ر.س</span>
          <span className="rounded-full bg-pine-900 px-3 py-1 text-[11.5px] font-bold text-brass-300">
            حتى {arNum(priceMax)} ر.س
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold text-pine-900">التقييم</h3>
        <div className="mt-3.5 space-y-2.5">
          {[
            { v: 0, l: "الكل" },
            { v: 4.5, l: "٤٫٥ فأعلى" },
            { v: 4.8, l: "٤٫٨ فأعلى" },
          ].map((r) => (
            <label key={r.v} className="group flex cursor-pointer items-center gap-3 text-[13.5px]">
              <span
                className={`h-5 w-5 rounded-full border-2 transition-all ${
                  minRating === r.v ? "border-pine-800 bg-pine-900 shadow-inner" : "border-sand bg-paper group-hover:border-pine-700"
                }`}
              >
                {minRating === r.v && <span className="m-1 block h-2.5 w-2.5 rounded-full bg-brass-400" />}
              </span>
              <input type="radio" name="rating" className="sr-only" checked={minRating === r.v} onChange={() => setMinRating(r.v)} />
              {r.v > 0 ? (
                <span className="flex items-center gap-2">
                  <Stars value={r.v} className="w-3.5 h-3.5" /> {r.l}
                </span>
              ) : (
                <span className={minRating === 0 ? "font-bold text-pine-900" : "text-ink"}>{r.l}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold text-pine-900">التوفر</h3>
        <label className="group mt-3.5 flex cursor-pointer items-center gap-3 text-[13.5px]">
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${inStockOnly ? "bg-pine-800" : "bg-sand"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-all ${
                inStockOnly ? "right-0.5" : "right-[calc(100%-1.375rem)]"
              }`}
            />
          </span>
          <input type="checkbox" className="sr-only" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          <span className={inStockOnly ? "font-bold text-pine-900" : "text-ink"}>المتوفر بكميات مريحة فقط</span>
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-2 rounded-full border-2 border-brass-500 px-5 py-2.5 text-[12.5px] font-bold text-brass-700 transition-colors hover:bg-brass-400 hover:text-pine-950"
        >
          <XIcon className="w-3.5 h-3.5" /> مسح كل الفلاتر
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-[12.5px] text-inksoft">
        <button onClick={() => navigate({ page: "home" })} className="transition-colors hover:text-brass-600">
          الرئيسية
        </button>
        <ChevronIcon className="w-3 h-3 rotate-180 text-sand" />
        <span className="font-semibold text-pine-900">{activeCat ? activeCat.label : "كل المنتجات"}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <h1 className="font-display text-4xl font-bold leading-[1.3] text-pine-900 sm:text-5xl">
            {activeCat ? activeCat.label : "كل المنتجات"}
          </h1>
          <p className="mt-2 text-[13.5px] text-inksoft">
            {activeCat ? activeCat.tagline : "تسعة منتجات اختيرت واحدةً واحدة — لا أكثر، كي لا يحتار الذوق."} ·{" "}
            <b className="text-brass-600">{arNum(results.length)}</b> نتيجة
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilters((v) => !v)}
              className="flex items-center gap-2 rounded-full border-2 border-sand px-5 py-2.5 text-[13px] font-bold text-pine-900 lg:hidden"
            >
              الفلاتر
              {hasActiveFilters && <span className="h-2 w-2 rounded-full bg-brass-500" />}
            </button>
            <label className="flex items-center gap-2.5 rounded-full border-2 border-sand bg-paper py-1 pl-4 pr-1.5">
              <span className="text-[12px] font-medium text-inksoft">الترتيب:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full bg-pine-900 px-3.5 py-2 text-[12.5px] font-bold text-brass-300 outline-none"
                aria-label="ترتيب المنتجات"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>
      </div>

      <div className={`grid gap-10 pt-8 lg:grid-cols-[260px_1fr] ${mobileFilters ? "block" : ""}`}>
        <aside className={`${mobileFilters ? "mb-8 rounded-xl border border-sand bg-parchment/70 p-5 lg:border-0 lg:bg-transparent lg:p-0" : "hidden"} lg:block lg:sticky lg:top-28 lg:self-start lg:rounded-xl lg:border lg:border-sand lg:bg-parchment/70 lg:p-6`}>
          {FilterPanel}
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-sand py-24 text-center">
              <span className="grid h-18 w-18 place-items-center rounded-full bg-parchment text-brass-600">
                <SearchIcon className="h-8 w-8" />
              </span>
              <p className="font-display text-2xl font-bold text-pine-900">لا نتائج تطابق بحثك</p>
              <p className="max-w-xs text-[13.5px] leading-6 text-inksoft">
                جرّب توسيع نطاق السعر أو مسح بعض الفلاتر — العبق المناسب قريب.
              </p>
              <button
                onClick={clearAll}
                className="mt-2 rounded-full bg-pine-900 px-7 py-3 text-sm font-bold text-brass-300 transition-colors hover:bg-pine-800"
              >
                مسح الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 xl:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
