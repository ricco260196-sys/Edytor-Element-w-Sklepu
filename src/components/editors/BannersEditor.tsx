import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { BannersListColumn } from './banners/BannersListColumn';
import { BannerLiveCanvas } from './banners/BannerLiveCanvas';
import { BannerConfigColumn } from './banners/BannerConfigColumn';
import { AddBannerModal } from './banners/AddBannerModal';
import { MainSliderDedicatedModal } from './banners/MainSliderDedicatedModal';
import { Image as ImageIcon, Sliders } from 'lucide-react';

interface BannersEditorProps {
  onSelectModule: (module: any) => void;
}

export const BannersEditor: React.FC<BannersEditorProps> = ({ onSelectModule }) => {
  const {
    state,
    selectedBannerId,
    setSelectedBannerId,
    resetBanner,
    isMainSliderModalOpen,
    setIsMainSliderModalOpen
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const banners = state.banners?.items || [];
  const selectedBanner = banners.find(b => b.id === selectedBannerId);

  return (
    <>
      <EditorLayout3Col
        moduleTitle="Edytor Banerów i Sliderów"
        moduleSubtitle="Kreacja, wygląd, kształty, tła, układ „obrazek+opis” i zachowanie banerów"
        moduleIcon={<ImageIcon className="w-5 h-5 text-indigo-400" />}
        activeModule="banners"
        onSelectModule={onSelectModule}
        leftColumnContent={
          <BannersListColumn
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenMainSliderModal={() => setIsMainSliderModalOpen(true)}
          />
        }
        centerCanvasContent={
          <BannerLiveCanvas
            onOpenMainSliderModal={() => setIsMainSliderModalOpen(true)}
          />
        }
        rightColumnContent={
          <BannerConfigColumn
            onOpenMainSliderModal={() => setIsMainSliderModalOpen(true)}
          />
        }
        deviceViewport={deviceViewport}
        onDeviceChange={setDeviceViewport}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetToDefaults={() => {
          if (selectedBannerId) {
            resetBanner(selectedBannerId, 'all');
          }
        }}
        selectedElementName={selectedBanner ? (selectedBanner.displayName || selectedBanner.name) : 'Brak zaznaczenia'}
        onDeselectElement={() => setSelectedBannerId(null)}
        isModified={true}
      />

      {/* Add Banner Modal */}
      <AddBannerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onOpenMainSliderModal={() => {
          setIsAddModalOpen(false);
          setIsMainSliderModalOpen(true);
        }}
      />

      {/* Main Slider Dedicated Editor Modal */}
      <MainSliderDedicatedModal
        isOpen={isMainSliderModalOpen}
        onClose={() => setIsMainSliderModalOpen(false)}
      />
    </>
  );
};
