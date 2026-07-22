'use client';

import { useState, useCallback } from 'react';
import { CalendarDays, Clock, Users, Wifi, Copy, Check, QrCode, X, Play, HeartHandshake, Compass, MessageCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { guestCopy, GUEST_CONFIG, type GuestLang } from '../guest-data';

interface WelcomeTabProps {
  language: GuestLang;
  onNavigateTab?: (tabId: 'rules' | 'ilha' | 'tours' | 'ajuda') => void;
}

export default function WelcomeTab({ language, onNavigateTab }: WelcomeTabProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const t = guestCopy[language];
  const { wifi } = GUEST_CONFIG;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wifi.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }, [wifi.password]);

  return (
    <div className="gp-welcome">
      {/* Hero Section */}
      <div className="gp-welcome-hero">
        <img
          src="/guest-portal/hero-barco.png"
          alt="Lagoa da Ilha da Gigóia ao pôr do sol"
          className="gp-welcome-hero-img"
          loading="eager"
        />
        <div className="gp-welcome-hero-overlay" aria-hidden="true" />
        <div className="gp-welcome-hero-content">
          <span className="gp-welcome-badge">
            <HeartHandshake size={14} />
            <span>{t.welcomeGreeting}</span>
          </span>
          <h1 className="gp-welcome-hero-title gp-display">{GUEST_CONFIG.propertyName}</h1>
          <p className="gp-welcome-hero-desc">{t.welcomeSubtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="gp-welcome-content">
        
        {/* Stay Info Cards */}
        <div className="gp-welcome-info-row">
          <div className="gp-welcome-info-item">
            <CalendarDays size={18} className="gp-welcome-info-icon" aria-hidden="true" />
            <div>
              <span className="gp-welcome-info-label">{t.checkIn}</span>
              <span className="gp-welcome-info-value">{GUEST_CONFIG.checkIn}</span>
            </div>
          </div>
          <div className="gp-welcome-info-item">
            <Clock size={18} className="gp-welcome-info-icon" aria-hidden="true" />
            <div>
              <span className="gp-welcome-info-label">{t.checkOut}</span>
              <span className="gp-welcome-info-value">{GUEST_CONFIG.checkOut}</span>
            </div>
          </div>
          <div className="gp-welcome-info-item">
            <Users size={18} className="gp-welcome-info-icon" aria-hidden="true" />
            <div>
              <span className="gp-welcome-info-label">{t.guests}</span>
              <span className="gp-welcome-info-value">{GUEST_CONFIG.maxGuests}</span>
            </div>
          </div>
        </div>

        {/* Wi-Fi Card */}
        <div className="gp-wifi-card">
          <div className="gp-wifi-header">
            <Wifi size={20} className="gp-wifi-icon" aria-hidden="true" />
            <h2 className="gp-wifi-title">{t.wifiTitle}</h2>
          </div>

          <div className="gp-wifi-row">
            <span className="gp-wifi-label">{t.wifiNetwork}</span>
            <span className="gp-wifi-value">{wifi.network}</span>
          </div>

          <div className="gp-wifi-row">
            <span className="gp-wifi-label">{t.wifiPassword}</span>
            <div className="gp-wifi-password-group">
              <span className="gp-wifi-value gp-wifi-value--mono">{wifi.password}</span>
              <button
                className={`gp-wifi-copy-btn ${copied ? 'gp-wifi-copy-btn--copied' : ''}`}
                onClick={handleCopy}
                aria-label={copied ? t.wifiCopied : t.wifiCopy}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? t.wifiCopied : t.wifiCopy}</span>
              </button>
            </div>
          </div>

          <button
            className="gp-wifi-qr-btn"
            onClick={() => setShowQr(true)}
            aria-label={t.wifiQrButton}
          >
            <QrCode size={18} />
            <span>{t.wifiQrButton}</span>
          </button>
        </div>

        {/* Quick Navigation Cards */}
        {onNavigateTab && (
          <div className="gp-welcome-quick-nav">
            <button className="gp-quick-card" onClick={() => onNavigateTab('ilha')}>
              <Compass size={22} className="gp-quick-icon" />
              <div>
                <strong>Guia da Ilha & Decks</strong>
                <small>Dicas de travessia e mapa dos barcos</small>
              </div>
            </button>
            <button className="gp-quick-card" onClick={() => onNavigateTab('ajuda')}>
              <MessageCircle size={22} className="gp-quick-icon" />
              <div>
                <strong>Dúvidas & Contato</strong>
                <small>Fale com Renzo ou tire dúvidas</small>
              </div>
            </button>
          </div>
        )}

        {/* Welcome Video Section (at the very bottom of home!) */}
        <div className="gp-video-card" style={{ marginTop: '16px' }}>
          <div className="gp-video-thumbnail" onClick={() => setShowVideoModal(true)}>
            <img
              src="/guest-portal/hero-barco.png"
              alt="Vídeo de boas-vindas da casa"
              className="gp-video-poster"
            />
            <div className="gp-video-overlay" />
            <button className="gp-video-play-btn" aria-label={t.welcomeVideoWatch}>
              <Play size={24} fill="#FFFFFF" />
            </button>
            <span className="gp-video-badge">1:20 min</span>
          </div>

          <div className="gp-video-info">
            <div>
              <h3 className="gp-video-title">{t.welcomeVideoTitle}</h3>
              <p className="gp-video-subtitle">{t.welcomeVideoSubtitle}</p>
            </div>
            <button
              className="gp-video-action-btn"
              onClick={() => setShowVideoModal(true)}
            >
              <Play size={15} fill="currentColor" />
              <span>{t.welcomeVideoWatch}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQr && <WifiQrModal wifi={wifi} t={t} onClose={() => setShowQr(false)} />}

      {/* Welcome Video Modal */}
      {showVideoModal && (
        <WelcomeVideoModal
          t={t}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </div>
  );
}

