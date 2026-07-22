export type Language = "pt" | "en" | "es" | "fr" | "de";

export type LocalizedText = Record<Language, string>;

export type PlaceCategory = "restaurant" | "cafe" | "market" | "pharmacy" | "deck";

export type Place = {
  id: string;
  category: PlaceCategory;
  name: LocalizedText;
  description: LocalizedText;
  position: [number, number];
  route: Array<[number, number]>;
  routeMode: "walk" | "boat";
};

export type Experience = {
  id: string;
  index: string;
  title: LocalizedText;
  eyebrow: LocalizedText;
  narrative: LocalizedText;
  media: "lagoon" | "pending";
};

export const languages: Array<{ code: Language; label: string; short: string }> = [
  { code: "pt", label: "Português", short: "PT" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
];

const localized = (pt: string, en: string, es: string, fr: string, de: string): LocalizedText => ({ pt, en, es, fr, de });

export const copy = {
  pt: {
    guestAtlas: "Atlas do hóspede",
    accessKicker: "Ilha da Gigóia · Rio de Janeiro",
    accessTitle: "A ilha começa aqui.",
    accessText: "Wi-Fi, barcos, caminhos e experiências reunidos em um guia feito para a sua estadia.",
    accessLabel: "Código da estadia",
    accessPlaceholder: "Digite seu código",
    accessButton: "Abrir meu atlas",
    demo: "Usar código de demonstração GIGOIA",
    invalid: "Código não encontrado. Use GIGOIA nesta demonstração.",
    privacy: "Acesso reservado aos hóspedes",
    today: "Agora na ilha",
    welcome: "Casa Mangue 04",
    welcomeText: "Seu ponto de partida na Gigóia.",
    dates: "18–22 JUL",
    guests: "3 hóspedes",
    checkout: "Check-out 11h",
    essentials: "Essencial agora",
    wifi: "Wi-Fi da casa",
    network: "Rede",
    password: "Senha",
    copy: "Copiar senha",
    copied: "Senha copiada",
    qr: "Ver QR Code",
    waterTaxi: "Barco-táxi",
    waterTaxiText: "Contato e deck a confirmar com Renzo",
    houseGuide: "Guia da casa",
    houseGuideText: "Entrada, silêncio e check-out",
    concierge: "Concierge Renzo",
    conciergeText: "Contato real pendente para o v0",
    open: "Abrir",
    mapKicker: "Atlas vivo da Gigóia",
    mapTitle: "A ilha, caminho por caminho.",
    mapText: "Escolha uma categoria para testar a câmera, o destaque do destino e a separação entre rotas a pé e de barco.",
    mapPrototype: "Pontos e rotas demonstrativos · validação local pendente",
    all: "Tudo",
    restaurant: "Restaurantes",
    cafe: "Cafés",
    market: "Mercados",
    pharmacy: "Farmácias",
    deck: "Decks",
    walkRoute: "Rota a pé",
    boatRoute: "Rota de barco",
    timePending: "Tempo a confirmar",
    routePending: "Trajeto para validação",
    toursKicker: "Curadoria do concierge",
    toursTitle: "Veja o Rio por outro ângulo.",
    toursText: "Experiências escolhidas para sair do roteiro óbvio. O concierge confirma operação, disponibilidade e condições antes de qualquer reserva.",
    photoPending: "Fotografia 16:9 pendente",
    referencePhoto: "Imagem de referência da lagoa · acervo final pendente",
    duration: "Duração",
    meeting: "Encontro",
    languages: "Idiomas",
    restrictions: "Restrições",
    weather: "Clima",
    pending: "A confirmar",
    meetingPending: "A confirmar com o concierge",
    restrictionsPending: "Condições e restrições a confirmar",
    weatherText: "Operação condicionada ao clima",
    price: "Preço",
    priceText: "Sob consulta",
    date: "Data desejada",
    people: "Pessoas",
    availability: "Consultar disponibilidade",
    contactPending: "Contato do concierge pendente",
    contactPendingText: "A mensagem já está pronta, mas nenhum número será usado até Renzo confirmar o contato oficial.",
    preparedMessage: "Mensagem preparada",
    copyMessage: "Copiar mensagem",
    close: "Fechar",
    guideKicker: "Casa Mangue 04",
    guideTitle: "Respostas sem precisar mandar mensagem.",
    guideIntro: "Este v0 preserva o guia da casa; os dados finais serão revisados com Renzo antes da publicação.",
    entry: "Entrada e chaves",
    entryText: "Procedimento a confirmar com Renzo.",
    quiet: "Silêncio",
    quietText: "Horários e regras a confirmar com Renzo.",
    air: "Ar-condicionado",
    airText: "Orientações do equipamento a confirmar.",
    checkoutTitle: "Check-out",
    checkoutText: "Horário e procedimento final a confirmar.",
    home: "Início",
    map: "Mapa",
    tours: "Passeios",
    guide: "Guia",
    help: "Ajuda",
    logout: "Sair",
    dataNote: "V0 de design · contatos, rotas, pontos, credenciais e condições precisam de validação",
  },
  en: {
    guestAtlas: "Guest atlas", accessKicker: "Ilha da Gigóia · Rio de Janeiro", accessTitle: "Your island starts here.", accessText: "Wi-Fi, boats, paths and experiences gathered in one guide made for your stay.", accessLabel: "Stay access code", accessPlaceholder: "Enter your code", accessButton: "Open my atlas", demo: "Use demo code GIGOIA", invalid: "Code not found. Use GIGOIA in this demo.", privacy: "Guest-only access", today: "Now on the island", welcome: "Casa Mangue 04", welcomeText: "Your starting point on Gigóia.", dates: "JUL 18–22", guests: "3 guests", checkout: "Check-out 11 am", essentials: "Essential now", wifi: "House Wi-Fi", network: "Network", password: "Password", copy: "Copy password", copied: "Password copied", qr: "Show QR code", waterTaxi: "Water taxi", waterTaxiText: "Contact and deck to be confirmed by Renzo", houseGuide: "House guide", houseGuideText: "Entry, quiet hours and check-out", concierge: "Renzo concierge", conciergeText: "Real contact pending for v0", open: "Open", mapKicker: "Living atlas of Gigóia", mapTitle: "The island, path by path.", mapText: "Choose a category to test the camera, destination focus and the distinction between walking and boat routes.", mapPrototype: "Demo points and routes · local validation pending", all: "All", restaurant: "Restaurants", cafe: "Cafés", market: "Markets", pharmacy: "Pharmacies", deck: "Decks", walkRoute: "Walking route", boatRoute: "Boat route", timePending: "Time to confirm", routePending: "Route pending validation", toursKicker: "Concierge selection", toursTitle: "See Rio from another angle.", toursText: "Experiences selected to go beyond the obvious. The concierge confirms operation, availability and conditions before any booking.", photoPending: "16:9 photography pending", referencePhoto: "Lagoon reference image · final library pending", duration: "Duration", meeting: "Meeting point", languages: "Languages", restrictions: "Restrictions", weather: "Weather", pending: "To confirm", meetingPending: "To confirm with concierge", restrictionsPending: "Conditions and restrictions to confirm", weatherText: "Operation is weather-dependent", price: "Price", priceText: "On request", date: "Preferred date", people: "People", availability: "Check availability", contactPending: "Concierge contact pending", contactPendingText: "Your message is ready, but no number will be used until Renzo confirms the official contact.", preparedMessage: "Prepared message", copyMessage: "Copy message", close: "Close", guideKicker: "Casa Mangue 04", guideTitle: "Answers without another message.", guideIntro: "This v0 preserves the house guide; final details will be reviewed with Renzo before publishing.", entry: "Entry and keys", entryText: "Procedure to be confirmed with Renzo.", quiet: "Quiet hours", quietText: "Times and rules to be confirmed with Renzo.", air: "Air conditioning", airText: "Equipment guidance to be confirmed.", checkoutTitle: "Check-out", checkoutText: "Final time and procedure to be confirmed.", home: "Home", map: "Map", tours: "Tours", guide: "Guide", help: "Help", logout: "Log out", dataNote: "Design v0 · contacts, routes, places, credentials and conditions require validation",
  },
  es: {
    guestAtlas: "Atlas del huésped", accessKicker: "Ilha da Gigóia · Río de Janeiro", accessTitle: "Tu isla empieza aquí.", accessText: "Wi-Fi, barcos, caminos y experiencias reunidos en una guía para tu estancia.", accessLabel: "Código de estancia", accessPlaceholder: "Introduce tu código", accessButton: "Abrir mi atlas", demo: "Usar código de prueba GIGOIA", invalid: "Código no encontrado. Usa GIGOIA en esta prueba.", privacy: "Acceso para huéspedes", today: "Ahora en la isla", welcome: "Casa Mangue 04", welcomeText: "Tu punto de partida en Gigóia.", dates: "18–22 JUL", guests: "3 huéspedes", checkout: "Salida 11 h", essentials: "Esencial ahora", wifi: "Wi-Fi de la casa", network: "Red", password: "Contraseña", copy: "Copiar contraseña", copied: "Contraseña copiada", qr: "Ver código QR", waterTaxi: "Barco-taxi", waterTaxiText: "Contacto y deck por confirmar con Renzo", houseGuide: "Guía de la casa", houseGuideText: "Entrada, silencio y salida", concierge: "Concierge Renzo", conciergeText: "Contacto real pendiente para el v0", open: "Abrir", mapKicker: "Atlas vivo de Gigóia", mapTitle: "La isla, camino a camino.", mapText: "Elige una categoría para probar la cámara, el destino y las rutas a pie o en barco.", mapPrototype: "Puntos y rutas de prueba · validación local pendiente", all: "Todo", restaurant: "Restaurantes", cafe: "Cafés", market: "Mercados", pharmacy: "Farmacias", deck: "Decks", walkRoute: "Ruta a pie", boatRoute: "Ruta en barco", timePending: "Tiempo por confirmar", routePending: "Trayecto por validar", toursKicker: "Selección del concierge", toursTitle: "Mira Río desde otro ángulo.", toursText: "Experiencias para salir de lo obvio. El concierge confirma operación, disponibilidad y condiciones antes de reservar.", photoPending: "Fotografía 16:9 pendiente", referencePhoto: "Imagen de referencia de la laguna · archivo final pendiente", duration: "Duración", meeting: "Encuentro", languages: "Idiomas", restrictions: "Restricciones", weather: "Clima", pending: "Por confirmar", meetingPending: "Por confirmar con el concierge", restrictionsPending: "Condiciones y restricciones por confirmar", weatherText: "Operación condicionada al clima", price: "Precio", priceText: "Bajo consulta", date: "Fecha deseada", people: "Personas", availability: "Consultar disponibilidad", contactPending: "Contacto del concierge pendiente", contactPendingText: "El mensaje está listo, pero no usaremos ningún número hasta que Renzo confirme el contacto oficial.", preparedMessage: "Mensaje preparado", copyMessage: "Copiar mensaje", close: "Cerrar", guideKicker: "Casa Mangue 04", guideTitle: "Respuestas sin enviar otro mensaje.", guideIntro: "Este v0 conserva la guía; los datos finales se revisarán con Renzo.", entry: "Entrada y llaves", entryText: "Procedimiento por confirmar con Renzo.", quiet: "Silencio", quietText: "Horarios y reglas por confirmar.", air: "Aire acondicionado", airText: "Instrucciones por confirmar.", checkoutTitle: "Salida", checkoutText: "Horario y procedimiento por confirmar.", home: "Inicio", map: "Mapa", tours: "Paseos", guide: "Guía", help: "Ayuda", logout: "Salir", dataNote: "V0 de diseño · contactos, rutas, lugares, credenciales y condiciones requieren validación",
  },
  fr: {
    guestAtlas: "Atlas voyageur", accessKicker: "Ilha da Gigóia · Rio de Janeiro", accessTitle: "Votre île commence ici.", accessText: "Wi-Fi, bateaux, chemins et expériences réunis dans un guide pour votre séjour.", accessLabel: "Code du séjour", accessPlaceholder: "Saisissez votre code", accessButton: "Ouvrir mon atlas", demo: "Utiliser le code démo GIGOIA", invalid: "Code introuvable. Utilisez GIGOIA pour cette démo.", privacy: "Accès voyageurs", today: "Maintenant sur l’île", welcome: "Casa Mangue 04", welcomeText: "Votre point de départ à Gigóia.", dates: "18–22 JUIL", guests: "3 voyageurs", checkout: "Départ 11 h", essentials: "L’essentiel", wifi: "Wi-Fi de la maison", network: "Réseau", password: "Mot de passe", copy: "Copier", copied: "Mot de passe copié", qr: "Voir le QR code", waterTaxi: "Bateau-taxi", waterTaxiText: "Contact et deck à confirmer avec Renzo", houseGuide: "Guide de la maison", houseGuideText: "Entrée, calme et départ", concierge: "Concierge Renzo", conciergeText: "Contact réel en attente pour le v0", open: "Ouvrir", mapKicker: "Atlas vivant de Gigóia", mapTitle: "L’île, chemin par chemin.", mapText: "Choisissez une catégorie pour tester la caméra, la destination et les routes à pied ou en bateau.", mapPrototype: "Points et routes de démo · validation locale en attente", all: "Tout", restaurant: "Restaurants", cafe: "Cafés", market: "Marchés", pharmacy: "Pharmacies", deck: "Decks", walkRoute: "Route à pied", boatRoute: "Route en bateau", timePending: "Durée à confirmer", routePending: "Trajet à valider", toursKicker: "Sélection du concierge", toursTitle: "Voyez Rio sous un autre angle.", toursText: "Des expériences au-delà de l’évidence. Le concierge confirme l’opération, la disponibilité et les conditions avant toute réservation.", photoPending: "Photographie 16:9 en attente", referencePhoto: "Image de référence de la lagune · bibliothèque finale en attente", duration: "Durée", meeting: "Rendez-vous", languages: "Langues", restrictions: "Restrictions", weather: "Météo", pending: "À confirmer", meetingPending: "À confirmer avec le concierge", restrictionsPending: "Conditions et restrictions à confirmer", weatherText: "Opération soumise à la météo", price: "Prix", priceText: "Sur demande", date: "Date souhaitée", people: "Personnes", availability: "Vérifier la disponibilité", contactPending: "Contact concierge en attente", contactPendingText: "Le message est prêt, mais aucun numéro ne sera utilisé avant confirmation de Renzo.", preparedMessage: "Message préparé", copyMessage: "Copier le message", close: "Fermer", guideKicker: "Casa Mangue 04", guideTitle: "Des réponses sans autre message.", guideIntro: "Ce v0 conserve le guide; les détails seront validés avec Renzo.", entry: "Entrée et clés", entryText: "Procédure à confirmer avec Renzo.", quiet: "Calme", quietText: "Horaires et règles à confirmer.", air: "Climatisation", airText: "Instructions à confirmer.", checkoutTitle: "Départ", checkoutText: "Horaire et procédure à confirmer.", home: "Accueil", map: "Carte", tours: "Excursions", guide: "Guide", help: "Aide", logout: "Sortir", dataNote: "V0 design · contacts, routes, lieux, identifiants et conditions à valider",
  },
  de: {
    guestAtlas: "Gästeatlas", accessKicker: "Ilha da Gigóia · Rio de Janeiro", accessTitle: "Ihre Insel beginnt hier.", accessText: "WLAN, Boote, Wege und Erlebnisse in einem Guide für Ihren Aufenthalt.", accessLabel: "Aufenthaltscode", accessPlaceholder: "Code eingeben", accessButton: "Atlas öffnen", demo: "Demo-Code GIGOIA verwenden", invalid: "Code nicht gefunden. Verwenden Sie GIGOIA für die Demo.", privacy: "Nur für Gäste", today: "Jetzt auf der Insel", welcome: "Casa Mangue 04", welcomeText: "Ihr Ausgangspunkt auf Gigóia.", dates: "18.–22. JUL", guests: "3 Gäste", checkout: "Check-out 11 Uhr", essentials: "Jetzt wichtig", wifi: "Haus-WLAN", network: "Netzwerk", password: "Passwort", copy: "Passwort kopieren", copied: "Passwort kopiert", qr: "QR-Code zeigen", waterTaxi: "Wassertaxi", waterTaxiText: "Kontakt und Deck mit Renzo zu bestätigen", houseGuide: "Hausführer", houseGuideText: "Zugang, Ruhe und Check-out", concierge: "Concierge Renzo", conciergeText: "Echter Kontakt für v0 ausstehend", open: "Öffnen", mapKicker: "Lebendiger Atlas von Gigóia", mapTitle: "Die Insel, Weg für Weg.", mapText: "Wählen Sie eine Kategorie, um Kamera, Ziel und Fuß- oder Bootsrouten zu testen.", mapPrototype: "Demo-Punkte und -Routen · lokale Prüfung ausstehend", all: "Alles", restaurant: "Restaurants", cafe: "Cafés", market: "Märkte", pharmacy: "Apotheken", deck: "Decks", walkRoute: "Fußweg", boatRoute: "Bootsroute", timePending: "Dauer zu bestätigen", routePending: "Route zu prüfen", toursKicker: "Concierge-Auswahl", toursTitle: "Sehen Sie Rio aus einem anderen Blickwinkel.", toursText: "Erlebnisse jenseits des Offensichtlichen. Der Concierge bestätigt Betrieb, Verfügbarkeit und Bedingungen vor jeder Buchung.", photoPending: "16:9-Fotografie ausstehend", referencePhoto: "Referenzbild der Lagune · finale Bilder ausstehend", duration: "Dauer", meeting: "Treffpunkt", languages: "Sprachen", restrictions: "Einschränkungen", weather: "Wetter", pending: "Zu bestätigen", meetingPending: "Mit Concierge zu bestätigen", restrictionsPending: "Bedingungen und Einschränkungen zu bestätigen", weatherText: "Betrieb wetterabhängig", price: "Preis", priceText: "Auf Anfrage", date: "Wunschdatum", people: "Personen", availability: "Verfügbarkeit prüfen", contactPending: "Concierge-Kontakt ausstehend", contactPendingText: "Die Nachricht ist bereit; eine Nummer wird erst nach Renzos Bestätigung verwendet.", preparedMessage: "Vorbereitete Nachricht", copyMessage: "Nachricht kopieren", close: "Schließen", guideKicker: "Casa Mangue 04", guideTitle: "Antworten ohne weitere Nachricht.", guideIntro: "Dieser v0 erhält den Hausführer; Details werden mit Renzo geprüft.", entry: "Zugang und Schlüssel", entryText: "Ablauf mit Renzo zu bestätigen.", quiet: "Ruhezeiten", quietText: "Zeiten und Regeln zu bestätigen.", air: "Klimaanlage", airText: "Hinweise zu bestätigen.", checkoutTitle: "Check-out", checkoutText: "Zeit und Ablauf zu bestätigen.", home: "Start", map: "Karte", tours: "Touren", guide: "Guide", help: "Hilfe", logout: "Abmelden", dataNote: "Design-v0 · Kontakte, Routen, Orte, Zugangsdaten und Bedingungen müssen geprüft werden",
  },
} satisfies Record<Language, Record<string, string>>;

export const places: Place[] = [
  { id: "restaurant-preview", category: "restaurant", name: localized("Restaurante parceiro · a confirmar", "Restaurant partner · to confirm", "Restaurante asociado · por confirmar", "Restaurant partenaire · à confirmer", "Partnerrestaurant · zu bestätigen"), description: localized("Nome, acesso e horário pendentes", "Name, access and hours pending", "Nombre, acceso y horario pendientes", "Nom, accès et horaires en attente", "Name, Zugang und Zeiten ausstehend"), position: [-43.30592, -23.00968], routeMode: "walk", route: [[-43.30632, -23.00934], [-43.30612, -23.00944], [-43.30592, -23.00968]] },
  { id: "cafe-preview", category: "cafe", name: localized("Café · a confirmar", "Café · to confirm", "Café · por confirmar", "Café · à confirmer", "Café · zu bestätigen"), description: localized("Seleção local pendente", "Local selection pending", "Selección local pendiente", "Sélection locale en attente", "Lokale Auswahl ausstehend"), position: [-43.30642, -23.00905], routeMode: "walk", route: [[-43.30632, -23.00934], [-43.3064, -23.0092], [-43.30642, -23.00905]] },
  { id: "market-preview", category: "market", name: localized("Mercado · a confirmar", "Market · to confirm", "Mercado · por confirmar", "Marché · à confirmer", "Markt · zu bestätigen"), description: localized("Endereço e horário pendentes", "Address and hours pending", "Dirección y horario pendientes", "Adresse et horaires en attente", "Adresse und Zeiten ausstehend"), position: [-43.30678, -23.00952], routeMode: "walk", route: [[-43.30632, -23.00934], [-43.30655, -23.00941], [-43.30678, -23.00952]] },
  { id: "pharmacy-preview", category: "pharmacy", name: localized("Farmácia · a confirmar", "Pharmacy · to confirm", "Farmacia · por confirmar", "Pharmacie · à confirmer", "Apotheke · zu bestätigen"), description: localized("Opção no continente pendente", "Mainland option pending", "Opción en tierra firme pendiente", "Option sur le continent en attente", "Option auf dem Festland ausstehend"), position: [-43.30972, -23.00662], routeMode: "boat", route: [[-43.30632, -23.00934], [-43.30686, -23.00902], [-43.3081, -23.00816], [-43.30972, -23.00662]] },
  { id: "deck-preview", category: "deck", name: localized("Deck de embarque · a confirmar", "Boarding deck · to confirm", "Deck de embarque · por confirmar", "Deck d’embarquement · à confirmer", "Anlegesteg · zu bestätigen"), description: localized("Nome e operador pendentes", "Name and operator pending", "Nombre y operador pendientes", "Nom et opérateur en attente", "Name und Betreiber ausstehend"), position: [-43.30504, -23.00872], routeMode: "boat", route: [[-43.30632, -23.00934], [-43.30574, -23.00917], [-43.30504, -23.00872]] },
];

export const experiences: Experience[] = [
  { id: "archipelago", index: "01", eyebrow: localized("Lagoa e manguezal", "Lagoon and mangrove", "Laguna y manglar", "Lagune et mangrove", "Lagune und Mangrove"), title: localized("Circuito pelas nove ilhas", "Nine-island circuit", "Circuito por las nueve islas", "Circuit des neuf îles", "Rundfahrt durch neun Inseln"), narrative: localized("Navegue pelo arquipélago e pelo manguezal com a possibilidade de observar jacarés, capivaras e aves. O avistamento de animais nunca é garantido.", "Cruise through the archipelago and mangrove with a chance to observe caimans, capybaras and birds. Wildlife sightings are never guaranteed.", "Navega por el archipiélago y el manglar con posibilidad de observar caimanes, capibaras y aves. Nunca se garantiza el avistamiento.", "Naviguez dans l’archipel et la mangrove avec la possibilité d’observer caïmans, capybaras et oiseaux. Aucune observation n’est garantie.", "Fahren Sie durch Archipel und Mangroven mit der Möglichkeit, Kaimane, Capybaras und Vögel zu sehen. Sichtungen sind nie garantiert."), media: "lagoon" },
  { id: "tijucas", index: "02", eyebrow: localized("Mar aberto", "Open sea", "Mar abierto", "Pleine mer", "Offenes Meer"), title: localized("Barco até as Ilhas Tijucas", "Boat to the Tijucas Islands", "Barco a las Islas Tijucas", "Bateau vers les îles Tijucas", "Boot zu den Tijucas-Inseln"), narrative: localized("Uma travessia da Barra até o arquipélago em mar aberto. Rota, embarcação, duração e restrições serão confirmadas pelo concierge.", "A crossing from Barra to the offshore archipelago. Route, vessel, duration and restrictions will be confirmed by the concierge.", "Una travesía desde Barra al archipiélago en mar abierto. El concierge confirmará ruta, embarcación, duración y restricciones.", "Une traversée depuis Barra vers l’archipel au large. Le concierge confirmera route, bateau, durée et restrictions.", "Eine Überfahrt von Barra zum vorgelagerten Archipel. Route, Boot, Dauer und Einschränkungen bestätigt der Concierge."), media: "pending" },
  { id: "jetski", index: "03", eyebrow: localized("Velocidade na água", "Speed on water", "Velocidad en el agua", "Vitesse sur l’eau", "Geschwindigkeit auf dem Wasser"), title: localized("Jet ski", "Jet ski", "Moto acuática", "Jet-ski", "Jetski"), narrative: localized("Uma experiência de alta energia na água, sujeita às regras do operador, habilitação aplicável e condições de navegação.", "A high-energy experience on the water, subject to operator rules, applicable licensing and navigation conditions.", "Una experiencia de alta energía sujeta a las reglas del operador, licencias aplicables y condiciones de navegación.", "Une expérience intense soumise aux règles de l’opérateur, aux permis applicables et aux conditions de navigation.", "Ein energiegeladenes Erlebnis, abhängig von Betreiberregeln, erforderlichen Nachweisen und Fahrbedingungen."), media: "pending" },
  { id: "flight", index: "04", eyebrow: localized("Pedra Bonita", "Pedra Bonita", "Pedra Bonita", "Pedra Bonita", "Pedra Bonita"), title: localized("Asa-delta ou parapente", "Hang gliding or paragliding", "Ala delta o parapente", "Deltaplane ou parapente", "Drachen- oder Gleitschirmflug"), narrative: localized("Veja a cidade entre montanha e mar em um voo duplo. Operação, modalidade e requisitos dependem do clima e do parceiro confirmado.", "See the city between mountain and sea on a tandem flight. Operation, format and requirements depend on weather and the confirmed partner.", "Mira la ciudad entre montaña y mar en un vuelo tándem. La operación, modalidad y requisitos dependen del clima y del asociado confirmado.", "Découvrez la ville entre montagne et mer en vol biplace. L’opération, la formule et les exigences dépendent de la météo et du partenaire confirmé.", "Erleben Sie die Stadt zwischen Berg und Meer im Tandemflug. Durchführung, Flugart und Voraussetzungen hängen von Wetter und Partner ab."), media: "pending" },
  { id: "helicopter", index: "05", eyebrow: localized("Rio do alto", "Rio from above", "Río desde el aire", "Rio vu du ciel", "Rio von oben"), title: localized("Helicóptero até o Cristo", "Helicopter flight to Christ the Redeemer", "Helicóptero hasta el Cristo", "Survol en hélicoptère vers le Christ", "Hubschrauberflug zum Christus"), narrative: localized("Um sobrevoo panorâmico do Rio com rota pretendida até o Cristo Redentor. Base, duração e trajeto dependem da operação confirmada.", "A panoramic flight over Rio with an intended route towards Christ the Redeemer. Base, duration and routing depend on the confirmed operation.", "Un vuelo panorámico sobre Río con ruta prevista hacia el Cristo Redentor. La base, duración y recorrido dependen de la operación confirmada.", "Un vol panoramique au-dessus de Rio avec un itinéraire prévu vers le Christ Rédempteur. Base, durée et parcours dépendent de l’opération confirmée.", "Ein Panoramaflug über Rio mit geplanter Route zum Christus. Startpunkt, Dauer und Strecke hängen vom bestätigten Anbieter ab."), media: "pending" },
];

