"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Home,
  Languages,
  LockKeyhole,
  Map,
  MapPin,
  MessageCircle,
  Minus,
  Navigation,
  Plus,
  QrCode,
  ShieldCheck,
  Ship,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { copy, experiences, languages, places, type Experience, type Language, type Place, type PlaceCategory } from "./data";

const IslandMap = dynamic(() => import("./components/IslandMap"), {
  ssr: false,
  loading: () => <div className="map-status">Loading MapLibre atlas…</div>,
});

type CategoryFilter = "all" | PlaceCategory;

const WIFI_NETWORK = "PENDING RENZO";
const WIFI_PASSWORD = "PENDING RENZO";
const CONCIERGE_WHATSAPP = "";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [accessGranted, setAccessGranted] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [showWifi, setShowWifi] = useState(false);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [selectedPlace, setSelectedPlace] = useState<Place>(places[0]);
  const [selectedExperience, setSelectedExperience] = useState<Experience>(experiences[0]);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const [contactMessage, setContactMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<"wifi" | "message" | null>(null);
  const t = copy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("gigoia-language") as Language | null;
    if (savedLanguage && languages.some((item) => item.code === savedLanguage)) setLanguage(savedLanguage);
  }, []);

  const filteredPlaces = useMemo(
    () => category === "all" ? places : places.filter((place) => place.category === category),
    [category],
  );

  function changeLanguage(next: Language) {
    setLanguage(next);
    window.localStorage.setItem("gigoia-language", next);
  }

  function submitAccess(event: React.FormEvent) {
    event.preventDefault();
    if (codeValue.trim().toUpperCase() === "GIGOIA") {
      setAccessGranted(true);
      setAccessError(false);
      return;
    }
    setAccessError(true);
  }

  function chooseCategory(next: CategoryFilter) {
    setCategory(next);
    const firstMatch = next === "all" ? places[0] : places.find((place) => place.category === next);
    if (firstMatch) setSelectedPlace(firstMatch);
  }

  async function copyText(value: string, kind: "wifi" | "message") {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  }

  function openConcierge(message: string) {
    if (CONCIERGE_WHATSAPP) {
      window.open(`https://wa.me/${CONCIERGE_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      return;
    }
    setContactMessage(message);
  }

  function tourMessage() {
    return [
      "Gigóia Rio Guest Hub",
      `Accommodation: Casa Mangue 04`,
      `Experience: ${selectedExperience.title[language]}`,
      `Preferred date: ${date || t.pending}`,
      `People: ${people}`,
      `Language: ${language.toUpperCase()}`,
      "Please confirm availability, price, meeting point and restrictions.",
    ].join("\n");
  }

  if (!accessGranted) {
    return (
      <main className="access-page">
        <div className="access-photo" />
        <div className="access-ink" />
        <header className="access-header">
          <Brand light />
          <LanguageSelect value={language} onChange={changeLanguage} light />
        </header>
        <section className="access-layout">
          <div className="access-title-block">
            <p className="kicker light">{t.accessKicker}</p>
            <h1>{t.accessTitle}</h1>
            <p>{t.accessText}</p>
          </div>
          <form className="access-form" onSubmit={submitAccess}>
            <div className="form-index">00</div>
            <label htmlFor="stay-code">{t.accessLabel}</label>
            <div className={`access-field ${accessError ? "invalid" : ""}`}>
              <LockKeyhole size={19} />
              <input id="stay-code" value={codeValue} placeholder={t.accessPlaceholder} onChange={(event) => setCodeValue(event.target.value)} autoComplete="one-time-code" />
            </div>
            {accessError && <p className="form-error">{t.invalid}</p>}
            <button className="solid-button access-submit" type="submit">{t.accessButton}<ArrowRight size={18} /></button>
            <button className="text-button" type="button" onClick={() => setCodeValue("GIGOIA")}>{t.demo}</button>
            <span className="privacy"><ShieldCheck size={14} />{t.privacy}</span>
          </form>
        </section>
      </main>
    );
  }

  const categoryItems: Array<{ value: CategoryFilter; label: string }> = [
    { value: "all", label: t.all },
    { value: "restaurant", label: t.restaurant },
    { value: "cafe", label: t.cafe },
    { value: "market", label: t.market },
    { value: "pharmacy", label: t.pharmacy },
    { value: "deck", label: t.deck },
  ];

  return (
    <main className="atlas-page">
      <header className="topbar">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#map">{t.map}</a>
          <a href="#tours">{t.tours}</a>
          <a href="#guide">{t.guide}</a>
        </nav>
        <div className="header-actions">
          <LanguageSelect value={language} onChange={changeLanguage} />
          <button className="icon-button" type="button" aria-label={t.logout} title={t.logout} onClick={() => setAccessGranted(false)}><LockKeyhole size={18} /></button>
        </div>
      </header>

      <section className="masthead" id="home">
        <div className="masthead-copy">
          <p className="kicker"><span>01</span>{t.today}</p>
          <h1><span>GIGÓIA</span>{t.welcome}</h1>
          <p className="masthead-dek">{t.welcomeText}</p>
          <div className="stay-line">
            <span><CalendarDays size={16} />{t.dates}</span>
            <span><Users size={16} />{t.guests}</span>
            <span><Clock3 size={16} />{t.checkout}</span>
          </div>
        </div>
        <div className="masthead-photo" role="img" aria-label="Lagoon and boat at Ilha da Gigóia">
          <span className="photo-caption">Ilha da Gigóia / Rio de Janeiro</span>
          <strong>04</strong>
        </div>
      </section>

      <section className="essentials-section">
        <div className="section-rule"><span>02</span><p>{t.essentials}</p></div>
        <div className="wifi-spread">
          <div className="wifi-heading"><Wifi size={24} /><h2>{t.wifi}</h2></div>
          <div className="credential"><span>{t.network}</span><strong>{WIFI_NETWORK}</strong></div>
          <div className="credential"><span>{t.password}</span><strong>{WIFI_PASSWORD}</strong></div>
          <div className="wifi-actions">
            <button type="button" onClick={() => copyText(WIFI_PASSWORD, "wifi")}><Copy size={17} />{copied === "wifi" ? t.copied : t.copy}</button>
            <button type="button" onClick={() => setShowWifi(true)}><QrCode size={17} />{t.qr}</button>
          </div>
        </div>
        <div className="utility-ledger">
          <UtilityRow index="A" icon={<Ship size={20} />} title={t.waterTaxi} text={t.waterTaxiText} action={t.open} onClick={() => openConcierge("Gigóia Rio Guest Hub\nI need the confirmed water-taxi contact and boarding deck for Casa Mangue 04.")} />
          <UtilityRow index="B" icon={<BookOpen size={20} />} title={t.houseGuide} text={t.houseGuideText} action={t.open} href="#guide" />
          <UtilityRow index="C" icon={<MessageCircle size={20} />} title={t.concierge} text={t.conciergeText} action={t.open} onClick={() => openConcierge("Gigóia Rio Guest Hub\nAccommodation: Casa Mangue 04\nI need help with my stay.")} />
        </div>
      </section>

      <section className="map-section" id="map">
        <div className="map-heading-grid">
          <div className="section-rule light-rule"><span>03</span><p>{t.mapKicker}</p></div>
          <div>
            <h2>{t.mapTitle}</h2>
            <p>{t.mapText}</p>
          </div>
          <p className="prototype-stamp">{t.mapPrototype}</p>
        </div>
        <div className="map-category-tabs" role="tablist" aria-label={t.mapKicker}>
          {categoryItems.map((item) => (
            <button key={item.value} type="button" role="tab" aria-selected={category === item.value} className={category === item.value ? "active" : ""} onClick={() => chooseCategory(item.value)}>{item.label}</button>
          ))}
        </div>
        <div className="map-composition">
          <div className="map-canvas-wrap">
            <IslandMap places={filteredPlaces} selected={selectedPlace} language={language} onSelect={setSelectedPlace} />
            <div className="route-key">
              <span><i className="walk-line" />{t.walkRoute}</span>
              <span><i className="boat-line" />{t.boatRoute}</span>
            </div>
          </div>
          <div className="place-ledger">
            {filteredPlaces.map((place) => (
              <button key={place.id} type="button" className={selectedPlace.id === place.id ? "place-entry selected" : "place-entry"} onClick={() => setSelectedPlace(place)}>
                <span className="place-code">{place.category.slice(0, 2).toUpperCase()}</span>
                <span className="place-entry-copy"><strong>{place.name[language]}</strong><small>{place.description[language]}</small><em><Navigation size={13} />{place.routeMode === "boat" ? t.boatRoute : t.walkRoute} · {t.timePending}</em></span>
                <ChevronRight size={18} />
              </button>
            ))}
            <div className="selected-route-note">
              <span>{selectedPlace.routeMode === "boat" ? t.boatRoute : t.walkRoute}</span>
              <strong>{t.routePending}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="tours-section" id="tours">
        <div className="tours-intro">
          <div className="section-rule"><span>04</span><p>{t.toursKicker}</p></div>
          <h2>{t.toursTitle}</h2>
          <p>{t.toursText}</p>
        </div>
        <div className="experience-index" role="tablist" aria-label={t.toursTitle}>
          {experiences.map((experience) => (
            <button key={experience.id} type="button" role="tab" aria-selected={selectedExperience.id === experience.id} className={selectedExperience.id === experience.id ? "active" : ""} onClick={() => setSelectedExperience(experience)}>
              <span>{experience.index}</span><strong>{experience.title[language]}</strong>
            </button>
          ))}
        </div>
        <article className="experience-stage" key={selectedExperience.id}>
          <div className={`experience-media ${selectedExperience.media === "lagoon" ? "has-photo" : "pending-photo"}`}>
            {selectedExperience.media === "pending" && <><span>{selectedExperience.index}</span><strong>{t.photoPending}</strong></>}
            <small>{selectedExperience.media === "lagoon" ? t.referencePhoto : t.photoPending}</small>
          </div>
          <div className="experience-story">
            <p className="kicker"><span>{selectedExperience.index}</span>{selectedExperience.eyebrow[language]}</p>
            <h3>{selectedExperience.title[language]}</h3>
            <p className="experience-narrative">{selectedExperience.narrative[language]}</p>
            <dl className="experience-facts">
              <div><dt>{t.duration}</dt><dd>{t.pending}</dd></div>
              <div><dt>{t.meeting}</dt><dd>{t.meetingPending}</dd></div>
              <div><dt>{t.languages}</dt><dd>{t.pending}</dd></div>
              <div><dt>{t.restrictions}</dt><dd>{t.restrictionsPending}</dd></div>
              <div><dt>{t.weather}</dt><dd>{t.weatherText}</dd></div>
              <div className="price-fact"><dt>{t.price}</dt><dd>{t.priceText}</dd></div>
            </dl>
            <div className="availability-form">
              <label><span>{t.date}</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
              <label><span>{t.people}</span><span className="stepper"><button type="button" aria-label="Remove one person" onClick={() => setPeople((current) => Math.max(1, current - 1))}><Minus size={16} /></button><strong>{people}</strong><button type="button" aria-label="Add one person" onClick={() => setPeople((current) => Math.min(12, current + 1))}><Plus size={16} /></button></span></label>
              <button className="availability-button" type="button" onClick={() => openConcierge(tourMessage())}>{t.availability}<MessageCircle size={18} /></button>
            </div>
          </div>
        </article>
      </section>

      <section className="guide-section" id="guide">
        <div className="guide-lead">
          <div className="section-rule"><span>05</span><p>{t.guideKicker}</p></div>
          <h2>{t.guideTitle}</h2>
          <p>{t.guideIntro}</p>
        </div>
        <div className="guide-ledger">
          <GuideRow index="01" title={t.entry} text={t.entryText} />
          <GuideRow index="02" title={t.quiet} text={t.quietText} />
          <GuideRow index="03" title={t.air} text={t.airText} />
          <GuideRow index="04" title={t.checkoutTitle} text={t.checkoutText} />
        </div>
      </section>

      <footer>
        <Brand />
        <p>{t.dataNote}</p>
      </footer>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#home"><Home size={19} /><span>{t.home}</span></a>
        <a href="#map"><Map size={19} /><span>{t.map}</span></a>
        <a href="#tours"><Ship size={19} /><span>{t.tours}</span></a>
        <button type="button" onClick={() => openConcierge("Gigóia Rio Guest Hub\nAccommodation: Casa Mangue 04\nI need help with my stay.")}><MessageCircle size={19} /><span>{t.help}</span></button>
      </nav>

      {showWifi && (
        <Modal onClose={() => setShowWifi(false)} closeLabel={t.close}>
          <div className="modal-index">WI-FI / 04</div>
          <h2>{t.wifi}</h2>
          <div className="qr-placeholder"><QrCode size={56} /><strong>{t.pending}</strong></div>
          <p>{t.contactPendingText}</p>
        </Modal>
      )}

      {contactMessage && (
        <Modal onClose={() => setContactMessage(null)} closeLabel={t.close}>
          <div className="modal-index">CONCIERGE / V0</div>
          <h2>{t.contactPending}</h2>
          <p>{t.contactPendingText}</p>
          <label className="message-preview"><span>{t.preparedMessage}</span><textarea readOnly value={contactMessage} /></label>
          <button className="solid-button" type="button" onClick={() => copyText(contactMessage, "message")}><Copy size={17} />{copied === "message" ? t.copied : t.copyMessage}</button>
        </Modal>
      )}
    </main>
  );
}
function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="#home"><strong>GIGÓIA</strong><span>RIO / GUEST ATLAS</span></a>;
}

function LanguageSelect({ value, onChange, light = false }: { value: Language; onChange: (language: Language) => void; light?: boolean }) {
  return (
    <label className={`language-select ${light ? "language-select-light" : ""}`}>
      <Languages size={17} /><span className="sr-only">Language</span>
      <select value={value} onChange={(event) => onChange(event.target.value as Language)}>
        {languages.map((language) => <option key={language.code} value={language.code}>{language.short} · {language.label}</option>)}
      </select>
    </label>
  );
}

function UtilityRow({ index, icon, title, text, action, href, onClick }: { index: string; icon: React.ReactNode; title: string; text: string; action: string; href?: string; onClick?: () => void }) {
  const content = <><span className="utility-index">{index}</span><span className="utility-icon">{icon}</span><span className="utility-copy"><strong>{title}</strong><small>{text}</small></span><span className="utility-action">{action}<ArrowRight size={15} /></span></>;
  return href ? <a className="utility-row" href={href}>{content}</a> : <button className="utility-row" type="button" onClick={onClick}>{content}</button>;
}

function GuideRow({ index, title, text }: { index: string; title: string; text: string }) {
  return <article className="guide-row"><span>{index}</span><h3>{title}</h3><p>{text}</p></article>;
}

function Modal({ children, onClose, closeLabel }: { children: React.ReactNode; onClose: () => void; closeLabel: string }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="atlas-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label={closeLabel} title={closeLabel} onClick={onClose}><X size={19} /></button>
        {children}
      </div>
    </div>
  );
}
