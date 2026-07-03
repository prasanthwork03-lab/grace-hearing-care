/**
 * Combines CSS class names conditionally.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats an ISO date string into a friendly local representation.
 */
export function formatDate(isoString) {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch (e) {
    return isoString;
  }
}
