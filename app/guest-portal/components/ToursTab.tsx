'use client';

import { Clock, Tag, MessageCircle } from 'lucide-react';
import { guestCopy, tours, type GuestLang } from '../guest-data';

interface ToursTabProps {
  language: GuestLang;
}

export default function ToursTab({ language }: ToursTabProps) {
  const t = guestCopy[language];

  return (
    <div className="gp-tours">
      {/* Header */}
      <div className="gp-section-header">
        <div className="gp-section-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <h2 className="gp-section-title gp-display">{t.toursTitle}</h2>
        <p className="gp-section-subtitle">{t.toursSubtitle}</p>
      </div>

      {/* Tour Cards */}
      <div className="gp-tours-list">
        {tours.map((tour, index) => {
          const whatsappMessage = encodeURIComponent(
            language === 'pt'
              ? `Olá! Estou hospedado na ${tour.title.pt} e gostaria de reservar o passeio "${tour.title.pt}".`
              : `Hi! I'm staying at Gigóia 115 and would like to book the "${tour.title.en}" tour.`
          );
          const whatsappUrl = tour.whatsapp
            ? `https://wa.me/${tour.whatsapp}?text=${whatsappMessage}`
            : null;

          return (
            <article
              key={tour.id}
              className="gp-tour-card"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              {/* Image */}
              <div className="gp-tour-image-wrap">
                <img
                  src={tour.image}
                  alt={tour.title[language]}
                  className="gp-tour-image"
                  loading="lazy"
                />
                <span
                  className="gp-tour-badge"
                  style={{ backgroundColor: tour.categoryColor }}
                >
                  {tour.category[language]}
                </span>
              </div>

              {/* Content */}
              <div className="gp-tour-content">
                <h3 className="gp-tour-title gp-display">{tour.title[language]}</h3>
                <p className="gp-tour-desc">{tour.description[language]}</p>

                <div className="gp-tour-info-row">
                  <div className="gp-tour-info-item">
                    <Clock size={14} aria-hidden="true" />
                    <span>{tour.duration[language]}</span>
                  </div>
                  <div className="gp-tour-info-item">
                    <Tag size={14} aria-hidden="true" />
                    <span>{tour.price[language]}</span>
                  </div>
                </div>

                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gp-tour-whatsapp-btn"
                    aria-label={`${t.tourBook} - ${tour.title[language]}`}
                  >
                    <MessageCircle size={18} />
                    <span>{t.tourBook}</span>
                  </a>
                ) : (
                  <div className="gp-tour-pending">
                    <MessageCircle size={16} aria-hidden="true" />
                    <span>{t.tourPending}</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
