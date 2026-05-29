customElements.define("project-card", class extends HTMLElement {
  #project;
  #href;
  #title;

  constructor() {
    super();
    this.#project = this.getAttribute("project");
    this.#href = this.getAttribute("href");
    this.#title = this.getAttribute("title");
  }

  connectedCallback() {
    const link = this.#href || `http://github.com/rahulc0dy/${this.#project}`;
    this.innerHTML = html`
      <a target="_blank" referrerpolicy="no-referrer" href="${link}">
        <img src=${this.getCardImage()} alt="${this.getCardTitle()}">
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
    if (this.#title) return this.#title;
    return this.#project.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

});
