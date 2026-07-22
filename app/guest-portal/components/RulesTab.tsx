'use client';

import { ClipboardList, Moon, Trash2, Snowflake, DoorOpen, Key, Ban, PawPrint, Droplets } from 'lucide-react';
import { guestCopy, rules, type GuestLang } from '../guest-data';
import type { LucideIcon } from 'lucide-react';

interface RulesTabProps {
  language: GuestLang;
}

const iconMap: Record<string, LucideIcon> = {
  Moon,
  Trash2,
  Snowflake,
  DoorOpen,
  Key,
  Ban,
  PawPrint,
  Droplets,
};

export default function RulesTab({ language }: RulesTabProps) {
  const t = guestCopy[language];

  return (
    <div className="gp-rules">
      {/* Header */}
      <div className="gp-section-header">
        <div className="gp-section-icon-wrap">
          <ClipboardList size={24} aria-hidden="true" />
        </div>
        <h2 className="gp-section-title gp-display">{t.rulesTitle}</h2>
        <p className="gp-section-subtitle">{t.rulesSubtitle}</p>
      </div>

      {/* Rules Grid */}
      <div className="gp-rules-grid">
        {rules.map((rule, index) => {
          const IconComp = iconMap[rule.icon];
          return (
            <div
              key={rule.id}
              className="gp-rule-card"
              style={{
                borderLeftColor: rule.color,
                animationDelay: `${index * 80}ms`,
              } as React.CSSProperties}
            >
              <div className="gp-rule-icon" style={{ color: rule.color }} aria-hidden="true">
                {IconComp && <IconComp size={28} />}
              </div>
              <div className="gp-rule-text">
                <h3 className="gp-rule-title">{rule.title[language]}</h3>
                <p className="gp-rule-desc">{rule.description[language]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
