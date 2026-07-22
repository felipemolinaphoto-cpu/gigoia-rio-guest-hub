'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Compass,
  MapPinIcon,
  ExternalLink,
  Ship,
  Footprints,
  Trees,
  ShoppingBag,
  Cross,
  Sun,
  ChevronRight,
  Info,
  X,
} from 'lucide-react';
import {
  guestCopy,
  mapPins,
  islandTips,
  type GuestLang,
  type MapPin,
  type IslandTip,
} from '../guest-data';

interface IlhaTabProps {
  language: GuestLang;
}

type FilterMode = 'all' | 'tips' | 'map';

export default function IlhaTab({ language }: IlhaTabProps) {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedTip, setSelectedTip] = useState<IslandTip | null>(null);
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const t = guestCopy[language];

  // Icon selector mapping
  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship':
        return <Ship size={20} className="gp-tip-icon-svg" />;
      case 'Footprints':
        return <Footprints size={20} className="gp-tip-icon-svg" />;
      case 'Trees':
        return <Trees size={20} className="gp-tip-icon-svg" />;
      case 'ShoppingBag':
        return <ShoppingBag size={20} className="gp-tip-icon-svg" />;
      case 'Cross':
        return <Cross size={20} className="gp-tip-icon-svg" />;
      case 'Sun':
        return <Sun size={20} className="gp-tip-icon-svg" />;
      default:
        return <Info size={20} className="gp-tip-icon-svg" />;
    }
  };

  // Close map tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setSelectedPin(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="gp-ilha">
      {/* Header */}
      <div className="gp-section-header">
        <div className="gp-section-icon-wrap">
          <Compass size={24} aria-hidden="true" />
        </div>
        <h2 className="gp-section-title gp-display">{t.ilhaTitle}</h2>
        <p className="gp-section-subtitle">{t.ilhaSubtitle}</p>
      </div>

      {/* Filter Tabs */}
      <div className="gp-ilha-filter-tabs" role="tablist">
        <button
          className={`gp-ilha-filter-btn ${filterMode === 'all' ? 'active' : ''}`}
          onClick={() => setFilterMode('all')}
        >
          {t.ilhaFilterAll}
        </button>
        <button
          className={`gp-ilha-filter-btn ${filterMode === 'tips' ? 'active' : ''}`}
          onClick={() => setFilterMode('tips')}
        >
          {t.ilhaFilterTips}
        </button>
        <button
          className={`gp-ilha-filter-btn ${filterMode === 'map' ? 'active' : ''}`}
          onClick={() => setFilterMode('map')}
        >
          {t.ilhaFilterMap}
        </button>
      </div>

      {/* Dicas & Infos Básicas Section */}
      {(filterMode === 'all' || filterMode === 'tips') && (
        <section className="gp-ilha-tips-section">
          <div className="gp-section-subhead">
            <h3>{t.ilhaTipsHeader}</h3>
          </div>

          <div className="gp-tips-grid">
            {islandTips.map((tip) => (
              <div
                key={tip.id}
                className="gp-tip-card"
                onClick={() => setSelectedTip(tip)}
              >
                <div className="gp-tip-header">
                  <div className="gp-tip-icon">{getTipIcon(tip.icon)}</div>
                  {tip.badge && (
                    <span className="gp-tip-badge">{tip.badge[language]}</span>
                  )}
                </div>

                <h4 className="gp-tip-title">{tip.title[language]}</h4>
                <p className="gp-tip-summary">{tip.summary[language]}</p>

                <div className="gp-tip-footer">
                  <span>{language === 'pt' ? 'Ver detalhes' : 'Read details'}</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mapa dos Decks Section */}
      {(filterMode === 'all' || filterMode === 'map') && (
        <section className="gp-ilha-map-section">
          <div className="gp-section-subhead">
            <h3>{language === 'pt' ? 'Mapa dos Decks & Travessia' : 'Dock Map & Water Taxi Points'}</h3>
          </div>

          {/* Map Container */}
          <div className="gp-map-container" ref={mapRef}>
            <div className="gp-map-inner">
              <img
                src="/guest-portal/mapa-decks-3d.jpg"
                alt="Mapa 3D dos Decks da Ilha da Gigóia"
                className="gp-map-image"
                draggable={false}
              />

              {/* Pins */}
              {mapPins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;

                return (
                  <button
                    key={pin.id}
                    className={`gp-map-pin ${isSelected ? 'gp-map-pin--selected' : ''}`}
                    style={{
                      left: `${pin.x}%`,
                      top: `${pin.y}%`,
                      '--pin-color': '#0284C7',
                    } as React.CSSProperties}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPin(isSelected ? null : pin);
                    }}
                    aria-label={pin.name}
                  >
                    <span className="gp-map-pin-dot" />
                    <span className="gp-map-pin-pulse" aria-hidden="true" />
                  </button>
                );
              })}

              {/* Tooltip */}
              {selectedPin && (
                <div
                  className="gp-map-tooltip"
                  style={{
                    left: `${selectedPin.x}%`,
                    top: `${selectedPin.y}%`,
                  }}
                >
                  <div className="gp-map-tooltip-card">
                    <span
                      className="gp-map-tooltip-badge"
                      style={{ backgroundColor: '#0284C7' }}
                    >
                      DECK
                    </span>
                    <h4 className="gp-map-tooltip-name">{selectedPin.name}</h4>
                    <p className="gp-map-tooltip-desc">
                      {selectedPin.description[language]}
                    </p>
                    {selectedPin.mapsUrl && (
                      <a
                        href={selectedPin.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gp-map-tooltip-link"
                        aria-label={`${guestCopy[language].mapOpenMaps} - ${selectedPin.name}`}
                      >
                        <ExternalLink size={14} />
                        <span>{guestCopy[language].mapOpenMaps}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tip Detail Modal */}
      {selectedTip && (
        <div
          className="gp-modal-overlay"
          onClick={() => setSelectedTip(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="gp-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="gp-modal-close"
              onClick={() => setSelectedTip(null)}
              aria-label={t.close}
            >
              <X size={20} />
            </button>

            <div className="gp-tip-modal-header">
              <div className="gp-tip-icon">{getTipIcon(selectedTip.icon)}</div>
              <div>
                <h3 className="gp-modal-title gp-display">
                  {selectedTip.title[language]}
                </h3>
                {selectedTip.badge && (
                  <span className="gp-tip-badge">{selectedTip.badge[language]}</span>
                )}
              </div>
            </div>

            <div className="gp-tip-modal-body">
              <p className="gp-tip-modal-summary">{selectedTip.summary[language]}</p>
              <p className="gp-tip-modal-details">{selectedTip.details[language]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
