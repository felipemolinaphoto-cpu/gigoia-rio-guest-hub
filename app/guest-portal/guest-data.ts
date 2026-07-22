// ─── Types ───────────────────────────────────────────────────────
export type GuestLang = 'pt' | 'en';

export interface Rule {
  id: string;
  icon: string;
  color: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
}

export interface MapPin {
  id: string;
  name: string;
  category: 'deck';
  x: number; // percentage
  y: number; // percentage
  description: { pt: string; en: string };
  mapsUrl?: string;
}

export interface Tour {
  id: string;
  image: string;
  category: { pt: string; en: string };
  categoryColor: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  duration: { pt: string; en: string };
  price: { pt: string; en: string };
  whatsapp?: string;
}

export interface Faq {
  id: string;
  question: { pt: string; en: string };
  answer: { pt: string; en: string };
}

// ─── Configuration ───────────────────────────────────────────────
export const GUEST_CONFIG = {
  propertyName: 'GIGÓIA 115',
  password: 'CAPIVARA',
  wifi: {
    network: 'GIGOIA115_5G',
    password: 'ilhadagigoia2024',
  },
  checkIn: '15:00',
  checkOut: '11:00',
  maxGuests: 4,
  host: {
    name: 'Renzo',
    whatsapp: '5521999999999',
    phone: '+55 21 99999-9999',
    email: 'renzo@gigoia115.com.br',
  },
  hours: '8h - 22h',
};

export interface IslandTip {
  id: string;
  category: 'transport' | 'fauna' | 'market' | 'health' | 'lifestyle';
  icon: string;
  title: { pt: string; en: string };
  summary: { pt: string; en: string };
  details: { pt: string; en: string };
  badge?: { pt: string; en: string };
}

