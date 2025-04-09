export const formatDate2 = (dateInput) => {
  if (!dateInput) return "Unknown date";

  // Convert object to string if necessary
  const dateString =
    typeof dateInput === "object"
      ? Object.values(dateInput).join("")
      : dateInput;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date"; // Handle invalid dates

  const now = new Date();
  const diffTime = Math.abs(now - date);

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  // if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
