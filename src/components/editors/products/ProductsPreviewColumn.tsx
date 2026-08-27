import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { ProductsWidgetRenderer } from './ProductsWidgetRenderer';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { DeviceViewport } from '../shared/EditorLayout3Col';
import { SYSTEM_PRODUCTS, SystemProduct } from '../../../data/marketplaceCatalogue';
import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ProductsPreviewColumnProps {
  selectedProductId?: string | null;
  onSelectProduct?: (id: string | null) => void;
  deviceViewport: DeviceViewport;
  onDeviceChange: (device: DeviceViewport) => void;
  viewMode: 'element' | 'full_header';
  onViewModeChange: (mode: 'element' | 'full_header') => void;
}

export const ProductsPreviewColumn: React.FC<ProductsPreviewColumnProps> = ({
  selectedProductId,
  onSelectProduct,
  deviceViewport,
  onDeviceChange,
  viewMode,
  onViewModeChange
}) => {
  const {
    state,
    cartItems,
    wishlistIds,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist
  } = useStoreAppearance();

  const config = state.productsGrid;
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Viewport width styling
  const getViewportContainerStyle = () => {
    switch (deviceViewport) {
      case 'mobile':
        return 'w-[390px] min-h-[750px] shadow-2xl rounded-3xl border-8 border-slate-800 bg-white dark:bg-slate-950 overflow-hidden my-4';
      case 'tablet':
        return 'w-[768px] min-h-[850px] shadow-2xl rounded-2xl border-4 border-slate-800 bg-white dark:bg-slate-950 overflow-hidden my-4';
      case 'desktop':
      default:
        return 'w-full min-h-[600px] bg-white dark:bg-slate-950 rounded-xl shadow-md';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/80">
      {/* Top Preview Controls Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
        {/* Left: Active Preset & Status */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-950 text-blue-400 border border-blue-800 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Preset: {config.activePreset || 'Marketplace Pro'}</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Tryb: <strong className="text-slate-200">{config.displayMode}</strong> • {config.columnsDesktop} kolumny
          </span>
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'desktop'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Widok Komputer (Desktop)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'tablet'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Widok Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'mobile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Widok Smartfon (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Zoom & Cart preview */}
        <div className="flex items-center gap-2">
          {/* Live cart mini indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/80 rounded-lg text-xs text-slate-300 border border-slate-700">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
            <span>Koszyk: <strong>{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</strong></span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Pomniejsz"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 w-10 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Powiększ"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Center Interactive Preview Canvas */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-start justify-center bg-slate-950/40 relative">
        <div
          className={`transition-all duration-300 ${getViewportContainerStyle()}`}
          style={{
            transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
            transformOrigin: 'top center'
          }}
        >
          {/* Top simulated browser bar on mobile / tablet */}
          {deviceViewport !== 'desktop' && (
            <div className="w-full py-2 px-4 bg-slate-900 text-slate-400 text-[11px] flex items-center justify-between border-b border-slate-800">
              <span className="font-mono">marketplace.pl/produkty</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
            </div>
          )}

          {/* Real Live Widget Renderer */}
          <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-950 min-h-full">
            <ProductsWidgetRenderer
              config={config}
              deviceViewport={deviceViewport}
              selectedProductId={selectedProductId}
              onSelectProduct={onSelectProduct}
            />
          </div>
        </div>

        {/* Quick View Modal Simulation */}
        {quickViewProduct && (
          <ProductQuickViewModal
            product={quickViewProduct}
            config={config}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlistIds.includes(String(quickViewProduct.id))}
          />
        )}
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span>Wyświetlacz: <strong className="text-slate-200 uppercase">{deviceViewport}</strong></span>
          <span>•</span>
          <span>Baza: <strong className="text-emerald-400">12 produktów z marketplace</strong></span>
          <span>•</span>
          <span>Odstępy siatki: <strong className="text-slate-200">{config.gapDesktopX}px × {config.gapDesktopY}px</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-blue-400">
            <Info className="w-3.5 h-3.5" /> Kliknij kartę, aby otworzyć Szybki Podgląd
          </span>
        </div>
      </div>
    </div>
  );
};
