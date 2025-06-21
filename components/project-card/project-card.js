customElements.define("project-card", class extends HTMLElement {
  #project;

  constructor() {
    super();
    this.#project = this.getAttribute("project");
  }

  connectedCallback() {
    this.innerHTML = html`
      <a href="http://github.com/rahulc0dy/${this.#project}">
        <img src=${this.getCardImage()} alt="story">
        <h4>${this.getCardTitle()}</h4>
      </a>
    `;
  }

  getCardImage() {
    let image = "assets/images/default-project-image.png";
    if (this.#project) {
      image = `projects/${this.#project}/thumbnail.png`;
    }
    return image;
  }

  getCardTitle() {
    return this.#project.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

});
