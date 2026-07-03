import { allowedChennaiAreas } from "../data/chennaiAreas";

const outsideChennaiIndicators = [
  "bengaluru",
  "bangalore",
  "coimbatore",
  "madurai",
  "trichy",
  "tiruchirappalli",
  "salem",
  "tirunelveli",
  "vellore",
  "erode",
  "tiruppur",
  "pondicherry",
  "puducherry",
  "hyderabad",
  "mumbai",
  "delhi",
  "kolkata",
  "kochi",
  "cochin",
  "kerala",
  "karnataka",
  "outside chennai"
];

function normalizeLocation(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function containsLocation(area, location) {
  return ` ${area} `.includes(` ${location} `);
}

export function classifyLeadLocation(area) {
  const normalizedArea = normalizeLocation(area);
  const matchedChennaiArea = allowedChennaiAreas.some((allowedArea) =>
    containsLocation(normalizedArea, normalizeLocation(allowedArea))
  );

  if (matchedChennaiArea) {
    return {
      leadStatus: "new_chennai_lead",
      isChennaiLead: true,
      locationVerification: "verified_chennai_area"
    };
  }

  const clearlyOutsideChennai = outsideChennaiIndicators.some((indicator) =>
    containsLocation(normalizedArea, normalizeLocation(indicator))
  );

  if (clearlyOutsideChennai) {
    return {
      leadStatus: "outside_chennai_lead",
      isChennaiLead: false,
      locationVerification: "outside_chennai"
    };
  }

  return {
    leadStatus: "needs_location_verification",
    isChennaiLead: false,
    locationVerification: "unverified"
  };
}

export function validateLead(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your full name (minimum 2 characters).";
  }

  const phoneClean = data.phone ? data.phone.replace(/\D/g, "") : "";
  const normalizedPhone = phoneClean.startsWith("91") && phoneClean.length === 12
    ? phoneClean.slice(2)
    : phoneClean;

  if (!normalizedPhone) {
    errors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number (starting with 6-9).";
  }

  if (!data.area || data.area.trim().length < 2) {
    errors.area = "Area or location is required.";
  }

  if (!data.requirement) {
    errors.requirement = "Please select a requirement.";
  }

  if (!data.preferredContact) {
    errors.preferredContact = "Please select a preferred contact method.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    phoneClean: normalizedPhone,
    ...classifyLeadLocation(data.area)
  };
}
