// Worcester-area amenities surrounding the Canal District portfolio.
//
// Coordinates geocoded via Google Maps Geocoding API at ROOFTOP precision.
// Re-run: python3 tools/geocode_google.py amenities

export type AmenityCategory =
  | "employer"
  | "education"
  | "culture"
  | "dining"
  | "attraction"
  | "transit"
  | "retail"
  | "dunkin"
  | "outdoors";

export interface Amenity {
  slug: string;
  name: string;
  category: AmenityCategory;
  coords: [number, number];
  /** One-line blurb for cards and popups */
  description: string;
  /** Optional headline stat — e.g. "13,000+ employees" or "6,700 students" */
  stat?: string;
  /**
   * Optional brand logo. Drop an SVG/PNG at /public/logos/{slug}.svg and
   * reference it here as "/logos/{slug}.svg". Missing files are hidden
   * gracefully (onError handler in the consumer component).
   */
  logoUrl?: string;
}

export const amenities: Amenity[] = [
  // ── Employers ────────────────────────────────────────────────────────
  {
    slug: "umass-memorial",
    name: "UMass Memorial",
    category: "employer",
    coords: [-71.761617, 42.277503],
    description: "Largest employer in Central MA; flagship academic medical center.",
    stat: "13,000+ employees",
    logoUrl: "/logos/umass-memorial.svg",
  },
  {
    slug: "saint-vincent",
    name: "Saint Vincent Hospital",
    category: "employer",
    coords: [-71.796578, 42.264974],
    description: "Major regional hospital and trauma center; 381 beds.",
    stat: "1,600+ employees",
    logoUrl: "/logos/saint-vincent.jpg",
  },
  {
    slug: "hanover-insurance",
    name: "Hanover Insurance",
    category: "employer",
    coords: [-71.783099, 42.292647],
    description: "Fortune 500 HQ.",
    stat: "4,000+ local employees",
    logoUrl: "/logos/hanover-insurance.svg",
  },
  {
    slug: "fresenius-medical",
    name: "Fresenius Medical",
    category: "employer",
    coords: [-71.766442, 42.277103],
    description: "North American HQ.",
    stat: "2,000+ local staff",
    logoUrl: "/logos/fresenius-medical.svg",
  },
  {
    slug: "city-hall",
    name: "City of Worcester",
    category: "employer",
    coords: [-71.801787, 42.262521],
    description: "Municipal government & public school systems.",
    stat: "6,000+ employees",
    logoUrl: "/logos/city-of-worcester.svg",
  },
  {
    slug: "abbvie",
    name: "AbbVie",
    category: "employer",
    coords: [-71.770109, 42.274370],
    description:
      "Fortune 500 biopharma — Worcester's biologics campus is one of AbbVie's flagship US production sites.",
    stat: "1,000+ local staff",
    logoUrl: "/logos/abbvie.svg",
  },
  {
    slug: "polar-beverages",
    name: "Polar Beverages",
    category: "employer",
    coords: [-71.818538, 42.233167],
    description:
      "Worcester-headquartered beverage company — Polar Seltzer's parent and the namesake sponsor of Polar Park.",
    stat: "Local HQ",
    logoUrl: "/logos/polar-beverages.webp",
  },
  {
    slug: "fallon-health",
    name: "Fallon Health",
    category: "employer",
    coords: [-71.804038, 42.264636],
    description:
      "Worcester-based not-for-profit health insurer serving Massachusetts members across commercial and Medicare plans.",
    stat: "Local HQ",
    logoUrl: "/logos/fallon-health.png",
  },

  // ── Education ────────────────────────────────────────────────────────
  {
    slug: "wpi",
    name: "Worcester Polytechnic",
    category: "education",
    coords: [-71.808003, 42.274053],
    description: "Top-ranked engineering & technology university.",
    stat: "6,700 students",
    logoUrl: "/logos/wpi.svg",
  },
  {
    slug: "clark-university",
    name: "Clark University",
    category: "education",
    coords: [-71.824538, 42.252035],
    description: "Research university; Psychology and Geography programs nationally ranked.",
    stat: "3,500 students",
    logoUrl: "/logos/clark-university.png",
  },
  {
    slug: "holy-cross",
    name: "College of the Holy Cross",
    category: "education",
    coords: [-71.807961, 42.239239],
    description: "Elite liberal arts; nationally ranked.",
    stat: "3,000 students",
    logoUrl: "/logos/holy-cross.svg",
  },
  {
    slug: "umass-medical-school",
    name: "UMass Chan Medical School",
    category: "education",
    coords: [-71.762299, 42.278091],
    description: "Nobel-Prize-winning research institution.",
    stat: "500+ researchers",
    logoUrl: "/logos/umass-chan.svg",
  },
  {
    slug: "assumption-university",
    name: "Assumption University",
    category: "education",
    coords: [-71.829159, 42.294323],
    description: "Catholic liberal arts & graduate programs.",
    stat: "2,700 students",
    logoUrl: "/logos/assumption-university.png",
  },
  {
    slug: "worcester-state",
    name: "Worcester State University",
    category: "education",
    coords: [-71.844314, 42.268095],
    description: "Public university and part of the Massachusetts state system — ~6,000 students on the west side of Worcester.",
    stat: "6,000+ students",
    logoUrl: "/logos/worcester-state.png",
  },
  {
    slug: "mcphs-worcester",
    name: "MCPHS Worcester",
    category: "education",
    coords: [-71.799393, 42.269630],
    description: "Mass College of Pharmacy and Health Sciences — downtown Worcester campus feeding the healthcare cluster.",
    stat: "Health sciences",
    logoUrl: "/logos/mcphs-worcester.jpeg",
  },
  {
    slug: "quinsigamond-cc",
    name: "Quinsigamond CC",
    category: "education",
    // Downtown Campus (25 Federal St) rather than main campus (W Boylston St, ~4mi N)
    // so the pin sits inside the Worcester cluster.
    coords: [-71.802275, 42.261153],
    description:
      "Largest community college in Central Massachusetts. Downtown Campus on Federal St; main campus on W Boylston St.",
    stat: "7,000 students",
    logoUrl: "/logos/quinsigamond-cc.png",
  },

  // ── Culture ──────────────────────────────────────────────────────────
  {
    slug: "polar-park",
    name: "Polar Park & the Worcester Red Sox",
    category: "culture",
    coords: [-71.800228, 42.257134],
    description:
      "Home of the WooSox (Triple-A Boston Red Sox affiliate) on a 35-year lease through 2056 — among the top two minor-league teams in the country by attendance, with 500K+ tickets sold each of the last three seasons. Anchor of the Canal District redevelopment, with The Revington (228 units) and The Cove (173 units) delivered directly across the street.",
    stat: "9,508 seats · Opened 2021",
    logoUrl: "/logos/polar-park.svg",
  },
  {
    slug: "worcester-art-museum",
    name: "Worcester Art Museum",
    category: "culture",
    coords: [-71.802009, 42.273118],
    description:
      "One of New England's premier fine arts destinations — Roman mosaics, European masterpieces, contemporary collections, and the Higgins Armory medieval arms collection.",
    stat: "38,000+ objects",
    logoUrl: "/logos/worcester-art-museum.png",
  },
  {
    slug: "hanover-theatre",
    name: "Hanover Theatre",
    category: "culture",
    coords: [-71.803117, 42.260750],
    description:
      "Worcester's anchor performing-arts venue — a meticulously restored 1904 movie palace that hosts Broadway national tours, comedy, and contemporary music. Pulls regional audiences from across central New England and underwrites the renaissance of Main Street's Theatre District.",
    stat: "2,300 seats",
    logoUrl: "/logos/hanover-theatre.svg",
  },
  {
    slug: "mechanics-hall",
    name: "Mechanics Hall",
    category: "culture",
    coords: [-71.801081, 42.265709],
    description:
      "Renaissance Revival concert hall consistently ranked among North America's top four for acoustics — host to chamber music, classical recitals, and high-profile public-radio recordings. Built by the city's Industrial Revolution mechanics' association as a temple to working-class culture and still in continuous use.",
    stat: "Since 1857",
    logoUrl: "/logos/mechanics-hall.png",
  },
  {
    slug: "dcu-center",
    name: "DCU Center",
    category: "culture",
    coords: [-71.798546, 42.264313],
    description:
      "The region's largest indoor arena. Home of the Worcester Railers (ECHL) and host to major concerts, conventions, and NCAA tournaments. Draws from across central New England — 40 to 55 miles from Providence, Boston, Hartford, and Springfield.",
    stat: "14,800 capacity",
    logoUrl: "/logos/dcu-center.svg",
  },
  {
    slug: "ecotarium",
    name: "EcoTarium",
    category: "culture",
    coords: [-71.766602, 42.264294],
    description:
      "Central New England's largest science-and-nature museum — three floors of hands-on exhibits, a digital planetarium, a narrow-gauge train, live wildlife (otters, owls, monkeys), and walking trails on a 55-acre campus. A regional draw for school groups and family weekends.",
    stat: "55-acre campus",
    logoUrl: "/logos/ecotarium.png",
  },
  {
    slug: "shrewsbury-street",
    name: "Shrewsbury Street “Restaurant Row”",
    category: "culture",
    coords: [-71.788016, 42.264880],
    description:
      "Worcester's primary upscale and ethnic dining strip — Italian institutions, modern American, sushi, steakhouses, and gastropubs concentrated along a single walkable corridor east of downtown. The city's go-to for serious dinners.",
    stat: "1+ mile dining corridor",
  },
  {
    slug: "vivienne-vue",
    name: "VUE Cocktail Lounge & Vivienne",
    category: "culture",
    coords: [-71.803478, 42.263319],
    description:
      "Worcester's only true high-rise dining experience — coastal Mediterranean cuisine with sweeping city views, live jazz, and the closest thing downtown has to Boston-grade cocktail programming. The Niche Hospitality flagship sits atop the city's tallest tower at 446 Main.",
    stat: "24th floor",
    logoUrl: "/logos/vivienne-vue.webp",
  },
  {
    slug: "ac-hotel-marriott",
    name: "AC Hotel by Marriott",
    category: "culture",
    coords: [-71.798760, 42.261740],
    description:
      "Boutique-contemporary flagship across from Worcester Common — European-inspired design, AC Lounge tapas and craft cocktails, and the 750-capacity Wachusett Ballroom. The default upscale stay for visiting executives, wedding parties, and event traffic from the DCU Center / Polar Park corridor.",
    stat: "170 rooms, downtown",
    logoUrl: "/logos/ac-hotel.svg",
  },
  {
    slug: "wormtown-brewery",
    name: "Wormtown Brewery",
    category: "culture",
    coords: [-71.791341, 42.263104],
    description:
      "The flagship Worcester craft brewery and the cultural anchor of the Canal District — taproom, beer garden, and a roster led by the locally beloved Be Hoppy IPA. Distributes across New England with an outsized presence in central Massachusetts.",
    stat: "Worcester original",
    logoUrl: "/logos/wormtown-brewery.svg",
  },
  {
    slug: "worcester-public-market",
    name: "Worcester Public Market",
    category: "culture",
    coords: [-71.797760, 42.255828],
    description:
      "Year-round indoor market hall on the Harding Green ground floor — independent food vendors, an oyster and wine bar, a farmers' market, and rotating community programming that makes Kelley Square a daily destination, not just a game-day one.",
    logoUrl: "/logos/worcester-public-market.png",
  },
  {
    slug: "museum-of-worcester",
    name: "Museum of Worcester",
    category: "culture",
    coords: [-71.804587, 42.265003],
    description:
      "Founded in 1875 as the Worcester Historical Society, the city-history museum on Elm Street holds more than 50,000 artifacts and 100,000 archival photographs covering Worcester's industrial heyday — Esther Howland's mass-produced valentines, the Royal Worcester corset, the Diamond Match envelope machine, the lunch-wagon ancestor of the American diner, and the Worcester Three-Decker that defined the city's neighborhoods. Permanent galleries, rotating exhibitions, a research library, walking tours, and public programs make it the keeper of the city's civic memory.",
    logoUrl: "/logos/museum-of-worcester.webp",
  },
  {
    slug: "american-antiquarian-society",
    name: "American Antiquarian Society",
    category: "culture",
    coords: [-71.810379, 42.277213],
    description:
      "National research library founded in 1812 — the third-oldest historical society in the United States and the most comprehensive collection of pre-1876 American printed materials anywhere. Hosts visiting scholars from across the country.",
    stat: "Est. 1812",
  },
  {
    slug: "tuckerman-hall",
    name: "Tuckerman Hall",
    category: "culture",
    coords: [-71.801152, 42.273280],
    description:
      "Architectural gem on the National Register, designed in 1902 by Josephine Wright Chapman — one of the first major American buildings designed by a woman. Home to the Massachusetts Symphony Orchestra and a regular host of chamber music, weddings, and civic events.",
  },
  {
    slug: "greater-good-brewing",
    name: "Greater Good Imperial Brewing",
    category: "culture",
    coords: [-71.801250, 42.287389],
    description:
      "Imperial-only brewery on Millbrook Street — the country's first brewery devoted entirely to high-ABV beers. Large taproom, full kitchen, and a flagship Worcester brand that distributes alongside Wormtown across the region.",
    logoUrl: "/logos/greater-good.webp",
  },

  // ── Dining & drinks ──────────────────────────────────────────────────
  {
    slug: "birchtree-bread",
    name: "BirchTree Bread Company",
    category: "dining",
    coords: [-71.797797, 42.256247],
    description:
      "Artisan bakery and cafe in Crompton Place — the de facto gathering spot of the Canal District since 2014.",
    stat: "Canal District",
  },
  {
    slug: "armsby-abbey",
    name: "Armsby Abbey",
    category: "dining",
    coords: [-71.800781, 42.268774],
    description:
      "Gastropub named one of the top beer bars in Massachusetts — a downtown destination for craft beer and farm-to-table small plates.",
    stat: "Top beer bar in MA",
  },
  {
    slug: "deadhorse-hill",
    name: "Deadhorse Hill",
    category: "dining",
    coords: [-71.800787, 42.266420],
    description:
      "Chef-driven New American restaurant that helped put Worcester on the regional dining map. Tasting menus and a tight cocktail program.",
    stat: "Modern American",
  },
  {
    slug: "volturno",
    name: "Volturno Pizza Napoletana",
    category: "dining",
    coords: [-71.791162, 42.263295],
    description:
      "Massachusetts' first A.P.N.-certified Neapolitan pizzeria — Shrewsbury Street anchor with a wood-fired oven imported from Naples.",
    stat: "Shrewsbury Street",
  },
  {
    slug: "sole-proprietor",
    name: "The Sole Proprietor",
    category: "dining",
    coords: [-71.807285, 42.271212],
    description:
      "Worcester seafood institution since 1979 — a continuous Wine Spectator award winner and the city's longest-running fine-dining destination.",
    stat: "Since 1979",
  },
  {
    slug: "the-boynton",
    name: "The Boynton",
    category: "dining",
    coords: [-71.807393, 42.270862],
    description:
      "Highland Street tavern dating to the 1930s — 50+ drafts, casual American menu, and a steady neighborhood crowd next door to the Sole.",
    stat: "Since the 1930s",
  },
  {
    slug: "bay-state-brewing",
    name: "Bay State Brewing",
    category: "dining",
    coords: [-71.795830, 42.258409],
    description:
      "Craft brewery and taproom inside the Worcester Ice Center — pints rinkside, two blocks from Polar Park.",
    stat: "Canal District",
  },
  {
    slug: "one-ten-grill",
    name: "110 Grill",
    category: "dining",
    coords: [-71.799011, 42.261979],
    description:
      "Modern American chain anchoring the AC Hotel at City Square — a national brand placing a flag on downtown Worcester.",
    stat: "City Square",
  },
  {
    slug: "georges-coney-island",
    name: "George's Coney Island Hot Dogs",
    category: "dining",
    coords: [-71.804014, 42.257628],
    description:
      "Worcester landmark serving the same recipe since 1918 — neon-lit Southbridge Street institution and one of the city's oldest restaurants.",
    stat: "Since 1918",
  },
  {
    slug: "miss-worcester-diner",
    name: "Miss Worcester Diner",
    category: "dining",
    coords: [-71.806677, 42.253862],
    description:
      "1948 Worcester Lunch Car #812 across from the original Worcester Lunch Car factory — the city that invented the diner, with a working diner to prove it.",
    stat: "Lunch-car icon",
  },
  {
    slug: "ralphs-rock-diner",
    name: "Ralph's Rock Diner",
    category: "dining",
    coords: [-71.801067, 42.277594],
    description:
      "Worcester dive bar and live-music venue built around a vintage Worcester Lunch Car — a Grove Street institution since the 1980s.",
    stat: "Live music",
  },
  {
    slug: "111-chop-house",
    name: "111 Chop House",
    category: "dining",
    coords: [-71.789527, 42.263528],
    description:
      "Shrewsbury Street steakhouse — white-tablecloth dry-aged beef and one of the deeper wine lists in the city.",
    stat: "Steakhouse",
  },
  {
    slug: "lock-50",
    name: "Lock 50",
    category: "dining",
    coords: [-71.795420, 42.257382],
    description:
      "Modern American restaurant and bar literally next door to the portfolio at 50 Water Street — wood-fired plates and a Canal District destination.",
    stat: "Next door",
  },
  {
    slug: "mezcal-cantina",
    name: "Mezcal Tequila Cantina",
    category: "dining",
    coords: [-71.794410, 42.266908],
    description:
      "Niche Hospitality's modern Mexican concept on Major Taylor Boulevard — large patio overlooking the DCU Center, deep agave list.",
    stat: "Niche Hospitality",
  },
  {
    slug: "bocado-tapas",
    name: "Bocado Tapas Bar",
    category: "dining",
    coords: [-71.794234, 42.258747],
    description:
      "Spanish tapas restaurant on Winter Street — sangria, paella, and a long-running Worcester date-night staple.",
    stat: "Spanish",
  },
  {
    slug: "redemption-rock-brewing",
    name: "Redemption Rock Brewing",
    category: "dining",
    coords: [-71.777902, 42.268884],
    description:
      "B-Corp-certified craft brewery and taproom on Shrewsbury Street — coffee program by day, taproom by night.",
    stat: "B-Corp brewery",
  },

  // ── Attractions ──────────────────────────────────────────────────────
  {
    slug: "green-hill-park",
    name: "Green Hill Park",
    category: "attraction",
    coords: [-71.779424, 42.282692],
    description: "Municipal park and outdoor amphitheater.",
    stat: "473 acres",
  },
  {
    slug: "elm-park",
    name: "Elm Park",
    category: "attraction",
    coords: [-71.815755, 42.268811],
    description: "One of the first public parks in the United States — 60-acre urban green space on Russell Street.",
    stat: "Est. 1854",
  },
  {
    slug: "worcester-common",
    name: "Worcester Common",
    category: "attraction",
    coords: [-71.800613, 42.262043],
    description: "Historic downtown civic plaza — seasonal programming, winter skating, and the city's central gathering space.",
  },
  {
    slug: "tower-hill-garden",
    name: "New England Botanic Garden",
    category: "attraction",
    coords: [-71.727488, 42.360568],
    description: "Tower Hill Botanic Garden — 171-acre horticultural landmark 15 minutes north of Worcester in Boylston.",
    stat: "171 acres",
  },

  // ── Transit & infrastructure ─────────────────────────────────────────
  {
    slug: "union-station",
    name: "Worcester Union Station",
    category: "transit",
    coords: [-71.794951, 42.261199],
    description:
      "Amtrak + MBTA commuter rail — direct service to Boston South Station. Regional bus hub.",
    stat: "Rail · Bus",
  },
  {
    slug: "worcester-airport",
    name: "Worcester Regional Airport (ORH)",
    category: "transit",
    coords: [-71.875242, 42.267423],
    description: "Commercial service to Florida and NYC-metro destinations.",
    stat: "Commercial air",
  },
  {
    slug: "wrta-central-hub",
    name: "WRTA Central Hub",
    category: "transit",
    coords: [-71.796428, 42.261121],
    description: "Worcester Regional Transit Authority's central bus hub — local and regional fixed-route service, adjacent to Union Station.",
    stat: "Regional bus",
  },
  {
    slug: "i290-kelley-ramp",
    // Hand-placed at the Kelley Sq on/off ramp — Google returned a generic
    // I-290 centroid that landed near Union Station.
    name: "I-290 / Kelley Square Ramp",
    category: "transit",
    coords: [-71.797500, 42.254500],
    description:
      "Direct highway access from Kelley Square — among the highest-volume ramps on I-290.",
    stat: "Interstate",
  },

  // ── Outdoors & recreation ────────────────────────────────────────────
  {
    slug: "regatta-point",
    name: "Regatta Point at Lake Quinsigamond",
    category: "outdoors",
    coords: [-71.758170, 42.277604],
    description:
      "State park on the largest lake in central Massachusetts — sailing, paddling, and rowing regattas hosted by Worcester's collegiate crew programs.",
    stat: "Lake Quinsigamond",
  },
  {
    slug: "broad-meadow-brook",
    name: "Broad Meadow Brook Wildlife Sanctuary",
    category: "outdoors",
    coords: [-71.778559, 42.240681],
    description:
      "Mass Audubon's largest urban wildlife sanctuary — 430+ acres with 5 miles of trails inside the city limits.",
    stat: "430+ acres",
  },
  {
    slug: "indian-lake",
    name: "Indian Lake",
    category: "outdoors",
    coords: [-71.811442, 42.291084],
    description:
      "200-acre lake on Worcester's north side — public beach, boat launch, and seasonal swimming.",
    stat: "200 acres",
  },
  {
    slug: "wachusett-mountain",
    name: "Wachusett Mountain Ski Area",
    category: "outdoors",
    coords: [-71.888808, 42.505978],
    description:
      "Closest ski resort to Boston — 22 trails, night skiing, and summer hiking on the highest peak east of the Connecticut River. ~30 minutes north of Worcester.",
    stat: "~30 min north",
  },
  {
    slug: "southwicks-zoo",
    name: "Southwick's Zoo",
    category: "outdoors",
    coords: [-71.584619, 42.065025],
    description:
      "New England's largest zoo — 200+ species on 300 acres in Mendon, ~25 minutes south down Route 146.",
    stat: "~25 min south",
  },

  // ── Big-box retail ───────────────────────────────────────────────────
  {
    slug: "target-lincoln-plaza",
    name: "Target",
    category: "retail",
    coords: [-71.774296, 42.292024],
    description: "Lincoln Plaza — closest Target to downtown Worcester.",
    stat: "Lincoln Plaza",
  },
  {
    slug: "best-buy-lincoln-plaza",
    name: "Best Buy",
    category: "retail",
    coords: [-71.773554, 42.292201],
    description: "Lincoln Plaza — anchor electronics retailer.",
    stat: "Lincoln Plaza",
  },
  {
    slug: "walmart-tobias-boland",
    name: "Walmart Supercenter",
    category: "retail",
    coords: [-71.791547, 42.233366],
    description:
      "Greendale-area supercenter — full-line retail and grocery just south of the portfolio.",
    stat: "25 Tobias Boland Way",
  },
  {
    slug: "home-depot-gold-star",
    name: "The Home Depot",
    category: "retail",
    coords: [-71.800725, 42.291719],
    description: "Gold Star Boulevard — primary home-improvement store for Worcester.",
    stat: "130 Gold Star Blvd",
  },
  {
    slug: "lowes-millbury",
    name: "Lowe's",
    category: "retail",
    coords: [-71.778282, 42.199923],
    description:
      "Shoppes at Blackstone Valley — closest Lowe's, just down Route 146.",
    stat: "Millbury",
  },

  // ── Dunkin' (the New England joke) ───────────────────────────────────
  // Density is the point. Coords are mostly RANGE_INTERPOLATED — close
  // enough for the gag, not surveyed.
  {
    slug: "dunkin-main-421",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.802200, 42.263500],
    description: "Downtown — 421 Main St.",
  },
  {
    slug: "dunkin-main-1283",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.836400, 42.240200],
    description: "Webster Square — 1283 Main St.",
  },
  {
    slug: "dunkin-park-640",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.826500, 42.264200],
    description: "Park Ave — 640 Park Ave.",
  },
  {
    slug: "dunkin-lincoln-490",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.782800, 42.289500],
    description: "Lincoln St — 490 Lincoln St.",
  },
  {
    slug: "dunkin-shrewsbury-295",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.789500, 42.263800],
    description: "Shrewsbury St — 295 Shrewsbury St.",
  },
  {
    slug: "dunkin-summer-123",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.803400, 42.258200],
    description: "Summer St — 123 Summer St.",
  },
  {
    slug: "dunkin-belmont-104",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.794800, 42.272100],
    description: "Belmont St — 104 Belmont St.",
  },
  {
    slug: "dunkin-w-boylston-765",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.812500, 42.303500],
    description: "Greendale — 765 W Boylston St.",
  },
  {
    slug: "dunkin-southbridge-590",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.810200, 42.239800],
    description: "Southbridge St — 590 Southbridge St.",
  },
  {
    slug: "dunkin-grafton-265",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.793500, 42.255500],
    description: "Grafton St — 265 Grafton St.",
  },
  {
    slug: "dunkin-chandler-211",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.819200, 42.268400],
    description: "Chandler St — 211 Chandler St.",
  },
  {
    slug: "dunkin-plantation-366",
    name: "Dunkin'",
    category: "dunkin",
    coords: [-71.773800, 42.275600],
    description: "Plantation St — 366 Plantation St.",
  },
];

/** Category metadata — label + color used in UI/map legends. */
export const AMENITY_CATEGORIES: Record<
  AmenityCategory,
  { label: string; plural: string; color: string }
> = {
  employer:   { label: "Employer",   plural: "Major Employers",     color: "#4a90e2" },
  education:  { label: "Education",  plural: "Academic Anchors",    color: "#7b6cf6" },
  culture:    { label: "Culture",    plural: "Lifestyle & Culture", color: "#d9bf7a" },
  dining:     { label: "Dining",     plural: "Dining & Drinks",     color: "#f25c5c" },
  attraction: { label: "Attraction", plural: "Attractions",         color: "#e85d75" },
  transit:    { label: "Transit",    plural: "Transit & Highways",  color: "#4ade80" },
  retail:     { label: "Retail",     plural: "Big-Box Retail",      color: "#06b6d4" },
  dunkin:     { label: "Dunkin'",    plural: "Dunkin'",             color: "#da1884" },
  outdoors:   { label: "Outdoors",   plural: "Outdoors & Recreation", color: "#65a30d" },
};

export function amenitiesByCategory(category: AmenityCategory): Amenity[] {
  return amenities.filter((a) => a.category === category);
}
