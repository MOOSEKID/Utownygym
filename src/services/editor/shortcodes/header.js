export default {
  type: "header",
  name: "Header",
  media:
    '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800"><path class="cls-1" d="M800,800V220.2S0,220.2,0,220.2v579.8s800,0,800,0ZM48.5,268.7h703v482.8H48.5v-482.8s0,0,0,0Z"/><rect class="cls-1" x="0" width="800" height="153.5"/></svg>',
  traits: [
    {
      type: "select",
      name: "layout",
      label: "Layout",
      changeProp: 1,
      options: [
        { id: "", label: "Select" },
        { id: "classic", label: "Classic" },
        { id: "overlay", label: "Overlay" },
      ],
      default: "",
    },
    {
      type: "select",
      name: "container",
      label: "Container",
      changeProp: 1,
      options: [
        { id: "container", label: "Dense" },
        { id: "container-fluid", label: "Fluid" },
      ],
      default: "container",
    },
    {
      type: "input",
      name: "ctalabel",
      label: "CTA Label",
      changeProp: 1,
      default: "Get Started",
    },
    {
      type: "input",
      name: "ctalink",
      label: "CTA Link",
      changeProp: 1,
      default: "",
    },
  ],
};
