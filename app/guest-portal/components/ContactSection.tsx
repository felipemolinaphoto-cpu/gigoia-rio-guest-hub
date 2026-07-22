'use client';

import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import { guestCopy, GUEST_CONFIG, type GuestLang } from '../guest-data';

interface ContactSectionProps {
  language: GuestLang;
}

export default function ContactSection({ language }: ContactSectionProps) {
  const t = guestCopy[language];
  const { host } = GUEST_CONFIG;

  const contacts = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: t.contactWhatsapp,
      href: host.whatsapp ? `https://wa.me/${host.whatsapp}` : null,
    },
    {
      id: 'phone',
      icon: Phone,
      label: t.contactPhone,
      href: host.phone ? `tel:${host.phone}` : null,
    },
    {
      id: 'email',
      icon: Mail,
      label: t.contactEmail,
      href: host.email ? `mailto:${host.email}` : null,
    },
  ];

  return (
    <section className="gp-contact" aria-label={t.contactTitle}>
      <div className="gp-contact-card">
        <h3 className="gp-contact-title gp-display">{t.contactTitle}</h3>
        <p className="gp-contact-subtitle">{t.contactSubtitle}</p>

        <div className="gp-contact-buttons">
          {contacts.map((c) => {
            const IconComp = c.icon;

            if (c.href) {
              return (
                <a
                  key={c.id}
                  href={c.href}
                  target={c.id === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="gp-contact-btn"
                  aria-label={c.label}
                >
                  <IconComp size={18} />
                  <span>{c.label}</span>
                </a>
              );
            }

            return (
              <span key={c.id} className="gp-contact-btn gp-contact-btn--pending" aria-label={`${c.label} - ${t.contactPending}`}>
                <IconComp size={18} />
                <span>{t.contactPending}</span>
              </span>
            );
          })}
        </div>

        <div className="gp-contact-hours">
          <Clock size={14} aria-hidden="true" />
          <span>{t.contactHours}: {GUEST_CONFIG.hours}</span>
        </div>
      </div>
    </section>
  );
}
