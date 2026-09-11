import { RED_BOOK_TABLE_1_DIMENSIONS } from '../data/redbook_kb.js';

/**
 * Calculates safety dimensions and sign layout based on speed limit.
 */
export function calculateSafetyZone(speedLimit) {
  const numericSpeed = parseInt(speedLimit, 10);
  const match = RED_BOOK_TABLE_1_DIMENSIONS.find(d => d.speedLimit === numericSpeed) || RED_BOOK_TABLE_1_DIMENSIONS[1]; // default 30 mph

  return {
    ...match,
    coneSpacingTaper: "1.2 m to 1.5 m (Max 1.5m in tapers)",
    coneSpacingLongitudinal: numericSpeed >= 50 ? "18 m (12m in lead-in)" : "9 m (9m in lead-in)",
    minimumPassingLaneWidth: "3.0 metres (3.25m if buses/HGVs present)",
    warningNote: numericSpeed >= 50 ? "High speed road rules apply. Verify whether Traffic Signs Manual Chapter 8 is required for dual carriageways over 50mph." : "Standard Red Book safety rules apply."
  };
}

/**
 * Evaluates suitable traffic control methods based on speed limit, length of site, and visibility.
 */
export function evaluateTrafficControl({ speedLimit, lengthMetres, visibilityGood, heavyTraffic }) {
  const speed = parseInt(speedLimit, 10);
  const len = parseInt(lengthMetres, 10) || 30;

  const recommendations = [];

  // Give & Take (Priority Control)
  if (speed <= 30 && len <= 50 && visibilityGood) {
    recommendations.push({
      type: "Give and Take (Priority Control)",
      suitable: true,
      badge: "Best for short 30mph works",
      details: "Suitable because speed is <=30mph, length <=50m, and drivers have clear visibility to both ends.",
      signsNeeded: ["'Road Works Ahead' (750mm)", "'Give and Take' operational rules"]
    });
  } else {
    recommendations.push({
      type: "Give and Take (Priority Control)",
      suitable: false,
      reason: speed > 30 ? "Unsuitable (Speed limit > 30mph)" : len > 50 ? "Unsuitable (Site length > 50 metres)" : "Unsuitable (Visibility is obstructed)"
    });
  }

  // Priority Working
  if (len <= 80 && visibilityGood) {
    recommendations.push({
      type: "Priority Signs (Priority to Oncoming Traffic)",
      suitable: true,
      badge: "Up to 80m",
      details: "Requires 'Priority over oncoming traffic' sign at one end and 'Give way to oncoming traffic' sign at the other end.",
      signsNeeded: ["Sign 615 (Priority to Oncoming)", "Sign 811 (Priority Over Oncoming)"]
    });
  } else {
    recommendations.push({
      type: "Priority Signs (Priority to Oncoming Traffic)",
      suitable: false,
      reason: len > 80 ? "Site length exceeds 80 metres limit" : "Visibility is insufficient"
    });
  }

  // Stop / Go Boards
  if (len <= 50 || (len <= 500 && !heavyTraffic)) {
    recommendations.push({
      type: "Stop / Go Boards (Manually Operated)",
      suitable: true,
      badge: "Manual Control",
      details: len <= 50 ? "Can be operated by 1 operative." : "Requires 2 operatives with radio communication.",
      signsNeeded: ["Stop / Go signs (600mm/750mm)", "Illumination if operated during darkness"]
    });
  }

  // Portable Traffic Signals (Temporary Traffic Lights)
  recommendations.push({
    type: "Portable Traffic Signals (Temp Traffic Lights)",
    suitable: true,
    badge: "Most Robust / All Lengths",
    details: "Mandatory for site lengths over 80m or high-speed / heavy traffic roads. Highway Authority authorization required (notification within 2 hrs for emergencies).",
    signsNeeded: ["'Traffic Signals Ahead' sign (750mm)", "'WAIT HERE UNTIL GREEN LIGHT APPEARS' sign", "Signal heads at 2.5m - 3.5m height"]
  });

  return recommendations;
}

/**
 * Validates footway pedestrian width compliance.
 */
export function validateFootwayWidth(widthMetres) {
  const w = parseFloat(widthMetres);

  if (isNaN(w)) {
    return { status: "unknown", message: "Enter width in metres" };
  }

  if (w >= 1.5) {
    return {
      status: "compliant",
      color: "emerald",
      label: "Full Compliance",
      message: `Width of ${w}m meets or exceeds the standard 1.5m Red Book footway requirement. Accommodates pushchairs and wheelchairs comfortably.`
    };
  } else if (w >= 1.2) {
    return {
      status: "warning",
      color: "amber",
      label: "Restricted Minimum",
      message: `Width of ${w}m meets the restricted 1.2m minimum limit. Permitted only where site constraints prevent 1.5m.`
    };
  } else if (w >= 1.0) {
    return {
      status: "caution",
      color: "orange",
      label: "Absolute Bottleneck Limit",
      message: `Width of ${w}m is at the absolute bottleneck limit (1.0m over max 6m length). Requires continuous tapping rails & handrails.`
    };
  } else {
    return {
      status: "non-compliant",
      color: "red",
      label: "CRITICAL NON-COMPLIANCE",
      message: `Width of ${w}m is illegal under NRSWA Red Book Code of Practice! You MUST provide an alternative footway ramp/diversion onto the carriageway with pedestrian safety barriers.`
    };
  }
}
