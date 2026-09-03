import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODE,
  PROMO_RATE,
  SHIPPING_FEE,
  productById,
} from "../data/products";

export type Route =
  | { page: "home" }
  | { page: "product"; id: string }
  | { page: "category"; cat: string }
  | { page: "cart" }
  | { page: "search"; q: string };

export interface CartItem {
  id: string;
  size: string;
  qty: number;
}

export interface Toast {
  id: number;
  msg: string;
  tone: "success" | "error" | "info";
}

interface StoreValue {
  route: Route;
  navigate: (r: Route) => void;
  cart: CartItem[];
  addToCart: (id: string, size: string, qty?: number, silent?: boolean) => void;
  removeFromCart: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  toasts: Toast[];
  pushToast: (msg: string, tone?: Toast["tone"]) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ page: "home" });
  const [cart, setCart] = useState<CartItem[]>(() => readLS("anbar-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => readLS("anbar-wish", []));
  const [promo, setPromo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("anbar-cart", JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("anbar-wish", JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist]);

  const navigate = useCallback((r: Route) => {
    setRoute(r);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const pushToast = useCallback((msg: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, msg, tone }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3400);
  }, []);

  const addToCart = useCallback(
    (id: string, size: string, qty = 1, silent = false) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id && i.size === size);
        if (existing) {
          return prev.map((i) =>
            i.id === id && i.size === size ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [...prev, { id, size, qty }];
      });
      if (!silent) {
        pushToast("أُضيف إلى سلة التسوق");
        setDrawerOpen(true);
      }
    },
    [pushToast]
  );

  const removeFromCart = useCallback((id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const setQty = useCallback((id: string, size: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.id === id && i.size === size))
        : prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setPromo(null);
  }, []);

  const toggleWish = useCallback(
    (id: string) => {
      setWishlist((prev) => {
        const has = prev.includes(id);
        pushToast(has ? "أُزيل من المفضلة" : "حُفظ في المفضلة", has ? "info" : "success");
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [pushToast]
  );

  const applyPromo = useCallback(
    (code: string) => {
      if (code.trim().toUpperCase() === PROMO_CODE) {
        setPromo(PROMO_CODE);
        pushToast(`طُبّق كود الخصم ${PROMO_CODE} (−١٠٪)`);
        return true;
      }
      pushToast("كود الخصم غير صحيح", "error");
      return false;
    },
    [pushToast]
  );

  const removePromo = useCallback(() => setPromo(null), []);

  const { cartCount, subtotal, discount, shipping, total } = useMemo(() => {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const sub = cart.reduce((s, i) => {
      const p = productById(i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
    const disc = promo ? Math.round(sub * PROMO_RATE) : 0;
    const ship = count > 0 && sub - disc < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
    return { cartCount: count, subtotal: sub, discount: disc, shipping: ship, total: sub - disc + ship };
  }, [cart, promo]);

  const value: StoreValue = {
    route,
    navigate,
    cart,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    promo,
    applyPromo,
    removePromo,
    wishlist,
    toggleWish,
    toasts,
    pushToast,
    drawerOpen,
    setDrawerOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
