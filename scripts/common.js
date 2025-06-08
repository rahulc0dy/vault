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
iconLink.href = "../assets/images/me-icon.png";
document.head.appendChild(iconLink);

const webmentionLink = document.createElement("link");
webmentionLink.rel = "webmention";
webmentionLink.href = "https://portfolio-webapp.framer.ai";
document.head.appendChild(webmentionLink);

const meta = document.createElement("meta");
meta.name = "color-scheme";
meta.content = "only dark";
document.head.appendChild(meta);

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
