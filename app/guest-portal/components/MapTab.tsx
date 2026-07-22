'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPinIcon, ExternalLink } from 'lucide-react';
import { guestCopy, mapPins, type GuestLang, type MapPin } from '../guest-data';

interface MapTabProps {
  language: GuestLang;
}

export default function MapTab({ language }: MapTabProps) {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const t = guestCopy[language];

  // Close tooltip on outside click
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
    <div className="gp-map">
      {/* Header */}
      <div className="gp-section-header">
        <div className="gp-section-icon-wrap">
          <MapPinIcon size={24} aria-hidden="true" />
        </div>
        <h2 className="gp-section-title gp-display">{t.mapTitle}</h2>
        <p className="gp-section-subtitle">
          {language === 'pt' ? 'Decks de embarque e desembarque da ilha' : 'Island docks and boarding points'}
        </p>
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
                <p className="gp-map-tooltip-desc">{selectedPin.description[language]}</p>
                {selectedPin.mapsUrl && (
                  <a
                    href={selectedPin.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gp-map-tooltip-link"
                    aria-label={`${t.mapOpenMaps} - ${selectedPin.name}`}
                  >
                    <ExternalLink size={14} />
                    <span>{t.mapOpenMaps}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
