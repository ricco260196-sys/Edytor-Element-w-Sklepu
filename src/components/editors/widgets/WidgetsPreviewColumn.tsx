import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { WidgetInstance, WidgetPreviewState } from '../../../types/widgetEditor';
import { DevicePreview } from '../../../types/storeAppearance';
import { WidgetDynamicRenderer } from './renderers/WidgetDynamicRenderer';
import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  Maximize2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface WidgetsPreviewColumnProps {
  deviceViewport: DevicePreview;
  onDeviceChange: (device: DevicePreview) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

export const WidgetsPreviewColumn: React.FC<WidgetsPreviewColumnProps> = ({
  deviceViewport,
  onDeviceChange,
  zoomLevel,
  onZoomChange
}) => {
  const {
    state,
    selectedWidgetId,
    setSelectedWidgetId,
    addToCart,
    toggleWishlist,
    wishlistIds,
    setQuickViewProduct
  } = useStoreAppearance();

  const [previewMode, setPreviewMode] = useState<'selected' | 'all_stack'>('selected');
  const [activePreviewState, setActivePreviewState] = useState<WidgetPreviewState>('normal');

  const widgetsList: WidgetInstance[] = state.widgets?.widgets || [];
  const selectedWidget = widgetsList.find((w) => w.id === selectedWidgetId) || widgetsList[0];

  // Calculate viewport container max width
  const getViewportWidth = () => {
    switch (deviceViewport) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden select-none">
      {/* Top Toolbar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
        {/* Left: View Mode (Selected vs All) */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setPreviewMode('selected')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              previewMode === 'selected'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wybrany Widżet</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('all_stack')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              previewMode === 'all_stack'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Wszystkie Widżety Sklepu ({widgetsList.filter((w) => w.enabled).length})</span>
          </button>
        </div>

        {/* Center: Interactive Preview State Switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
          <span className="text-[11px] text-slate-400 mr-1">Stan:</span>
          <button
            type="button"
            onClick={() => setActivePreviewState('normal')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activePreviewState === 'normal'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => setActivePreviewState('hover')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activePreviewState === 'hover'
                ? 'bg-slate-800 text-blue-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hover
          </button>
        </div>

        {/* Right: Zoom controls */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => onZoomChange(Math.max(50, zoomLevel - 10))}
            className="p-1 rounded hover:bg-slate-800 hover:text-white"
            title="Oddal (Zoom out)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-[11px]">{zoomLevel}%</span>
          <button
            type="button"
            onClick={() => onZoomChange(Math.min(150, zoomLevel + 10))}
            className="p-1 rounded hover:bg-slate-800 hover:text-white"
            title="Przybliż (Zoom in)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onZoomChange(100)}
            className="p-1 rounded hover:bg-slate-800 hover:text-white ml-1"
            title="Resetuj zoom do 100%"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          style={{
            width: getViewportWidth(),
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'width 0.3s ease, transform 0.2s ease'
          }}
          className={`relative transition-all duration-300 ${
            deviceViewport !== 'desktop'
              ? 'rounded-3xl shadow-2xl border-4 border-slate-800 overflow-hidden bg-slate-950 p-4'
              : 'w-full'
          }`}
        >
          {/* Mobile / Tablet notch & header simulation */}
          {deviceViewport !== 'desktop' && (
            <div className="w-full pb-3 mb-3 border-b border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Marketplace Pro Mobile Preview</span>
              <span>{deviceViewport === 'mobile' ? '390 x 844 px' : '768 x 1024 px'}</span>
            </div>
          )}

          {/* Render Mode: Selected Widget Only */}
          {previewMode === 'selected' && selectedWidget && (
            <div className="w-full py-4">
              <WidgetDynamicRenderer
                widget={selectedWidget}
                deviceViewport={deviceViewport}
                previewState={activePreviewState}
                isSelected={true}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={(id) => wishlistIds.includes(String(id))}
                onQuickView={setQuickViewProduct}
              />
            </div>
          )}

          {/* Render Mode: All Enabled Widgets in Store Flow */}
          {previewMode === 'all_stack' && (
            <div className="w-full space-y-8 py-4">
              {widgetsList.map((w) => (
                <WidgetDynamicRenderer
                  key={w.id}
                  widget={w}
                  deviceViewport={deviceViewport}
                  previewState={activePreviewState}
                  isSelected={w.id === selectedWidgetId}
                  onSelect={() => setSelectedWidgetId(w.id)}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={(id) => wishlistIds.includes(String(id))}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}

          {/* If no widget available */}
          {!selectedWidget && widgetsList.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-3 text-amber-400" />
              <h4 className="text-base font-bold text-white mb-1">Brak skonfigurowanych widżetów</h4>
              <p className="text-xs text-slate-500">
                Użyj przycisku w lewym panelu, aby dodać nowy widżet z biblioteki szablonów.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Podgląd na żywo: <strong>{selectedWidget ? selectedWidget.displayName : 'Brak'}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span>Interaktywny silnik Marketplace</span>
          <span>Dane: <strong>System Katalogu Produktów</strong></span>
        </div>
      </div>
    </div>
  );
};
