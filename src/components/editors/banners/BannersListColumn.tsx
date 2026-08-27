import React, { useState, useMemo } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  BannerInstance,
  BannerElementType
} from '../../../types/bannerEditor';
import {
  Search,
  Plus,
  Sliders,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Megaphone,
  Info,
  MousePointerClick,
  Check,
  ChevronRight,
  HelpCircle,
  Clock
} from 'lucide-react';

interface BannersListColumnProps {
  onOpenAddModal: () => void;
  onOpenMainSliderModal: () => void;
}

export const BannersListColumn: React.FC<BannersListColumnProps> = ({
  onOpenAddModal,
  onOpenMainSliderModal
}) => {
  const {
    state,
    selectedBannerId,
    setSelectedBannerId,
    toggleBannerEnabled,
    duplicateBanner,
    removeBanner,
    copyBannerStyle,
    pasteBannerStyle,
    bannerClipboardStyle
  } = useStoreAppearance();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  const banners = state.banners?.items || [];

  const filteredBanners = useMemo(() => {
    return banners.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.title?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedTypeFilter === 'all' || item.type === selectedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [banners, searchQuery, selectedTypeFilter]);

  const getTypeIcon = (type: BannerElementType) => {
    switch (type) {
      case 'image_text':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'image_only':
        return <ImageIcon className="w-4 h-4 text-purple-400" />;
      case 'main_slider_preview':
        return <Sliders className="w-4 h-4 text-amber-400" />;
      case 'promo_banner':
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      case 'marketing_banner':
        return <Megaphone className="w-4 h-4 text-indigo-400" />;
      case 'info_banner':
        return <Info className="w-4 h-4 text-cyan-400" />;
      case 'cta_banner':
        return <MousePointerClick className="w-4 h-4 text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTypeName = (type: BannerElementType) => {
    switch (type) {
      case 'image_text':
        return 'Obrazek + Opis';
      case 'image_only':
        return 'Tylko Obraz';
      case 'banner':
        return 'Baner';
      case 'main_slider_preview':
        return 'Główny Slider';
      case 'promo_banner':
        return 'Promocja';
      case 'marketing_banner':
        return 'Marketing';
      case 'info_banner':
        return 'Informacja';
      case 'cta_banner':
        return 'CTA / Akcja';
      default:
        return 'Baner';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border-r border-slate-800 text-slate-200">
      {/* Header & Add Button */}
      <div className="p-4 border-b border-slate-800 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Elementy & Banery</span>
            </h2>
            <p className="text-xs text-slate-400">Biblioteka komponentów wizualnych</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-blue-400 border border-slate-700">
            {banners.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Dodaj nowy element</span>
        </button>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Szukaj elementu lub tytułu..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
          {[
            { id: 'all', label: 'Wszystkie' },
            { id: 'image_and_text', label: 'Obrazek + Opis' },
            { id: 'image_only', label: 'Obraz' },
            { id: 'promo_banner', label: 'Promocje' },
            { id: 'main_slider_preview', label: 'Główny Slider' },
            { id: 'info_banner', label: 'Informacyjne' },
            { id: 'cta_banner', label: 'CTA' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTypeFilter(tab.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedTypeFilter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredBanners.map(item => {
          const isSelected = selectedBannerId === item.id;
          const isMainSlider = item.type === 'main_slider_preview' || item.isSystemMainSlider;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedBannerId(item.id)}
              className={`group relative rounded-xl border transition-all duration-200 cursor-pointer p-3 ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/40'
                  : item.enabled
                  ? 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700 hover:bg-slate-800/50'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-60 hover:opacity-100'
              }`}
            >
              {/* Item Top Row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">
                        {item.displayName || item.name}
                      </span>
                      {isMainSlider && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                          Podgląd
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {getTypeName(item.type)} &bull; {item.shape.preset}
                    </span>
                  </div>
                </div>

                {/* Status Toggle */}
                <button
                  type="button"
                  title={item.enabled ? 'Aktywny' : 'Wyłączony'}
                  onClick={e => {
                    e.stopPropagation();
                    toggleBannerEnabled(item.id);
                  }}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    item.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {item.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Thumbnail / Image Preview snippet */}
              {item.image?.url && (
                <div className="mt-2 relative h-12 w-full rounded-lg overflow-hidden border border-slate-800/80 bg-slate-900">
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent flex items-center px-2.5">
                    <span className="text-[11px] font-semibold text-white drop-shadow truncate max-w-[200px]">
                      {item.content.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Toolbar on Hover / Selection */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="Kopiuj styl"
                    onClick={e => {
                      e.stopPropagation();
                      copyBannerStyle(item.id);
                    }}
                    className="p-1 rounded hover:bg-slate-800 hover:text-slate-200 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                  </button>

                  <button
                    type="button"
                    title="Wklej styl"
                    disabled={!bannerClipboardStyle}
                    onClick={e => {
                      e.stopPropagation();
                      pasteBannerStyle(item.id);
                    }}
                    className={`p-1 rounded cursor-pointer ${
                      bannerClipboardStyle
                        ? 'hover:bg-slate-800 text-blue-400 hover:text-blue-300'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </button>

                  {!isMainSlider && (
                    <button
                      type="button"
                      title="Duplikuj element"
                      onClick={e => {
                        e.stopPropagation();
                        duplicateBanner(item.id);
                      }}
                      className="p-1 rounded hover:bg-slate-800 hover:text-slate-200 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}

                  {!isMainSlider && (
                    <button
                      type="button"
                      title="Usuń element"
                      onClick={e => {
                        e.stopPropagation();
                        removeBanner(item.id);
                      }}
                      className="p-1 rounded hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isMainSlider ? (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onOpenMainSliderModal();
                    }}
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Konfiguruj slider</span>
                  </button>
                ) : (
                  <span className="flex items-center gap-0.5 text-blue-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Edytuj wygląd</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredBanners.length === 0 && (
          <div className="p-6 text-center text-slate-500 space-y-2 border border-dashed border-slate-800 rounded-xl">
            <Layers className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-xs">Brak elementów spełniających kryteria.</p>
          </div>
        )}
      </div>

      {/* Educational Footer Note */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800 shrink-0 text-[11px] text-slate-400 flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="leading-tight">
          <strong className="text-slate-200 font-medium">Zasada separacji zadań:</strong> Edytor banerów odpowiada za styl wizualny konkretnego elementu. Układ na stronie konfiguruje <em>Edytor układu</em>.
        </p>
      </div>
    </div>
  );
};
