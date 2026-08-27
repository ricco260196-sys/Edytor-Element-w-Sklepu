import React, { useState } from 'react';
import { SystemProduct } from '../../../data/marketplaceCatalogue';
import { ProductsGridWidgetConfig } from '../../../types/storeAppearance';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductQuickViewModalProps {
  product: SystemProduct | null;
  config: ProductsGridWidgetConfig;
  onClose: () => void;
  onAddToCart: (product: SystemProduct, qty: number) => void;
  onToggleWishlist: (product: SystemProduct) => void;
  isWishlisted: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  config,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs rounded-full border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
          title="Zamknij"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery preview */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner group">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-600/30'
                      : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Darmowa dostawa od 150 zł</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>30 dni na zwrot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Gwarancja 24 mies.</span>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {product.category}
              </span>
              <span>Sprzedawca: <strong className="text-slate-700 dark:text-slate-200">{product.vendorName}</strong></span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= Math.round(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewsCount} opinii klientów)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {product.price.toFixed(2)} {product.currency}
              </span>
              {product.oldPrice && (
                <span className="text-base text-slate-400 line-through">
                  {product.oldPrice.toFixed(2)} {product.currency}
                </span>
              )}
              {product.discountPercent && (
                <span className="px-2 py-0.5 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400 rounded-md border border-rose-200 dark:border-rose-900/50">
                  Oszczędzasz {product.discountPercent}%
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-500" /> Cechy kluczowe:
                </span>
                <ul className="grid grid-cols-1 gap-1 text-xs text-slate-600 dark:text-slate-400">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Wybierz wariant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-all flex items-center gap-2 ${
                        selectedVariant === v.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold ring-2 ring-blue-600/20'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {v.colorHex && (
                        <span
                          className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"
                          style={{ backgroundColor: v.colorHex }}
                        />
                      )}
                      <span>{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/80 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-base font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-slate-800 dark:text-slate-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-base font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Dodano do koszyka!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Dodaj do koszyka • {(product.price * quantity).toFixed(2)} {product.currency}</span>
                  </>
                )}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/50 dark:border-rose-900'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500'
                }`}
                title={isWishlisted ? 'Usuń z listy życzeń' : 'Dodaj do listy życzeń'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
              <span>Status magazynowy: <strong className={product.inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}>{product.inStock ? `W magazynie (${product.stockCount} szt.)` : 'Tymczasowo niedostępny'}</strong></span>
              {product.sku && <span>SKU: {product.sku}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
