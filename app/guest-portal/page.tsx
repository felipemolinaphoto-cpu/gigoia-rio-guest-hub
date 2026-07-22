"use client";

import { useEffect, useState } from "react";
import {
  Home,
  ClipboardList,
  Compass,
  Ship,
  HelpCircle,
  Globe,
  LogOut,
} from "lucide-react";
import type { GuestLang } from "./guest-data";
import { guestCopy } from "./guest-data";
import AccessScreen from "./components/AccessScreen";
import WelcomeTab from "./components/WelcomeTab";
import RulesTab from "./components/RulesTab";
import IlhaTab from "./components/IlhaTab";
import ToursTab from "./components/ToursTab";
import AjudaTab from "./components/AjudaTab";
import "./guest-portal.css";

export type TabId = "welcome" | "rules" | "ilha" | "tours" | "ajuda";
type CopyKey = keyof typeof guestCopy.pt;

const TABS: Array<{ id: TabId; labelKey: CopyKey; icon: typeof Home }> = [
  { id: "welcome", labelKey: "tabWelcome", icon: Home },
  { id: "rules", labelKey: "tabRules", icon: ClipboardList },
  { id: "ilha", labelKey: "tabIlha", icon: Compass },
  { id: "tours", labelKey: "tabTours", icon: Ship },
  { id: "ajuda", labelKey: "tabAjuda", icon: HelpCircle },
];

export default function GuestPortalPage() {
  const [language, setLanguage] = useState<GuestLang>("pt");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("welcome");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("gp-lang") as GuestLang | null;
    if (saved === "pt" || saved === "en") setLanguage(saved);

    const wasAuth = window.sessionStorage.getItem("gp-auth");
    if (wasAuth === "true") setAuthenticated(true);
  }, []);

  function handleLanguageChange(lang: GuestLang) {
    setLanguage(lang);
    window.localStorage.setItem("gp-lang", lang);
  }

  function handleAccess() {
    setAuthenticated(true);
    window.sessionStorage.setItem("gp-auth", "true");
  }

  function handleLogout() {
    setAuthenticated(false);
    window.sessionStorage.removeItem("gp-auth");
  }

  function switchTab(tab: TabId) {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  }

  if (!authenticated) {
    return (
      <AccessScreen
        onAccess={handleAccess}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  const t = (key: CopyKey) => guestCopy[language][key];
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="gp-root">
      <div className="gp-app">
        {/* Header */}
        <header className="gp-header">
          <div className="gp-header-brand">
            <strong>GIGÓIA</strong>
            <span>115</span>
          </div>
          <div className="gp-header-actions">
            <button
              type="button"
              className="gp-lang-toggle"
              onClick={() => handleLanguageChange(language === "pt" ? "en" : "pt")}
              aria-label="Idioma"
            >
              <Globe size={15} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              type="button"
              className="gp-logout-btn"
              onClick={handleLogout}
              aria-label="Sair"
              title="Sair"
            >
              <LogOut size={15} />
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <main className={`gp-tab-content ${transitioning ? "gp-tab-exit" : "gp-tab-enter"}`}>
          {activeTab === "welcome" && (
            <WelcomeTab
              language={language}
              onNavigateTab={(tab) => switchTab(tab)}
            />
          )}
          {activeTab === "rules" && <RulesTab language={language} />}
          {activeTab === "ilha" && <IlhaTab language={language} />}
          {activeTab === "tours" && <ToursTab language={language} />}
          {activeTab === "ajuda" && <AjudaTab language={language} />}
        </main>

        {/* Floating Notched Bottom Tab Bar */}
        <div className="gp-tab-bar-wrap">
          <nav className="gp-tab-bar" aria-label="Navigation">
            {/* Sliding Curve Notch & Active Indicator Dot */}
            <div
              className="gp-tab-notch-slider"
              style={{
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            >
              <div className="gp-tab-notch-cutout">
                <svg className="gp-tab-notch-svg" viewBox="0 0 54 18" fill="none">
                  <path
                    d="M0 0 C14 0 16 16 27 16 C38 16 40 0 54 0 H0 Z"
                    fill="#FAF8F5"
                  />
                </svg>
              </div>
              <span className="gp-tab-notch-dot" />
            </div>

            {/* Tab Items */}
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`gp-tab-item ${isActive ? "gp-tab-active" : ""}`}
                  onClick={() => switchTab(tab.id)}
                  aria-label={t(tab.labelKey)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={19} className="gp-tab-icon" />
                  <span className="gp-tab-label">{t(tab.labelKey)}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
