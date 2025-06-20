customElements.define("feature-card", class extends HTMLElement {
  #feature;
  #type;

  constructor() {
    super();
    this.#feature = this.getAttribute("feature");
    this.#type = this.getAttribute("type");
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
      if (this.#type === "story") image = `stories/${this.#feature}/${this.#feature}.png`;
      else if (this.#type === "note") image = `notes/${this.#feature}/${this.#feature}.png`;
      else if (this.#type === "project") image = `projects/${this.#feature}/${this.#feature}.png`;
    }
    return image;
  }

  getCardTitle() {
    return this.#feature.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

});