/* ─── Wi-Fi QR Modal ───────────────────────────────────────────── */
interface WifiQrModalProps {
  wifi: { network: string; password: string };
  t: (typeof guestCopy)['pt'];
  onClose: () => void;
}

function WifiQrModal({ wifi, t, onClose }: WifiQrModalProps) {
  const qrValue = `WIFI:T:WPA;S:${wifi.network};P:${wifi.password};;`;

  return (
    <div className="gp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={t.wifiQrTitle}>
      <div className="gp-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="gp-modal-close" onClick={onClose} aria-label={t.close}>
          <X size={20} />
        </button>
        <h3 className="gp-modal-title gp-display">{t.wifiQrTitle}</h3>
        <div className="gp-modal-qr-wrap">
          <QRCodeSVG
            value={qrValue}
            size={200}
            bgColor="#FFFFFF"
            fgColor="#0A4D68"
            level="M"
          />
        </div>
        <p className="gp-modal-network">{wifi.network}</p>
      </div>
    </div>
  );
}

/* ─── Welcome Video Modal ─────────────────────────────────────── */
interface VideoModalProps {
  t: (typeof guestCopy)['pt'];
  onClose: () => void;
}

function WelcomeVideoModal({ t, onClose }: VideoModalProps) {
  return (
    <div className="gp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={t.welcomeVideoTitle}>
      <div className="gp-modal-card gp-video-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="gp-modal-close" onClick={onClose} aria-label={t.close}>
          <X size={20} />
        </button>

        <h3 className="gp-modal-title gp-display">{t.welcomeVideoTitle}</h3>

        <div className="gp-video-player-container">
          <video
            controls
            autoPlay
            playsInline
            poster="/guest-portal/hero-barco.png"
            className="gp-modal-video-element"
          >
            <source src="/guest-portal/welcome-gigoia.mp4" type="video/mp4" />
            <p>Seu navegador não suporta reprodução de vídeo HTML5.</p>
          </video>
        </div>

        <div className="gp-video-modal-note">
          <p>🌴 <strong>Boas-vindas do Renzo:</strong> "Que bom ter você aqui! Qualquer dúvida durante sua estadia, estou à disposição no WhatsApp."</p>
        </div>
      </div>
    </div>
  );
}
