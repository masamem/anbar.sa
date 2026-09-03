import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES, arNum } from "../data/products";
import {
  CheckIcon,
  InstagramIcon,
  Logo,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsappIcon,
  XSocialIcon,
} from "./Icons";

const PAYMENTS = ["مدى", "VISA", "Mastercard", "Apple Pay", "تمارا", "تابي"];

export default function Footer() {
  const { navigate, pushToast } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setError(true);
      window.setTimeout(() => setError(false), 600);
      return;
    }
    setSubscribed(true);
    pushToast("تم اشتراكك في نشرة الدار");
  };

  const soon = () => pushToast("هذه الصفحة ضمن النسخة الكاملة القادمة", "info");

  return (
    <footer className="relative mt-24 overflow-hidden bg-pine-950 text-paper">
      <div className="girih pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[52rem] -translate-x-1/2 rounded-full bg-brass-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* newsletter band */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-paper/15 pb-10 md:flex-row md:items-center">
          <div className="max-w-md">
            <h3 className="font-display text-3xl font-bold text-brass-300">انضم إلى أهل العبق</h3>
            <p className="mt-2 text-sm leading-6.5 text-pine-100/75">
              تركيبات جديدة قبل الجميع، وقسائم موسمية حصرية تصلك مرة كل شهر — بلا إزعاج.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-3 rounded-full border border-brass-500/50 bg-pine-900 px-6 py-3.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brass-400 text-pine-950">
                <CheckIcon className="w-4 h-4" />
              </span>
              <span className="text-sm font-bold text-brass-200">أهلاً بك! تفقّد بريدك لتصلك هدية الترحيب</span>
            </div>
          ) : (
            <form onSubmit={subscribe} className={`flex w-full max-w-md gap-2 ${error ? "shake" : ""}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                aria-label="البريد الإلكتروني للنشرة"
                className="w-full rounded-full border border-paper/25 bg-pine-900 px-5 py-3 text-sm text-paper outline-none transition-colors placeholder:text-pine-100/50 focus:border-brass-400"
              />
              <button
                type="submit"
                className="sheen shrink-0 rounded-full bg-brass-400 px-6 py-3 text-sm font-bold text-pine-950 transition-colors hover:bg-brass-300"
              >
                اشترك
              </button>
            </form>
          )}
        </div>

        {/* columns */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-[13px] leading-6.5 text-pine-100/70">
              دار سعودية تأسست في الرياض عام ١٩٩٨، تختار أجود أنواع العود والعنبر والمسك من مصادرها
              الأولى، وتُقطّر تركيباتها على مهلٍ يليق بأهل الذوق.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {[
                { icon: <InstagramIcon className="w-4.5 h-4.5" />, label: "انستغرام" },
                { icon: <XSocialIcon className="w-4.5 h-4.5" />, label: "إكس" },
                { icon: <WhatsappIcon className="w-4.5 h-4.5" />, label: "واتساب" },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={soon}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-pine-100/80 transition-all hover:-translate-y-0.5 hover:border-brass-400 hover:text-brass-300"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-brass-300">تسوّق</h4>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <button onClick={() => navigate({ page: "category", cat: "all" })} className="text-pine-100/75 transition-colors hover:text-brass-300">
                  كل المنتجات
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button onClick={() => navigate({ page: "category", cat: c.id })} className="text-pine-100/75 transition-colors hover:text-brass-300">
                    {c.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => navigate({ page: "search", q: "" })} className="text-pine-100/75 transition-colors hover:text-brass-300">
                  المفضلة والبحث
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-brass-300">الدار</h4>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {["حكاية عنبر", "تتبع طلبك", "سياسة الإرجاع", "الأسئلة الشائعة", "برنامج الولاء"].map((l) => (
                <li key={l}>
                  <button onClick={soon} className="text-pine-100/75 transition-colors hover:text-brass-300">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-brass-300">تواصل معنا</h4>
            <ul className="mt-4 space-y-3.5 text-[13.5px] text-pine-100/75">
              <li className="flex items-center gap-3">
                <PinIcon className="w-4.5 h-4.5 text-brass-400" />
                حي الملقا، طريق الأمير محمد، الرياض
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-4.5 h-4.5 text-brass-400" />
                <span dir="ltr">{arNum("920 012 345")}</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-4.5 h-4.5 text-brass-400" />
                <span dir="ltr">care@anbar.sa</span>
              </li>
            </ul>
            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold tracking-wider text-pine-100/60">وسائل دفع آمنة</p>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENTS.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-paper/20 bg-pine-900 px-2.5 py-1 text-[11px] font-bold text-pine-100/85"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-paper/12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[12px] text-pine-100/55 sm:flex-row sm:px-6">
          <p>© {arNum(2025)} دار عنبر — جميع الحقوق محفوظة · س.ت {arNum(1010456789)}</p>
          <p>
            صُنع بحُبٍّ في <span className="text-brass-400">الرياض</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
