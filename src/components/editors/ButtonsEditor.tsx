import React, { useState, useEffect } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { ButtonsListColumn } from './buttons/ButtonsListColumn';
import { ButtonsPreviewColumn } from './buttons/ButtonsPreviewColumn';
import { ButtonsConfigColumn } from './buttons/ButtonsConfigColumn';
import { MousePointerClick } from 'lucide-react';
import { DEFAULT_BUTTONS_CONFIG } from '../../data/defaultButtons';

interface ButtonsEditorProps {
  onSelectModule?: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'overview') => void;
}

export const ButtonsEditor: React.FC<ButtonsEditorProps> = ({ onSelectModule }) => {
  const {
    state,
    updateButtons,
    activeTab,
    setActiveTab,
    activeButtonId,
    setActiveButtonId,
    triggerToast
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');

  // Ensure an active button is selected
  const items = state.buttons?.items || [];
  const selectedId = activeButtonId || (items.length > 0 ? items[0].id : 'cart');

  useEffect(() => {
    if (!activeButtonId && items.length > 0) {
      setActiveButtonId(items[0].id);
    }
  }, [activeButtonId, items, setActiveButtonId]);

  const handleResetToDefaults = () => {
    updateButtons(DEFAULT_BUTTONS_CONFIG);
    if (DEFAULT_BUTTONS_CONFIG.items.length > 0) {
      setActiveButtonId(DEFAULT_BUTTONS_CONFIG.items[0].id);
    }
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia przycisków i elementów zostały zresetowane.');
  };

  const handleModuleSelect = (mod: any) => {
    if (onSelectModule) {
      onSelectModule(mod);
    } else {
      setActiveTab(mod);
    }
  };

  return (
    <EditorLayout3Col
      moduleTitle="Przyciski i Elementy Interaktywne"
      moduleSubtitle="Moduł 5 z 5: Uniwersalny edytor przycisków, koszyka, konta, ulubionych i powiadomień"
      moduleIcon={<MousePointerClick className="w-4 h-4" />}
      activeModule="buttons"
      onSelectModule={handleModuleSelect}
      leftColumnContent={
        <ButtonsListColumn
          selectedButtonId={selectedId}
          onSelectButton={(id) => setActiveButtonId(id)}
        />
      }
      centerCanvasContent={
        <ButtonsPreviewColumn
          selectedButtonId={selectedId}
          onSelectButton={(id) => setActiveButtonId(id)}
          deviceViewport={deviceViewport}
          onDeviceChange={setDeviceViewport}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      }
      rightColumnContent={
        <ButtonsConfigColumn
          selectedButtonId={selectedId}
          onSelectButton={(id) => setActiveButtonId(id)}
        />
      }
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

