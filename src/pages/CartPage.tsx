import { useState } from "react";
import { Reveal } from "../components/Reveal";
import {
  ArrowIcon,
  BagIcon,
  CheckIcon,
  ChevronIcon,
  MinusIcon,
  PlusIcon,
  ShieldIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
} from "../components/Icons";
import { useStore } from "../context/StoreContext";
import { FREE_SHIPPING_THRESHOLD, arNum, money, productById } from "../data/products";

type Step = "cart" | "processing" | "done";

export default function CartPage() {
  const {
    cart,
    setQty,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    promo,
    applyPromo,
    removePromo,
    navigate,
    clearCart,
    pushToast,
  } = useStore();

  const [step, setStep] = useState<Step>("cart");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [orderNo] = useState(() => `AN-${Math.floor(100000 + Math.random() * 900000)}`);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - (subtotal - discount));
  const progress = Math.min(100, ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100);

  const submitPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const ok = applyPromo(code);
    if (!ok) {
      setCodeError(true);
      window.setTimeout(() => setCodeError(false), 600);
    } else {
      setCode("");
    }
  };

  const checkout = () => {
    setStep("processing");
    window.setTimeout(() => {
      setStep("done");
      clearCart();
      pushToast("تم استلام طلبك بنجاح");
    }, 1400);
  };

  if (step === "done") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <Reveal>
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-pine-900 text-brass-300 shadow-xl shadow-pine-900/30">
            <CheckIcon className="h-11 w-11" />
          </span>
          <h1 className="mt-7 font-display text-4xl font-bold text-pine-900 sm:text-5xl">شكراً لك! طلبك في الطريق</h1>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-8 text-inksoft">
            رقم الطلب <b className="rounded-md bg-parchment px-2 py-1 font-bold text-brass-700" dir="ltr">{arNum(orderNo)}</b>
            <br />
            سيصلك خلال ١–٣ أيام عمل، وسنرسل لك رسالة تتبع فور خروج الشحنة من مستودع الدار.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate({ page: "category", cat: "all" })}
              className="sheen rounded-full bg-pine-900 px-8 py-4 text-sm font-bold text-brass-300 transition-all hover:-translate-y-0.5 hover:bg-pine-800"
            >
              متابعة التسوق
            </button>
            <button
              onClick={() => navigate({ page: "home" })}
              className="rounded-full border-2 border-pine-800 px-8 py-[14px] text-sm font-bold text-pine-900 transition-colors hover:bg-pine-800 hover:text-brass-200"
            >
              العودة للرئيسية
            </button>
          </div>
        </Reveal>
      </div>
    );
  }

  if (cart.length === 0 && step === "cart") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-parchment text-brass-600">
            <BagIcon className="h-10 w-10" />
          </span>
          <h1 className="mt-7 font-display text-4xl font-bold text-pine-900">سلّتك فارغة حتى الآن</h1>
          <p className="mx-auto mt-4 max-w-sm text-[14.5px] leading-8 text-inksoft">
            العبق لا ينتظر — تصفّح مختارات الدار وأضف ما يليق بمجلسك.
          </p>
          <button
            onClick={() => navigate({ page: "category", cat: "all" })}
            className="sheen mt-8 rounded-full bg-pine-900 px-9 py-4 text-sm font-bold text-brass-300 transition-all hover:-translate-y-0.5 hover:bg-pine-800"
          >
            تصفّح المتجر
          </button>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-[12.5px] text-inksoft">
        <button onClick={() => navigate({ page: "home" })} className="transition-colors hover:text-brass-600">
          الرئيسية
        </button>
        <ChevronIcon className="w-3 h-3 rotate-180 text-sand" />
        <span className="font-semibold text-pine-900">سلة التسوق</span>
      </nav>

      <h1 className="mt-5 font-display text-4xl font-bold text-pine-900 sm:text-5xl">
        سلة التسوق <span className="text-brass-600">({arNum(cart.reduce((s, i) => s + i.qty, 0))})</span>
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* items */}
        <div className="space-y-4">
          {cart.map((item, idx) => {
            const p = productById(item.id);
            if (!p) return null;
            return (
              <Reveal key={`${item.id}-${item.size}`} delay={idx * 60} y={14}>
                <div className="flex flex-wrap items-center gap-4 rounded-xl border border-sand bg-paper p-4 transition-shadow hover:shadow-lg hover:shadow-pine-950/8 sm:flex-nowrap">
                  <button
                    onClick={() => navigate({ page: "product", id: p.id })}
                    className="shrink-0 overflow-hidden arch-frame"
                    aria-label={p.name}
                  >
                    <img src={p.image} alt={p.name} className="h-26 w-21 object-cover transition-transform duration-500 hover:scale-110" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => navigate({ page: "product", id: p.id })}
                      className="text-right text-[15px] font-bold text-pine-900 transition-colors hover:text-brass-600"
                    >
                      {p.name}
                    </button>
                    <p className="mt-0.5 text-[12px] text-inksoft">
                      الحجم: {item.size} · <span dir="ltr">{p.latin}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-full border border-sand bg-parchment/60">
                        <button
                          onClick={() => setQty(item.id, item.size, item.qty + 1)}
                          className="p-2.5 text-pine-800 transition-colors hover:text-brass-600"
                          aria-label="زيادة الكمية"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-pine-900">{arNum(item.qty)}</span>
                        <button
                          onClick={() => setQty(item.id, item.size, item.qty - 1)}
                          className="p-2.5 text-pine-800 transition-colors hover:text-brass-600"
                          aria-label="إنقاص الكمية"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.id, item.size);
                          pushToast("حُذف المنتج من السلة", "info");
                        }}
                        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-bold text-inksoft transition-colors hover:bg-parchment hover:text-brass-700"
                      >
                        <TrashIcon className="w-3.5 h-3.5" /> حذف
                      </button>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-pine-900">{money(p.price * item.qty)}</p>
                    {item.qty > 1 && <p className="text-[11px] text-inksoft">{money(p.price)} للقطعة</p>}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <button
            onClick={() => navigate({ page: "category", cat: "all" })}
            className="group flex items-center gap-2 text-[13px] font-bold text-brass-700 transition-colors hover:text-pine-900"
          >
            <ArrowIcon className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
            متابعة التسوق وإضافة المزيد
          </button>
        </div>

        {/* summary */}
        <Reveal delay={150} y={20}>
          <aside className="sticky top-28 rounded-xl border border-sand bg-parchment/70 p-6">
            <h2 className="font-display text-2xl font-bold text-pine-900">ملخص الطلب</h2>

            <div className="mt-4 rounded-lg border border-brass-500/30 bg-paper p-4">
              {remaining > 0 ? (
                <p className="text-[12.5px] font-medium leading-6 text-pine-800">
                  أضف منتجات بـ <b className="text-brass-600">{money(remaining)}</b> ليصبح التوصيل <b>مجانياً</b>
                </p>
              ) : (
                <p className="flex items-center gap-2 text-[12.5px] font-bold text-pine-700">
                  <TruckIcon className="w-4.5 h-4.5 text-brass-600" /> توصيل مجاني مفعّل لطلبك
                </p>
              )}
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-brass-400 to-brass-600 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-[13.5px]">
              <div className="flex items-center justify-between">
                <dt className="text-inksoft">المجموع الفرعي</dt>
                <dd className="font-bold text-pine-900">{money(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-inksoft">
                    خصم كود
                    <span className="flex items-center gap-1.5 rounded-md bg-pine-900 px-2 py-0.5 text-[10.5px] font-bold text-brass-300" dir="ltr">
                      {promo}
                      <button onClick={removePromo} aria-label="إزالة الكود" className="text-brass-300 hover:text-paper">
                        <XIcon className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  </dt>
                  <dd className="font-bold text-brass-600">− {money(discount)}</dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="text-inksoft">التوصيل</dt>
                <dd className={`font-bold ${shipping === 0 ? "text-pine-700" : "text-pine-900"}`}>
                  {shipping === 0 ? "مجاني" : money(shipping)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-sand pt-4">
                <dt className="text-[15px] font-bold text-pine-900">الإجمالي (شامل الضريبة)</dt>
                <dd className="font-display text-3xl font-bold text-pine-900">{money(total)}</dd>
              </div>
            </dl>

            {!promo && (
              <form onSubmit={submitPromo} className={`mt-5 flex gap-2 ${codeError ? "shake" : ""}`}>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="كود الخصم — جرّب ANBAR10"
                  aria-label="كود الخصم"
                  className="w-full rounded-full border border-sand bg-paper px-4 py-2.5 text-[13px] outline-none transition-colors focus:border-brass-500"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-pine-900 px-5 py-2.5 text-[12.5px] font-bold text-brass-300 transition-colors hover:bg-pine-800"
                >
                  تطبيق
                </button>
              </form>
            )}

            <button
              onClick={checkout}
              disabled={step === "processing"}
              className="sheen mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-brass-400 py-4 text-[15px] font-bold text-pine-950 shadow-lg shadow-brass-500/25 transition-all hover:-translate-y-0.5 hover:bg-brass-300 disabled:translate-y-0 disabled:opacity-80"
            >
              {step === "processing" ? (
                <>
                  <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-pine-950/30 border-t-pine-950" />
                  جارٍ تجهيز الطلب…
                </>
              ) : (
                <>
                  إتمام الطلب <ArrowIcon className="w-4.5 h-4.5" />
                </>
              )}
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-[11.5px] text-inksoft">
              <ShieldIcon className="w-4 h-4 text-pine-700" /> دفع آمن عبر مدى وApple Pay — بياناتك محمية
            </p>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
