'use client';

import { useState, useEffect } from 'react';
import { Lock, ArrowRight, KeyRound } from 'lucide-react';
import { guestCopy, GUEST_CONFIG, type GuestLang } from '../guest-data';

interface AccessScreenProps {
  onAccess: () => void;
  language: GuestLang;
  onLanguageChange: (lang: GuestLang) => void;
}

export default function AccessScreen({ onAccess, language, onLanguageChange }: AccessScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const t = guestCopy[language];

  // Auto-login from QR code URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code && code.toUpperCase() === GUEST_CONFIG.password) {
      onAccess();
    }
  }, [onAccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === GUEST_CONFIG.password) {
      setError(false);
      onAccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const toggleLanguage = () => {
    onLanguageChange(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="gp-access-screen">
      {/* Background Image with Overlay */}
      <img
        src="/guest-portal/chegada-tranquila.png"
        alt="Ilha da Gigóia"
        className="gp-access-bg-img"
      />
      <div className="gp-access-overlay" aria-hidden="true" />

      <form className="gp-access-card" onSubmit={handleSubmit}>
        <div className="gp-access-brand">
          <KeyRound size={28} className="gp-access-brand-icon" aria-hidden="true" />
          <span className="gp-access-brand-name">{GUEST_CONFIG.propertyName}</span>
        </div>

        <p className="gp-access-location">{t.accessSubtitle}</p>
        <h1 className="gp-access-title gp-display">{t.accessTitle}</h1>

        <div className={`gp-access-input-wrap ${shake ? 'gp-shake' : ''} ${error ? 'gp-access-input-wrap--error' : ''}`}>
          <Lock className="gp-access-input-icon" size={18} aria-hidden="true" />
          <input
            className="gp-access-input"
            type="password"
            placeholder={t.accessPlaceholder}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            aria-label={t.accessPlaceholder}
            autoComplete="off"
          />
        </div>

        {error && <p className="gp-access-error">{t.accessError}</p>}

        <button className="gp-access-btn" type="submit" aria-label={t.accessButton}>
          <span>{t.accessButton}</span>
          <ArrowRight size={18} />
        </button>

        <p className="gp-access-hint">{t.accessHint}</p>

        <button
          type="button"
          className="gp-access-lang-toggle"
          onClick={toggleLanguage}
          aria-label={`Switch to ${t.langToggle}`}
        >
          🌐 {t.langToggle}
        </button>
      </form>
    </div>
  );
}
