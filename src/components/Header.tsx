import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES, PRODUCTS, arNum, money } from "../data/products";
import { BagIcon, HeartIcon, Logo, MenuIcon, SearchIcon, XIcon } from "./Icons";

const TICKER = [
  "توصيل مجاني للطلبات فوق ٢٠٠ ر.س",
  "خصم ١٠٪ عند استخدام كود ANBAR10",
  "تغليف هدية فاخر مع كل طلب",
  "منتجات أصلية ١٠٠٪ بضمان الدار",
  "شحن خلال ٢٤ ساعة لجميع مناطق المملكة",
];

function SearchBox({ id, autoFocus = false, onNavigate }: { id: string; autoFocus?: boolean; onNavigate?: () => void }) {
  const { navigate } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const t = q.trim();
    if (!t) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.includes(t) ||
        p.latin.toLowerCase().includes(t.toLowerCase()) ||
        p.short.includes(t) ||
        CATEGORIES.find((c) => c.id === p.category)?.label.includes(t)
    ).slice(0, 5);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const submit = () => {
    if (!q.trim()) return;
    navigate({ page: "search", q: q.trim() });
    setOpen(false);
    setQ("");
    onNavigate?.();
  };

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-full border border-sand bg-paper/90 px-4 py-2 transition-colors focus-within:border-brass-500">
        <SearchIcon className="w-4 h-4 text-inksoft" />
        <input
          id={id}
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="ابحث عن عود، مسك، هدية…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-inksoft/60"
          aria-label="بحث في المتجر"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="مسح البحث" className="text-inksoft hover:text-pine-800">
            <XIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute top-full mt-2 w-full overflow-hidden rounded-lg border border-sand bg-paper shadow-xl shadow-pine-950/10 backdrop-in">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-inksoft">لا نتائج مطابقة لـ «{q}»</p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      navigate({ page: "product", id: p.id });
                      setOpen(false);
                      setQ("");
                      onNavigate?.();
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-start transition-colors hover:bg-parchment"
                  >
                    <img src={p.image} alt={p.name} className="h-11 w-9 rounded-t-full object-cover" />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-pine-900">{p.name}</span>
                      <span className="block text-[11px] text-inksoft">{CATEGORIES.find((c) => c.id === p.category)?.label}</span>
                    </span>
                    <span className="text-sm font-bold text-brass-600">{money(p.price)}</span>
                  </button>
                </li>
              ))}
              <li className="border-t border-sand">
                <button
                  onClick={submit}
                  className="w-full px-4 py-2.5 text-start text-xs font-semibold text-pine-700 transition-colors hover:bg-parchment"
                >
                  عرض كل نتائج «{q}» ←
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { route, navigate, cartCount, wishlist, setDrawerOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [route]);

  const isActive = (check: () => boolean) => check();

  const links: { label: string; active: boolean; go: () => void }[] = [
    { label: "الرئيسية", active: isActive(() => route.page === "home"), go: () => navigate({ page: "home" }) },
    { label: "كل المنتجات", active: isActive(() => route.page === "category" && route.cat === "all"), go: () => navigate({ page: "category", cat: "all" }) },
    ...CATEGORIES.map((c) => ({
      label: c.label,
      active: isActive(() => route.page === "category" && route.cat === c.id),
      go: () => navigate({ page: "category", cat: c.id }),
    })),
  ];

  return (
    <>
      {/* announcement ticker */}
      <div className="marquee bg-pine-950 py-2 text-brass-300" dir="ltr">
        <div className="marquee-track fast items-center gap-10 px-6 text-[12px] font-medium tracking-wide">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span>{t}</span>
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-brass-500">
                <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b border-sand/80 bg-paper/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-lg shadow-pine-950/8" : ""
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all sm:px-6 ${scrolled ? "py-2.5" : "py-4"}`}>
          <button
            className="rounded-md p-1.5 text-pine-900 hover:bg-parchment lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="القائمة"
          >
            {mobileOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon />}
          </button>

          <button onClick={() => navigate({ page: "home" })} className="transition-transform hover:scale-[1.02]" aria-label="الصفحة الرئيسية">
            <Logo />
          </button>

          <nav className="mx-auto hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={l.go}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  l.active ? "text-brass-600" : "text-ink hover:text-pine-800"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-center rounded-full bg-brass-500 transition-transform duration-300 ${
                    l.active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="ms-auto hidden w-64 lg:block xl:w-72">
            <SearchBox id="desktop-search" />
          </div>

          <div className="ms-auto flex items-center gap-1 lg:ms-0">
            <button
              onClick={() => navigate({ page: "search", q: "" })}
              className="relative rounded-full p-2.5 text-pine-900 transition-colors hover:bg-parchment lg:hidden"
              aria-label="البحث"
            >
              <SearchIcon />
            </button>
            <button
              onClick={() => navigate({ page: "search", q: "" })}
              className="relative rounded-full p-2.5 text-pine-900 transition-colors hover:bg-parchment"
              aria-label="المفضلة"
              title="المفضلة"
            >
              <HeartIcon filled={wishlist.length > 0} className={`w-5 h-5 ${wishlist.length ? "text-brass-500" : ""}`} />
              {wishlist.length > 0 && (
                <span
                  key={wishlist.length}
                  className="animate-pop absolute -top-0.5 -left-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brass-500 px-1 text-[10px] font-bold text-pine-950"
                >
                  {arNum(wishlist.length)}
                </span>
              )}
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative rounded-full p-2.5 text-pine-900 transition-colors hover:bg-parchment"
              aria-label="سلة التسوق"
            >
              <BagIcon />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="animate-pop absolute -top-0.5 -left-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-pine-800 px-1 text-[10px] font-bold text-brass-300"
                >
                  {arNum(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* mobile panel */}
        <div
          className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
            mobileOpen ? "grid-rows-[1fr] border-t border-sand" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <div className="space-y-1 px-4 py-4">
              <div className="mb-3">
                <SearchBox id="mobile-search" onNavigate={() => setMobileOpen(false)} />
              </div>
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={l.go}
                  className={`block w-full rounded-md px-3 py-2.5 text-start text-sm font-medium transition-colors ${
                    l.active ? "bg-pine-900 text-brass-300" : "text-ink hover:bg-parchment"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
