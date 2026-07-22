'use client';

import { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Clock, ChevronDown, Search, X } from 'lucide-react';
import { guestCopy, faqs, GUEST_CONFIG, type GuestLang } from '../guest-data';

interface AjudaTabProps {
  language: GuestLang;
}

export default function AjudaTab({ language }: AjudaTabProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const t = guestCopy[language];
  const { host } = GUEST_CONFIG;

  const contacts = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: t.contactWhatsapp,
      href: host.whatsapp ? `https://wa.me/${host.whatsapp}` : null,
      color: '#25D366',
    },
    {
      id: 'phone',
      icon: Phone,
      label: t.contactPhone,
      href: host.phone ? `tel:${host.phone}` : null,
      color: '#0A4D68',
    },
    {
      id: 'email',
      icon: Mail,
      label: t.contactEmail,
      href: host.email ? `mailto:${host.email}` : null,
      color: '#088395',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const q = faq.question[language].toLowerCase();
    const a = faq.answer[language].toLowerCase();
    return q.includes(query) || a.includes(query);
  });

  return (
    <div className="gp-ajuda">
      {/* Header */}
      <div className="gp-section-header">
        <div className="gp-section-icon-wrap">
          <HelpCircle size={24} aria-hidden="true" />
        </div>
        <h2 className="gp-section-title gp-display">{t.ajudaTitle}</h2>
        <p className="gp-section-subtitle">{t.ajudaSubtitle}</p>
      </div>

      {/* Host Contact Section */}
      <section className="gp-ajuda-contact-card">
        <div className="gp-ajuda-contact-header">
          <div>
            <h3 className="gp-ajuda-contact-title">{t.ajudaContactHeader}</h3>
            <p className="gp-ajuda-contact-sub">{language === 'pt' ? 'Suporte direto para sua estadia com o Renzo' : 'Direct host support for your stay'}</p>
          </div>
        </div>

        <div className="gp-ajuda-contact-buttons">
          {contacts.map((c) => {
            const IconComp = c.icon;

            if (c.href) {
              return (
                <a
                  key={c.id}
                  href={c.href}
                  target={c.id === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="gp-ajuda-contact-btn"
                  style={{ '--btn-color': c.color } as React.CSSProperties}
                  aria-label={c.label}
                >
                  <IconComp size={18} />
                  <span>{c.label}</span>
                </a>
              );
            }

            return (
              <span
                key={c.id}
                className="gp-ajuda-contact-btn gp-ajuda-contact-btn--pending"
                aria-label={`${c.label} - ${t.contactPending}`}
              >
                <IconComp size={18} />
                <span>{t.contactPending}</span>
              </span>
            );
          })}
        </div>

        <div className="gp-ajuda-hours">
          <Clock size={14} aria-hidden="true" />
          <span>{t.contactHours}: {GUEST_CONFIG.hours}</span>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="gp-ajuda-faq-section">
        <div className="gp-section-subhead">
          <h3>{t.ajudaFaqHeader}</h3>
        </div>

        {/* Search Bar */}
        <div className="gp-faq-search-wrap">
          <Search size={17} className="gp-faq-search-icon" />
          <input
            type="text"
            className="gp-faq-search-input"
            placeholder={t.ajudaSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="gp-faq-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Limpar busca"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Accordion FAQ List */}
        <div className="gp-faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div key={faq.id} className={`gp-faq-item ${isOpen ? 'gp-faq-item--open' : ''}`}>
                  <button
                    className="gp-faq-question"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="gp-faq-question-text">{faq.question[language]}</span>
                    <ChevronDown
                      size={20}
                      className={`gp-faq-chevron ${isOpen ? 'gp-faq-chevron--open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`gp-faq-answer-wrap ${isOpen ? 'gp-faq-answer-wrap--open' : ''}`}
                    role="region"
                  >
                    <p className="gp-faq-answer">{faq.answer[language]}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="gp-faq-empty">
              <p>{language === 'pt' ? 'Nenhuma dúvida encontrada para sua busca.' : 'No questions found matching your search.'}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
