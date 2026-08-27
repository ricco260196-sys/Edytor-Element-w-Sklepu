/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  StoreAppearanceProvider,
  useStoreAppearance
} from './context/StoreAppearanceContext';
import { TopBarEditor } from './components/editors/TopBarEditor';
import { LogoEditor } from './components/editors/LogoEditor';
import { MainMenuEditor } from './components/editors/MainMenuEditor';
import { SearchBarEditor } from './components/editors/SearchBarEditor';
import { ButtonsEditor } from './components/editors/ButtonsEditor';
import { CategoriesEditor } from './components/editors/CategoriesEditor';
import { ProductsGridEditor } from './components/editors/ProductsGridEditor';
import { WidgetsEditor } from './components/editors/WidgetsEditor';
import { BannersEditor } from './components/editors/BannersEditor';
import { FooterEditor } from './components/editors/FooterEditor';
import { OverviewView } from './components/editors/OverviewView';
import { StorefrontView } from './components/storefront/StorefrontView';
import { ToastContainer } from './components/common/ToastContainer';
import { ElementorLoadingScreen } from './components/common/ElementorLoadingScreen';
import { Sliders, Eye } from 'lucide-react';

const StudioContent: React.FC = () => {
  const { state, activeTab, viewMode, setActiveTab, setViewMode } = useStoreAppearance();

  const [isLoadingTransition, setIsLoadingTransition] = useState(false);
  const [transitionTargetModule, setTransitionTargetModule] = useState<string>('');

  const handleModuleSelect = (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'categories' | 'products' | 'overview' | any) => {
    if (module === activeTab) return;

    const moduleNames: Record<string, string> = {
      topbar: 'Pasek Górny (Top Bar)',
      logo: 'Logo Sklepu (Brand Identity)',
      menu: 'Menu Główne (Main Navigation)',
      search: 'Wyszukiwarka (Smart Search)',
      buttons: 'Przyciski i Akcje (Buttons & Actions)',
      actions: 'Przyciski i Akcje (Buttons & Actions)',
      categories: 'Kategorie (Lista & Siatka)',
      products: 'Główna Siatka Produktów (Marketplace Grid)',
      widgets: 'Edytor Widżetów Sklepu (Style & Prezentacja)',
      widzety: 'Edytor Widżetów Sklepu (Style & Prezentacja)',
      widget_editor: 'Edytor Widżetów Sklepu (Style & Prezentacja)',
      banners: 'Edytor Banerów i Sliderów (Banery & Elementy)',
      banners_sliders: 'Edytor Banerów i Sliderów (Banery & Elementy)',
      banery: 'Edytor Banerów i Sliderów (Banery & Elementy)',
      footer: 'Edytor Stopki Sklepu (Układ & Stopka)',
      stopka: 'Edytor Stopki Sklepu (Układ & Stopka)',
      footer_editor: 'Edytor Stopki Sklepu (Układ & Stopka)',
      overview: 'Przegląd Modułów'
    };

    setTransitionTargetModule(moduleNames[module] || module);
    setIsLoadingTransition(true);

    setTimeout(() => {
      setActiveTab(module);
      setIsLoadingTransition(false);
    }, 280);
  };

  // If in live storefront view
  if (viewMode === 'storefront') {
    return (
      <div className="relative min-h-screen">
        {/* Floating return button */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => setViewMode('editor')}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 hover:bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold transition-all hover:scale-105 backdrop-blur-md cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Wróć do Edytora (Studio)</span>
          </button>
        </div>

        <StorefrontView />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      {isLoadingTransition && (
        <ElementorLoadingScreen moduleName={transitionTargetModule} />
      )}

      {(activeTab === 'topbar' || activeTab === 'top_bar') && (
        <TopBarEditor onSelectModule={handleModuleSelect} />
      )}
      {activeTab === 'logo' && (
        <LogoEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'menu' || activeTab === 'main_menu') && (
        <MainMenuEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'search' || activeTab === 'search_bar') && (
        <SearchBarEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'buttons' || activeTab === 'actions') && (
        <ButtonsEditor onSelectModule={handleModuleSelect} />
      )}
      {activeTab === 'categories' && (
        <CategoriesEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'products' || activeTab === 'products_grid') && (
        <ProductsGridEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'widgets' || activeTab === 'widzety' || activeTab === 'widget_editor') && (
        <WidgetsEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'banners' || activeTab === 'banners_sliders' || activeTab === 'banery') && (
        <BannersEditor onSelectModule={handleModuleSelect} />
      )}
      {(activeTab === 'footer' || activeTab === 'stopka' || activeTab === 'footer_editor') && (
        <FooterEditor onSelectModule={handleModuleSelect} />
      )}
      {activeTab === 'overview' && (
        <OverviewView onSelectModule={handleModuleSelect} />
      )}

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreAppearanceProvider>
      <StudioContent />
    </StoreAppearanceProvider>
  );
}

