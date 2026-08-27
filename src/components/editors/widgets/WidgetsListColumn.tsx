import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { WidgetInstance } from '../../../types/widgetEditor';
import { WIDGET_STYLE_PRESETS } from '../../../data/defaultWidgets';
import {
  Plus,
  Search,
  Sliders,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Palette,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import { IconRenderer } from '../../common/IconRenderer';
import { AddWidgetModal } from './AddWidgetModal';

interface WidgetsListColumnProps {
  onSelectWidget: (widgetId: string) => void;
}

export const WidgetsListColumn: React.FC<WidgetsListColumnProps> = ({
  onSelectWidget
}) => {
  const {
    state,
    selectedWidgetId,
    setSelectedWidgetId,
    addWidget,
    removeWidget,
    toggleWidgetEnabled,
    duplicateWidget,
    applyWidgetPreset,
    copyWidgetStyle,
    pasteWidgetStyle,
    widgetClipboardStyle,
    resetWidget,
    updateWidgetsManager,
    triggerToast
  } = useStoreAppearance();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPresetsDropdown, setShowPresetsDropdown] = useState(false);

  const widgetsList: WidgetInstance[] = state.widgets?.widgets || [];

  const filteredWidgets = widgetsList.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'active') return matchesSearch && w.enabled;
    if (filterType === 'inactive') return matchesSearch && !w.enabled;
    return matchesSearch;
  });

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.widgets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `widgets_configuration_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('success', 'Wyeksportowano konfigurację', 'Pobrano plik JSON ze wszystkimi widżetami.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && Array.isArray(parsed.widgets)) {
            updateWidgetsManager(parsed);
            triggerToast('success', 'Zaimportowano konfigurację', `Wczytano pomyślnie ${parsed.widgets.length} widżetów.`);
          } else {
            triggerToast('error', 'Błąd pliku JSON', 'Nieprawidłowa struktura pliku konfiguracyjnego widżetów.');
          }
        } catch (err) {
          triggerToast('error', 'Błąd parsowania JSON', 'Plik nie jest poprawnym formatem JSON.');
        }
      };
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/70 border-r border-slate-800/80 select-none">
      {/* Header & Quick Action Buttons */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Widżety w Sklepie ({widgetsList.length})
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportJSON}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Eksportuj konfigurację do JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <label
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Importuj konfigurację z JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>

        {/* Add Widget Button */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Dodaj nowy widżet z biblioteki</span>
        </button>
      </div>

      {/* Global Presets Bar */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px] font-semibold text-slate-300">Styl widżetu:</span>
        </div>

        <div className="flex items-center gap-1">
          {selectedWidgetId && (
            <button
              type="button"
              onClick={() => copyWidgetStyle(selectedWidgetId)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium flex items-center gap-1 transition-colors"
              title="Kopiuj wygląd zaznaczonego widżetu"
            >
              <Copy className="w-3 h-3" />
              <span>Kopiuj</span>
            </button>
          )}

          {selectedWidgetId && (
            <button
              type="button"
              disabled={!widgetClipboardStyle}
              onClick={() => pasteWidgetStyle(selectedWidgetId)}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 text-[10px] font-medium flex items-center gap-1 transition-colors"
              title="Wklej skopiowany wygląd"
            >
              <Sparkles className="w-3 h-3" />
              <span>Wklej</span>
            </button>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-3 border-b border-slate-800/80 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtruj widżety..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-colors ${
              filterType === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Wszystkie ({widgetsList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('active')}
            className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-colors ${
              filterType === 'active' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Aktywne ({widgetsList.filter((w) => w.enabled).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('inactive')}
            className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-colors ${
              filterType === 'inactive' ? 'bg-slate-800 text-rose-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Wyłączone ({widgetsList.filter((w) => !w.enabled).length})
          </button>
        </div>
      </div>

      {/* Widget Cards List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredWidgets.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs">
            Nie znaleziono widżetów spełniających kryteria.
          </div>
        ) : (
          filteredWidgets.map((w) => {
            const isSelected = w.id === selectedWidgetId;

            return (
              <div
                key={w.id}
                onClick={() => {
                  setSelectedWidgetId(w.id);
                  onSelectWidget(w.id);
                }}
                className={`group p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300 group-hover:text-white'
                      }`}
                    >
                      <IconRenderer name={w.icon?.iconName || 'Layers'} className="w-4 h-4" />
                    </div>

                    <div className="truncate">
                      <h4
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-blue-300' : 'text-slate-200'
                        }`}
                      >
                        {w.displayName || w.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {w.type}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Enabled / Disabled Switch */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWidgetEnabled(w.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      w.enabled
                        ? 'text-emerald-400 hover:bg-emerald-500/10'
                        : 'text-slate-600 hover:bg-slate-800'
                    }`}
                    title={w.enabled ? 'Widżet aktywny (kliknij aby ukryć)' : 'Widżet ukryty (kliknij aby aktywować)'}
                  >
                    {w.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bottom stats & action bar */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {w.shape.preset}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {w.shadow.preset}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateWidget(w.id);
                      }}
                      className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors"
                      title="Duplikuj widżet"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetWidget(w.id);
                      }}
                      className="p-1 rounded hover:bg-slate-800 hover:text-amber-400 transition-colors"
                      title="Resetuj styl widżetu do wartości początkowych"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Czy na pewno chcesz usunąć widżet "${w.displayName}"?`)) {
                          removeWidget(w.id);
                        }
                      }}
                      className="p-1 rounded hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                      title="Usuń widżet"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Preset Fast Picker Footer */}
      {selectedWidgetId && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/90">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gotowe Presety Stylu
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {Object.entries(WIDGET_STYLE_PRESETS).slice(0, 6).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyWidgetPreset(selectedWidgetId, key)}
                className="py-1 px-2 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-800 text-[10px] font-medium text-slate-300 truncate transition-colors text-center"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Widget Modal */}
      <AddWidgetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWidget={addWidget}
      />
    </div>
  );
};
