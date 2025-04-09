export const formatKey = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Convert camelCase to space-separated words
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};
