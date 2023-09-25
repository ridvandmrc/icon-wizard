import { json2svg } from "./utils";

class IconElement extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const icon = this.getAttribute("icon");
    const img = await json2svg("icon", icon as any);

    this.innerHTML = `${img}`;
  }
}
customElements.define("icon-wizard", IconElement);