// ─── Bilingual Copy ──────────────────────────────────────────────
export const guestCopy = {
  pt: {
    // Access screen
    accessSubtitle: 'Ilha da Gigóia · Rio de Janeiro',
    accessTitle: 'Bem-vindo à ilha.',
    accessPlaceholder: 'Digite a senha de acesso',
    accessButton: 'Entrar',
    accessHint: 'Escaneie o QR Code no apartamento para acesso rápido',
    accessError: 'Senha incorreta. Tente novamente.',
    langToggle: 'English',
    // Welcome
    welcomeSubtitle: 'Sua estadia na Ilha da Gigóia',
    welcomeGreeting: 'Seja muito bem-vindo!',
    welcomeVideoTitle: 'Vídeo de Boas-Vindas',
    welcomeVideoSubtitle: 'Conheça o espaço e dicas da sua chegada em 1 minuto',
    welcomeVideoWatch: 'Assistir Vídeo',
    welcomeVideoPlaying: 'Reproduzindo...',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Hóspedes',
    wifiTitle: 'Wi-Fi da Casa',
    wifiNetwork: 'Rede',
    wifiPassword: 'Senha',
    wifiCopy: 'Copiar',
    wifiCopied: 'Copiado!',
    wifiQrButton: 'QR Code Wi-Fi',
    wifiQrTitle: 'Escaneie para conectar',
    close: 'Fechar',
    // Rules
    rulesTitle: 'Regras da Casa',
    rulesSubtitle: 'Para uma estadia agradável para todos',
    // Ilha
    ilhaTitle: 'Guia & Infos da Ilha',
    ilhaSubtitle: 'Dicas essenciais, travessia e mapa dos decks',
    ilhaFilterAll: 'Tudo sobre a Ilha',
    ilhaFilterTips: 'Dicas & Infos',
    ilhaFilterMap: 'Mapa & Decks',
    ilhaTipsHeader: 'Dicas & Infos Básicas Importantes',
    // Tours
    toursTitle: 'Passeios & Experiências',
    toursSubtitle: 'Descubra o melhor do Rio',
    tourDuration: 'Duração',
    tourPrice: 'Preço',
    tourBook: 'Reservar via WhatsApp',
    tourPending: 'Contato em breve',
    // Ajuda (combined FAQ + Contact)
    ajudaTitle: 'Ajuda & Suporte',
    ajudaSubtitle: 'Fale com o Renzo e tire dúvidas frequentes',
    ajudaContactHeader: 'Fale com o Anfitrião',
    ajudaFaqHeader: 'Perguntas Frequentes (FAQ)',
    ajudaSearchPlaceholder: 'Buscar dúvida (ex: wifi, check-out, barcos...)',
    contactWhatsapp: 'WhatsApp',
    contactPhone: 'Telefone',
    contactEmail: 'E-mail',
    contactHours: 'Atendimento',
    contactPending: 'Em breve',
    // Tabs
    tabWelcome: 'Início',
    tabRules: 'Regras',
    tabIlha: 'ILHA',
    tabTours: 'Passeios',
    tabAjuda: 'Ajuda',
  },
  en: {
    accessSubtitle: 'Ilha da Gigóia · Rio de Janeiro',
    accessTitle: 'Welcome to the island.',
    accessPlaceholder: 'Enter access password',
    accessButton: 'Enter',
    accessHint: 'Scan the QR Code in the apartment for quick access',
    accessError: 'Wrong password. Try again.',
    langToggle: 'Português',
    welcomeSubtitle: 'Your stay at Ilha da Gigóia',
    welcomeGreeting: 'Welcome to your island stay!',
    welcomeVideoTitle: 'Welcome Video',
    welcomeVideoSubtitle: 'Get a quick tour of your stay in 1 minute',
    welcomeVideoWatch: 'Watch Video',
    welcomeVideoPlaying: 'Playing...',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    wifiTitle: 'House Wi-Fi',
    wifiNetwork: 'Network',
    wifiPassword: 'Password',
    wifiCopy: 'Copy',
    wifiCopied: 'Copied!',
    wifiQrButton: 'Wi-Fi QR Code',
    wifiQrTitle: 'Scan to connect',
    close: 'Close',
    rulesTitle: 'House Rules',
    rulesSubtitle: 'For a pleasant stay for everyone',
    ilhaTitle: 'Island Guide & Info',
    ilhaSubtitle: 'Essential tips, boat crossing and dock map',
    ilhaFilterAll: 'All Island Info',
    ilhaFilterTips: 'Tips & Guide',
    ilhaFilterMap: 'Map & Docks',
    ilhaTipsHeader: 'Essential Island Knowledge',
    toursTitle: 'Tours & Experiences',
    toursSubtitle: 'Discover the best of Rio',
    tourDuration: 'Duration',
    tourPrice: 'Price',
    tourBook: 'Book via WhatsApp',
    tourPending: 'Contact coming soon',
    ajudaTitle: 'Help & Support',
    ajudaSubtitle: 'Contact Renzo and browse common questions',
    ajudaContactHeader: 'Contact Your Host',
    ajudaFaqHeader: 'Frequently Asked Questions (FAQ)',
    ajudaSearchPlaceholder: 'Search question (e.g. wifi, checkout, boats...)',
    contactWhatsapp: 'WhatsApp',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    contactHours: 'Support hours',
    contactPending: 'Coming soon',
    tabWelcome: 'Home',
    tabRules: 'Rules',
    tabIlha: 'ILHA',
    tabTours: 'Tours',
    tabAjuda: 'Help',
  },
};

