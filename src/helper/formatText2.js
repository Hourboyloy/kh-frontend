export const formatText = (text) => {
  return text
    ?.toLowerCase()
    .replace(/[-,]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
