customElements.define("code-block", class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html`
      <pre><code>${this.textContent}</code></pre>
    `;
  }

});
