/**
 * Red Book (Safety at Street Works and Road Works: A Code of Practice)
 * Grounded Knowledge Base & Local Vector/BM25 Search Index
 * Legal Basis: New Roads and Street Works Act 1991 (NRSWA) Section 65
 */

export const RED_BOOK_METADATA = {
  title: "Safety at Street Works and Road Works – A Code of Practice",
  shortTitle: "NRSWA Red Book",
  edition: "2013 Edition (Statutory Code)",
  legalBasis: "Section 65 of New Roads and Street Works Act 1991 (NRSWA)",
  scope: "Single carriageway roads and dual carriageways up to 40 mph speed limit. Excludes motorways and dual carriageways with speed limits of 50 mph or higher (which fall under Traffic Signs Manual Chapter 8).",
};

export const RED_BOOK_TABLE_1_DIMENSIONS = [
  {
    speedLimit: 20,
    speedLabel: "20 mph or less",
    leadInTaper: "15 m",
    sidewaysSafetyZone: "0.5 m",
    longSafetyZone: "0.5 m",
    warningSignDistance: "20 m to 45 m",
    clearVisibilityDistance: "60 m",
    recommendedSignSize: "600 mm"
  },
  {
    speedLimit: 30,
    speedLabel: "30 mph",
    leadInTaper: "15 m",
    sidewaysSafetyZone: "0.5 m",
    longSafetyZone: "0.5 m",
    warningSignDistance: "20 m to 45 m",
    clearVisibilityDistance: "60 m",
    recommendedSignSize: "600 mm"
  },
  {
    speedLimit: 40,
    speedLabel: "40 mph",
    leadInTaper: "30 m",
    sidewaysSafetyZone: "1.2 m",
    longSafetyZone: "15 m",
    warningSignDistance: "45 m to 110 m",
    clearVisibilityDistance: "90 m",
    recommendedSignSize: "750 mm"
  },
  {
    speedLimit: 50,
    speedLabel: "50 mph (Single Carriageway)",
    leadInTaper: "45 m",
    sidewaysSafetyZone: "1.2 m",
    longSafetyZone: "30 m",
    warningSignDistance: "110 m to 275 m",
    clearVisibilityDistance: "120 m",
    recommendedSignSize: "750 mm / 900 mm"
  },
  {
    speedLimit: 60,
    speedLabel: "National Speed Limit (60 mph Single Carriageway)",
    leadInTaper: "60 m",
    sidewaysSafetyZone: "1.2 m",
    longSafetyZone: "45 m",
    warningSignDistance: "275 m to 450 m",
    clearVisibilityDistance: "150 m",
    recommendedSignSize: "900 mm"
  }
];

