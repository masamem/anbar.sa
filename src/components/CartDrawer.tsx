import { useStore } from "../context/StoreContext";
import { FREE_SHIPPING_THRESHOLD, arNum, money, productById } from "../data/products";
import { ArrowIcon, BagIcon, CheckIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon, XIcon } from "./Icons";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, cart, setQty, removeFromCart, subtotal, navigate, cartCount } = useStore();

  if (!drawerOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="سلة التسوق">
      <button
        className="backdrop-in absolute inset-0 h-full w-full bg-pine-950/60"
        onClick={() => setDrawerOpen(false)}
        aria-label="إغلاق"
      />
      <aside className="drawer-in absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-paper shadow-2xl">
        <header className="flex items-center justify-between border-b border-sand px-5 py-4">
          <h2 className="font-display text-2xl font-bold text-pine-900">
            سلة التسوق {cartCount > 0 && <span className="text-brass-600">({arNum(cartCount)})</span>}
          </h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="rounded-full p-2 text-ink hover:bg-parchment"
            aria-label="إغلاق السلة"
          >
            <XIcon />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-parchment text-brass-600">
              <BagIcon className="h-9 w-9" />
            </span>
            <p className="font-display text-2xl font-bold text-pine-900">سلّتك فارغة</p>
            <p className="text-sm leading-6 text-inksoft">
              لم تضف شيئاً بعد — تصفّح مختارات الدار ودع العبق يختار عنك.
            </p>
            <button
              onClick={() => navigate({ page: "category", cat: "all" })}
              className="sheen mt-2 rounded-full bg-pine-900 px-7 py-3 text-sm font-bold text-brass-300 transition-colors hover:bg-pine-800"
            >
              تصفّح المتجر
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-sand bg-parchment/60 px-5 py-3">
              {remaining > 0 ? (
                <p className="text-[12.5px] font-medium text-pine-800">
                  أضف <b className="text-brass-600">{money(remaining)}</b> لتحصل على توصيل مجاني
                </p>
              ) : (
                <p className="flex items-center gap-2 text-[12.5px] font-bold text-pine-700">
                  <TruckIcon className="w-4.5 h-4.5 text-brass-600" /> مبروك! حصلت على توصيل مجاني
                </p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-brass-400 to-brass-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-5">
              {cart.map((item) => {
                const p = productById(item.id);
                if (!p) return null;
                return (
                  <li key={`${item.id}-${item.size}`} className="flex gap-3.5 py-4">
                    <button
                      onClick={() => navigate({ page: "product", id: p.id })}
                      className="shrink-0 overflow-hidden arch-frame"
                      aria-label={p.name}
                    >
                      <img src={p.image} alt={p.name} className="h-22 w-17 object-cover transition-transform hover:scale-110" />
                    </button>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-pine-900">{p.name}</p>
                          <p className="mt-0.5 text-[11px] text-inksoft">الحجم: {item.size}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="rounded-full p-1.5 text-inksoft transition-colors hover:bg-parchment hover:text-brass-700"
                          aria-label="حذف من السلة"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-sand bg-paper">
                          <button
                            onClick={() => setQty(item.id, item.size, item.qty + 1)}
                            className="p-2 text-pine-800 transition-colors hover:text-brass-600"
                            aria-label="زيادة الكمية"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold text-pine-900">{arNum(item.qty)}</span>
                          <button
                            onClick={() => setQty(item.id, item.size, item.qty - 1)}
                            className="p-2 text-pine-800 transition-colors hover:text-brass-600"
                            aria-label="إنقاص الكمية"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-pine-900">{money(p.price * item.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="space-y-3 border-t border-sand bg-parchment/60 px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-inksoft">المجموع الفرعي</span>
                <span className="text-lg font-bold text-pine-900">{money(subtotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate({ page: "cart" })}
                  className="rounded-full border-2 border-pine-800 py-3 text-sm font-bold text-pine-900 transition-colors hover:bg-pine-800 hover:text-brass-200"
                >
                  عرض السلة
                </button>
                <button
                  onClick={() => navigate({ page: "cart" })}
                  className="sheen flex items-center justify-center gap-2 rounded-full bg-brass-400 py-3 text-sm font-bold text-pine-950 transition-colors hover:bg-brass-300"
                >
                  إتمام الطلب <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-[70] flex flex-col gap-2.5" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-in flex items-center gap-3 rounded-lg border py-3 pl-4 pr-3 shadow-xl shadow-pine-950/20 ${
            t.tone === "error"
              ? "border-brass-600/40 bg-pine-950 text-brass-200"
              : t.tone === "info"
                ? "border-sand bg-parchment text-pine-900"
                : "border-brass-500/40 bg-pine-900 text-paper"
          }`}
        >
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
              t.tone === "error" ? "bg-brass-500 text-pine-950" : "bg-brass-400/90 text-pine-950"
            }`}
          >
            {t.tone === "error" ? <XIcon className="w-3.5 h-3.5" /> : <CheckIcon className="w-3.5 h-3.5" />}
          </span>
          <p className="text-[13px] font-semibold">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}