export const islandTips: IslandTip[] = [
  {
    id: 'transport',
    category: 'transport',
    icon: 'Ship',
    title: { pt: 'Barcos & Travessia 24h', en: '24h Water Taxi & Boats' },
    summary: {
      pt: 'Os barcos são o único meio de transporte para entrar e sair da ilha. Operam dia e noite.',
      en: 'Boats are the only way to access the island. Operating day and night.',
    },
    details: {
      pt: 'Tarifa padrão: R$ 5,00 por pessoa por travessia (pague em dinheiro ou Pix direto ao barqueiro). Decks principais: Deck Principal (Estrada da Barra) e Deck Metrô (ao lado do Metrô Jardim Oceânico).',
      en: 'Standard fare: R$ 5.00 per person per crossing (pay cash or Pix directly to boatman). Main docks: Main Deck (Estrada da Barra) and Metro Deck (beside Jardim Oceânico Metro).',
    },
    badge: { pt: 'R$ 5,00 / pessoa', en: 'R$ 5.00 / person' },
  },
  {
    id: 'lifestyle',
    category: 'lifestyle',
    icon: 'Footprints',
    title: { pt: 'Tranquilidade & Ilha sem Carros', en: 'Peaceful & Car-Free Island' },
    summary: {
      pt: 'Não entram carros ou motos na ilha. Caminhe despreocupado pelas alamedas arborizadas.',
      en: 'No cars or motorcycles on the island. Enjoy walking along leafy footpaths.',
    },
    details: {
      pt: 'A ilha é estritamente de pedestres. Respeite o silêncio noturno a partir das 22h, permitindo que moradores e hóspedes aproveitem o sossego único da ilha.',
      en: 'The island is strictly pedestrian. Please respect quiet hours from 10 PM onwards, allowing all guests and residents to enjoy the island tranquility.',
    },
    badge: { pt: '100% Pedestre', en: 'Car-free' },
  },
  {
    id: 'fauna',
    category: 'fauna',
    icon: 'Trees',
    title: { pt: 'Fauna do Manguezal & Capivaras', en: 'Wildlife & Capybaras' },
    summary: {
      pt: 'É comum avistar capivaras nadando, garças e pássaros nativos da Lagoa da Tijuca.',
      en: 'Spot capybaras swimming, herons, and native lagoon birds along the shores.',
    },
    details: {
      pt: 'A ilha preserva a flora e fauna do manguezal carioca. Admire os animais de forma contemplativa, sem alimentar ou tentar se aproximar demasiadamente.',
      en: 'The island preserves native mangrove flora and fauna. Observe wildlife from a respectful distance and avoid feeding wild animals.',
    },
    badge: { pt: 'Preserve a Natureza', en: 'Protect Nature' },
  },
  {
    id: 'market',
    category: 'market',
    icon: 'ShoppingBag',
    title: { pt: 'Mercados, Conveniência & Delivery', en: 'Groceries & Dock Delivery' },
    summary: {
      pt: 'Mercearias locais na ilha e grandes supermercados a poucos minutos de barco.',
      en: 'Local island groceries and big mainland supermarkets just minutes by boat.',
    },
    details: {
      pt: 'Há pequenas mercearias para itens de última hora na ilha. No continente, em frente aos decks, há supermercados Zona Sul, Hortifruti e Guanabara. Aplicativos de delivery (iFood/Rappi) entregam diretamente no deck de embarque!',
      en: 'Small groceries operate on the island. Across the channel, major supermarkets (Zona Sul, Hortifruti) are available. Delivery apps (iFood/Rappi) deliver to the main dock entrance!',
    },
    badge: { pt: 'iFood no Deck', en: 'Dock Delivery' },
  },
  {
    id: 'health',
    category: 'health',
    icon: 'Cross',
    title: { pt: 'Saúde & Emergências', en: 'Health & Emergencies' },
    summary: {
      pt: 'Hospital Unimed Barra a 2 min de barco e suporte direto do anfitrião.',
      en: 'Unimed Barra Hospital 2 mins by boat and direct host assistance.',
    },
    details: {
      pt: 'O Hospital Unimed Barra fica localizado logo em frente ao Deck Unimed (travessia rápida). Para qualquer eventualidade no imóvel, fale com o Renzo pelo WhatsApp. Emergências: Bombeiros (193), SAMU (192), Polícia (190).',
      en: 'Unimed Barra Hospital is located directly opposite Deck Unimed. For any issues with the property, reach host Renzo on WhatsApp. Emergency lines: Fire (193), SAMU (192), Police (190).',
    },
    badge: { pt: 'Emergência 24h', en: 'Emergency 24/7' },
  },
  {
    id: 'sunset',
    category: 'lifestyle',
    icon: 'Sun',
    title: { pt: 'Pôr do Sol & Decks Gastronômicos', en: 'Sunset & Waterfront Dining' },
    summary: {
      pt: 'Bares e restaurantes com decks de madeira voltados para o pôr do sol na lagoa.',
      en: 'Charming wooden deck restaurants overlooking the sunset over the lagoon.',
    },
    details: {
      pt: 'A Gigóia possui gastronomia variada com opções de peixes, moquecas e drinks tropicais. Os decks do lado oeste oferecem uma das vistas de pôr do sol mais espetaculares do Rio de Janeiro.',
      en: 'Gigóia features diverse cuisine from seafood to tropical cocktails. The west-facing decks offer one of Rio de Janeiro’s most stunning sunset views.',
    },
    badge: { pt: 'Dica Imperdível', en: 'Top Highlight' },
  },
];

