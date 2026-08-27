import React, { useState } from 'react';
import { FooterSectionItem, FooterSectionType } from '../../../types/footerEditor';
import {
  X,
  Plus,
  Link,
  PhoneCall,
  Share2,
  Mail,
  ShieldCheck,
  CreditCard,
  FileCode,
  Image,
  Check
} from 'lucide-react';

interface AddFooterSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (section: FooterSectionItem) => void;
}

interface SectionTemplate {
  type: FooterSectionType;
  title: string;
  category: string;
  description: string;
  icon: any;
  defaultData: Partial<FooterSectionItem>;
}

export const AddFooterSectionModal: React.FC<AddFooterSectionModalProps> = ({
  isOpen,
  onClose,
  onAddSection
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [customTitle, setCustomTitle] = useState('');

  if (!isOpen) return null;

  const templates: SectionTemplate[] = [
    {
      type: 'links_column',
      title: 'Kolumna Linków — Pomoc i FAQ',
      category: 'Nawigacja',
      description: 'Zestaw odnośników do centrum pomocy, śledzenia paczek, regulaminów i zwrotów.',
      icon: Link,
      defaultData: {
        title: 'Centrum Pomocy & FAQ',
        showTitle: true,
        enabled: true,
        colSpan: 1,
        links: [
          { id: `link_${Date.now()}_1`, text: 'Jak złożyć zamówienie?', url: '/faq/zamowienia' },
          { id: `link_${Date.now()}_2`, text: 'Śledzenie przesyłki', url: '/sledzenie' },
          { id: `link_${Date.now()}_3`, text: 'Koszty i czasy dostawy', url: '/dostawa' },
          { id: `link_${Date.now()}_4`, text: 'Zwroty i reklamacje 30 dni', url: '/zwroty' },
          { id: `link_${Date.now()}_5`, text: 'Kontakt z infolinią', url: '/kontakt' }
        ]
      }
    },
    {
      type: 'links_column',
      title: 'Kolumna Linków — Kategorie i Promocje',
      category: 'Nawigacja',
      description: 'Bezpośrednie przejścia do najpopularniejszych działów produktowych i strefy okazji.',
      icon: Link,
      defaultData: {
        title: 'Popularne Kategorie',
        showTitle: true,
        enabled: true,
        colSpan: 1,
        links: [
          { id: `link_${Date.now()}_1`, text: 'Bestsellery Tygodnia', url: '/bestsellery', badgeText: 'HIT', badgeColor: '#3b82f6' },
          { id: `link_${Date.now()}_2`, text: 'Nowości w ofercie', url: '/nowosci' },
          { id: `link_${Date.now()}_3`, text: 'Elektronika & AGD', url: '/kategoria/elektronika' },
          { id: `link_${Date.now()}_4`, text: 'Moda i Akcesoria', url: '/kategoria/moda' },
          { id: `link_${Date.now()}_5`, text: 'Strefa Wyprzedaży', url: '/outlet', badgeText: '-50%', badgeColor: '#ef4444' }
        ]
      }
    },
    {
      type: 'links_column',
      title: 'Kolumna Linków — Strefa Sprzedawcy & B2B',
      category: 'Nawigacja',
      description: 'Informacje biznesowe dla partnerów, program afiliacyjny i rejestracja sprzedawców.',
      icon: Link,
      defaultData: {
        title: 'Dla Biznesu i Sprzedawców',
        showTitle: true,
        enabled: true,
        colSpan: 1,
        links: [
          { id: `link_${Date.now()}_1`, text: 'Otwórz konto Sprzedawcy', url: '/sprzedawaj', badgeText: 'PRO', badgeColor: '#10b981' },
          { id: `link_${Date.now()}_2`, text: 'Cennik prowizji', url: '/prowizje' },
          { id: `link_${Date.now()}_3`, text: 'Integracja API i Hurtownie', url: '/api' },
          { id: `link_${Date.now()}_4`, text: 'Program Partnerski / Afiliacja', url: '/afiliacja' },
          { id: `link_${Date.now()}_5`, text: 'Reklama na portalu', url: '/reklama' }
        ]
      }
    },
    {
      type: 'contact_info',
      title: 'Moduł Danych Kontaktowych',
      category: 'Informacje',
      description: 'Bezpośredni numer telefonu, adres mailowy, adres biura oraz godziny pracy.',
      icon: PhoneCall,
      defaultData: {
        title: 'Biuro Obsługi Klienta',
        showTitle: true,
        enabled: true,
        colSpan: 1,
        customText: 'Jesteśmy do Twojej dyspozycji od poniedziałku do piątku w godzinach 8:00 - 18:00.'
      }
    },
    {
      type: 'custom_html',
      title: 'Własny Blok Tekstowy / Notka Prawna',
      category: 'Treść',
      description: 'Elastyczny moduł z dowolnym tekstem, regulaminem, informacją o kapitale zakładowym.',
      icon: FileCode,
      defaultData: {
        title: 'O Platformie Handlowej',
        showTitle: true,
        enabled: true,
        colSpan: 1,
        customText: 'MarketPlace Pro Sp. z o.o. z siedzibą w Warszawie, wpisana do rejestru przedsiębiorców KRS 0000123456, NIP: 123-456-78-90. Kapitał zakładowy: 1 000 000 PLN.'
      }
    }
  ];

  const handleCreate = () => {
    const template = templates[selectedTemplateIndex];
    const newSection: FooterSectionItem = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type: template.type,
      title: customTitle.trim() || template.defaultData.title || template.title,
      showTitle: template.defaultData.showTitle ?? true,
      enabled: true,
      order: Date.now(),
      colSpan: template.defaultData.colSpan || 1,
      links: template.defaultData.links ? JSON.parse(JSON.stringify(template.defaultData.links)) : [],
      customText: template.defaultData.customText || '',
      customHtml: template.defaultData.customHtml || ''
    };

    onAddSection(newSection);
    onClose();
    setCustomTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Dodaj Nową Sekcję do Stopki</h2>
              <p className="text-xs text-slate-400">Wybierz gotowy szablon kolumny lub skonfiguruj własny blok</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Wybierz Szablon Sekcji
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates.map((template, idx) => {
                const IconComponent = template.icon;
                const isSelected = selectedTemplateIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedTemplateIndex(idx);
                      setCustomTitle(template.defaultData.title || template.title);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white line-clamp-1">{template.title}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Tytuł Nagłówka Sekcji (Widoczny w Stopce)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Wpisz nazwę nagłówka..."
              className="w-full px-3.5 py-2 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/40">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj Kolumnę do Stopki</span>
          </button>
        </div>
      </div>
    </div>
  );
};
