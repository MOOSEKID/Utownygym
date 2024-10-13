export default {
  type: "footer",
  name: "Footer",
  media:
    '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 35 35" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,0v25.366h35V0H0z M32.879,23.245H2.121V2.121h30.758V23.245z"></path> <rect y="28.283" width="35" height="6.717"></rect> </g> </g> </g></svg>',
  traits: [
    {
      type: "select",
      name: "layout",
      label: "Layout",
      changeProp: 1,
      options: [
        { id: "", label: "Select" },
        { id: "default", label: "Default" },
      ],
      default: "",
    },
    {
      type: "textarea",
      name: "desc",
      label: "Description",
      changeProp: 1,
      default: "",
    },
  ],
};
