import React from 'react';
import { StoreHeader } from './StoreHeader';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { CategoriesWidgetRenderer } from '../editors/categories/CategoriesWidgetRenderer';
import { ProductsWidgetRenderer } from '../editors/products/ProductsWidgetRenderer';
import { ProductQuickViewModal } from '../editors/products/ProductQuickViewModal';
import { WidgetDynamicRenderer } from '../editors/widgets/renderers/WidgetDynamicRenderer';
import { BannerDynamicRenderer } from '../editors/banners/renderers/BannerDynamicRenderer';
import { FooterDynamicRenderer } from '../editors/footer/renderers/FooterDynamicRenderer';
import {
  Sparkles,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  ArrowRight,
  Heart
} from 'lucide-react';

export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Bezprzewodowe Słuchawki Pro ANC 2',
    category: 'Elektronika',
    price: 349.00,
    oldPrice: 499.00,
    rating: 4.9,
    reviews: 128,
    badge: 'HIT -30%',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Smartwatch Titan Ultra GPS',
    category: 'Smart Gadżety',
    price: 599.00,
    oldPrice: 799.00,
    rating: 4.8,
    reviews: 84,
    badge: 'POLECANY',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Skórzany Plecak Miejski Vintage',
    category: 'Akcesoria',
    price: 219.00,
    oldPrice: 289.00,
    rating: 4.7,
    reviews: 52,
    badge: 'NOWOŚĆ',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Klawiatura Mechaniczna RGB Custom',
    category: 'Gaming',
    price: 429.00,
    oldPrice: 549.00,
    rating: 5.0,
    reviews: 210,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60'
  }
];

export const StorefrontView: React.FC = () => {
  const {
    state,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    wishlistIds
  } = useStoreAppearance();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. DYNAMIC STORE HEADER */}
      <StoreHeader />

      {/* 2. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wielka Wyprzedaż Wiosenna 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Odkryj Tysiące Okazji w Jednym Miejscu
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Kupuj bezpośrednio od sprawdzonych sprzedawców z gwarancją szybkiej wysyłki i bezpiecznych płatności.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Przeglądaj Promocje</span>
              </button>
              <button className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors">
                Nowości
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST & PERKS BAR */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Darmowa Dostawa</div>
              <div className="text-[11px] text-slate-500">Dla zamówień od 200 zł</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Bezpieczne Zakupy</div>
              <div className="text-[11px] text-slate-500">Ochrona kupującego 100%</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">30 Dni na Zwrot</div>
              <div className="text-[11px] text-slate-500">Bezproblemowy zwrot</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Wysyłka 24h</div>
              <div className="text-[11px] text-slate-500">Ekspresowa realizacja</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC CATEGORIES SHOWCASE WIDGET */}
      {state.categories?.enabled && (
        <CategoriesWidgetRenderer
          config={state.categories}
          deviceViewport="desktop"
          isInteractive={true}
          className="border-b border-slate-200 bg-white"
        />
      )}

      {/* 4.5. DYNAMIC BANNERS & SLIDERS STACK */}
      {state.banners?.items && state.banners.items.filter(b => b.enabled).length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          {state.banners.items
            .filter(b => b.enabled)
            .map(banner => (
              <BannerDynamicRenderer
                key={banner.id}
                banner={banner}
                deviceViewport="desktop"
                simulatedState="normal"
              />
            ))}
        </section>
      )}

      {/* 5. DYNAMIC PRODUCTS GRID WIDGET */}
      {state.productsGrid?.enabled && (
        <section className="bg-white border-b border-slate-200">
          <ProductsWidgetRenderer
            config={state.productsGrid}
            deviceViewport="desktop"
            isStorefront={true}
          />
        </section>
      )}

      {/* 6. DYNAMIC STORE WIDGETS STACK */}
      {state.widgets?.widgets && state.widgets.widgets.filter(w => w.enabled).length > 0 && (
        <section className="bg-slate-900/95 py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto space-y-12">
            {state.widgets.widgets
              .filter(w => w.enabled)
              .map(widget => (
                <WidgetDynamicRenderer
                  key={widget.id}
                  widget={widget}
                  deviceViewport="desktop"
                  previewState="normal"
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={(id) => wishlistIds.includes(String(id))}
                  onQuickView={setQuickViewProduct}
                />
              ))}
          </div>
        </section>
      )}

      {/* Quick view modal in storefront */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          config={state.productsGrid}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlistIds.includes(String(quickViewProduct.id))}
        />
      )}

      {/* 5. DYNAMIC FOOTER */}
      {state.footer?.enabled && (
        <FooterDynamicRenderer
          config={state.footer}
          device="desktop"
          isInteractive={false}
        />
      )}
    </div>
  );
};