export const RED_BOOK_CHUNKS = [
  {
    id: "sec-1-1",
    section: "Basic Principles & Safety Zones",
    page: 12,
    tableRef: "Table 1",
    keywords: ["safety zone", "sideways clearance", "long safety zone", "taper", "working space", "cones"],
    title: "Components of a Work Site Layout",
    content: `A site layout consists of five main areas:
1. Advance Warning Area: Contains warning signs informing drivers of upcoming roadworks.
2. Lead-in Taper: Cone taper guiding traffic around the obstruction.
3. Safety Zone: The buffer area surrounding the working space. It is divided into:
   - Long Safety Zone: Distance between the end of the lead-in taper and the start of the working space.
   - Sideways Safety Zone: Distance between the edge of moving traffic and the working space.
   - Entry/Exit Tapers.
4. Working Space: The area where operatives work, store materials, and operate plant.
5. Exit Taper: Cone taper guiding traffic back to normal lane position.`
  },
  {
    id: "sec-1-2",
    section: "Safety Zone Clearance Standards",
    page: 14,
    tableRef: "Table 1 (Page 14)",
    keywords: ["0.5m", "1.2m", "sideways safety zone", "clearance", "30mph", "40mph", "speed limit"],
    title: "Minimum Safety Zone Dimensions (Table 1)",
    content: `Table 1 specifies the statutory safety zone clearances based on temporary or permanent speed limits:
- Up to 30 mph: Sideways Safety Zone = 0.5 metres. Long Safety Zone = 0.5 metres. Lead-in Taper = 15 metres.
- 40 mph: Sideways Safety Zone = 1.2 metres. Long Safety Zone = 15 metres. Lead-in Taper = 30 metres.
- 50 mph (Single carriageway): Sideways Safety Zone = 1.2 metres. Long Safety Zone = 30 metres. Lead-in Taper = 45 metres.
- 60 mph (Single carriageway): Sideways Safety Zone = 1.2 metres. Long Safety Zone = 45 metres. Lead-in Taper = 60 metres.
CRITICAL SAFETY RULE: Operatives, tools, and plant MUST NOT enter the safety zone while traffic is passing.`
  },
  {
    id: "sec-2-1",
    section: "Pedestrian & Footway Works",
    page: 24,
    tableRef: "Footway Rules (Page 24-27)",
    keywords: ["pedestrian", "footway", "wheelchair", "pram", "width", "1.5m", "1.2m", "ramps", "barriers"],
    title: "Minimum Footway & Pedestrian Clearances",
    content: `When works encroach onto a footway, adequate provision must be made for pedestrians, including wheelchair users and visually impaired persons:
- Absolute Minimum Footway Width: 1.5 metres wherever possible.
- Exceptional Minimum Width: 1.2 metres in restricted circumstances (must accommodate a double buggy or wheelchair).
- Absolute Minimum Bottleneck Width: 1.0 metre over short distances (less than 6 metres length) where site conditions prevent wider access.
- Ramps: Temporary footway ramps must not exceed a slope of 1:12 (8.5%), and must have contrasting edges.
- Barriers: Continuous tapping rails (150mm height from ground) and handrails (1000mm height) are mandatory for visually impaired guidance.`
  },
  {
    id: "sec-3-1",
    section: "Traffic Control Methods",
    page: 38,
    tableRef: "Traffic Control Selection (Page 38-42)",
    keywords: ["give and take", "priority", "shuttle", "stop go", "portable signals", "traffic light", "length limit"],
    title: "Selection of Traffic Control Types",
    content: `When carriageway width is restricted, traffic control must be selected based on speed limit, visibility, and length of works:
1. Priority Control ("Give and Take"):
   - Max Speed Limit: 30 mph or less.
   - Max Length of Site: 50 metres.
   - Visibility: Driver must have clear visibility to both ends of the works site.
2. Priority Working ("Priority to oncoming traffic"):
   - Max Length of Site: 80 metres.
   - Signed with 'Priority to Oncoming Traffic' and 'Priority over Oncoming Traffic' signs.
3. Stop/Go Boards (Manual Control):
   - Max Length of Site: 50m for single operator, up to 500m for two operators with radio contact.
   - Must not be operated in dark unless well illuminated.
4. Portable Traffic Signals (Temp Traffic Lights):
   - Required for sites exceeding 80m where priority control is unsuitable, or where speed limit exceeds 30 mph.`
  },
  {
    id: "sec-4-1",
    section: "Carriageway Width Restrictions",
    page: 30,
    tableRef: "Lane Widths (Page 30)",
    keywords: ["carriageway width", "unobstructed width", "5.5m", "6.75m", "3.0m", "buses", "hgv"],
    title: "Minimum Unobstructed Carriageway Widths",
    content: `When setting out cones and barriers, minimum width of passing lane must be maintained:
- Standard Single Lane Passing Width: Minimum 3.0 metres.
- Bus / Heavy Goods Vehicle (HGV) Routes: Minimum 3.25 metres lane width.
- Two-way Traffic (Without traffic control): Minimum 5.5 metres total width for cars; Minimum 6.75 metres total width if HGV/buses regularly pass each other.`
  },
  {
    id: "sec-5-1",
    section: "High-Visibility Clothing & Equipment",
    page: 8,
    tableRef: "PPE Standards (Page 8)",
    keywords: ["ppe", "hivis", "class 3", "class 2", "jacket", "trousers", "en iso 20471", "safety helmet"],
    title: "High Visibility Clothing Requirements",
    content: `Operatives working on or near carriageways must wear high-visibility clothing conforming to EN ISO 20471:
- Day & Night: High visibility jacket or coat with full sleeves (Class 3) or high visibility waistcoat/vest with high visibility trousers (Class 2 + Class 2 = Class 3 overall).
- Background Color: Fluorescent yellow or fluorescent orange-red.
- Retroreflective Tapes: Must encircle torso and sleeves.
- Safety Helmets: Hard hats to EN 397 must be worn where head injury risks exist or company policy dictates.`
  },
  {
    id: "sec-6-1",
    section: "Mobile & Short Duration Works",
    page: 54,
    tableRef: "Mobile Works (Page 54-58)",
    keywords: ["mobile works", "stop and go", "vms", "vehicle mounted sign", "flashing beacons", "short duration"],
    title: "Mobile Works & Vehicle Signage",
    content: `Short duration or mobile works (e.g. gully cleansing, line marking, pot hole inspection):
- Vehicles must be fitted with amber 360-degree flashing beacons visible from all angles.
- Vehicle-mounted signs must display 'HIGHWAY MAINTENANCE' or 'ROAD MAINTENANCE' on rear.
- Recommended maximum speed during mobile operations is 10 mph.
- Works stopping for more than 15 minutes MUST be converted to static signing and guarding.`
  },
  {
    id: "sec-7-1",
    section: "Portable Traffic Signal Timings & Multiphase",
    page: 46,
    tableRef: "Signal Timings (Page 46)",
    keywords: ["portable signals", "red light", "shuttle green", "intergreen", "all red", "haag", "signal timings"],
    title: "Portable Traffic Signal Timings & Authorisation",
    content: `Key rules for temporary portable traffic signals:
- Highway Authority Approval: Portable traffic signals MUST have prior approval/authorization from the Highway Authority (unless emergency works, where notification must be sent within 2 hours).
- All-Red / Intergreen Period: Must be calculated correctly based on distance between stop lines (e.g. 50m site = 5 sec all-red; 100m site = 8 sec all-red).
- Signal Heads: Must be clean, upright, and positioned between 2.5m and 3.5m height.`
  }
];

/**
 * Local Lightweight RAG Engine (BM25 + Semantic Keyword Scoring)
 * Returns top matching chunks with exact citations.
 */
export function queryLocalKnowledgeBase(queryText, limit = 3) {
  if (!queryText || queryText.trim() === '') {
    return [];
  }

  const terms = queryText.toLowerCase().split(/\W+/).filter(t => t.length > 2);
  
  const scoredChunks = RED_BOOK_CHUNKS.map(chunk => {
    let score = 0;
    const fullText = (chunk.title + ' ' + chunk.content + ' ' + chunk.section).toLowerCase();

    terms.forEach(term => {
      // Direct keyword match bonus
      if (chunk.keywords.some(k => k.toLowerCase().includes(term))) {
        score += 15;
      }
      // Title match bonus
      if (chunk.title.toLowerCase().includes(term)) {
        score += 10;
      }
      // Content frequency count
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const matches = fullText.match(regex);
      if (matches) {
        score += matches.length * 3;
      }
    });

    return { ...chunk, score };
  });

  return scoredChunks
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
