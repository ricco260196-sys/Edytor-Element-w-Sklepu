import React, { useState } from 'react';
import { WidgetInstance } from '../../../types/widgetEditor';
import { WIDGET_LIBRARY_TEMPLATES } from '../../../data/defaultWidgets';
import {
  X,
  Plus,
  LayoutGrid,
  Search
} from 'lucide-react';
import { IconRenderer } from '../../common/IconRenderer';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (template: WidgetInstance) => void;
}

export const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  onAddWidget
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Wszystkie szablony' },
    { id: 'products', label: 'Produkty & Oferty' },
    { id: 'marketing', label: 'Marketing & Promocje' },
    { id: 'trust', label: 'Zaufanie & Opinie' }
  ];

  const filteredTemplates = WIDGET_LIBRARY_TEMPLATES.filter((tpl) => {
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tpl.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && tpl.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Biblioteka Gotowych Widżetów</h3>
              <p className="text-xs text-slate-400">
                Wybierz gotowy szablon widżetu i dostosuj jego styl oraz parametry w edytorze.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and search */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Szukaj widżetu (np. newsletter, polecane, promocja, opinie, zegar)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.type}
              className="group p-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:bg-slate-800/40 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <IconRenderer name={tpl.iconName || 'LayoutGrid'} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {tpl.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{tpl.categoryLabel}</span>
                    </div>
                  </div>

                  {tpl.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {tpl.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {tpl.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                    Układ: {tpl.defaultConfig.layout.direction}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                    Kształt: {tpl.defaultConfig.shape.preset}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                    Cień: {tpl.defaultConfig.shadow.preset}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  // Create a cloned instance with fresh unique ID
                  const newWidget: WidgetInstance = {
                    ...tpl.defaultConfig,
                    id: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                    displayName: `${tpl.name} (Kopia)`
                  };
                  onAddWidget(newWidget);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj ten widżet do sklepu</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Dostępnych szablonów w bibliotece: <strong>{filteredTemplates.length}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
