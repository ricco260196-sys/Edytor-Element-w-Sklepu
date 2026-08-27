import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { IconRenderer } from '../../common/IconRenderer';
import {
  Sparkles,
  Type,
  Image as ImageIcon,
  Layers,
  Sliders,
  Globe,
  Upload
} from 'lucide-react';

export const POPULAR_LOGO_ICONS = [
  'ShoppingBag',
  'Store',
  'Sparkles',
  'Boxes',
  'Zap',
  'Gem',
  'Award',
  'Layers',
  'ShieldCheck',
  'Compass',
  'Package',
  'Flame',
  'Heart',
  'Truck',
  'CheckCircle2',
  'Home',
  'TrendingUp',
  'Tag',
  'BookOpen',
  'Star',
  'Percent',
  'Building2',
  'Code'
];

export const LogoContentColumn: React.FC = () => {
  const { state, updateLogo } = useStoreAppearance();
  const { logo } = state;

  const [activeTab, setActiveTab] = useState<'type' | 'text' | 'sygnet' | 'seo'>('type');

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200 select-none">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-950 border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('type')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'type'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Typ Logo
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'text'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Treść & Hasło
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sygnet')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'sygnet'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Sygnet / Ikona
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'seo'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          SEO
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: TYPE */}
        {activeTab === 'type' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Format Identyfikacji Wizualnej</h3>
              <p className="text-[11px] text-slate-400">Wybierz sposób prezentacji marki w nagłówku</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => updateLogo({ logoType: 'combined' })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  logo.logoType === 'combined'
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ★
                  </span>
                  <span className="text-xs font-bold">Tekst</span>
                </div>
                <div className="text-[11px] font-semibold text-white">Sygnet + Tekst</div>
              </button>

              <button
                type="button"
                onClick={() => updateLogo({ logoType: 'text' })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  logo.logoType === 'text'
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <Type className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-[11px] font-semibold text-white">Tylko Tekst</div>
              </button>

              <button
                type="button"
                onClick={() => updateLogo({ logoType: 'image' })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  logo.logoType === 'image'
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-[11px] font-semibold text-white">Plik Graficzny</div>
              </button>
            </div>

            {logo.logoType === 'image' && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                  Plik Graficzny Logo (PNG, SVG, WebP)
                </span>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Adres URL grafiki</label>
                  <input
                    type="text"
                    value={logo.imageUrl || ''}
                    onChange={(e) => updateLogo({ imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEXT */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Nazwa Sklepu
              </span>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Tekst główny logo</label>
                <input
                  type="text"
                  value={logo.textName || ''}
                  onChange={(e) => updateLogo({ textName: e.target.value })}
                  placeholder="np. MarketPlace PRO"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-300">Pokaż Hasło / Tagline</span>
                  <input
                    type="checkbox"
                    checked={logo.showTagline || false}
                    onChange={(e) => updateLogo({ showTagline: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-blue-600"
                  />
                </div>

                {logo.showTagline && (
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Tekst hasła pod logo</label>
                    <input
                      type="text"
                      value={logo.tagline || ''}
                      onChange={(e) => updateLogo({ tagline: e.target.value })}
                      placeholder="np. Oficjalny Sklep Multi-Vendor"
                      className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYGNET */}
        {activeTab === 'sygnet' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Wybór Ikony Sygnetu
              </span>

              <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto p-1 bg-slate-900 rounded-lg border border-slate-800">
                {POPULAR_LOGO_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => updateLogo({ iconName: icon })}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                      logo.iconName === icon
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <IconRenderer name={icon} size={16} />
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Rozmiar sygnetu (px): <span className="text-white font-mono">{logo.sygnetSize || 32}px</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="64"
                  value={logo.sygnetSize || 32}
                  onChange={(e) => updateLogo({ sygnetSize: Number(e.target.value) })}
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                SEO & Dostępność (a11y)
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Tekst alternatywny (Alt)</label>
                <input
                  type="text"
                  value={logo.altText || ''}
                  onChange={(e) => updateLogo({ altText: e.target.value })}
                  placeholder="Logo MarketPlace PRO"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Tytuł SEO (Title)</label>
                <input
                  type="text"
                  value={logo.seoTitle || ''}
                  onChange={(e) => updateLogo({ seoTitle: e.target.value })}
                  placeholder="Strona główna sklepu"
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
