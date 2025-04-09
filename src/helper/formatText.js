export const formatText = (text) => {
  return text
    ? text
        .replace(/-/g, " ") // ជំនួស "-" ទាំងអស់ជាយូណីខូដ " "
        .trim() // លុប space នៅដើម/ចុង
        .split(" ") // បំបែកជា array
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
        .join(" ") // បង្រួបជាផ្ទះ
    : "";
};
