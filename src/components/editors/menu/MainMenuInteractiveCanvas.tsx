import React from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { DeviceViewport } from '../shared/EditorLayout3Col';
import { StoreHeader } from '../../storefront/StoreHeader';
import { Grid, ChevronDown } from 'lucide-react';

interface MainMenuInteractiveCanvasProps {
  deviceViewport: DeviceViewport;
  zoomLevel: number;
  viewMode: 'element' | 'full_header';
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
}

export const MainMenuInteractiveCanvas: React.FC<MainMenuInteractiveCanvasProps> = ({
  deviceViewport,
  zoomLevel,
  viewMode,
  selectedItemId,
  onSelectItem
}) => {
  const { state } = useStoreAppearance();
  const { mainMenu } = state;

  const containerWidthClass =
    deviceViewport === 'mobile'
      ? 'w-[420px]'
      : deviceViewport === 'tablet'
      ? 'w-[768px]'
      : 'w-full max-w-6xl';

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto relative bg-slate-950/60 custom-scrollbar"
      onClick={() => onSelectItem(null)}
    >
      <div
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
        className={`${containerWidthClass} transition-all duration-200`}
      >
        {/* Device Frame Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-slate-400">
              Podgląd Na Żywo: {deviceViewport.toUpperCase()}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 font-mono">
            {viewMode === 'full_header' ? 'Cały nagłówek' : 'Tylko Menu Główne'}
          </span>
        </div>

        {/* Live Canvas Area */}
        <div className="bg-white border-x border-b border-slate-800 rounded-b-xl shadow-2xl overflow-hidden min-h-[140px]">
          {viewMode === 'full_header' ? (
            <StoreHeader />
          ) : (
            <nav
              id="mainmenu-isolated-canvas"
              className="w-full transition-all border-b border-slate-200 p-3"
              style={{
                backgroundColor: mainMenu.backgroundColor || '#ffffff',
                color: mainMenu.textColor || '#1e293b'
              }}
            >
              <div className="flex items-center gap-3 overflow-x-auto">
                {mainMenu.showCategoryDrawerButton !== false && (
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs shrink-0"
                    style={{
                      backgroundColor: mainMenu.categoryButtonBg || '#2563eb',
                      color: mainMenu.categoryButtonTextCol || '#ffffff'
                    }}
                  >
                    <Grid className="w-4 h-4" />
                    <span>{mainMenu.categoryButtonText || 'Wszystkie Kategorie'}</span>
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  </div>
                )}

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {mainMenu.items.filter(i => !i.isHidden).map((item) => {
                    const isSelected = selectedItemId === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item.id);
                        }}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-600/10 text-blue-600 ring-2 ring-blue-500'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className="px-1.5 py-0.2 rounded-full text-[9px] font-bold text-white leading-none"
                            style={{ backgroundColor: item.badgeColor || '#2563eb' }}
                          >
                            {item.badge}
                          </span>
                        )}
                        {(item.type === 'dropdown' || item.type === 'megamenu') && (
                          <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