// ─── House Rules ─────────────────────────────────────────────────
export const rules: Rule[] = [
  {
    id: 'quiet',
    icon: 'Moon',
    color: '#0A4D68',
    title: { pt: 'Silêncio após 22h', en: 'Quiet after 10 PM' },
    description: {
      pt: 'A ilha é residencial. Respeite o silêncio noturno a partir das 22h.',
      en: 'The island is residential. Please respect quiet hours after 10 PM.',
    },
  },
  {
    id: 'trash',
    icon: 'Trash2',
    color: '#2D6A4F',
    title: { pt: 'Lixo separado', en: 'Separate trash' },
    description: {
      pt: 'Separe o lixo reciclável e orgânico nos coletores indicados.',
      en: 'Separate recyclable and organic waste in the designated bins.',
    },
  },
  {
    id: 'ac',
    icon: 'Snowflake',
    color: '#088395',
    title: { pt: 'Ar-condicionado', en: 'Air conditioning' },
    description: {
      pt: 'Desligue o ar-condicionado ao sair do imóvel.',
      en: 'Turn off the AC when leaving the property.',
    },
  },
  {
    id: 'checkout',
    icon: 'DoorOpen',
    color: '#D4A853',
    title: { pt: 'Check-out até 11h', en: 'Check-out by 11 AM' },
    description: {
      pt: 'Deixe as chaves na mesa e a porta trancada no check-out.',
      en: 'Leave the keys on the table and lock the door at checkout.',
    },
  },
  {
    id: 'keys',
    icon: 'Key',
    color: '#E76F51',
    title: { pt: 'Chaves & Tranca', en: 'Keys & Lock' },
    description: {
      pt: 'Não faça cópias das chaves. Em caso de perda, avise imediatamente.',
      en: 'Do not copy the keys. If lost, notify us immediately.',
    },
  },
  {
    id: 'parties',
    icon: 'Ban',
    color: '#1A1A2E',
    title: { pt: 'Sem festas', en: 'No parties' },
    description: {
      pt: 'Não são permitidas festas ou eventos no imóvel.',
      en: 'Parties and events are not allowed on the property.',
    },
  },
  {
    id: 'pets',
    icon: 'PawPrint',
    color: '#2D6A4F',
    title: { pt: 'Pets sob consulta', en: 'Pets on request' },
    description: {
      pt: 'Consulte antecipadamente sobre a possibilidade de trazer animais.',
      en: 'Please inquire in advance about bringing pets.',
    },
  },
  {
    id: 'water',
    icon: 'Droplets',
    color: '#05BFDB',
    title: { pt: 'Economia de água', en: 'Water conservation' },
    description: {
      pt: 'A ilha tem abastecimento limitado. Use água com consciência.',
      en: 'The island has limited water supply. Please use water wisely.',
    },
  },
];

