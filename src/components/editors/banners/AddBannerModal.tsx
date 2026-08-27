import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { BannerInstance, BannerElementType } from '../../../types/bannerEditor';
import {
  X,
  Plus,
  Layers,
  Image as ImageIcon,
  Sparkles,
  Megaphone,
  Info,
  MousePointerClick,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface AddBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMainSliderModal: () => void;
}

interface BannerTemplateOption {
  id: string;
  name: string;
  type: BannerElementType;
  description: string;
  category: string;
  previewImg: string;
  badge: string;
  defaultData: Partial<BannerInstance>;
}

const TEMPLATE_OPTIONS: BannerTemplateOption[] = [
  {
    id: 'tmpl_img_text',
    name: 'Obrazek + Opis (Split 50/50)',
    type: 'image_text',
    description: 'Klasyczny, harmonijny podział z dużym zdjęciem produktu po lewej i chwytliwym opisem z CTA po prawej.',
    category: 'Standardowe',
    previewImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    badge: 'Najpopularniejszy',
    defaultData: {
      type: 'image_text',
      content: {
        title: 'Nowa Kolekcja Wiosenna 2026',
        subtitle: 'Odkryj najnowsze trendy modowe stworzone z myślą o elegancji i komforcie.',
        badgeText: 'NOWOŚĆ',
        highlightText: 'Darmowy zwrot do 30 dni'
      },
      layout: {
        direction: 'image_left',
        imageProportion: 45,
        verticalAlign: 'center'
      }
    }
  },
  {
    id: 'tmpl_promo_timer',
    name: 'Baner Promocyjny z Licznikiem Czasu',
    type: 'promo_banner',
    description: 'Dynamiczny baner wyprzedażowy z odliczanym czasem, kodem rabatowym i wstęgą procentową.',
    category: 'Promocje',
    previewImg: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
    badge: 'Wysoka Konwersja',
    defaultData: {
      type: 'promo_banner',
      content: {
        title: 'Błyskawiczna Nocna Wyprzedaż',
        subtitle: 'Skorzystaj z rabatu do -40% na wszystkie produkty z kategorii elektronika.',
        badgeText: 'FLASH SALE',
        discountText: '-40%',
        promoCode: 'NIGHT40'
      },
      visibility: {
        showHeader: true,
        showSubtitle: true,
        showBadge: true,
        showCtaButton: true,
        showImage: true,
        showCountdown: true
      }
    }
  },
  {
    id: 'tmpl_image_only',
    name: 'Pełnoformatowy Baner Graficzny (Obraz)',
    type: 'image_only',
    description: 'Estetyczny baner kładący 100% nacisku na profesjonalną fotografię, z delikatnym hoverem.',
    category: 'Graficzne',
    previewImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
    badge: 'Minimalizm',
    defaultData: {
      type: 'image_only',
      content: {
        title: 'Najnowsza Generacja Technologii',
        subtitle: 'Wydajność bez kompromisów'
      },
      visibility: {
        showHeader: false,
        showSubtitle: false,
        showBadge: false,
        showCtaButton: false,
        showImage: true,
        showCountdown: false
      }
    }
  },
  {
    id: 'tmpl_cta_marketing',
    name: 'Baner Marketingowy / Zapis na Newsletter',
    type: 'marketing_banner',
    description: 'Przyciągający uwagę pasek informacyjny z dużym przyciskiem akcji lub zapisem na promocje.',
    category: 'Marketing',
    previewImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    badge: 'Generowanie Leadów',
    defaultData: {
      type: 'marketing_banner',
      content: {
        title: 'Dołącz do Klubu VIP i odbierz 50 zł',
        subtitle: 'Zapisz się do newslettera i zyskaj natychmiastowy kod rabatowy na pierwsze zamówienie.',
        badgeText: 'KORZYŚĆ'
      },
      cta: {
        show: true,
        text: 'Zapisz się teraz',
        link: '/newsletter',
        iconName: 'Mail',
        iconPosition: 'left',
        width: 'auto',
        position: 'left',
        appearance: {
          bgColor: '#3b82f6',
          textColor: '#ffffff',
          borderRadius: 12,
          borderWidth: 0,
          borderColor: 'transparent',
          shadow: 'sm'
        },
        padding: { top: 12, bottom: 12, left: 24, right: 24 },
        hover: {
          scale: 1.03,
          bgColor: '#2563eb'
        },
        active: {
          scale: 0.98
        }
      }
    }
  },
  {
    id: 'tmpl_info_badge',
    name: 'Baner Informacyjny (Trust / Bezpieczeństwo)',
    type: 'info_banner',
    description: 'Elegancki panel wzmacniający zaufanie klienta — gwarancja, bezpieczeństwo, certyfikaty.',
    category: 'Informacyjne',
    previewImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    badge: 'Zaufanie',
    defaultData: {
      type: 'info_banner',
      content: {
        title: 'Gwarancja 100% Oryginalności i Jakości',
        subtitle: 'Wszystkie produkty pochodzą bezpośrednio od autoryzowanych dystrybutorów.',
        badgeText: 'CERTYFIKAT'
      }
    }
  }
];

export const AddBannerModal: React.FC<AddBannerModalProps> = ({
  isOpen,
  onClose,
  onOpenMainSliderModal
}) => {
  const { addBanner, state } = useStoreAppearance();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TEMPLATE_OPTIONS[0].id);
  const [customName, setCustomName] = useState<string>('');

  if (!isOpen) return null;

  const currentTmpl = TEMPLATE_OPTIONS.find(t => t.id === selectedTemplateId) || TEMPLATE_OPTIONS[0];

  const handleCreate = () => {
    // Base template data
    const baseBanner = state.banners?.items?.[0] || {};

    const newBanner: BannerInstance = {
      ...JSON.parse(JSON.stringify(baseBanner)),
      id: `banner-${Date.now()}`,
      name: customName.trim() || currentTmpl.name,
      displayName: customName.trim() || currentTmpl.name,
      type: currentTmpl.type,
      enabled: true,
      content: {
        ...baseBanner.content,
        ...currentTmpl.defaultData?.content
      },
      layout: {
        ...baseBanner.layout,
        ...currentTmpl.defaultData?.layout
      },
      image: {
        ...baseBanner.image,
        url: currentTmpl.previewImg
      },
      visibility: {
        ...baseBanner.visibility,
        ...currentTmpl.defaultData?.visibility
      },
      cta: {
        ...baseBanner.cta,
        ...currentTmpl.defaultData?.cta
      }
    };

    addBanner(newBanner);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              <span>Dodaj nowy element / baner do sklepu</span>
            </h2>
            <p className="text-xs text-slate-400">
              Wybierz szablon bazowy, który następnie dostosujesz w 3-panelowym edytorze
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Custom Name Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Własna nazwa elementu (opcjonalnie):
            </label>
            <input
              type="text"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              placeholder={currentTmpl.name}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-blue-500 outline-none"
            />
          </div>

          {/* Template Cards */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Wybierz typ i szablon elementu:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEMPLATE_OPTIONS.map(tmpl => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`relative rounded-xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-white leading-tight">
                        {tmpl.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap">
                        {tmpl.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-snug mb-3">
                      {tmpl.description}
                    </p>

                    <div className="h-16 rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950 relative">
                      <img
                        src={tmpl.previewImg}
                        alt={tmpl.name}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Anuluj
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Utwórz i przejdź do edycji</span>
          </button>
        </div>
      </div>
    </div>
  );
};
