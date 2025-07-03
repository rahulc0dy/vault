const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.href = "../assets/fonts/Iosevka-Bold.ttf";
preloadLink.as = "font";
preloadLink.type = "font/ttf";
preloadLink.crossOrigin = "anonymous";
document.head.appendChild(preloadLink);

const iconLink = document.createElement("link");
iconLink.rel = "icon";
iconLink.type = "image/png";
iconLink.href = "../assets/icons/alien-icon.png";
document.head.appendChild(iconLink);

const webmentionLink = document.createElement("link");
webmentionLink.rel = "webmention";
webmentionLink.href = "https://portfolio-webapp.framer.ai";
document.head.appendChild(webmentionLink);

const metaColorScheme = document.createElement("meta");
metaColorScheme.name = "color-scheme";
metaColorScheme.content = "only dark";
document.head.appendChild(metaColorScheme);

const metaOgTitle = document.createElement("meta");
metaOgTitle.name = "og:title";
metaOgTitle.content = "Vault";
document.head.appendChild(metaOgTitle);

const metaOgDescription = document.createElement("meta");
metaOgDescription.name = "og:description";
metaOgDescription.content = "Personal vault of Rahul Chakraborty.";
document.head.appendChild(metaOgDescription);

const metaOgShortDescription = document.createElement("meta");
metaOgShortDescription.name = "og:short-description";
metaOgShortDescription.content = "Personal vault of Rahul Chakraborty.";
document.head.appendChild(metaOgShortDescription);

const metaOgImage = document.createElement("meta");
metaOgImage.name = "og:image";
metaOgImage.content = "https://github.com/rahulc0dy/vault/blob/main/assets/images/og-image.png";
document.head.appendChild(metaOgImage);

const commonStyles = document.createElement("link");
commonStyles.rel = "stylesheet";
commonStyles.href = "common.css";
document.head.appendChild(commonStyles);

const html = (() => {
  const staging = document.createElement("div");
  const rawSymbol = Symbol("raw");

  function sanitize(string) {
    staging.textContent = string;
    return staging.innerHTML;
  }

  function raw(rawHTML) {
    const marked = new String(rawHTML);
    marked[rawSymbol] = true;
    return marked;
  }

  function html(strings, ...values) {
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const sanitizedValue =
        value && value instanceof String && value[rawSymbol] === true
          ? value
          : sanitize(String(value));
      result += sanitizedValue + strings[i + 1];
    }
    return raw(result);
  }

  html.raw = raw;
  return html;
})();

