export const formatCategoryName = (name) =>
  name
    ?.toLowerCase()
    .replace(/[-,]/g, " ")
    .replace(/\band\b/gi, "&")
    .replace(/'/g, "")
    .replace(/\s+/g, " ")
    .trim();
