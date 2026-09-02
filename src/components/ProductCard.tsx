import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { arNum, categoryById, money, type Product } from "../data/products";
import { BagIcon, CheckIcon, HeartIcon, Stars } from "./Icons";

export default function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { navigate, addToCart, wishlist, toggleWish } = useStore();
  const [added, setAdded] = useState(false);
  const wished = wishlist.includes(product.id);
  const cat = categoryById(product.category);
  const discountPct = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, product.sizes[0], 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      className="group relative flex h-full cursor-pointer flex-col"
      onClick={() => navigate({ page: "product", id: product.id })}
    >
      {/* arch image */}
      <div className="relative overflow-hidden arch-frame bg-parchment">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
            compact ? "aspect-[4/5]" : "aspect-[4/5.4]"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/45 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

        {product.badge && (
          <span
            className={`absolute top-4 right-1/2 translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold shadow-md ${
              product.badge === "خصم خاص" ? "bg-brass-500 text-pine-950" : "bg-pine-900 text-brass-300"
            }`}
            style={{ top: "1.1rem" }}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWish(product.id);
          }}
          aria-label={wished ? "إزالة من المفضلة" : "حفظ في المفضلة"}
          className={`absolute top-3 left-3 rounded-full border p-2 backdrop-blur-sm transition-all hover:scale-110 ${
            wished
              ? "border-brass-400 bg-brass-500 text-pine-950"
              : "border-paper/30 bg-pine-950/35 text-paper hover:bg-pine-950/60"
          }`}
        >
          <HeartIcon className="w-4 h-4" filled={wished} />
        </button>

        {/* quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[130%] transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
          <button
            onClick={quickAdd}
            className={`sheen flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold shadow-lg transition-colors ${
              added ? "bg-pine-700 text-brass-200" : "bg-brass-400 text-pine-950 hover:bg-brass-300"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-4 h-4" /> أُضيف للسلة
              </>
            ) : (
              <>
                <BagIcon className="w-4 h-4" /> أضف إلى السلة
              </>
            )}
          </button>
        </div>

        {product.stock <= 10 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-bold text-pine-800 transition-opacity group-hover:opacity-0">
            باقي {arNum(product.stock)} فقط
          </span>
        )}
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wide text-brass-600">{cat?.label}</span>
          <span className="flex items-center gap-1.5 text-[11px] text-inksoft">
            <Stars value={product.rating} className="w-3 h-3" />
            {arNum(product.rating)}
          </span>
        </div>
        <h3 className="mt-1 text-[15px] font-bold leading-6 text-pine-900 transition-colors group-hover:text-brass-600">
          {product.name}
        </h3>
        <p className="text-[11px] italic text-inksoft/80">{product.latin}</p>
        {!compact && (
          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-5.5 text-inksoft">{product.short}</p>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-2.5">
          <span className="text-lg font-bold text-pine-900">{money(product.price)}</span>
          {product.oldPrice && (
            <>
              <span className="text-xs text-inksoft line-through">{money(product.oldPrice)}</span>
              <span className="rounded bg-brass-400/25 px-1.5 py-0.5 text-[10px] font-bold text-brass-700">
                −{arNum(discountPct)}٪
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
