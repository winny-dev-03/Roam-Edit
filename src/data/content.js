// src/data/content.js
// All placeholder editorial content lives here. Replace freely.
// Image paths point to /public/images/*. Until a photo exists, <Img> shows an art-directed illustration.

export const NAV = [
  { to: "/destinations", label: "Destinations" },
  { to: "/guides", label: "Guides" },
  { to: "/stories", label: "Stories" },
  { to: "/technology", label: "Technology" },
  { to: "/about", label: "About" },
];

export const REGIONS = [
  "North Africa",
  "West Africa",
  "East Africa",
  "Southern Africa",
  "Europe",
  "East Asia",
  "Southeast Asia",
  "South America",
  "North America",
  "Oceania",
];

export const AUTHORS = {
  adaeze: { name: "Adaeze Obi", role: "Editor-in-Chief", base: "Lagos" },
  thandi: { name: "Thandi Mokoena", role: "Travel Editor", base: "Cape Town" },
  juma: { name: "Juma Kassim", role: "Photographer", base: "Zanzibar" },
  salma: { name: "Salma El Idrissi", role: "Culture Writer", base: "Marrakech" },
  kelechi: { name: "Kelechi Nwosu", role: "Technology Editor", base: "Lagos" },
  wanjiru: { name: "Wanjiru Kamau", role: "Technology Writer", base: "Nairobi" },
};