customElements.define("site-navbar", class SiteNavbar extends HTMLElement {
  #currentY = 0;
  #currentYTarget = 0;
  #mouseHovering = false;
  #isTouch = false;
  #lastScrollY = window.scrollY;
  #lastCursorY = 0;
  #updateDOM = debounce(() => {
    this.style.transform = `translateY(${this.#currentY.toFixed(2)}px)`;

    const isHidden = this.#currentY < -this.offsetHeight * 0.8;
    this.classList.toggle("hidden", isHidden);

    if (Math.abs(this.#currentY - this.#currentYTarget) > 1) {
      this.#currentY += (this.#currentYTarget - this.#currentY) * 0.2;
      requestAnimationFrame(this.#updateDOM);
    } else {
      this.#currentY = this.#currentYTarget;
    }
  });

  constructor() {
    super();
  }

  connectedCallback() {
    const renderItem = (href, label) => html`<a href="${href}"
                                                class="${this.#isSelected(href) ? "selected" : ""}">${label}</a>`;

    const iconSrc = this.#getIconSrc();

    this.innerHTML = html`
      <nav>
        ${renderItem("/", "Home")}
        ${renderItem("/stories/", "Stories")}
        ${renderItem("/about/", "About")}
        <img loading="lazy" src="${iconSrc}" alt=""
             class="${iconSrc === "/assets/icons/sheet.png" ? "site-icon-sheet" : ""}">
        ${renderItem("/quests/", "Quests")}
        ${renderItem("/art/", "Art")}
        ${renderItem("/music/", "Music")}
      </nav>`;

    const passive = { passive: true };
    window.addEventListener("scroll", debounce(this.#onScroll), passive);
    window.addEventListener("wheel", debounce(this.#onWheel), passive);
    window.addEventListener("mousemove", debounce(this.#onMouseMove, 100), passive);
    window.addEventListener("touchstart", this.#onWindowTouchStart, passive);
    window.addEventListener("touchmove", this.#onWindowTouchMove, passive);
    this.addEventListener("touchstart", this.#onTouchStart, passive);

    if (this.hasAttribute("prehide")) {
      this.#currentY = this.#currentYTarget = -this.offsetHeight;
      this.#updateDOM();
    }
  }

  #getIconSrc() {
    if (this.#isSelected("/stories/")) return "/assets/icons/story.png";
    if (this.#isSelected("/about/")) return "/assets/icons/person.png";
    if (this.#isSelected("/quests/")) return "/assets/icons/quest.png";
    if (this.#isSelected("/art/")) return "/assets/icons/art.png";
    if (this.#isSelected("/music/")) return "/assets/icons/music.png";
    return "/assets/icons/sheet.png";
  }

  #isSelected(href) {
    return href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  }

  #onScroll = (event) => {
    const dy = window.scrollY - this.#lastScrollY;

    this.#currentY -= dy;
    if (this.#currentY > 0) this.#currentY = 0;
    else if (this.#currentY < -this.offsetHeight) this.#currentY = -this.offsetHeight;

    this.#currentYTarget = this.#currentY;
    this.#updateDOM();

    this.#lastScrollY = window.scrollY;
  };

  #onWheel = (event) => {
    const scrollY = window.scrollY;
    setTimeout(() => {
      if (window.scrollY !== scrollY) return;

      let dy = 0;
      switch (event.deltaMode) {
        case WheelEvent.DOM_DELTA_PIXEL:
          dy = event.deltaY;
        case WheelEvent.DOM_DELTA_LINE:
          dy = event.deltaY * 20;
        case WheelEvent.DOM_DELTA_PAGE:
          dy = event.deltaY * window.innerHeight;
      }

      this.#currentYTarget = this.#currentY - event.deltaY;
      if (this.#currentYTarget > 0) {
        this.#currentYTarget = 0;
      } else if (this.#currentYTarget < -this.offsetHeight) {
        this.#currentYTarget = -this.offsetHeight;
      }

      this.#updateDOM();
    }, 100);
  };

  #onMouseMove = (event) => {
    if (this.#isTouch) return;

    const dy = event.clientY - this.#lastCursorY;

    const scaledDy = Math.sign(dy) * Math.log1p(Math.abs(dy)) * 20;
    if (dy < 0 && event.clientY + scaledDy < this.offsetHeight) {
      this.#currentYTarget = 0;
      this.#mouseHovering = true;
    } else if (
      this.#mouseHovering &&
      dy > 0 &&
      event.clientY > this.offsetHeight * 4
    ) {
      this.#currentYTarget = Math.max(-window.scrollY, -this.offsetHeight);
      this.#mouseHovering = false;
    }

    this.#updateDOM();
    this.#lastCursorY = event.clientY;
  };

  #onWindowTouchStart = (event) => {
    this.#isTouch = true;
    this.#lastCursorY = event.touches[0].clientY;
  };

  #onWindowTouchMove = (event) => {
    const dy = event.touches[0].clientY - this.#lastCursorY;

    // move with touch but only if at edge
    if (window.scrollY <= 0 && dy > 0) {
      this.#currentY += dy;
      if (this.#currentY >= 0) {
        this.#currentY = 0;
      }

      this.#currentYTarget = this.#currentY;
      this.#updateDOM();
    }

    this.#lastCursorY = event.touches[0].clientY;
  };

  #onTouchStart(event) {
    this.#currentYTarget = 0;
    this.#updateDOM();
  }


});

customElements.define("site-footer", class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = html`
      <footer class="site-footer-content">
        <div class="footer-main">
          <div class="footer-section">
            <h3>Thanks for visiting</h3>
            <p>Look around and have fun exploring my digital vault.</p>
            <p>I'm a software engineer, designer, and aspiring game developer who loves creating interactive
              experiences.</p>
          </div>

          <div class="footer-section">
            <h3>Quick Links</h3>
            <nav class="footer-nav">
              <a href="/">Home</a>
              <a href="/stories/">Stories</a>
              <a href="/about/">About</a>
              <a href="/art/">Art</a>
              <a href="/music/">Music</a>
            </nav>
          </div>

          <div class="footer-section">
            <h3>Connect</h3>
            <div class="footer-links">
              <a href="https://portfolio-webapp.framer.ai" target="_blank" rel="noopener">Portfolio</a>
              <a href="https://github.com/rahulc0dy" target="_blank" rel="noopener">GitHub</a>
              <a href="mailto:contact@example.com">Email</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Rahul Chakraborty. Built with vanilla web technologies.</p>
          <div class="footer-tech">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
          </div>
        </div>
      </footer>
    `;
  }
});


const appendStyle = (() => {
  const appendedStyles = new Set();

  return (id, htmlCode) => {
    if (appendedStyles.has(id)) return;
    appendedStyles.add(id);

    const styleElement = document.createElement("style");
    const cssCode = htmlCode.slice("<style>".length, -"</style>".length);
    const indent = cssCode.match(/^\n?([ \t]*)/)[1];
    styleElement.textContent =
      "@layer component {\n" + cssCode.replaceAll(indent, "") + "\n}";
    document.head.appendChild(styleElement);
  };
})();

function debounce(fn, ms = 0) {
  let recentlyFired = false;
  return (...args) => {
    if (recentlyFired) return;
    recentlyFired = true;
    if (ms === 0) {
      requestAnimationFrame(() => (recentlyFired = false));
    } else {
      setTimeout(() => (recentlyFired = false), ms);
    }
    return fn(...args);
  };
}


document.addEventListener("DOMContentLoaded", () => {
  setupAutoLoadComponents();
  setupLQIP();
  setupLazyLoading();

  function setupLazyLoading() {
    document.querySelectorAll("img").forEach(img => {
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }
    });
  }

  function setupAutoLoadComponents() {
    const components = [
      ["blog-header"],
      ["blog-footer"],
      ["project-card"],
      ["code-block"],
      ["github-heatmap"],
      ["now-playing"],
      ["last-played"],
    ];

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (let i = components.length - 1; i >= 0; i--) {
              const [tagName, src] = components[i];
              if (entry.target.tagName.toLowerCase() === tagName) {
                import(src ?? `/components/${tagName}/${tagName}.js`);
                components.splice(i, 1);
              }
            }
            intersectionObserver.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: Math.round(window.innerHeight / 2) + "px",
      },
    );

    for (const [tagName] of components) {
      for (const element of document.querySelectorAll(tagName)) {
        intersectionObserver.observe(element);
      }
    }
  }

  function setupLQIP() {
    const removeLQIP = (event) => {
      const tagName = event.target.tagName;
      if (tagName === "IMG") {
        event.target.removeAttribute("loading");
      } else if (tagName === "VIDEO") {
        event.target.removeAttribute("preload");
      }
    };
    document.addEventListener("load", removeLQIP, { capture: true });
    document.addEventListener("canplay", removeLQIP, { capture: true });
  }
});

autoLoadGlobalComponents();

function autoLoadGlobalComponents() {
  if (location.pathname.startsWith("/stories/")) {
    import("components/blog-header/blog-header.js");
  }
}
