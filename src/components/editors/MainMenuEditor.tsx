import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { MainMenuContentColumn } from './menu/MainMenuContentColumn';
import { MainMenuInteractiveCanvas } from './menu/MainMenuInteractiveCanvas';
import { MainMenuStyleColumn } from './menu/MainMenuStyleColumn';
import { Menu } from 'lucide-react';
import { DEFAULT_MAIN_MENU } from '../../data/defaultAppearance';

interface MainMenuEditorProps {
  onSelectModule: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'overview') => void;
}

export const MainMenuEditor: React.FC<MainMenuEditorProps> = ({ onSelectModule }) => {
  const { updateMainMenu, triggerToast } = useStoreAppearance();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');

  const handleResetToDefaults = () => {
    updateMainMenu(DEFAULT_MAIN_MENU);
    setSelectedItemId(null);
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia Menu Głównego zostały zresetowane.');
  };

  return (
    <EditorLayout3Col
      moduleTitle="Menu Główne (Navigation Bar)"
      moduleSubtitle="Moduł 3 z 4: Nawigacja kategorii, Mega Menu i odnośniki"
      moduleIcon={<Menu className="w-4 h-4" />}
      activeModule="menu"
      onSelectModule={onSelectModule}
      leftColumnContent={
        <MainMenuContentColumn
          selectedItemId={selectedItemId}
          onSelectItem={setSelectedItemId}
        />
      }
      centerCanvasContent={
        <MainMenuInteractiveCanvas
          deviceViewport={deviceViewport}
          zoomLevel={zoomLevel}
          viewMode={viewMode}
          selectedItemId={selectedItemId}
          onSelectItem={setSelectedItemId}
        />
      }
      rightColumnContent={<MainMenuStyleColumn />}
      deviceViewport={deviceViewport}
      onDeviceChange={setDeviceViewport}
      zoomLevel={zoomLevel}
      onZoomChange={setZoomLevel}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onResetToDefaults={handleResetToDefaults}
    />
  );
};
