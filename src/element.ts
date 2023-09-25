import { json2svg } from "./utils";

class IconElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const icon = this.getAttribute("icon");
    const img = await json2svg("icon", icon as any);

    this.innerHTML = `${img}`;
    this.style.display = "flex";
    this.style.width = "100px";
    this.style.height = "100px";
  }
}
customElements.define("icon-wizard", IconElement);