// ─── Map Pins (11 Decks strictly aligned with image markers) ──────
export const mapPins: MapPin[] = [
  {
    id: 'principal',
    name: 'Deck Principal',
    category: 'deck',
    x: 54.4,
    y: 77.2,
    description: {
      pt: 'Principal deck de chegada à ilha. Ponto central de embarque e desembarque.',
      en: 'Main arrival deck on the island. Central boarding and disembarking point.',
    },
    mapsUrl: 'https://maps.google.com/?q=-23.0042,-43.3085',
  },
  {
    id: 'metro',
    name: 'Deck Metrô',
    category: 'deck',
    x: 41.2,
    y: 86.4,
    description: {
      pt: 'Deck de acesso próximo à estação de metrô Jardim Oceânico.',
      en: 'Access deck near the Jardim Oceânico metro station.',
    },
    mapsUrl: 'https://maps.google.com/?q=-23.0055,-43.3080',
  },
  {
    id: 'unimed',
    name: 'Deck Unimed',
    category: 'deck',
    x: 53.4,
    y: 85.0,
    description: {
      pt: 'Deck no continente, em frente à Unimed Barra.',
      en: 'Mainland deck, in front of Unimed Barra.',
    },
    mapsUrl: 'https://maps.google.com/?q=-23.0050,-43.3070',
  },
  {
    id: 'barra-point',
    name: 'Deck Barra Point',
    category: 'deck',
    x: 67.2,
    y: 81.8,
    description: {
      pt: 'Deck de embarque próximo ao shopping Barra Point.',
      en: 'Boarding deck near Barra Point shopping mall.',
    },
    mapsUrl: 'https://maps.google.com/?q=-23.0045,-43.3055',
  },
  {
    id: 'colibri',
    name: 'Deck Colibri',
    category: 'deck',
    x: 29.4,
    y: 53.2,
    description: {
      pt: 'Deck na alameda oeste com bela vista para a lagoa.',
      en: 'Deck on the west side with a beautiful lagoon view.',
    },
  },
  {
    id: 'beco-rato',
    name: 'Deck Beco do Rato',
    category: 'deck',
    x: 30.6,
    y: 36.8,
    description: {
      pt: 'Deck tradicional no Beco do Rato, acesso à parte oeste.',
      en: 'Traditional deck at Beco do Rato, access to west side.',
    },
  },
  {
    id: 'coqueiros',
    name: 'Deck Coqueiros',
    category: 'deck',
    x: 42.6,
    y: 22.4,
    description: {
      pt: 'Deck no extremo norte, cercado pela natureza.',
      en: 'Deck at the far north, surrounded by nature.',
    },
  },
  {
    id: 'caicara',
    name: 'Deck Caiçara',
    category: 'deck',
    x: 57.2,
    y: 15.6,
    description: {
      pt: 'Deck no lado norte da ilha, atmosfera tranquila.',
      en: 'Deck on the north side of the island, quiet atmosphere.',
    },
  },
  {
    id: 'ilha-primeira',
    name: 'Deck Ilha Primeira',
    category: 'deck',
    x: 52.8,
    y: 10.2,
    description: {
      pt: 'Deck de embarque para a vizinha Ilha Primeira.',
      en: 'Boarding deck for the neighboring Ilha Primeira.',
    },
  },
  {
    id: 'beco-julio',
    name: 'Deck Beco do Julio',
    category: 'deck',
    x: 72.0,
    y: 32.2,
    description: {
      pt: 'Deck no lado leste da Gigóia.',
      en: 'Deck on the east side of Gigóia.',
    },
  },
  {
    id: 'pescadores',
    name: 'Deck Pescadores',
    category: 'deck',
    x: 91.8,
    y: 17.5,
    description: {
      pt: 'Deck tradicional na região dos pescadores.',
      en: 'Traditional deck in the fishermen area.',
    },
  },
];

// ─── Tours (Updated with 4 official tours & requested images) ────
export const tours: Tour[] = [
  {
    id: 'tour-ilhas',
    image: '/guest-portal/tour-ilhas.jpg',
    category: { pt: 'Barco', en: 'Boat' },
    categoryColor: '#088395',
    title: {
      pt: 'Tour pelas Ilhas',
      en: 'Islands Boat Tour',
    },
    description: {
      pt: 'Navegue pelos canais do arquipélago da Gigóia e pelo manguezal com vista exuberante da natureza local.',
      en: 'Cruise through the channels of the Gigóia archipelago and mangrove with stunning nature views.',
    },
    duration: { pt: '~2 horas', en: '~2 hours' },
    price: { pt: 'Sob consulta', en: 'On request' },
    whatsapp: '5521999999999',
  },
  {
    id: 'jetski',
    image: '/guest-portal/tour-jetski.jpg',
    category: { pt: 'Aventura', en: 'Adventure' },
    categoryColor: '#D4A853',
    title: {
      pt: 'Jet Ski',
      en: 'Jet Ski',
    },
    description: {
      pt: 'Pilote um jet ski pelas águas cristalinas das Ilhas Tijucas com toda segurança e instrução.',
      en: 'Ride a jet ski through the crystal waters of Tijucas Islands with full safety and instruction.',
    },
    duration: { pt: '~1 hora', en: '~1 hour' },
    price: { pt: 'Sob consulta', en: 'On request' },
    whatsapp: '5521999999999',
  },
  {
    id: 'asa-delta',
    image: '/guest-portal/tour-asadelta.jpg',
    category: { pt: 'Voo Livre', en: 'Hang Gliding' },
    categoryColor: '#0A4D68',
    title: {
      pt: 'Asa Delta',
      en: 'Hang Gliding',
    },
    description: {
      pt: 'Decole da Pedra Bonita e sobrevoe a praia da São Conrado e a orla do Rio com instrutor homologado.',
      en: 'Take off from Pedra Bonita and glide over São Conrado beach and the Rio coast with a certified pilot.',
    },
    duration: { pt: '~30 minutos de voo', en: '~30 min flight' },
    price: { pt: 'Sob consulta', en: 'On request' },
    whatsapp: '5521999999999',
  },
  {
    id: 'helicoptero',
    image: '/guest-portal/tour-helicoptero.jpg',
    category: { pt: 'Panorâmico', en: 'Panoramic' },
    categoryColor: '#E76F51',
    title: {
      pt: 'Helicóptero',
      en: 'Helicopter',
    },
    description: {
      pt: 'Sobrevoo panorâmico cinematográfico pelo Rio de Janeiro com aproximação incrível do Cristo Redentor.',
      en: 'Cinematic panoramic flight over Rio de Janeiro with an incredible close view of Christ the Redeemer.',
    },
    duration: { pt: '~15 a 30 minutos', en: '~15 to 30 min' },
    price: { pt: 'Sob consulta', en: 'On request' },
    whatsapp: '5521999999999',
  },
];

