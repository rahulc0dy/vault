customElements.define("feature-card", class extends HTMLElement {
  #feature;

  constructor() {
    super();
    this.#feature = this.getAttribute("feature");
  }

  connectedCallback() {
    this.innerHTML = html`
      <a href="/stories/${this.#feature}/">
        <img src=${this.getCardImage()} alt="story">
        <h4>${this.getCardTitle()}</h4>
      </a>
    `;
  }

  getCardImage() {
    let image = "assets/images/default-feature-image.png";
    if (this.#feature) {
      if (location.pathname.startsWith("/stories/")) image = `stories/${this.#feature}/${this.#feature}.png`;
      else if (location.pathname.startsWith("/notes/")) image = `notes/${this.#feature}/${this.#feature}.png`;
      else if (location.pathname.startsWith("/stories/")) image = `stories/${this.#feature}/${this.#feature}.png`;
    }
    return image;
  }

  getCardTitle() {
    return this.#feature.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

});
