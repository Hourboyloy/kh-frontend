export const formatForURL = (text) => {
  return text
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/,/g, "")
    .replace(/&/g, "and")
    .replace(/[^\w-]/g, "");
};
