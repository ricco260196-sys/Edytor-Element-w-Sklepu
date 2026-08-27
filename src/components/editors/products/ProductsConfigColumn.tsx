import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  ProductGridDisplayMode,
  ProductGridImageAspectRatio,
  ProductGridImageObjectFit,
  ProductGridMultiImageBehavior,
  ProductGridImageHoverEffect,
  ProductGridRadiusPreset,
  ProductGridShadowPreset
} from '../../../types/storeAppearance';
import {
  LayoutGrid,
  Image as ImageIcon,
  Square,
  Type,
  CreditCard,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Link2,
  Unlink2,
  ChevronDown,
  ChevronUp,
  Palette,
  Eye,
  Check,
  RotateCcw
} from 'lucide-react';

export const ProductsConfigColumn: React.FC = () => {
  const { state, updateProductsGrid, triggerToast } = useStoreAppearance();
  const config = state.productsGrid;

  // Active accordion section
  const [activeSection, setActiveSection] = useState<string>('layout');

  const toggleSection = (sec: string) => {
    setActiveSection(prev => (prev === sec ? '' : sec));
  };

  // Color Swatches Helper
  const ColorSwatch: React.FC<{
    value: string;
    onChange: (color: string) => void;
    label?: string;
  }> = ({ value, onChange, label }) => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={value.startsWith('#') ? value : '#2563eb'}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded-lg cursor-pointer border border-slate-700 bg-transparent p-0 overflow-hidden shrink-0"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 px-2 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
      {label && <span className="text-xs text-slate-400 truncate">{label}</span>}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 overflow-y-auto divide-y divide-slate-800">
      {/* 1. UKŁAD I SIATKA */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('layout')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-400" />
            <span>1. Układ i Kolumny Siatki</span>
          </div>
          {activeSection === 'layout' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'layout' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Tryb wyświetlania */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Tryb siatki:</label>
              <select
                value={config.displayMode}
                onChange={(e) => updateProductsGrid({ displayMode: e.target.value as ProductGridDisplayMode })}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value="cards">Standardowe Karty E-Commerce</option>
                <option value="compact_grid">Kompaktowa Siatka (Wysoka gęstość)</option>
                <option value="large_cards">Duże Karty (Showcase / Boutique)</option>
                <option value="grid">Siatka Bezramkowa Minimal</option>
                <option value="list">Pionowa Lista Produktów</option>
                <option value="horizontal_list">Pozioma Karuzela (Scroll)</option>
              </select>
            </div>

            {/* Liczba kolumn Desktop / Tablet / Mobile */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Desktop:</label>
                <select
                  value={config.columnsDesktop}
                  onChange={(e) => updateProductsGrid({ columnsDesktop: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <option value={2}>2 kol.</option>
                  <option value={3}>3 kol.</option>
                  <option value={4}>4 kol.</option>
                  <option value={5}>5 kol.</option>
                  <option value={6}>6 kol.</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Tablet:</label>
                <select
                  value={config.columnsTablet}
                  onChange={(e) => updateProductsGrid({ columnsTablet: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <option value={1}>1 kol.</option>
                  <option value={2}>2 kol.</option>
                  <option value={3}>3 kol.</option>
                  <option value={4}>4 kol.</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Mobile:</label>
                <select
                  value={config.columnsMobile}
                  onChange={(e) => updateProductsGrid({ columnsMobile: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <option value={1}>1 kol.</option>
                  <option value={2}>2 kol.</option>
                </select>
              </div>
            </div>

            {/* Odstępy X i Y */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Odstęp poziomy (X):</span>
                  <span className="font-mono text-blue-400">{config.gapDesktopX}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={config.gapDesktopX}
                  onChange={(e) => updateProductsGrid({ gapDesktopX: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Odstęp pionowy (Y):</span>
                  <span className="font-mono text-blue-400">{config.gapDesktopY}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={config.gapDesktopY}
                  onChange={(e) => updateProductsGrid({ gapDesktopY: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Szerokość kontenera */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Szerokość kontenera:</label>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'full', label: '100%' },
                  { id: 'wide', label: '1400px' },
                  { id: 'standard', label: '1200px' },
                  { id: 'narrow', label: '1000px' }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => updateProductsGrid({ containerWidthPreset: preset.id as any })}
                    className={`py-1.5 text-[11px] rounded-lg font-medium border transition-all ${
                      config.containerWidthPreset === preset.id
                        ? 'bg-blue-600 border-blue-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Padding karty */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span>Marginesy wewnętrzne karty (Padding):</span>
                <button
                  onClick={() => updateProductsGrid({
                    cardPadding: { ...config.cardPadding, isLocked: !config.cardPadding.isLocked }
                  })}
                  className="text-blue-400 hover:text-blue-300"
                  title={config.cardPadding.isLocked ? 'Odłącz proporcje' : 'Połącz wszystkie strony'}
                >
                  {config.cardPadding.isLocked ? <Link2 className="w-3.5 h-3.5" /> : <Unlink2 className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {['top', 'right', 'bottom', 'left'].map((side) => (
                  <div key={side}>
                    <span className="block text-[9px] uppercase text-slate-500 mb-0.5 text-center">{side}</span>
                    <input
                      type="number"
                      min="0"
                      max="48"
                      value={(config.cardPadding as any)[side]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (config.cardPadding.isLocked) {
                          updateProductsGrid({
                            cardPadding: { top: val, right: val, bottom: val, left: val, isLocked: true }
                          });
                        } else {
                          updateProductsGrid({
                            cardPadding: { ...config.cardPadding, [side]: val }
                          });
                        }
                      }}
                      className="w-full p-1.5 text-center text-xs rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. ZDJĘCIE I MEDIA */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('image')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span>2. Zdjęcia Produktu i Efekty</span>
          </div>
          {activeSection === 'image' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'image' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Proporcje Aspect Ratio */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Proporcje kadru zdjęcia:</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: '1:1', label: '1:1 (Kwadrat)' },
                  { id: '4:3', label: '4:3 (Aparat)' },
                  { id: '16:9', label: '16:9 (Panorama)' },
                  { id: '3:4', label: '3:4 (Portret)' },
                  { id: '3:2', label: '3:2 (Klasyk)' },
                  { id: 'circle', label: 'Koło / Avatar' }
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => updateProductsGrid({
                      image: { ...config.image, aspectRatio: ratio.id as ProductGridImageAspectRatio }
                    })}
                    className={`py-1.5 px-2 text-[11px] rounded-lg font-medium border transition-all ${
                      config.image.aspectRatio === ratio.id
                        ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dopasowanie Object-fit */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Dopasowanie (Object-fit):</label>
                <select
                  value={config.image.objectFit}
                  onChange={(e) => updateProductsGrid({
                    image: { ...config.image, objectFit: e.target.value as ProductGridImageObjectFit }
                  })}
                  className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <option value="cover">Wypełnij kadr (Cover)</option>
                  <option value="contain">Całe zdjęcie w ramce (Contain)</option>
                  <option value="fill">Rozciągnij (Fill)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Drugie zdjęcie (Multi-image):</label>
                <select
                  value={config.image.multiImageBehavior}
                  onChange={(e) => updateProductsGrid({
                    image: { ...config.image, multiImageBehavior: e.target.value as ProductGridMultiImageBehavior }
                  })}
                  className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <option value="hover_second">Zamiana na 2. zdjęcie (Hover)</option>
                  <option value="thumbnails">Pasek miniatur</option>
                  <option value="first_only">Zawsze tylko 1. zdjęcie</option>
                </select>
              </div>
            </div>

            {/* Efekt najechania Hover */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Efekt najechania (Hover):</label>
              <select
                value={config.image.hoverEffect}
                onChange={(e) => updateProductsGrid({
                  image: { ...config.image, hoverEffect: e.target.value as ProductGridImageHoverEffect }
                })}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-medium"
              >
                <option value="zoom">Płynny Zoom (+8% powiększenie)</option>
                <option value="scale">Subtelne powiększenie (+4%)</option>
                <option value="fade">Lekkie przyciemnienie (Fade)</option>
                <option value="brightness">Rozjaśnienie blasku</option>
                <option value="grayscale">Efekt czarno-biały</option>
                <option value="none">Brak efektu</option>
              </select>
            </div>

            {/* Zaokrąglenie rogu zdjęcia */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Zaokrąglenie rogów zdjęcia:</span>
                <span className="font-mono text-emerald-400">{config.image.borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={config.image.borderRadius}
                onChange={(e) => updateProductsGrid({
                  image: { ...config.image, borderRadius: Number(e.target.value) }
                })}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. KARTA, TŁO I RAMKI */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('cardStyle')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-indigo-400" />
            <span>3. Styl Karty, Tło, Ramki i Cienie</span>
          </div>
          {activeSection === 'cardStyle' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'cardStyle' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Typ tła */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Typ tła karty:</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'solid', label: 'Jednolite' },
                  { id: 'glass', label: 'Glassmorphism' },
                  { id: 'transparent', label: 'Przezroczyste' }
                ].map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => updateProductsGrid({ backgroundType: bg.id as any })}
                    className={`py-1.5 px-2 text-[11px] rounded-lg font-medium border transition-all ${
                      config.backgroundType === bg.id
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kolor tła */}
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Kolor tła:</label>
              <ColorSwatch
                value={config.backgroundColor}
                onChange={(c) => updateProductsGrid({ backgroundColor: c })}
                label="Tło karty produktu"
              />
            </div>

            {/* Obramowanie */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-slate-400 font-medium">Obramowanie (Border):</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Grubość:</label>
                  <select
                    value={config.border.width}
                    onChange={(e) => updateProductsGrid({
                      border: { ...config.border, width: Number(e.target.value) }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value={0}>Brak (0px)</option>
                    <option value={1}>1 px (Cienka)</option>
                    <option value={2}>2 px (Wyraźna)</option>
                    <option value={3}>3 px (Gruba)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Styl linii:</label>
                  <select
                    value={config.border.style}
                    onChange={(e) => updateProductsGrid({
                      border: { ...config.border, style: e.target.value as any }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value="solid">Ciągła (Solid)</option>
                    <option value="dashed">Kreskowana</option>
                    <option value="dotted">Kropkowana</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Kolor obramowania:</label>
                <ColorSwatch
                  value={config.border.color}
                  onChange={(c) => updateProductsGrid({
                    border: { ...config.border, color: c }
                  })}
                  label="Kolor ramki karty"
                />
              </div>
            </div>

            {/* Zaokrąglenie rogów Border Radius */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Zaokrąglenie rogów karty:</span>
                <span className="font-mono text-indigo-400">{config.border.radiusTopLeft}px</span>
              </div>
              <div className="grid grid-cols-4 gap-1 mb-2">
                {[
                  { label: '0px', val: 0 },
                  { label: '8px', val: 8 },
                  { label: '14px', val: 14 },
                  { label: '20px', val: 20 }
                ].map((rad) => (
                  <button
                    key={rad.val}
                    onClick={() => updateProductsGrid({
                      border: {
                        ...config.border,
                        radiusTopLeft: rad.val,
                        radiusTopRight: rad.val,
                        radiusBottomRight: rad.val,
                        radiusBottomLeft: rad.val
                      }
                    })}
                    className={`py-1 text-[11px] rounded-lg font-mono border transition-all ${
                      config.border.radiusTopLeft === rad.val
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {rad.label}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="36"
                value={config.border.radiusTopLeft}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  updateProductsGrid({
                    border: {
                      ...config.border,
                      radiusTopLeft: val,
                      radiusTopRight: val,
                      radiusBottomRight: val,
                      radiusBottomLeft: val
                    }
                  });
                }}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Cienie Preset */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-slate-400 font-medium mb-1">Cień karty (Shadow):</label>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'none', label: 'Brak' },
                  { id: 'sm', label: 'SM (Delikatny)' },
                  { id: 'md', label: 'MD (Średni)' },
                  { id: 'lg', label: 'LG (Głęboki)' }
                ].map((sh) => (
                  <button
                    key={sh.id}
                    onClick={() => updateProductsGrid({
                      shadow: { ...config.shadow, preset: sh.id as ProductGridShadowPreset }
                    })}
                    className={`py-1.5 text-[11px] rounded-lg font-medium border transition-all ${
                      config.shadow.preset === sh.id
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {sh.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. TYPOGRAFIA I TEKSTY */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('typography')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-amber-400" />
            <span>4. Typografia i Nazwy</span>
          </div>
          {activeSection === 'typography' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'typography' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Tytuł sekcji */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Tytuł nagłówka sekcji:</label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => updateProductsGrid({ title: e.target.value })}
                className="w-full p-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Podtytuł */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Podtytuł sekcji:</label>
              <textarea
                rows={2}
                value={config.subtitle || ''}
                onChange={(e) => updateProductsGrid({ subtitle: e.target.value })}
                className="w-full p-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Nazwa produktu rozmiar i grubość */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="block text-slate-400 font-medium">Nazwa produktu:</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Rozmiar czcionki:</label>
                  <select
                    value={config.nameTypography.fontSizePx}
                    onChange={(e) => updateProductsGrid({
                      nameTypography: { ...config.nameTypography, fontSizePx: Number(e.target.value) }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value={13}>13 px (Kompakt)</option>
                    <option value={14}>14 px (Standard)</option>
                    <option value={15}>15 px (Średni)</option>
                    <option value={16}>16 px (Wyraźny)</option>
                    <option value={18}>18 px (Duży)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Grubość (Weight):</label>
                  <select
                    value={config.nameTypography.fontWeight}
                    onChange={(e) => updateProductsGrid({
                      nameTypography: { ...config.nameTypography, fontWeight: e.target.value as any }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semibold)</option>
                    <option value="700">700 (Bold)</option>
                    <option value="800">800 (Extrabold)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Kolor nazwy:</label>
                <ColorSwatch
                  value={config.nameTypography.color}
                  onChange={(c) => updateProductsGrid({
                    nameTypography: { ...config.nameTypography, color: c }
                  })}
                  label="Kolor tekstu nazwy"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Maksymalna liczba linii tekstu:</label>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3].map((lines) => (
                    <button
                      key={lines}
                      onClick={() => updateProductsGrid({
                        nameTypography: { ...config.nameTypography, maxLines: lines as any }
                      })}
                      className={`py-1 text-xs rounded-lg font-medium border transition-all ${
                        config.nameTypography.maxLines === lines
                          ? 'bg-amber-600 border-amber-500 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {lines} {lines === 1 ? 'linia' : 'linie'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. CENY, WALUTY I ODZNAKI */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('pricing')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-rose-400" />
            <span>5. Ceny, Rabaty i Odznaki</span>
          </div>
          {activeSection === 'pricing' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'pricing' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Rozmiar i kolor ceny */}
            <div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Rozmiar ceny głównej:</label>
                  <select
                    value={config.price.fontSizePx}
                    onChange={(e) => updateProductsGrid({
                      price: { ...config.price, fontSizePx: Number(e.target.value) }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value={16}>16 px</option>
                    <option value={18}>18 px (Standard)</option>
                    <option value={20}>20 px (Wyraźny)</option>
                    <option value={24}>24 px (Mocny)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Pozycja waluty:</label>
                  <select
                    value={config.currency.symbolPosition}
                    onChange={(e) => updateProductsGrid({
                      currency: { ...config.currency, symbolPosition: e.target.value as any }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value="suffix">Po cenie (349 zł)</option>
                    <option value="prefix">Przed ceną (zł 349)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Kolor ceny głównej:</label>
                <ColorSwatch
                  value={config.price.color}
                  onChange={(c) => updateProductsGrid({
                    price: { ...config.price, color: c }
                  })}
                  label="Kolor kwoty produktu"
                />
              </div>
            </div>

            {/* Poprzednia cena przekreślona */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.price.showOldPrice}
                  onChange={(e) => updateProductsGrid({
                    price: { ...config.price, showOldPrice: e.target.checked }
                  })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span className="text-slate-300 font-medium">Pokaż starą cenę (przekreśloną)</span>
              </label>

              {config.price.showOldPrice && (
                <ColorSwatch
                  value={config.price.oldPriceColor}
                  onChange={(c) => updateProductsGrid({
                    price: { ...config.price, oldPriceColor: c }
                  })}
                  label="Kolor starej ceny"
                />
              )}
            </div>

            {/* Badge rabatu -% */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.price.promoDiscountBadge.show}
                  onChange={(e) => updateProductsGrid({
                    price: {
                      ...config.price,
                      promoDiscountBadge: { ...config.price.promoDiscountBadge, show: e.target.checked }
                    }
                  })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span className="text-slate-300 font-medium">Odznaka procentu zniżki (-19%)</span>
              </label>

              {config.price.promoDiscountBadge.show && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Tło odznaki:</label>
                    <ColorSwatch
                      value={config.price.promoDiscountBadge.bgColor}
                      onChange={(c) => updateProductsGrid({
                        price: {
                          ...config.price,
                          promoDiscountBadge: { ...config.price.promoDiscountBadge, bgColor: c }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Kolor tekstu:</label>
                    <ColorSwatch
                      value={config.price.promoDiscountBadge.textColor}
                      onChange={(c) => updateProductsGrid({
                        price: {
                          ...config.price,
                          promoDiscountBadge: { ...config.price.promoDiscountBadge, textColor: c }
                        }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 6. PRZYCISKI AKCJI (KOSZYK / KUP) */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('buttons')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>6. Przyciski Koszyka i Ulubionych</span>
          </div>
          {activeSection === 'buttons' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'buttons' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Przycisk Do koszyka */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.buttons.addToCart.show}
                  onChange={(e) => updateProductsGrid({
                    buttons: {
                      ...config.buttons,
                      addToCart: { ...config.buttons.addToCart, show: e.target.checked }
                    }
                  })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span className="text-slate-300 font-bold">Włącz przycisk „Do koszyka”</span>
              </label>

              {config.buttons.addToCart.show && (
                <>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Etykieta przycisku:</label>
                    <input
                      type="text"
                      value={config.buttons.addToCart.text}
                      onChange={(e) => updateProductsGrid({
                        buttons: {
                          ...config.buttons,
                          addToCart: { ...config.buttons.addToCart, text: e.target.value }
                        }
                      })}
                      className="w-full p-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tło przycisku:</label>
                      <ColorSwatch
                        value={config.buttons.addToCart.bgColor}
                        onChange={(c) => updateProductsGrid({
                          buttons: {
                            ...config.buttons,
                            addToCart: { ...config.buttons.addToCart, bgColor: c }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Kolor tekstu:</label>
                      <ColorSwatch
                        value={config.buttons.addToCart.textColor}
                        onChange={(c) => updateProductsGrid({
                          buttons: {
                            ...config.buttons,
                            addToCart: { ...config.buttons.addToCart, textColor: c }
                          }
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Zaokrąglenie rogów przycisku:</span>
                      <span className="font-mono text-cyan-400">{config.buttons.addToCart.borderRadius}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="24"
                      value={config.buttons.addToCart.borderRadius}
                      onChange={(e) => updateProductsGrid({
                        buttons: {
                          ...config.buttons,
                          addToCart: { ...config.buttons.addToCart, borderRadius: Number(e.target.value) }
                        }
                      })}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Przycisk Wishlist */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.buttons.wishlist.show}
                  onChange={(e) => updateProductsGrid({
                    buttons: {
                      ...config.buttons,
                      wishlist: { ...config.buttons.wishlist, show: e.target.checked }
                    }
                  })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span className="text-slate-300 font-bold">Przycisk Serduszko (Lista życzeń)</span>
              </label>

              {config.buttons.wishlist.show && (
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Położenie ikony:</label>
                  <select
                    value={config.buttons.wishlist.position}
                    onChange={(e) => updateProductsGrid({
                      buttons: {
                        ...config.buttons,
                        wishlist: { ...config.buttons.wishlist, position: e.target.value as any }
                      }
                    })}
                    className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                  >
                    <option value="top_right">Prawy górny róg zdjęcia</option>
                    <option value="top_left">Lewy górny róg zdjęcia</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 7. FILTRY I PAGINACJA */}
      <div className="p-3">
        <button
          onClick={() => toggleSection('filters')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-100 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            <span>7. Filtry, Sortowanie i Paginacja</span>
          </div>
          {activeSection === 'filters' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeSection === 'filters' && (
          <div className="mt-3 space-y-3.5 pl-1 pr-1 text-xs">
            {/* Pasek filtrowania */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sortingFiltering.showFilterBar}
                  onChange={(e) => updateProductsGrid({
                    sortingFiltering: { ...config.sortingFiltering, showFilterBar: e.target.checked }
                  })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span className="text-slate-300 font-medium">Pokaż pasek filtrów kategorii nad siatką</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sortingFiltering.showSortDropdown}
                  onChange={(e) => updateProductsGrid({
                    sortingFiltering: { ...config.sortingFiltering, showSortDropdown: e.target.checked }
                  })}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span className="text-slate-300 font-medium">Pokaż listę rozwijaną sortowania</span>
              </label>
            </div>

            {/* Paginacja */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="block text-slate-400 font-medium">Paginacja produktów:</label>
              <select
                value={config.pagination.type}
                onChange={(e) => updateProductsGrid({
                  pagination: { ...config.pagination, type: e.target.value as any }
                })}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-medium"
              >
                <option value="load_more">Przycisk „Załaduj więcej” (Zalecany)</option>
                <option value="pagination_classic">Klasyczna paginacja numeryczna (1, 2, 3)</option>
                <option value="none">Wyświetl wszystkie od razu</option>
              </select>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Liczba produktów na stronę:</label>
                <select
                  value={config.pagination.itemsPerPage}
                  onChange={(e) => updateProductsGrid({
                    pagination: { ...config.pagination, itemsPerPage: Number(e.target.value) }
                  })}
                  className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
                >
                  <option value={4}>4 produkty</option>
                  <option value={8}>8 produktów</option>
                  <option value={12}>12 produktów</option>
                  <option value={16}>16 produktów</option>
                  <option value={24}>24 produkty</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