// ─── FAQs ────────────────────────────────────────────────────────
export const faqs: Faq[] = [
  {
    id: 'faq-arrival',
    question: {
      pt: 'Como chego à Ilha da Gigóia?',
      en: 'How do I get to Ilha da Gigóia?',
    },
    answer: {
      pt: 'A ilha é acessada por barcos que saem do Deck Principal, na Estrada da Barra. Barqueiros operam das 6h às 0h. A travessia leva cerca de 2 minutos e custa R$ 5,00 por pessoa.',
      en: 'The island is accessed by boats departing from the Main Deck on Estrada da Barra. Boatmen operate from 6 AM to midnight. The crossing takes about 2 minutes and costs R$ 5.00 per person.',
    },
  },
  {
    id: 'faq-wifi',
    question: {
      pt: 'Qual a senha do Wi-Fi?',
      en: 'What is the Wi-Fi password?',
    },
    answer: {
      pt: 'A rede e a senha estão na aba "Início" deste portal. Você também pode escanear o QR Code para conectar automaticamente.',
      en: 'The network and password are on the "Home" tab of this portal. You can also scan the QR Code to connect automatically.',
    },
  },
  {
    id: 'faq-checkout',
    question: {
      pt: 'Como funciona o check-out?',
      en: 'How does check-out work?',
    },
    answer: {
      pt: 'O check-out é até as 11h. Deixe as chaves na mesa da sala, feche as janelas, desligue o ar-condicionado e tranque a porta ao sair. Leve o lixo até a lixeira comunitária.',
      en: 'Check-out is by 11 AM. Leave the keys on the living room table, close the windows, turn off the AC, and lock the door when leaving. Take the trash to the community bin.',
    },
  },
  {
    id: 'faq-supermarket',
    question: {
      pt: 'Onde fica o supermercado mais próximo?',
      en: 'Where is the nearest supermarket?',
    },
    answer: {
      pt: 'O supermercado mais próximo fica na Barra, a poucos minutos de barco. Há também mercearias na própria ilha para itens básicos.',
      en: 'The nearest supermarket is in Barra, a few minutes by boat. There are also small grocery stores on the island for basic items.',
    },
  },
  {
    id: 'faq-emergency',
    question: {
      pt: 'O que fazer em caso de emergência?',
      en: 'What should I do in an emergency?',
    },
    answer: {
      pt: 'Ligue para o Renzo imediatamente. Em caso de emergência médica, o hospital mais próximo é a Unimed (Barra). Bombeiros: 193, SAMU: 192, Polícia: 190.',
      en: 'Call Renzo immediately. For medical emergencies, the nearest hospital is Unimed (Barra). Fire: 193, Ambulance (SAMU): 192, Police: 190.',
    },
  },
  {
    id: 'faq-parking',
    question: {
      pt: 'Onde posso estacionar?',
      en: 'Where can I park?',
    },
    answer: {
      pt: 'Há estacionamentos pagos próximos ao Deck Principal na Estrada da Barra. Valores a partir de R$ 20/dia. Não há como levar carros para a ilha.',
      en: 'There are paid parking lots near the Main Deck on Estrada da Barra. Prices start at R$ 20/day. Cars cannot be taken to the island.',
    },
  },
  {
    id: 'faq-food',
    question: {
      pt: 'Há restaurantes na ilha?',
      en: 'Are there restaurants on the island?',
    },
    answer: {
      pt: 'Sim! A ilha tem diversos restaurantes e bares charmosos. Confira o mapa neste portal para ver as opções mais próximas.',
      en: 'Yes! The island has several charming restaurants and bars. Check the map on this portal to see the nearest options.',
    },
  },
];