export const DESTINATIONS = [
 
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    lat: "35.01° N",
    lon: "135.77° E",
    kind: "city",
    seed: 40,
    image: "/images/Kyoto.jpg",
    tagline: "Ancient traditions, quietly unfolding.",
    blurb: "Temple gardens, wooden streets and traditional tea houses reveal a slower, more thoughtful side of Japan.",
    bestTime: "Mar – May, Oct – Nov",
    getting: "International flights via Tokyo or Osaka.",
    stay: "Traditional ryokans and boutique hotels.",
    budget: "$$$",
    dos: [
      { t: "Walk through Arashiyama", d: "Explore the bamboo paths early in the morning." },
      { t: "Visit Fushimi Inari", d: "Follow the thousands of red torii gates through the hills." },
      { t: "Take part in a tea ceremony", d: "Experience the care and detail behind Japanese tea culture." },
    ],
    eat: "Matcha desserts, Kyoto-style tofu and traditional kaiseki.",
    tags: ["culture", "history", "food", "design"],
  },
  {
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    lat: "40.63° N",
    lon: "14.60° E",
    kind: "coast",
    seed: 41,
    image: "/images/amalfi-coast.jpg",
    tagline: "A coastline made for taking your time.",
    blurb: "Pastel villages, winding coastal roads and long lunches overlooking the Mediterranean.",
    bestTime: "May – Jun, Sep – Oct",
    getting: "Fly into Naples, then travel along the coast.",
    stay: "Seaside boutique hotels and hillside villas.",
    budget: "$$$$",
    dos: [
      { t: "Explore Positano", d: "Wander its narrow streets and colourful stairways." },
      { t: "Take a coastal boat trip", d: "See the villages from the water." },
      { t: "Spend an afternoon in Ravello", d: "Enjoy its gardens and sweeping sea views." },
    ],
    eat: "Fresh seafood, handmade pasta and local lemons.",
    tags: ["coast", "food", "architecture", "relaxation"],
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    lat: "36.39° N",
    lon: "25.46° E",
    kind: "coast",
    seed: 42,
    image: "/images/santorini.jpg",
    tagline: "Whitewashed villages above the blue.",
    blurb: "Volcanic cliffs, quiet pathways and small villages overlooking the Aegean Sea.",
    bestTime: "Apr – Jun, Sep – Oct",
    getting: "Flights via Athens or seasonal direct routes.",
    stay: "Cliffside suites and traditional cave houses.",
    budget: "$$$$",
    dos: [
      { t: "Walk from Fira to Oia", d: "Take the scenic cliffside route at a comfortable pace." },
      { t: "Visit a traditional village", d: "Discover a quieter side of the island away from the busiest viewpoints." },
      { t: "Watch the sunset over the caldera", d: "Find a peaceful spot and stay awhile." },
    ],
    eat: "Grilled seafood, fava and fresh Greek salads.",
    tags: ["island", "coast", "food", "architecture"],
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    lat: "8.34° S",
    lon: "115.09° E",
    kind: "coast",
    seed: 43,
    image: "/images/bali.jpg",
    tagline: "Find your own rhythm on the island.",
    blurb: "Rice terraces, coastal villages, creative communities and landscapes that invite you to slow down.",
    bestTime: "Apr – Oct",
    getting: "Fly into Ngurah Rai International Airport.",
    stay: "Jungle villas, guesthouses and beachside retreats.",
    budget: "$$",
    dos: [
      { t: "Explore the Ubud rice terraces", d: "Walk through the green landscapes and small farming communities." },
      { t: "Visit a local temple", d: "Discover the island's architecture and living traditions." },
      { t: "Spend a day by the coast", d: "Enjoy the ocean without rushing from place to place." },
    ],
    eat: "Nasi goreng, satay and traditional Balinese dishes.",
    tags: ["island", "nature", "culture", "wellness"],
  },
  {
    slug: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    lat: "38.72° N",
    lon: "9.14° W",
    kind: "city",
    seed: 44,
    image: "/images/lisbon.jpg",
    tagline: "Old streets, new discoveries.",
    blurb: "A city of tiled buildings, historic trams, independent cafés and beautiful Atlantic light.",
    bestTime: "Mar – Jun, Sep – Oct",
    getting: "Direct flights from several major European cities.",
    stay: "Boutique hotels and restored apartments in historic neighbourhoods.",
    budget: "$$",
    dos: [
      { t: "Wander through Alfama", d: "Follow the winding streets and discover hidden viewpoints." },
      { t: "Ride the historic tram", d: "See the city from one of its most recognisable routes." },
      { t: "Spend an afternoon in Belém", d: "Explore its waterfront and historic landmarks." },
    ],
    eat: "Pastéis de nata, grilled sardines and Portuguese seafood rice.",
    tags: ["culture", "food", "architecture", "history"],
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    country: "Argentina / Chile",
    region: "South America",
    lat: "50.94° S",
    lon: "73.41° W",
    kind: "peaks",
    seed: 45,
    image: "/images/patagonia.jpg",
    tagline: "Where the landscape takes over.",
    blurb: "Glaciers, dramatic mountain ranges and vast open spaces at the southern edge of South America.",
    bestTime: "Nov – Mar",
    getting: "Fly via Buenos Aires or Santiago, then connect to regional airports.",
    stay: "Mountain lodges, remote cabins and wilderness camps.",
    budget: "$$$",
    dos: [
      { t: "Explore Torres del Paine", d: "Discover some of the region's most remarkable mountain scenery." },
      { t: "Walk beside a glacier", d: "Experience the scale and movement of the ice fields." },
      { t: "Spend a night under the stars", d: "Enjoy the remarkable open skies far from city lights." },
    ],
    eat: "Patagonian lamb, fresh trout and regional wines.",
    tags: ["nature", "hiking", "adventure", "photography"],
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    lat: "40.71° N",
    lon: "74.01° W",
    kind: "city",
    seed: 46,
    image: "/images/new-york.jpg",
    tagline: "A city with a thousand different stories.",
    blurb: "Neighbourhood cafés, galleries, independent bookstores and streets that feel like their own little worlds.",
    bestTime: "Apr – Jun, Sep – Nov",
    getting: "International flights into JFK, Newark or LaGuardia.",
    stay: "Boutique hotels and neighbourhood apartments.",
    budget: "$$$$",
    dos: [
      { t: "Walk through Central Park", d: "Find a quiet corner in the middle of the city." },
      { t: "Explore Brooklyn", d: "Discover independent shops, food spots and creative spaces." },
      { t: "Visit a neighbourhood bookstore", d: "Spend an afternoon browsing without a schedule." },
    ],
    eat: "New York pizza, bagels and food from around the world.",
    tags: ["city", "culture", "food", "art"],
  },
  {
    slug: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    lat: "45.03° S",
    lon: "168.66° E",
    kind: "peaks",
    seed: 47,
    image: "/images/queenstown.jpg",
    tagline: "A little closer to the extraordinary.",
    blurb: "Alpine landscapes, clear lakes and scenic routes through one of New Zealand's most beautiful regions.",
    bestTime: "Dec – Feb, Mar – May",
    getting: "Fly into Queenstown Airport, with connections through Auckland.",
    stay: "Lakeside lodges and mountain-view retreats.",
    budget: "$$$",
    dos: [
      { t: "Walk beside Lake Wakatipu", d: "Take in the mountain reflections along the waterfront." },
      { t: "Explore Glenorchy", d: "Follow the scenic road towards quiet landscapes and walking trails." },
      { t: "Take a scenic cruise", d: "Experience the lake and surrounding mountains from the water." },
    ],
    eat: "Local lamb, fresh produce and New Zealand wines.",
    tags: ["nature", "mountains", "adventure", "photography"],
  },

];

