import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  TopBarZone,
  TopBarElementCustomSetting,
  TopBarSocialItem
} from '../../../types/storeAppearance';
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Tag,
  Type,
  Phone,
  Mail,
  MapPin,
  Clock,
  LogIn,
  UserPlus,
  Share2,
  Sliders,
  ShoppingBag,
  Heart,
  User,
  Copy,
  ClipboardCheck,
  Lock,
  Unlock,
  Columns,
  Smartphone,
  Monitor,
  Tablet,
  Code2
} from 'lucide-react';

interface TopBarContentColumnProps {
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
}

export interface AvailableTopbarElementMeta {
  id: string;
  label: string;
  iconName: string;
  category: 'Marketing' | 'Treść' | 'Kontakt' | 'Przyciski & Akcje' | 'Społeczność' | 'Strukturalne';
  defaultText: string;
  defaultLink: string;
  defaultBadge?: string;
}

export const AVAILABLE_TOPBAR_ELEMENTS: AvailableTopbarElementMeta[] = [
  {
    id: 'promo',
    label: 'Promocja / Ogłoszenie',
    iconName: 'Tag',
    category: 'Marketing',
    defaultText: '🔥 Darmowa dostawa od 200 zł!',
    defaultLink: '/promocje',
    defaultBadge: 'HIT'
  },
  {
    id: 'text',
    label: 'Tekst informacyjny',
    iconName: 'Type',
    category: 'Treść',
    defaultText: 'Witaj w oficjalnym sklepie Marketplace Pro!',
    defaultLink: ''
  },
  {
    id: 'phone',
    label: 'Numer telefonu',
    iconName: 'Phone',
    category: 'Kontakt',
    defaultText: '+48 515 444 577',
    defaultLink: 'tel:515444577'
  },
  {
    id: 'email',
    label: 'Adres e-mail',
    iconName: 'Mail',
    category: 'Kontakt',
    defaultText: 'kontakt@openmarket.pl',
    defaultLink: 'mailto:kontakt@openmarket.pl'
  },
  {
    id: 'location',
    label: 'Lokalizacja / Salon',
    iconName: 'MapPin',
    category: 'Kontakt',
    defaultText: 'Warszawa, Polska',
    defaultLink: '/salony'
  },
  {
    id: 'hours',
    label: 'Godziny otwarcia',
    iconName: 'Clock',
    category: 'Kontakt',
    defaultText: 'Pn-Pt: 8:00 - 18:00',
    defaultLink: ''
  },
  {
    id: 'login',
    label: 'Przycisk Logowania',
    iconName: 'LogIn',
    category: 'Przyciski & Akcje',
    defaultText: 'Zaloguj się',
    defaultLink: '/login'
  },
  {
    id: 'register',
    label: 'Przycisk Rejestracji',
    iconName: 'UserPlus',
    category: 'Przyciski & Akcje',
    defaultText: 'Rejestracja',
    defaultLink: '/register'
  },
  {
    id: 'account',
    label: 'Moje Konto',
    iconName: 'User',
    category: 'Przyciski & Akcje',
    defaultText: 'Moje Konto',
    defaultLink: '/konto'
  },
  {
    id: 'cart',
    label: 'Mini Koszyk',
    iconName: 'ShoppingBag',
    category: 'Przyciski & Akcje',
    defaultText: 'Koszyk (0)',
    defaultLink: '/koszyk'
  },
  {
    id: 'wishlist',
    label: 'Lista Życzeń / Schowek',
    iconName: 'Heart',
    category: 'Przyciski & Akcje',
    defaultText: 'Schowek (0)',
    defaultLink: '/schowek'
  },
  {
    id: 'social',
    label: 'Social Media (Ikony)',
    iconName: 'Share2',
    category: 'Społeczność',
    defaultText: 'Social Media',
    defaultLink: ''
  },
  {
    id: 'separator',
    label: 'Separator / Linia pionowa',
    iconName: 'Code2',
    category: 'Strukturalne',
    defaultText: '|',
    defaultLink: ''
  }
];

