export const getFuelOptions = (locale = "en") => [
  { value: "", label: "" },
  { value: "diesel", label: locale === "en" ? "Diesel" : "ម៉ាស៊ូត" },
  { value: "electric", label: locale === "en" ? "Electric" : "អគ្គិសនី" },
  { value: "hybrid", label: "Hybrid" },
  { value: "lpg", label: locale === "en" ? "LPG" : "ហ្គាស" },
  { value: "petrol", label: locale === "en" ? "Petrol" : "សាំង" },
];

export const getColorOptions = (locale = "en") => [
  { value: "", label: "" },
  { value: "black", label: locale === "en" ? "Black" : "ខ្មៅ" },
  { value: "blue", label: locale === "en" ? "Blue" : "ខៀវ" },
  { value: "brown", label: locale === "en" ? "Brown" : "ត្នោត" },
  { value: "gold", label: locale === "en" ? "Gold" : "មាស" },
  { value: "green", label: locale === "en" ? "Green" : "បៃតង" },
  { value: "gray", label: locale === "en" ? "Gray" : "ប្រផេះ" },
  { value: "red", label: locale === "en" ? "Red" : "ក្រហម" },
  { value: "yellow", label: locale === "en" ? "Yellow" : "លឿង" },
  { value: "white", label: locale === "en" ? "White" : "ស" },
  { value: "silver", label: locale === "en" ? "Silver" : "ប្រាក់" },
  { value: "purple", label: locale === "en" ? "Purple" : "ស្វាយ" },
  { value: "orange", label: locale === "en" ? "Orange" : "ស្លែក" },
  { value: "beige", label: locale === "en" ? "Beige" : "ពណ៌សប្រាក់" },
  { value: "other", label: locale === "en" ? "Other" : "ផ្សេងទៀត" },
];

export const getTypeOptions = (locale = "en") => [
  {
    value: "",
    label: "",
  },
  { value: "Cars", label: locale === "en" ? "Cars" : "រថយន្ត" },
  { value: "Bicycles", label: locale === "en" ? "Bicycles" : "កង់" },
  { value: "Motorcycles", label: locale === "en" ? "Motorcycles" : "ម៉ូតូ" },
  {
    value: "Tuk Tuk & Remork",
    label: locale === "en" ? "Tuk Tuk & Remork" : "ទូក ទូក និង រ៉ំម៉ត",
  },
  {
    value: "Other - ផ្សេងៗ",
    label: "Other - ផ្សេងៗ",
  },
];
