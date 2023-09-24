// import { json2svg } from "./utils";

class IconElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const icon = this.getAttribute("icon");
    // console.log("icon: ", json2svg("icon", icon as any));

    this.innerHTML = `<a href="#">${icon}</a>`;
  }
}
customElements.define("ridvan-icon", IconElement);

console.log("test 123");