export const ARTICLES = [
  {
    slug: "the-quiet-return-of-the-slow-safari", title: "The Quiet Return of the Slow Safari", category: "Adventure",
    dek: "Fewer vehicles, longer stays and guides who would rather sit with a leopard for an hour than tick off five animals.",
    author: "thandi", date: "2026-11-12", read: 12, dest: "sossusvlei", kind: "dunes", seed: 21, image: "/images/story-safari.jpg",
    quote: "The best sighting of my life was a lion doing absolutely nothing for ninety minutes.",
    body: [
      "At first light the dunes hold their breath. The only sound is the crunch of boots on cold sand and the occasional click of a guide's tongue, a signal to stop and look.",
      "This is safari without the scoreboard. Camps are taking fewer guests, extending minimum stays and training guides in tracking, astronomy and ecology rather than speed.",
      "The result is travel that feels less like consumption and more like attention. You come home with fewer photographs and far better stories.",
    ],
  },
  {
    slug: "cape-town-after-dark", title: "Cape Town After Dark", category: "Culture",
    dek: "From Bo-Kaap supper clubs to Table Mountain at dusk, a city that never stops reinventing its evenings.",
    author: "salma", date: "2026-11-10", read: 9, dest: "cape-town", kind: "coast", seed: 22, image: "/images/story-cape-town.jpg",
    quote: "Cape Town keeps its best secrets for after sunset.",
    body: [
      "The light leaves slowly here, pooling in the harbour and climbing the mountain until the whole city seems lit from behind.",
      "In Woodstock a former biscuit mill hums with chefs, ceramicists and DJs. Along Bree Street, tables spill onto the pavement and nobody is in a hurry.",
      "Come for the sunsets, stay for the second dinner. Nothing begins before nine.",
    ],
  },
  {
    slug: "what-the-medina-is-making-now", title: "What the Medina Is Making Now", category: "Design",
    dek: "A generation of Moroccan designers is rewriting the language of craft, one workshop at a time.",
    author: "salma", date: "2026-11-08", read: 8, dest: "marrakech", kind: "city", seed: 23, image: "/images/story-medina.jpg",
    quote: "Tradition isn't a museum. It's a workshop with the lights on.",
    body: [
      "Behind an unmarked door in the Mellah, a ceramicist is glazing plates in a shade of blue you have not seen before.",
      "She trained in Paris, returned home and now sells to hotels from Lisbon to Lagos. She is not unusual. She is one of dozens.",
      "Marrakech's makers are building a new global reputation, quietly, with patient hands.",
    ],
  },
  {
    slug: "lagos-eats-at-midnight", title: "Lagos Eats at Midnight", category: "Food",
    dek: "Why the city's best meals begin after the rest of the world has gone to bed.",
    author: "adaeze", date: "2026-11-06", read: 10, dest: "lagos", kind: "city", seed: 24, image: "/images/story-lagos.jpg",
    quote: "The city's real menu starts at eleven p.m.",
    body: [
      "By midnight the suya smoke is thick over Surulere and every corner has a small crowd around a charcoal grill.",
      "Chefs trained in London and Lyon are coming home and opening places that sit comfortably beside the street stalls rather than above them.",
      "Eat late, eat loud, and always ask for extra pepper.",
    ],
  },
  {
    slug: "stone-town-slowly", title: "Stone Town, Slowly", category: "Culture",
    dek: "Spice markets, carved doors and the Indian Ocean at the end of every alley.",
    author: "juma", date: "2026-11-04", read: 7, dest: "zanzibar", kind: "coast", seed: 25, image: "/images/story-stone-town.jpg",
    quote: "You don't navigate Stone Town. You surrender to it.",
    body: [
      "The carved doors of Stone Town are older than most countries. Brass studs, Arabic script, centuries of salt on the wood.",
      "Mornings belong to the market, afternoons to the shade, and evenings to Forodhani, where charcoal smoke and lantern light mix over the sea.",
      "Give the place three days and no itinerary. It will repay you.",
    ],
  },
  {
    slug: "standing-in-the-spray", title: "Standing in the Spray", category: "Adventure",
    dek: "How to meet Mosi-oa-Tunya from both sides of the border, and when to get wet.",
    author: "thandi", date: "2026-11-02", read: 6, dest: "victoria-falls", kind: "peaks", seed: 26, image: "/images/story-falls.jpg",
    quote: "You hear the Falls before you see them, and feel them before you hear them.",
    body: [
      "The roar begins miles away. By the time you reach the viewpoint, the mist has already found you.",
      "Zambia gives you the edge. Zimbabwe gives you the panorama. Do both, and carry a dry bag.",
      "The lesson of Victoria Falls is a simple one: some things are meant to be experienced at full volume.",
    ],
  },
  {
    slug: "the-payment-rails-africa-built-itself", title: "The Payment Rails Africa Built Itself", category: "Technology", topic: "Fintech",
    dek: "From mobile money to cross-border settlement, the continent's fintech builders are exporting ideas, not just adopting them.",
    author: "kelechi", date: "2026-11-13", read: 11, dest: "lagos", kind: "city", seed: 27, image: "/images/tech-fintech.jpg",
    quote: "We didn't leapfrog. We simply built what we needed.",
    body: [
      "A trader in Kano pays a supplier in Accra in under a minute. Ten years ago that took a week and a trip to the bank.",
      "The infrastructure behind that payment was designed locally, by people who understand how markets actually move.",
      "Now the same rails are being studied, licensed and copied far from home.",
    ],
  },
  {
    slug: "teaching-machines-yoruba-swahili-amharic", title: "Teaching Machines Yoruba, Swahili and Amharic", category: "Technology", topic: "AI",
    dek: "The researchers building language models that finally speak the way people do across the continent.",
    author: "kelechi", date: "2026-11-09", read: 9, dest: "lagos", kind: "peaks", seed: 28, image: "/images/tech-ai.jpg",
    quote: "A model that cannot hear your language cannot serve your people.",
    body: [
      "Most of the world's AI was trained on a small number of languages. Africa speaks more than two thousand.",
      "In labs from Nairobi to Addis, small teams are collecting speech, building datasets and training models on their own terms.",
      "The work is slow, communal and urgent. It is also, increasingly, world-class.",
    ],
  },
  {
    slug: "the-nairobi-funds-betting-on-climate", title: "The Nairobi Funds Betting on Climate", category: "Technology", topic: "Startups",
    dek: "A new wave of seed investors is backing solar, cold chain and carbon start-ups from East Africa.",
    author: "wanjiru", date: "2026-11-05", read: 8, dest: "kigali", kind: "dunes", seed: 29, image: "/images/tech-climate.jpg",
    quote: "Climate isn't a niche here. It's the whole economy.",
    body: [
      "On a Tuesday morning in Westlands, three founders are pitching refrigeration powered entirely by sunlight.",
      "Local funds understand the problem because they live inside it, and they write cheques with patience that foreign capital rarely offers.",
      "If the bet pays off, the next generation of climate companies will be built here first.",
    ],
  },
  {
    slug: "mapping-the-last-mile", title: "Mapping the Last Mile", category: "Technology", topic: "Infrastructure",
    dek: "Drones, data and a new logistics map of rural Rwanda and Kenya.",
    author: "wanjiru", date: "2026-11-01", read: 7, dest: "kigali", kind: "peaks", seed: 30, image: "/images/tech-logistics.jpg",
    quote: "The last mile is where logistics becomes human.",
    body: [
      "A blood sample leaves a rural clinic and reaches a lab in twenty minutes, carried by a drone that never touches the road.",
      "Behind every flight is a patient layer of mapping, forecasting and local partnerships.",
      "The lesson is simple: ambitious infrastructure can start small and local.",
    ],
  },
];

