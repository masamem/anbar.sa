import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartDrawer, Toasts } from "./components/CartDrawer";
import { StoreProvider, useStore } from "./context/StoreContext";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";

function Router() {
  const { route } = useStore();
  switch (route.page) {
    case "product":
      return <ProductPage key={route.id} id={route.id} />;
    case "category":
      return <CategoryPage key={route.cat} cat={route.cat} />;
    case "cart":
      return <CartPage />;
    case "search":
      return <SearchPage key={route.q} q={route.q} />;
    default:
      return <Home />;
  }
}

function Shell() {
  return (
    <div className="min-h-screen">
      <div className="noise-overlay" aria-hidden />
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
      <CartDrawer />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
