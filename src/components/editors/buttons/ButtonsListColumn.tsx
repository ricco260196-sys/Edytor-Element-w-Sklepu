import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { InteractiveButtonItem, InteractiveButtonSystemType } from '../../../types/storeAppearance';
import { BUTTON_PRESETS, createDefaultButton } from '../../../data/defaultButtons';
import * as LucideIcons from 'lucide-react';
import {
  Plus,
  Search,
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Layers,
  Palette,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface ButtonsListColumnProps {
  onSelectButton: (buttonId: string) => void;
  selectedButtonId: string;
}

export const ButtonsListColumn: React.FC<ButtonsListColumnProps> = ({
  onSelectButton,
  selectedButtonId
}) => {
  const {
    state,
    updateButtons,
    updateButtonItem,
    addButtonItem,
    deleteButtonItem,
    duplicateButtonItem,
    reorderButtonItems,
    resetButtonItem,
    applyButtonPreset,
    copyButtonStyle,
    pasteButtonStyle,
    buttonClipboardStyle,
    triggerToast
  } = useStoreAppearance();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'system' | 'custom'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [openPresetMenuId, setOpenPresetMenuId] = useState<string | null>(null);

  // New button modal form state
  const [newButtonName, setNewButtonName] = useState('Nowy Przycisk Promocyjny');
  const [newButtonType, setNewButtonType] = useState<InteractiveButtonSystemType>('custom');
  const [newButtonIcon, setNewButtonIcon] = useState('Sparkles');
  const [newButtonPreset, setNewButtonPreset] = useState('modern_blue');

  const items = (state.buttons?.items || []).sort((a, b) => a.order - b.order);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'system') return item.isSystem;
    if (filterType === 'custom') return !item.isSystem;
    return true;
  });

  const renderIcon = (iconName: string) => {
    const IconComp = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <IconComp className="w-4 h-4 shrink-0" />;
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    reorderButtonItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    reorderButtonItems(newItems);
  };

  const handleCreateNewButton = () => {
    if (!newButtonName.trim()) {
      triggerToast('warning', 'Brak nazwy', 'Podaj nazwę dla nowego przycisku.');
      return;
    }
    const newId = `btn_custom_${Date.now().toString(36)}`;
    const created = createDefaultButton(
      newId,
      newButtonName,
      newButtonType,
      newButtonIcon,
      newButtonName,
      undefined,
      false
    );

    // Apply selected starting preset
    const preset = BUTTON_PRESETS.find(p => p.presetKey === newButtonPreset);
    if (preset) {
      const styled = preset.apply(created);
      Object.assign(created, styled);
    }

    addButtonItem(created);
    setShowAddModal(false);
    onSelectButton(newId);
    // Reset modal state
    setNewButtonName('Nowy Przycisk');
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 border-r border-slate-800">
      {/* Header bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-xs shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Elementy & Przyciski
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Zarządzaj interaktywnymi komponentami nagłówka
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj przycisk</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj elementu lub akcji..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-md focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
          />
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Wszystkie ({items.length})
          </button>
          <button
            onClick={() => setFilterType('system')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              filterType === 'system'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Systemowe ({items.filter(i => i.isSystem).length})
          </button>
          <button
            onClick={() => setFilterType('custom')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
              filterType === 'custom'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Własne ({items.filter(i => !i.isSystem).length})
          </button>
        </div>
      </div>

      {/* Button items list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            Brak elementów spełniających kryteria wyszukiwania.
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isSelected = item.id === selectedButtonId;
            const isMenuOpen = openActionMenuId === item.id;
            const isPresetOpen = openPresetMenuId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onSelectButton(item.id)}
                className={`relative rounded-xl border p-2.5 transition-all duration-150 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500/80 shadow-md ring-1 ring-blue-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700'
                } ${!item.visibility.desktop && !item.visibility.tablet && !item.visibility.mobile ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Left: Drag reorder & Icon & Details */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Order up/down buttons */}
                    <div className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-300">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleMoveUp(index); }}
                        disabled={index === 0}
                        className="hover:text-blue-400 disabled:opacity-20 p-0.5"
                        title="Przesuń wyżej"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleMoveDown(index); }}
                        disabled={index === items.length - 1}
                        className="hover:text-blue-400 disabled:opacity-20 p-0.5"
                        title="Przesuń niżej"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Icon preview box */}
                    <div
                      style={{
                        backgroundColor: item.background.type === 'solid' ? item.background.color : '#1e293b',
                        color: item.typography.color || '#ffffff',
                        borderColor: item.border.color || '#334155'
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 shadow-xs"
                    >
                      {renderIcon(item.icon.name)}
                    </div>

                    {/* Button Name & Subtitle info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {item.name}
                        </span>
                        {item.isSystem ? (
                          <span className="px-1.5 py-0.2 text-[9px] font-bold bg-slate-800 text-blue-400 rounded-sm uppercase tracking-wider border border-blue-500/20">
                            System
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-950/60 text-amber-400 rounded-sm uppercase tracking-wider border border-amber-500/20">
                            Własny
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 truncate mt-0.5">
                        <span className="truncate">Tekst: "{item.content.text || '(sama ikona)'}"</span>
                        {item.badge.enabled && (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                            • Badge
                          </span>
                        )}
                        {item.dropdown.enabled && (
                          <span className="text-[10px] text-indigo-400 flex items-center gap-0.5">
                            • Dropdown
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Visibility Eye & 3-dots Context Menu */}
                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Toggle Desktop Visibility */}
                    <button
                      type="button"
                      onClick={() => {
                        const nextVis = !item.visibility.desktop;
                        updateButtonItem(item.id, {
                          visibility: {
                            ...item.visibility,
                            desktop: nextVis,
                            tablet: nextVis,
                            mobile: nextVis
                          }
                        });
                      }}
                      className={`p-1.5 rounded-md transition-colors ${
                        item.visibility.desktop
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                          : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/40'
                      }`}
                      title={item.visibility.desktop ? 'Ukryj w sklepie' : 'Pokaż w sklepie'}
                    >
                      {item.visibility.desktop ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* More actions menu */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenPresetMenuId(null);
                          setOpenActionMenuId(isMenuOpen ? null : item.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                        title="Więcej opcji"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-1 divide-y divide-slate-800 text-xs">
                          <div className="py-1">
                            <button
                              type="button"
                              onClick={() => {
                                copyButtonStyle(item);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-200 hover:bg-blue-600 hover:text-white rounded-lg transition-colors text-left"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Kopiuj styl</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                pasteButtonStyle(item.id);
                                setOpenActionMenuId(null);
                              }}
                              disabled={!buttonClipboardStyle}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-200 hover:bg-blue-600 hover:text-white disabled:opacity-40 rounded-lg transition-colors text-left"
                            >
                              <Palette className="w-3.5 h-3.5" />
                              <span>Wklej styl</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                duplicateButtonItem(item.id);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-200 hover:bg-blue-600 hover:text-white rounded-lg transition-colors text-left"
                            >
                              <Layers className="w-3.5 h-3.5" />
                              <span>Duplikuj element</span>
                            </button>
                          </div>

                          {/* Quick Presets Submenu */}
                          <div className="py-1">
                            <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                              Gotowe Presety Stylu
                            </div>
                            {BUTTON_PRESETS.map((preset) => (
                              <button
                                key={preset.presetKey}
                                type="button"
                                onClick={() => {
                                  applyButtonPreset(item.id, preset.presetKey);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center justify-between px-2.5 py-1 text-slate-300 hover:bg-slate-800 hover:text-white rounded transition-colors text-left"
                              >
                                <span>{preset.name}</span>
                                <Sparkles className="w-3 h-3 text-blue-400" />
                              </button>
                            ))}
                          </div>

                          <div className="py-1">
                            <button
                              type="button"
                              onClick={() => {
                                resetButtonItem(item.id);
                                setOpenActionMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-left"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Przywróć domyślne</span>
                            </button>
                            {!item.isSystem && (
                              <button
                                type="button"
                                onClick={() => {
                                  deleteButtonItem(item.id);
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-rose-400 hover:bg-rose-950/60 hover:text-rose-200 rounded-lg transition-colors text-left"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Usuń element</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Button Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Stwórz nowy przycisk interaktywny
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dodaj unikalny przycisk lub element akcji do nagłówka
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nazwa / Etykieta elementu
                </label>
                <input
                  type="text"
                  value={newButtonName}
                  onChange={(e) => setNewButtonName(e.target.value)}
                  placeholder="np. Wyprzedaż -50%, Kontakt VIP, Pytanie..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Styl początkowy (Preset)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BUTTON_PRESETS.map((preset) => (
                    <div
                      key={preset.presetKey}
                      onClick={() => setNewButtonPreset(preset.presetKey)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        newButtonPreset === preset.presetKey
                          ? 'border-blue-500 bg-blue-600/10 text-white'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-xs text-slate-200">{preset.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{preset.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Domyślna ikona
                </label>
                <div className="flex items-center gap-2">
                  {['Sparkles', 'Gift', 'Tag', 'Phone', 'HelpCircle', 'Flame', 'Zap', 'Star'].map((ico) => (
                    <button
                      key={ico}
                      type="button"
                      onClick={() => setNewButtonIcon(ico)}
                      className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
                        newButtonIcon === ico
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {renderIcon(ico)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleCreateNewButton}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-500/20"
              >
                Utwórz i edytuj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
