import React from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import {
  Layout,
  Sparkles,
  Menu,
  Search,
  MousePointerClick,
  LayoutGrid,
  ShoppingBag,
  Layers,
  Image as ImageIcon,
  Eye,
  Save,
  Send,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface OverviewViewProps {
  onSelectModule: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'categories' | 'products' | 'widgets' | 'banners' | 'footer' | 'overview') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onSelectModule }) => {
  const {
    state,
    setViewMode,
    saveDraft,
    publishSettings,
    resetToFactoryDefaults,
    hasUnsavedChanges
  } = useStoreAppearance();

  const { topBar, logo, mainMenu, searchBar, buttons, categories, productsGrid, widgets, banners, footer } = state;
  const buttonItemsCount = buttons?.items?.length || 0;
  const widgetsCount = widgets?.widgets?.length || 0;
  const activeWidgetsCount = widgets?.widgets?.filter(w => w.enabled)?.length || 0;
  const bannersCount = banners?.items?.length || 0;
  const activeBannersCount = banners?.items?.filter(b => b.enabled)?.length || 0;
  const footerSectionsCount = footer?.sections?.length || 0;

  const modules = [
    {
      id: 'topbar' as const,
      title: '1. Pasek Górny (Top Bar)',
      description: 'Zarządzanie strefami paska, powiadomieniami o promocjach, danymi kontaktowymi i linkami akcji.',
      icon: <Layout className="w-5 h-5" />,
      color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
      activeStatus: topBar.enabled ? 'Aktywny' : 'Wyłączony',
      statusColor: topBar.enabled ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 bg-slate-800'
    },
    {
      id: 'logo' as const,
      title: '2. Logo Sklepu (Brand Identity)',
      description: 'Identyfikacja wizualna sklepu: sygnet wektorowy, typografia, hasło pod logo lub plik graficzny.',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
      activeStatus: logo.logoType === 'combined' ? 'Sygnet + Tekst' : logo.logoType === 'text' ? 'Tylko Tekst' : 'Grafika',
      statusColor: 'text-purple-400 bg-purple-500/10'
    },
    {
      id: 'menu' as const,
      title: '3. Menu Główne (Main Navigation)',
      description: 'Główna belka nawigacyjna, hierarchia kategorii, rozwijane listy, Mega Menu i przycisk szuflady.',
      icon: <Menu className="w-5 h-5" />,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
      activeStatus: `${mainMenu.items.length} pozycji`,
      statusColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'search' as const,
      title: '4. Wyszukiwarka (Smart Search)',
      description: 'Wielofunkcyjne pole szukania produktów z live sugestiami, historią, trendami i filtrem kategorii.',
      icon: <Search className="w-5 h-5" />,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400',
      activeStatus: searchBar.enabled ? 'Aktywna (Live)' : 'Wyłączona',
      statusColor: searchBar.enabled ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 bg-slate-800'
    },
    {
      id: 'buttons' as const,
      title: '5. Przyciski & Elementy Interaktywne',
      description: 'Uniwersalny silnik stylizacji i akcji dla: Koszyk, Ulubione, Powiadomienia, Logowanie, Rejestracja oraz własne przyciski.',
      icon: <MousePointerClick className="w-5 h-5" />,
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400',
      activeStatus: `${buttonItemsCount} elementów`,
      statusColor: 'text-indigo-400 bg-indigo-500/10'
    },
    {
      id: 'categories' as const,
      title: '6. Kategorie – Lista Kategorii',
      description: 'Prezentacja siatki i karuzeli kategorii ze sklepu Marketplace: 11 stylów, kafelki, banery, ikony, badge i efekty hover.',
      icon: <LayoutGrid className="w-5 h-5" />,
      color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
      activeStatus: categories?.enabled ? `Aktywny (${categories.layout.layoutType})` : 'Wyłączony',
      statusColor: categories?.enabled ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 bg-slate-800'
    },
    {
      id: 'products' as const,
      title: '7. Główna Siatka Produktów',
      description: 'Siatka kafelków, galerie zdjęć, warianty, odznaki rabatu, przyciski Do koszyka i szybki podgląd pobierane z bazy marketplace.',
      icon: <ShoppingBag className="w-5 h-5" />,
      color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400',
      activeStatus: productsGrid?.enabled ? `Aktywny (${productsGrid.displayMode})` : 'Wyłączony',
      statusColor: productsGrid?.enabled ? 'text-rose-400 bg-rose-500/10' : 'text-slate-500 bg-slate-800'
    },
    {
      id: 'widgets' as const,
      title: '8. Edytor Widżetów (Styl & Wygląd)',
      description: 'Dostosowywanie wyglądu widżetów: Polecane produkty, Promocje 1 & 2, Newsletter, Zaufanie (Trust Badges), Zegar odliczający i Opinie.',
      icon: <Layers className="w-5 h-5" />,
      color: 'from-fuchsia-500/20 to-fuchsia-600/10 border-fuchsia-500/30 text-fuchsia-400',
      activeStatus: `${activeWidgetsCount}/${widgetsCount} aktywnych`,
      statusColor: activeWidgetsCount > 0 ? 'text-fuchsia-400 bg-fuchsia-500/10' : 'text-slate-500 bg-slate-800'
    },
    {
      id: 'banners' as const,
      title: '9. Edytor Banerów i Sliderów',
      description: 'Prezentacja, kształt, zaokrąglenia, gradienty, układ „obrazek+opis”, efekty wizualne oraz podgląd głównego slidera.',
      icon: <ImageIcon className="w-5 h-5" />,
      color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400',
      activeStatus: `${activeBannersCount}/${bannersCount} aktywnych`,
      statusColor: activeBannersCount > 0 ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 bg-slate-800'
    },
    {
      id: 'footer' as const,
      title: '10. Edytor Stopki Sklepu (Footer)',
      description: 'Jeden główny element: wielokolumnowy układ, brand i logo, odznaki zaufania, metody płatności, newsletter VIP i dolny pasek copyright.',
      icon: <LayoutGrid className="w-5 h-5" />,
      color: 'from-blue-500/20 to-indigo-600/10 border-blue-500/30 text-blue-400',
      activeStatus: footer?.enabled ? `Aktywna (${footerSectionsCount} kolumn)` : 'Wyłączona',
      statusColor: footer?.enabled ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 bg-slate-800'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Studio Wyglądu Sklepu Marketplace Pro</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Centrum Konfiguracji Nagłówka
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Wybierz moduł, aby przejść do 3-kolumnowego edytora czasu rzeczywistego (Elementor / Visual Builder).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('storefront')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all shadow-sm"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Podgląd Sklepu (Live)</span>
            </button>

            <button
              onClick={publishSettings}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Publikuj w Sklepie</span>
            </button>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`p-6 rounded-2xl border bg-gradient-to-br ${mod.color} hover:scale-[1.01] cursor-pointer transition-all duration-200 shadow-xl flex flex-col justify-between group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-sm text-white group-hover:bg-blue-600 transition-colors">
                    {mod.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${mod.statusColor}`}>
                    {mod.activeStatus}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                <span>Otwórz Edytor Modułu</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-white">Automatyczny Zapis & Historia</div>
              <div className="text-[11px] text-slate-400">
                Twoje zmiany są automatycznie zapisywane lokalnie. Możesz cofać i ponawiać operacje (Undo/Redo).
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToFactoryDefaults}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetuj do Domyślnych</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
