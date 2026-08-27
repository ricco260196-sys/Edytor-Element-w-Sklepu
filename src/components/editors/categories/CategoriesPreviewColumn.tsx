import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { CategoriesWidgetRenderer } from './CategoriesWidgetRenderer';
import { SystemCategory, SYSTEM_CATEGORIES } from '../../../data/marketplaceCatalogue';
import { DevicePreview } from '../../../types/storeAppearance';
import { StoreHeader } from '../../storefront/StoreHeader';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Sparkles,
  Layers,
  Info,
  CheckCircle2,
  ExternalLink,
  Tag,
  Grid,
  ShoppingBag,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

interface CategoriesPreviewColumnProps {
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  deviceViewport: DevicePreview;
  onDeviceChange: (device: DevicePreview) => void;
  viewMode: 'element' | 'full_header';
  onViewModeChange: (mode: 'element' | 'full_header') => void;
}

export const CategoriesPreviewColumn: React.FC<CategoriesPreviewColumnProps> = ({
  selectedCategoryId,
  onSelectCategory,
  deviceViewport,
  onDeviceChange,
  viewMode,
  onViewModeChange
}) => {
  const { state } = useStoreAppearance();
  const [canvasBg, setCanvasBg] = useState<'grid' | 'white' | 'dark' | 'cream'>('white');
  const [zoom, setZoom] = useState<number>(100);
  const [lastClickedCategory, setLastClickedCategory] = useState<SystemCategory | null>(null);
  const [notificationTimer, setNotificationTimer] = useState<any>(null);

  const handleCategoryClick = (category: SystemCategory) => {
    setLastClickedCategory(category);
    onSelectCategory(category.id);
    if (notificationTimer) clearTimeout(notificationTimer);
    const timer = setTimeout(() => {
      setLastClickedCategory(null);
    }, 4500);
    setNotificationTimer(timer);
  };

  const getCanvasBackgroundClass = () => {
    switch (canvasBg) {
      case 'dark':
        return 'bg-slate-950 text-slate-100';
      case 'cream':
        return 'bg-amber-50/50 text-slate-800';
      case 'grid':
        return 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] bg-slate-950 text-slate-100';
      case 'white':
      default:
        return 'bg-slate-50 text-slate-900';
    }
  };

  const getViewportWidth = () => {
    switch (deviceViewport) {
      case 'mobile':
        return 'max-w-[400px] shadow-2xl rounded-2xl border-4 border-slate-700 overflow-hidden';
      case 'tablet':
        return 'max-w-[768px] shadow-2xl rounded-xl border-2 border-slate-700 overflow-hidden';
      case 'desktop':
      default:
        return 'w-full max-w-[1440px] shadow-xl rounded-lg border border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Preview Control Bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
        {/* Left: View Mode (Element vs Full Storefront) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => onViewModeChange('element')}
              className={`px-2.5 py-1 font-medium rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'element'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Tylko Widżet
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('full_header')}
              className={`px-2.5 py-1 font-medium rounded-md flex items-center gap-1.5 transition-all ${
                viewMode === 'full_header'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Pełny Sklep
            </button>
          </div>
        </div>

        {/* Center: Device Viewport Controls */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => onDeviceChange('desktop')}
            className={`p-1.5 rounded-md flex items-center gap-1 transition-all ${
              deviceViewport === 'desktop'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Podgląd Desktop (1440px)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange('tablet')}
            className={`p-1.5 rounded-md flex items-center gap-1 transition-all ${
              deviceViewport === 'tablet'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Podgląd Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange('mobile')}
            className={`p-1.5 rounded-md flex items-center gap-1 transition-all ${
              deviceViewport === 'mobile'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Podgląd Mobile (400px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Background & Zoom */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => setZoom(Math.max(70, zoom - 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Pomniejsz"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="px-1 text-slate-300 font-mono text-[10px]">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom(Math.min(130, zoom + 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Powiększ"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Canvas Background switch */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(['white', 'dark', 'cream', 'grid'] as const).map(bg => (
              <button
                key={bg}
                type="button"
                onClick={() => setCanvasBg(bg)}
                className={`px-2 py-0.5 rounded text-[10px] capitalize transition-all ${
                  canvasBg === bg ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {bg === 'white' ? 'Białe' : bg === 'dark' ? 'Ciemne' : bg === 'cream' ? 'Kremowe' : 'Siatka'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center relative bg-slate-950/90">
        {/* Responsive Frame container */}
        <div
          className={`w-full transition-all duration-300 ${getViewportWidth()} ${getCanvasBackgroundClass()}`}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
        >
          {/* Full header if selected */}
          {viewMode === 'full_header' && (
            <StoreHeader />
          )}

          {/* Categories Showcase Widget */}
          <CategoriesWidgetRenderer
            config={state.categories}
            deviceViewport={deviceViewport}
            onCategoryClick={handleCategoryClick}
            selectedCategoryId={selectedCategoryId}
            isInteractive={true}
          />
        </div>

        {/* Floating Category Navigation Toast */}
        {lastClickedCategory && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-500/50 flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md">
            <span className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Tag className="w-4 h-4" />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-bold truncate">
                Kliknięto: {lastClickedCategory.name}
              </p>
              <p className="text-[11px] text-slate-300 font-mono">
                Ścieżka URL: /{lastClickedCategory.slug} ({lastClickedCategory.productCount} ofert)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLastClickedCategory(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Footer Info Bar */}
      <div className="px-4 py-1.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interaktywny podgląd na żywo (WYSIWYG)</span>
        </div>
        <div>
          <span>Kafelki pobierają dane z: </span>
          <strong className="text-slate-200">System Marketplace</strong>
        </div>
      </div>
    </div>
  );
};
