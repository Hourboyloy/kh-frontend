export const getTableTypeOptions = (locale = "en") => [
  { value: "", label: "" },
  {
    value: "Dining Table",
    label: locale === "en" ? "Dining Table" : "តុញ៉ាំបាយ",
  },
  {
    value: "Game Table",
    label: locale === "en" ? "Game Table" : "តុលេងហ្គេម",
  },
  {
    value: "Kids Desks",
    label: locale === "en" ? "Kids Desks" : "តុរបស់កុមារ",
  },
  {
    value: "Office Desk",
    label: locale === "en" ? "Office Desk" : "តុការិយាល័យ",
  },
  {
    value: "Student Desk",
    label: locale === "en" ? "Student Desk" : "តុសិស្ស",
  },
  {
    value: "Wooden Table",
    label: locale === "en" ? "Wooden Table" : "តុឈើ",
  },
  {
    value: "Other",
    label: locale === "en" ? "Other" : "ផ្សេងៗ",
  },
];


export const getChairTypeOptions = (locale = "en") => [
  { value: "", label: "" },
  {
    value: "Barber chair / Salon Chair",
    label:
      locale === "en" ? "Barber chair / Salon Chair" : "កៅអីកាត់សក់ / កៅអីសាឡន",
  },
  {
    value: "Dining Chair",
    label: locale === "en" ? "Dining Chair" : "កៅអីបរិភោគអាហារ",
  },
  {
    value: "Gaming Chair",
    label: locale === "en" ? "Gaming Chair" : "កៅអីលេងហ្គេម",
  },
  {
    value: "Kids Chairs & Seats",
    label: locale === "en" ? "Kids Chairs & Seats" : "កៅអីសម្រាប់កុមារ",
  },
  {
    value: "Office Chair",
    label: locale === "en" ? "Office Chair" : "កៅអីការិយាល័យ",
  },
  {
    value: "Sofa",
    label: locale === "en" ? "Sofa" : "សាឡុង",
  },
  {
    value: "Student Chair",
    label: locale === "en" ? "Student Chair" : "កៅអីសិស្ស",
  },
  {
    value: "Waiting Room Chair",
    label: locale === "en" ? "Waiting Room Chair" : "កៅអីបន្ទប់រង់ចាំ",
  },
  {
    value: "Wheelchair",
    label: locale === "en" ? "Wheelchair" : "រទេះរុញ",
  },
  {
    value: "Wooden Chair",
    label: locale === "en" ? "Wooden Chair" : "កៅអីឈើ",
  },
  {
    value: "Other",
    label: locale === "en" ? "Other" : "ផ្សេងៗ",
  },
];