export const TopBarContentColumn: React.FC<TopBarContentColumnProps> = ({
  selectedElementId,
  onSelectElement
}) => {
  const { state, updateTopBar, triggerToast } = useStoreAppearance();
  const { topBar } = state;

  const [activeTab, setActiveTab] = useState<'zones' | 'library' | 'element' | 'social'>('zones');
  const [copiedStyle, setCopiedStyle] = useState<TopBarElementCustomSetting | null>(null);
  const [selectedTargetZoneForAdd, setSelectedTargetZoneForAdd] = useState<string>('');

  const zones: TopBarZone[] = topBar.zones || [];
  const elementSettings: Record<string, TopBarElementCustomSetting> = topBar.elementSettings || {};
  const socialItems: TopBarSocialItem[] = topBar.socialItems || [];

  const updateElementSetting = (elementId: string, updates: Partial<TopBarElementCustomSetting>) => {
    const updated = {
      ...elementSettings,
      [elementId]: {
        ...(elementSettings[elementId] || {}),
        ...updates
      }
    };
    updateTopBar({ elementSettings: updated });
  };

  const handleAddZone = () => {
    if (zones.length >= 6) {
      triggerToast('warning', 'Limit stref', 'Osiągnięto maksymalną zalecaną liczbę 6 stref.');
      return;
    }

    const newZoneIndex = zones.length + 1;
    const newZoneId = `zone-${Date.now()}`;
    const newWidth = Math.floor(100 / (zones.length + 1));

    const rebalancedZones = zones.map(z => ({
      ...z,
      width: newWidth
    }));

    const newZone: TopBarZone = {
      id: newZoneId,
      name: `Strefa ${newZoneIndex}`,
      width: 100 - newWidth * zones.length,
      widthType: 'percent',
      align: 'center',
      verticalAlign: 'center',
      direction: 'row',
      flexWrap: 'nowrap',
      gap: 8,
      paddingX: 8,
      isLocked: false,
      isHidden: false,
      elements: []
    };

    updateTopBar({ zones: [...rebalancedZones, newZone] });
    triggerToast('success', 'Dodano strefę', `Utworzono strefę ${newZone.name}.`);
  };

  const handleRemoveZone = (zoneId: string) => {
    if (zones.length <= 1) {
      triggerToast('warning', 'Ostatnia strefa', 'Pasek górny musi posiadać przynajmniej 1 strefę.');
      return;
    }

    const filtered = zones.filter(z => z.id !== zoneId);
    const redistributedWidth = Math.floor(100 / filtered.length);
    const remainder = 100 - redistributedWidth * filtered.length;

    const updatedZones = filtered.map((z, idx) => ({
      ...z,
      width: redistributedWidth + (idx === 0 ? remainder : 0)
    }));

    updateTopBar({ zones: updatedZones });
    triggerToast('info', 'Usunięto strefę', 'Strefa została usunięta.');
  };

  const handleUpdateZone = (zoneId: string, updates: Partial<TopBarZone>) => {
    const updatedZones = zones.map(z => (z.id === zoneId ? { ...z, ...updates } : z));
    updateTopBar({ zones: updatedZones });
  };

  const handleAddElementToZone = (elementMeta: AvailableTopbarElementMeta) => {
    const zoneId = selectedTargetZoneForAdd || (zones[0] ? zones[0].id : '');
    if (!zoneId) {
      triggerToast('warning', 'Brak strefy', 'Najpierw wybierz strefę docelową.');
      return;
    }

    const isAlreadyInAnyZone = zones.some(z => z.elements.some(e => e.id === elementMeta.id));
    const finalElementId = isAlreadyInAnyZone ? `${elementMeta.id}-${Date.now().toString().slice(-4)}` : elementMeta.id;

    if (!elementSettings[finalElementId]) {
      elementSettings[finalElementId] = {
        customText: elementMeta.defaultText,
        customLink: elementMeta.defaultLink,
        customBadge: elementMeta.defaultBadge,
        target: '_self',
        action: 'link'
      };
    }

    const newZones = zones.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          elements: [...z.elements, { id: finalElementId, enabled: true }]
        };
      }
      return z;
    });

    updateTopBar({
      zones: newZones,
      elementSettings: { ...elementSettings }
    });

    onSelectElement(finalElementId);
    setActiveTab('element');
    triggerToast('success', 'Dodano element', `Element "${elementMeta.label}" został dodany do strefy.`);
  };

  const handleDeleteElement = (zoneId: string, elemId: string) => {
    const newZones = zones.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          elements: z.elements.filter(e => e.id !== elemId)
        };
      }
      return z;
    });

    updateTopBar({ zones: newZones });
    if (selectedElementId === elemId) {
      onSelectElement(null);
    }
  };

  const handleToggleElement = (zoneId: string, elemId: string) => {
    const newZones = zones.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          elements: z.elements.map(e => (e.id === elemId ? { ...e, enabled: !e.enabled } : e))
        };
      }
      return z;
    });

    updateTopBar({ zones: newZones });
  };

  const handleCopyStyle = (elemId: string) => {
    const settings = elementSettings[elemId] || {};
    setCopiedStyle({ ...settings });
    triggerToast('success', 'Skopiowano styl', 'Styl elementu zapisany w schowku.');
  };

  const handlePasteStyle = (targetElemId: string) => {
    if (!copiedStyle) {
      triggerToast('warning', 'Brak stylu', 'Najpierw skopiuj styl z innego elementu.');
      return;
    }

    const targetCurrent = elementSettings[targetElemId] || {};
    const merged: TopBarElementCustomSetting = {
      ...targetCurrent,
      customColor: copiedStyle.customColor,
      customBgColor: copiedStyle.customBgColor,
      customHoverColor: copiedStyle.customHoverColor,
      customBorderRadius: copiedStyle.customBorderRadius,
      customPadding: copiedStyle.customPadding,
      customFontSize: copiedStyle.customFontSize,
      customFontWeight: copiedStyle.customFontWeight
    };

    updateElementSetting(targetElemId, merged);
    triggerToast('success', 'Wklejono styl', 'Zastosowano skopiowany styl.');
  };

  const selectedMeta = selectedElementId
    ? AVAILABLE_TOPBAR_ELEMENTS.find(e => selectedElementId.startsWith(e.id)) || {
        id: selectedElementId,
        label: selectedElementId,
        iconName: 'Type',
        category: 'Treść' as const,
        defaultText: '',
        defaultLink: ''
      }
    : null;

  const currentElementSetting = selectedElementId ? elementSettings[selectedElementId] || {} : {};

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 select-none text-slate-200">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-950 border-b border-slate-800 overflow-x-auto gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('zones')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'zones'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Columns className="w-3.5 h-3.5" />
          Strefy ({zones.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('library')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'library'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          Biblioteka
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('element')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'element'
              ? 'bg-blue-600 text-white shadow-sm'
              : selectedElementId
              ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Element {selectedElementId ? '●' : ''}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'social'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          Social
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'zones' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Hierarchia Paska Górnego</h3>
                <p className="text-[11px] text-slate-400">Zarządzaj strefami, szerokościami i elementami</p>
              </div>
              <button
                type="button"
                onClick={handleAddZone}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium flex items-center gap-1 shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Dodaj Strefę
              </button>
            </div>

            {/* Zone Cards */}
            <div className="space-y-3">
              {zones.map((zone, zIndex) => (
                <div
                  key={zone.id}
                  className={`rounded-xl border bg-slate-950/60 p-3 transition-all ${
                    zone.isHidden ? 'opacity-50 border-slate-800' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center">
                        {zIndex + 1}
                      </span>
                      <input
                        type="text"
                        value={zone.name}
                        onChange={(e) => handleUpdateZone(zone.id, { name: e.target.value })}
                        className="bg-transparent text-xs font-semibold text-white focus:bg-slate-800 px-1 py-0.5 rounded border border-transparent focus:border-slate-700 outline-none w-28"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleUpdateZone(zone.id, { isLocked: !zone.isLocked })}
                        className={`p-1 rounded ${
                          zone.isLocked ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-white'
                        }`}
                        title={zone.isLocked ? 'Strefa zablokowana' : 'Zablokuj strefę'}
                      >
                        {zone.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateZone(zone.id, { isHidden: !zone.isHidden })}
                        className={`p-1 rounded ${
                          zone.isHidden ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-white'
                        }`}
                        title={zone.isHidden ? 'Pokaż strefę' : 'Ukryj strefę'}
                      >
                        {zone.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      {zones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveZone(zone.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
                          title="Usuń strefę"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-900/80 p-2 rounded-lg text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">
                        Szerokość: <span className="text-white font-mono">{Math.round(zone.width)}%</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        step="1"
                        disabled={zone.isLocked}
                        value={Math.round(zone.width)}
                        onChange={(e) => handleUpdateZone(zone.id, { width: Number(e.target.value) })}
                        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Wyrównanie</label>
                      <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded">
                        <button
                          type="button"
                          onClick={() => handleUpdateZone(zone.id, { align: 'left' })}
                          className={`flex-1 py-0.5 text-[10px] rounded ${
                            zone.align === 'left' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                          }`}
                        >
                          Lewo
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateZone(zone.id, { align: 'center' })}
                          className={`flex-1 py-0.5 text-[10px] rounded ${
                            zone.align === 'center' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                          }`}
                        >
                          Środek
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateZone(zone.id, { align: 'right' })}
                          className={`flex-1 py-0.5 text-[10px] rounded ${
                            zone.align === 'right' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                          }`}
                        >
                          Prawo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Elements list in zone */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Elementy w strefie ({zone.elements.length})</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTargetZoneForAdd(zone.id);
                          setActiveTab('library');
                        }}
                        className="text-blue-400 hover:text-blue-300 text-[10px] flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Dodaj
                      </button>
                    </div>

                    {zone.elements.length === 0 ? (
                      <div className="text-center py-3 border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
                        Brak elementów w tej strefie
                      </div>
                    ) : (
                      zone.elements.map((elem) => {
                        const meta = AVAILABLE_TOPBAR_ELEMENTS.find(m => elem.id.startsWith(m.id)) || {
                          id: elem.id,
                          label: elem.id,
                          iconName: 'Tag',
                          category: 'Treść' as const,
                          defaultText: '',
                          defaultLink: ''
                        };
                        const isSelected = selectedElementId === elem.id;

                        return (
                          <div
                            key={elem.id}
                            onClick={() => {
                              onSelectElement(elem.id);
                              setActiveTab('element');
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                                : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-slate-400">●</span>
                              <span className="font-medium truncate">{meta.label}</span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleElement(zone.id, elem.id);
                                }}
                                className={`p-1 rounded ${
                                  elem.enabled !== false ? 'text-emerald-400' : 'text-slate-600'
                                }`}
                              >
                                {elem.enabled !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyStyle(elem.id);
                                }}
                                className="p-1 text-slate-400 hover:text-white rounded"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteElement(zone.id, elem.id);
                                }}
                                className="p-1 text-slate-400 hover:text-rose-400 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Biblioteka Elementów</h3>
              <p className="text-[11px] text-slate-400">Kliknij element, aby dodać go do paska górnego</p>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Docelowa strefa:</label>
              <select
                value={selectedTargetZoneForAdd || (zones[0] ? zones[0].id : '')}
                onChange={(e) => setSelectedTargetZoneForAdd(e.target.value)}
                className="w-full bg-slate-900 text-xs text-white border border-slate-700 rounded-md p-1.5 outline-none"
              >
                {zones.map((z, idx) => (
                  <option key={z.id} value={z.id}>
                    {z.name} (Strefa {idx + 1}, {Math.round(z.width)}%)
                  </option>
                ))}
              </select>
            </div>

            {['Marketing', 'Kontakt', 'Przyciski & Akcje', 'Treść', 'Społeczność', 'Strukturalne'].map((cat) => {
              const catElements = AVAILABLE_TOPBAR_ELEMENTS.filter(e => e.category === cat);
              if (catElements.length === 0) return null;

              return (
                <div key={cat} className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cat}</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {catElements.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleAddElementToZone(item)}
                        className="flex items-center justify-between p-2.5 bg-slate-950/80 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500 rounded-lg text-left transition-all group text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white flex items-center justify-center transition-colors">
                            <Plus className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-blue-300">{item.label}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                              {item.defaultText || item.defaultLink || 'Element paska'}
                            </div>
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: ELEMENT INSPECTOR */}
        {activeTab === 'element' && (
          <div className="space-y-4">
            {!selectedElementId ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                <Sliders className="w-8 h-8 mx-auto mb-2 opacity-40 text-blue-400" />
                <p className="font-semibold text-slate-400">Nie wybrano elementu</p>
                <p className="text-[11px] mt-1">Kliknij element na canvasie lub w zakładce Strefy, aby go skonfigurować.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">Konfiguracja Elementu</span>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {selectedMeta ? selectedMeta.label : selectedElementId}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyStyle(selectedElementId)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Kopiuj
                    </button>
                    {copiedStyle && (
                      <button
                        type="button"
                        onClick={() => handlePasteStyle(selectedElementId)}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] flex items-center gap-1"
                      >
                        <ClipboardCheck className="w-3 h-3" /> Wklej
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block">1. Treść & Tekst</span>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Wyświetlany tekst</label>
                    <input
                      type="text"
                      value={currentElementSetting.customText || ''}
                      onChange={(e) => updateElementSetting(selectedElementId, { customText: e.target.value })}
                      placeholder="Wpisz treść..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Odznaka / Badge (opcja)</label>
                      <input
                        type="text"
                        value={currentElementSetting.customBadge || ''}
                        onChange={(e) => updateElementSetting(selectedElementId, { customBadge: e.target.value })}
                        placeholder="np. NOWOŚĆ, HIT"
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Kolor odznaki</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentElementSetting.customBadgeColor || '#ef4444'}
                          onChange={(e) => updateElementSetting(selectedElementId, { customBadgeColor: e.target.value })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-[11px] font-mono text-slate-300">
                          {currentElementSetting.customBadgeColor || '#ef4444'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block">2. Odnośnik & Akcja</span>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Adres URL / Link</label>
                    <input
                      type="text"
                      value={currentElementSetting.customLink || ''}
                      onChange={(e) => updateElementSetting(selectedElementId, { customLink: e.target.value })}
                      placeholder="np. /promocje, tel:515444577..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block">3. Kolory & Kształt</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Kolor tekstu</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentElementSetting.customColor || topBar.textColor || '#ffffff'}
                          onChange={(e) => updateElementSetting(selectedElementId, { customColor: e.target.value })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-[11px] font-mono text-slate-300">
                          {currentElementSetting.customColor || topBar.textColor || '#ffffff'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Kolor ikony</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentElementSetting.iconColor || '#38bdf8'}
                          onChange={(e) => updateElementSetting(selectedElementId, { iconColor: e.target.value })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-[11px] font-mono text-slate-300">
                          {currentElementSetting.iconColor || '#38bdf8'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SOCIAL */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Social Media</h3>
                <p className="text-[11px] text-slate-400">Odnośniki społecznościowe w pasku górnym</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newItems = [...socialItems, { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' }];
                  updateTopBar({ socialItems: newItems });
                }}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Dodaj
              </button>
            </div>

            <div className="space-y-2">
              {socialItems.map((soc, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <select
                      value={soc.platform}
                      onChange={(e) => {
                        const updated = [...socialItems];
                        updated[idx].platform = e.target.value;
                        updated[idx].label = e.target.value;
                        updateTopBar({ socialItems: updated });
                      }}
                      className="bg-slate-900 text-xs text-white border border-slate-700 rounded p-1 outline-none font-semibold uppercase"
                    >
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = socialItems.filter((_, i) => i !== idx);
                        updateTopBar({ socialItems: updated });
                      }}
                      className="text-slate-400 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => {
                      const updated = [...socialItems];
                      updated[idx].url = e.target.value;
                      updateTopBar({ socialItems: updated });
                    }}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