export const GUIDES = [
  {
    slug: "cape-to-kilimanjaro", title: "Cape to Kilimanjaro, Overland", type: "Route", time: "10 days", level: "Moderate",
    desc: "A road-trip spine from the Atlantic to the roof of Africa, with the stops worth making.",
    steps: ["Cape Town to Namib, three days of quiet roads", "Windhoek to Victoria Falls, with a night in Etosha", "Livingstone to Dar es Salaam by rail", "Arusha to the Kilimanjaro foothills"],
    kind: "peaks", seed: 31,
  },
  {
    slug: "four-climates", title: "Packing for Four Climates", type: "Essentials", time: "15 min", level: "Easy",
    desc: "Desert nights, coastal humidity, highland rain and city heat. One bag, four seasons.",
    steps: ["Layer rather than bulk up", "Choose natural, fast-drying fabrics", "Pack one smart outfit for the evenings", "Leave a quarter of the bag empty"],
    kind: "dunes", seed: 32,
  },
  {
    slug: "money-across-borders", title: "Money Across Borders", type: "Essentials", time: "20 min", level: "Easy",
    desc: "Cash, cards and mobile wallets, and how to carry each without worry.",
    steps: ["Carry two cards and keep them apart", "Learn the local mobile money options", "Keep small notes for markets and taxis", "Check fees before you convert"],
    kind: "city", seed: 33,
  },
  {
    slug: "lagos-in-48-hours", title: "Lagos in 48 Hours", type: "City", time: "2 days", level: "Energetic",
    desc: "Two days, one city, no sleep. Music, markets and meals from sunrise until the small hours.",
    steps: ["Morning at Lekki market", "Lunch on the Island", "Dinner in Surulere, late", "Live music until the lights come up"],
    kind: "city", seed: 34,
  },
  {
    slug: "stay-connected", title: "Staying Connected Anywhere", type: "Tech", time: "10 min", level: "Easy",
    desc: "eSIMs, offline maps and power plans so your phone keeps up with your itinerary.",
    steps: ["Set up an eSIM before you fly", "Download offline maps for every region", "Carry a power bank and the right adaptor", "Back up photos each evening"],
    kind: "coast", seed: 35,
  },
  {
    slug: "golden-hour-photography", title: "Golden Hour, Properly", type: "Tech", time: "25 min", level: "Intermediate",
    desc: "How to shoot the first and last hour of light across dunes, coast and city.",
    steps: ["Scout the night before", "Shoot into the light, then away from it", "Protect your gear from sand and spray", "Edit lightly, and keep the shadows"],
    kind: "dunes", seed: 36,
  },
];

