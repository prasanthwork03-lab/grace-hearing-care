/**
 * Utility to extract UTM parameters, GCLID, and device characteristics.
 */

export function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  const getStoredValue = (key) => {
    try {
      return sessionStorage.getItem(key) || "";
    } catch {
      return "";
    }
  };
  
  // Extract UTMs and GCLID
  const tracking = {
    utm_source: params.get("utm_source") || getStoredValue("utm_source"),
    utm_medium: params.get("utm_medium") || getStoredValue("utm_medium"),
    utm_campaign: params.get("utm_campaign") || getStoredValue("utm_campaign"),
    utm_term: params.get("utm_term") || getStoredValue("utm_term"),
    utm_content: params.get("utm_content") || getStoredValue("utm_content"),
    gclid: params.get("gclid") || getStoredValue("gclid"),
    landingPageSource: params.get("source") || getStoredValue("landingPageSource") || "google_ads",
    pageUrl: window.location.href,
    deviceType: getDeviceType()
  };

  // Persist to session storage so they survive navigation or reloads
  try {
    Object.keys(tracking).forEach((key) => {
      if (tracking[key]) sessionStorage.setItem(key, tracking[key]);
    });
  } catch {
    // Tracking storage may be disabled in private browsing; lead submission must continue.
  }

  return tracking;
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
}
