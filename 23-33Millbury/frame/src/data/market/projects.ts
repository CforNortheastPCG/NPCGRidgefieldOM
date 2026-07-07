// Nearby development projects — within walking distance of the Canal District
// portfolio. Sourced from the City of Worcester's economic development project
// inventory; descriptions rewritten in our own words.
//
// Coordinates geocoded via Google Maps Geocoding API.
// Re-run: GOOGLE_MAPS_API_KEY=... python3 tools/geocode_google.py projects

export type ProjectStatus = "completed" | "construction" | "proposed";

export interface NearbyProject {
  slug: string;
  name: string;
  address: string;
  coords: [number, number];
  status: ProjectStatus;
  /** Optional headline stat — units, investment, etc. */
  stat?: string;
  /** Optional secondary stat — paired with `stat` in the popup. */
  stat2?: string;
  /** One- or two-sentence summary written in our own voice. */
  description: string;
}

export const nearbyProjects: NearbyProject[] = [
  // ── Madison Properties ballpark campus (across from Polar Park) ──────
  {
    slug: "revington-soma",
    name: "The Revington (SOMA)",
    address: "45 Madison Street",
    coords: [-71.804067, 42.258837],
    status: "completed",
    stat: "228 units",
    stat2: "$89M",
    description:
      "Madison Properties' first ballpark-campus building — a seven-story, 228-unit market-rate apartment building with ground-floor retail directly across from Polar Park.",
  },
  {
    slug: "madison-phase-2",
    name: "Madison Phase 2",
    address: "149 Washington Street",
    coords: [-71.800557, 42.254805],
    status: "proposed",
    stat: "125 units",
    description:
      "Phase two of Madison Properties' ballpark campus — a second residential building behind the Revington, with shared parking between the two towers.",
  },
  {
    slug: "madison-lab",
    name: "Madison Life Sciences Building",
    address: "115 Madison Street",
    coords: [-71.801541, 42.255463],
    status: "proposed",
    stat: "200,000 SF",
    description:
      "Six-story life-sciences and office building planned next to the new municipal garage, anchoring the lab/office side of Madison Properties' ballpark campus.",
  },
  {
    slug: "madison-hotel",
    name: "Madison Hotel Pair",
    address: "Madison Properties campus",
    coords: [-71.801880, 42.255113],
    status: "proposed",
    stat: "110 + 140 rooms",
    description:
      "Madison Properties' lodging plans were expanded and shifted south of the original Green Island Boulevard footprint — now a paired 110-room hotel and a 140-room extended-stay anchoring the campus.",
  },
  {
    slug: "polar-park-garage",
    name: "Polar Park Municipal Garage",
    address: "105 Madison Street",
    coords: [-71.802228, 42.255702],
    status: "completed",
    stat: "348 spaces",
    stat2: "$23M",
    description:
      "Three-story public garage built by the Worcester Redevelopment Authority across from Polar Park to serve game-day demand and the surrounding development pipeline.",
  },
  {
    slug: "rockland-plaza",
    name: "Rockland Trust Plaza",
    // Hand-placed at Polar Park's north entrance — Google returned a generic
    // city centroid for the plaza name.
    coords: [-71.799300, 42.257700],
    address: "Polar Park north entrance",
    status: "completed",
    stat: "$3.5M",
    description:
      "Open-air, walkable plaza outside Polar Park's north gate — a programmable public space that activates the connection between the ballpark and the district.",
  },

  // ── Canal District / Kelley Square core ─────────────────────────────
  {
    slug: "kelley-square-lofts",
    name: "Kelley Square Lofts (Harding Green)",
    address: "150 Green Street",
    coords: [-71.797736, 42.255949],
    status: "completed",
    stat: "48 units",
    stat2: "$21M",
    description:
      "Mixed-use building wedged between Kelley Square and the Crompton Building — the Worcester Public Market food hall sits on the ground floor with three floors of market-rate lofts above.",
  },
  {
    slug: "the-cove",
    name: "The Cove",
    address: "89 Green Street",
    coords: [-71.798310, 42.257818],
    status: "completed",
    stat: "173 units",
    stat2: "$81M",
    description:
      "V10 Development's seven-story market-rate apartment building delivered behind Polar Park's centerfield in 2025, replacing the former Lucky Dog Music Hall.",
  },
  {
    slug: "table-talk-affordable",
    name: "District 120 (Table Talk)",
    address: "120 Washington Street",
    coords: [-71.799400, 42.255991],
    status: "completed",
    stat: "83 units",
    stat2: "100% affordable",
    description:
      "Six-story affordable-housing building on the former Table Talk Pies site — opened in summer 2024 as District 120 by Tremont Development and E3 Development, with units reserved for households at or below 60% of area median income.",
  },
  {
    slug: "rossi-table-talk",
    name: "Tavolo Lofts",
    address: "153 Green Street",
    coords: [-71.798202, 42.255938],
    status: "completed",
    stat: "~52 units",
    description:
      "Rossi Development's adaptive reuse of a historic building on the Table Talk parcel — now leasing as Tavolo Lofts along the Green Street frontage.",
  },
  {
    slug: "lamartine-39",
    name: "39 Lamartine Apartments",
    address: "39 Lamartine Street",
    coords: [-71.801963, 42.254214],
    status: "proposed",
    stat: "36 units",
    description:
      "Polar Views' five-story mixed-use proposal — 36 residential units stacked over ground-floor retail, amenities, and two levels of parking on a Lamartine Street parcel.",
  },
  {
    slug: "lamartine-90",
    name: "90 Lamartine Mill Conversion",
    address: "90 Lamartine Street",
    coords: [-71.804229, 42.254069],
    status: "construction",
    stat: "~25 units",
    description:
      "Worcester Bedworks' active conversion of a 43,000 SF, 1889-vintage mill behind the Madison Properties campus — new roof and elevator in, units roughed in, with adjacent Lamartine parcels packaged for parking.",
  },
  {
    slug: "harding-51",
    name: "51 Harding Mixed-Use",
    address: "51 Harding Street",
    coords: [-71.795269, 42.259910],
    status: "proposed",
    stat: "Retail + 2 units",
    description:
      "Williston Development's redevelopment of the former M. Goldstein Scrap Metal site into ground-floor retail with apartments on the upper floors.",
  },

  // ── Just outside the Canal District core ─────────────────────────────
  {
    slug: "alta-on-the-row",
    name: "Alta on the Row",
    address: "28 Mulberry Street",
    coords: [-71.792541, 42.264509],
    status: "completed",
    stat: "370 units",
    stat2: "Sold $157M",
    description:
      "Wood Partners' five-story development on the former Mount Carmel Church site, delivered in 2024 and sold to a Morgan Stanley / Eaton Vance affiliate for $157M. Includes a connected garage, a public park, and a community room.",
  },
  {
    slug: "beacon-98",
    name: "98-100 Beacon Apartments",
    address: "98 Beacon Street",
    coords: [-71.808536, 42.254949],
    status: "proposed",
    stat: "55 units",
    description:
      "Renovation of a four-story former manufacturing building into 55 apartments, with an adjacent vacant lot at 96 Beacon repurposed for a small parking facility.",
  },
  {
    slug: "madison-5",
    name: "5 Madison Mixed-Use",
    address: "5 Madison Street",
    coords: [-71.804484, 42.258847],
    status: "proposed",
    stat: "110 units",
    description:
      "Winterspring Capital's five-story, 110-unit residential development on a long-vacant Madison Street lot, with 2,000 SF of ground-floor commercial space.",
  },
  {
    slug: "southbridge-300",
    name: "The Bridge",
    address: "300 Southbridge Street",
    coords: [-71.806677, 42.253862],
    status: "proposed",
    stat: "21 units",
    description:
      "Renovation of a 1860s factory into 21 housing units — walkable to the Canal District, Union Station, and downtown. Dalfior Development of Somerville purchased the building in 2021.",
  },

  {
    slug: "benjamin-franklin",
    name: "The Benjamin on Franklin",
    address: "Franklin Street",
    coords: [-71.79180690061888, 42.26024628093817],
    status: "construction",
    stat: "364 units",
    stat2: "$120M",
    description:
      "The Michaels Organization and GoVenture Capital's five-story, 364-unit mixed-use development near Union Station — 36 affordable units, rooftop deck, co-working spaces, and ground-floor retail.",
  },

  // ── Front Street / City Square (downtown edge) ───────────────────────
  {
    slug: "front-145",
    name: "145 Front at City Square",
    address: "145 Front Street",
    coords: [-71.797709, 42.261363],
    status: "completed",
    stat: "365 units",
    stat2: "$92M",
    description:
      "Two five-story buildings making up Worcester's first high-end multifamily complex — 365 units delivered as part of the City Square redevelopment.",
  },
  {
    slug: "ac-hotel",
    name: "AC Hotel by Marriott",
    address: "125 Front Street",
    coords: [-71.798760, 42.261740],
    status: "completed",
    stat: "168 rooms",
    stat2: "$33M",
    description:
      "Boutique Marriott property anchoring the City Square block — a 168-room hotel with a 750-capacity ballroom, fitness center, and underground parking.",
  },
];

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; plural: string; color: string }
> = {
  completed:    { label: "Delivered",        plural: "Delivered",         color: "#4ade80" },
  construction: { label: "Under construction", plural: "Under construction", color: "#fbbf24" },
  proposed:     { label: "Proposed",         plural: "Proposed",          color: "#7b6cf6" },
};

export const PROJECT_STATUS_ORDER: ProjectStatus[] = [
  "completed",
  "construction",
  "proposed",
];

export function projectsByStatus(status: ProjectStatus): NearbyProject[] {
  return nearbyProjects.filter((p) => p.status === status);
}