export const PACKING = [
  { group: "Documents & money", items: ["Passport with six months' validity", "Visa and booking confirmations", "Two payment cards, stored apart", "Small notes in local currency"] },
  { group: "Clothing", items: ["Light layers for cold dawns", "Wide-brim hat", "Sturdy walking shoes", "Packable rain shell"] },
  { group: "Tech", items: ["Universal adaptor", "Power bank", "eSIM activated before departure", "Offline maps downloaded"] },
  { group: "Small essentials", items: ["Reusable water bottle", "Sunscreen and lip balm", "Basic first-aid kit", "Dry bag for boat days"] },
];

export const TOPICS = ["All", "Fintech", "AI", "Startups", "Infrastructure"];

export const BRIEFS = [
  { topic: "Fintech", text: "Cross-border settlement is getting cheaper for small exporters, and the effects are showing up in market stalls." },
  { topic: "AI", text: "Community-led voice datasets are quietly becoming the backbone of local-language assistants." },
  { topic: "Startups", text: "Seed rounds are getting smaller and more patient, and founders say they prefer it that way." },
  { topic: "Infrastructure", text: "Solar mini-grids are reaching villages faster than the national grid ever did." },
  { topic: "Fintech", text: "Mobile wallets are adding savings groups, a very old African idea in a very new interface." },
  { topic: "AI", text: "Crop-advice apps trained on regional data are outperforming imported models in smallholder trials." },
];

export const TOOLS = [
  { name: "Offline map apps", cat: "Navigation", score: 92, verdict: "Download regions in advance. They saved us twice." },
  { name: "Regional eSIM plans", cat: "Connectivity", score: 88, verdict: "Cheaper than roaming, easier than a local SIM." },
  { name: "Mobile money wallets", cat: "Payments", score: 90, verdict: "Often the easiest way to pay for anything small." },
  { name: "Live translation", cat: "Language", score: 74, verdict: "Great for menus, patchy for local languages." },
  { name: "Solar power banks", cat: "Power", score: 81, verdict: "Reliable on desert days, slow in cloudy highlands." },
];

export const STATS = [
  { n: 54, s: "", l: "Countries on our map" },
  { n: 38, s: "", l: "Contributors in the field" },
  { n: 640, s: "+", l: "Stories filed since 2019" },
  { n: 9, s: "", l: "City desks across the continent" },
];

export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const pad = (n) => String(n).padStart(2, "0");
export const destBySlug = (slug) => DESTINATIONS.find((d) => d.slug === slug);