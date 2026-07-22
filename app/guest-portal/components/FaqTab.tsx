'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { guestCopy, faqs, type GuestLang } from '../guest-data';

interface FaqTabProps {
  language: GuestLang;
}

export default function FaqTab({ language }: FaqTabProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const t = guestCopy[language];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="gp-faq">
      {/* Header */}
      <div className="gp-section-header">
        <div className="gp-section-icon-wrap">
          <HelpCircle size={24} aria-hidden="true" />
        </div>
        <h2 className="gp-section-title gp-display">{t.faqTitle}</h2>
        <p className="gp-section-subtitle">{t.faqSubtitle}</p>
      </div>

      {/* Accordion */}
      <div className="gp-faq-list">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

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
                aria-labelledby={`faq-question-${faq.id}`}
              >
                <p className="gp-faq-answer">{faq.answer[language]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
