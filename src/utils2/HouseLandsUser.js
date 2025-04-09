export const getDirectionOptions = (locale = "en") => [
  { value: "", label: "" },
  {
    value: "East",
    label: locale === "en" ? "East" : "ខាងកើត",
  },
  {
    value: "North",
    label: locale === "en" ? "North" : "ខាងជើង",
  },
  {
    value: "Northeast",
    label: locale === "en" ? "Northeast" : "ភាគឦសាន",
  },
  {
    value: "Northwest",
    label: locale === "en" ? "Northwest" : "ពាយព្យ",
  },
  {
    value: "South",
    label: locale === "en" ? "South" : "ខាងត្បូង",
  },
  {
    value: "Southeast",
    label: locale === "en" ? "Southeast" : "អាគ្នេយ៍",
  },
  {
    value: "Southwest",
    label: locale === "en" ? "Southwest" : "និរតី",
  },
  {
    value: "West",
    label: locale === "en" ? "West" : "ខាងលិច",
  },
];
