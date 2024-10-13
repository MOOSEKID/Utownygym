export const defaultTraits = [
  {
    type: "select",
    name: "layout",
    label: "Layout",
    changeProp: 1,
    options: [
      { id: "list", label: "List" },
      { id: "grid", label: "Grid" },
    ],
    default: "grid",
  },
  {
    type: "number",
    name: "paginate",
    label: "Records per page",
    changeProp: 1,
    default: 12,
  },
];
