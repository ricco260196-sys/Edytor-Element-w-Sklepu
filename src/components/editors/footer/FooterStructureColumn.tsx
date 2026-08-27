import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  FooterSectionItem,
  FooterPresetStyleName
} from '../../../types/footerEditor';
import { FOOTER_PRESETS } from '../../../data/defaultFooters';
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  ClipboardCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Mail,
  PhoneCall,
  Share2,
  Link,
  Building2,
  FileText,
  Power,
  Sliders,
  MoveUp,
  MoveDown
} from 'lucide-react';

interface FooterStructureColumnProps {
  onOpenAddModal: () => void;
  activeConfigTab: string;
  setActiveConfigTab: (tab: string) => void;
}

export const FooterStructureColumn: React.FC<FooterStructureColumnProps> = ({
  onOpenAddModal,
  activeConfigTab,
  setActiveConfigTab
}) => {
  const {
    state,
    updateFooter,
    resetFooter,
    applyFooterPreset,
    copyFooterStyle,
    pasteFooterStyle,
    footerClipboardStyle,
    selectedFooterSectionId,
    setSelectedFooterSectionId
  } = useStoreAppearance();

  const footer = state.footer;
  const [showPresetsDropdown, setShowPresetsDropdown] = useState(false);

  const presetList: { id: FooterPresetStyleName; name: string; desc: string; badge?: string }[] = [
    { id: 'modern', name: 'Modern Dark Indigo', desc: 'Głęboki grafit, błękitne akcenty, zaokrąglone krawędzie', badge: 'Domyślny' },
    { id: 'premium', name: 'Premium Luxury Gold', desc: 'Czysta czerń, szampańskie złoto, subtelna ramka', badge: 'VIP' },
    { id: 'minimal', name: 'Minimal Monochromatic', desc: 'Czysty, prosty minimalizm, ostre krawędzie' },
    { id: 'clean', name: 'Clean Slate Studio', desc: 'Spokojny grafit, miękkie narożniki' },
    { id: 'dark', name: 'Dark Obsidian Cyber', desc: 'Promienisty gradient, neonowy akcent' },
    { id: 'light', name: 'Light Crisp Paper', desc: 'Jasne tło, ciemny tekst, pastelowe odznaki' },
    { id: 'glass', name: 'Glassmorphism Frost', desc: 'Przeszklona stopka z efektem blur i poświatą' },
    { id: 'elegant', name: 'Editorial Serif', desc: 'Dostojna typografia szeryfowa, ciepły charakter' },
    { id: 'marketplace', name: 'Marketplace Mega Footer', desc: 'Gęsty układ 4-kolumnowy o dużej pojemności' }
  ];

  const handleToggleSectionEnabled = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateFooter(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s)
    }));
  };

  const handleDeleteSection = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateFooter(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const sections = [...footer.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const temp = sections[index];
    sections[index] = sections[targetIndex];
    sections[targetIndex] = temp;

    updateFooter(prev => ({
      ...prev,
      sections
    }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* 1. Header & Switch On/Off */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Stopka Sklepu</h2>
              <span className="text-[10px] text-slate-400">Jeden główny element</span>
            </div>
          </div>

          {/* ON/OFF TOGGLE (Section 2) */}
          <button
            onClick={() => updateFooter(prev => ({ ...prev, enabled: !prev.enabled }))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              footer.enabled
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{footer.enabled ? 'WŁĄCZONA' : 'WYŁĄCZONA'}</span>
          </button>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPresetsDropdown(prev => !prev)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white truncate">
                Styl: {presetList.find(p => p.id === footer.activePreset)?.name || 'Dostosowany'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-700/60 px-1.5 py-0.5 rounded">
              Zmień preset
            </span>
          </button>

          {showPresetsDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1.5 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 space-y-1 max-h-60 overflow-y-auto animate-fadeIn">
              {presetList.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => {
                    applyFooterPreset(preset.id);
                    setShowPresetsDropdown(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    footer.activePreset === preset.id
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      <span>{preset.name}</span>
                      {preset.badge && (
                        <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 rounded font-bold">
                          {preset.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{preset.desc}</p>
                  </div>
                  {footer.activePreset === preset.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Quick Global Style Actions */}
      <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={copyFooterStyle}
            title="Kopiuj pełen styl stopki"
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] transition-colors"
          >
            <Copy className="w-3 h-3 text-slate-400" />
            <span>Kopiuj Styl</span>
          </button>
          <button
            onClick={pasteFooterStyle}
            title="Wklej skopiowany styl"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] transition-colors ${
              footerClipboardStyle
                ? 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30'
                : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ClipboardCheck className="w-3 h-3" />
            <span>Wklej Styl</span>
          </button>
        </div>

        <button
          onClick={() => resetFooter('all')}
          title="Przywróć domyślny wygląd stopki"
          className="flex items-center gap-1 px-2 py-1 bg-slate-800/60 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 rounded-lg text-[11px] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 3. Global Modules & Dynamic Sections List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* BUILT-IN CORE SECTIONS */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
            Główne Moduły Stopki
          </span>
          <div className="space-y-1.5">
            {/* Brand / Logo */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('brand');
                setActiveConfigTab('brand');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'brand' && activeConfigTab === 'brand'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Tożsamość & Logo Sklepu</h4>
                  <span className="text-[10px] text-slate-400">Logo, slogan, opis firmy</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, brand: { ...prev.brand, enabled: !prev.brand.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.brand.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.brand.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Newsletter */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('newsletter');
                setActiveConfigTab('newsletter');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'newsletter' && activeConfigTab === 'newsletter'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Newsletter VIP</h4>
                  <span className="text-[10px] text-slate-400">Pole zapisu i kod rabatowy</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, newsletter: { ...prev.newsletter, enabled: !prev.newsletter.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.newsletter.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.newsletter.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Contact Info */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('contact');
                setActiveConfigTab('contact');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'contact' && activeConfigTab === 'contact'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Centrum Kontaktu</h4>
                  <span className="text-[10px] text-slate-400">Telefon, e-mail, adres biura</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, contact: { ...prev.contact, enabled: !prev.contact.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.contact.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.contact.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Social Media */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('socialMedia');
                setActiveConfigTab('socialMedia');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'socialMedia' && activeConfigTab === 'socialMedia'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-pink-500/15 text-pink-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Social Media</h4>
                  <span className="text-[10px] text-slate-400">FB, IG, TikTok, YT, X</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, enabled: !prev.socialMedia.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.socialMedia.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.socialMedia.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Payment Methods */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('payments');
                setActiveConfigTab('payments');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'payments' && activeConfigTab === 'payments'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Metody Płatności</h4>
                  <span className="text-[10px] text-slate-400">BLIK, Visa, Apple Pay...</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, payments: { ...prev.payments, enabled: !prev.payments.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.payments.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.payments.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Trust Badges */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('trustBadges');
                setActiveConfigTab('trustBadges');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'trustBadges' && activeConfigTab === 'trustBadges'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Gwarancje & Certyfikaty</h4>
                  <span className="text-[10px] text-slate-400">SSL, 30 dni zwrotu, 24h</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, trustBadges: { ...prev.trustBadges, enabled: !prev.trustBadges.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.trustBadges.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.trustBadges.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Bottom Bar */}
            <div
              onClick={() => {
                setSelectedFooterSectionId('bottomBar');
                setActiveConfigTab('bottomBar');
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedFooterSectionId === 'bottomBar' && activeConfigTab === 'bottomBar'
                  ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dolny Pasek & Copyright</h4>
                  <span className="text-[10px] text-slate-400">Prawa autorskie, Regulaminy</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateFooter(prev => ({ ...prev, bottomBar: { ...prev.bottomBar, enabled: !prev.bottomBar.enabled } }));
                }}
                className={`p-1 rounded-lg ${footer.bottomBar.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {footer.bottomBar.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* DYNAMIC LINK COLUMNS */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Kolumny Linków ({footer.sections.length})
            </span>
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold"
            >
              <Plus className="w-3 h-3" />
              <span>Dodaj kolumnę</span>
            </button>
          </div>

          <div className="space-y-1.5">
            {footer.sections.map((section, idx) => {
              const isSelected = selectedFooterSectionId === section.id && activeConfigTab === 'sections';

              return (
                <div
                  key={section.id}
                  onClick={() => {
                    setSelectedFooterSectionId(section.id);
                    setActiveConfigTab('sections');
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-slate-700 text-slate-300 shrink-0">
                      <Link className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{section.title}</h4>
                      <span className="text-[10px] text-slate-400">
                        {section.links?.length || 0} linków • Kolumna {idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Move Up/Down */}
                    <button
                      onClick={(e) => handleMoveSection(idx, 'up', e)}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                    >
                      <MoveUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleMoveSection(idx, 'down', e)}
                      disabled={idx === footer.sections.length - 1}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                    >
                      <MoveDown className="w-3 h-3" />
                    </button>

                    {/* Enable toggle */}
                    <button
                      onClick={(e) => handleToggleSectionEnabled(section.id, e)}
                      className={`p-1 rounded-lg ${section.enabled ? 'text-emerald-400' : 'text-slate-500'}`}
                    >
                      {section.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => handleDeleteSection(section.id, e)}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
