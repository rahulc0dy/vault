(() => {
  customElements.define(
    "code-block",
    class CodeBlock extends HTMLElement {
      constructor() {
        super();
        this.#init();

        appendStyle(
          this.tagName,
          html`
            <style>
              code-block {
                margin-left: -18px; /* bleed for scroll */
                margin-right: -18px; /* bleed for scroll */
                padding: 0 18px; /* bleed for scroll */
                overflow-x: auto;
                background: #192827;

                & pre {
                  margin: 0;
                }

                & code {
                  display: inline-block;
                  padding: 18px;
                  min-width: 100%;
                  box-sizing: border-box;
                  border-radius: 18px;
                  font-family: "JetBrains Mono", monospace;
                  font-size: 15px;
                  line-height: 1.6;
                  background: var(--overlay-1);
                  white-space: pre;
                }

                &[wraptext] code {
                  white-space: pre-wrap;
                  overflow-wrap: anywhere;
                }


                .token.comment,
                .token.prolog,
                .token.doctype,
                .token.cdata {
                  color: #6272a4;
                }

                .token.punctuation {
                  color: #f8f8f2;
                }

                .namespace {
                  opacity: .7;
                }

                .token.property,
                .token.tag,
                .token.constant,
                .token.symbol,
                .token.deleted {
                  color: #ff79c6;
                }

                .token.boolean,
                .token.number {
                  color: #bd93f9;
                }

                .token.selector,
                .token.attr-name,
                .token.string,
                .token.char,
                .token.builtin,
                .token.inserted {
                  color: #50fa7b;
                }

                .token.operator,
                .token.entity,
                .token.url,
                .language-css .token.string,
                .style .token.string,
                .token.variable {
                  color: #f8f8f2;
                }

                .token.atrule,
                .token.attr-value,
                .token.function,
                .token.class-name {
                  color: #f1fa8c;
                }

                .token.keyword {
                  color: #8be9fd;
                }

                .token.regex,
                .token.important {
                  color: #ffb86c;
                }

                .token.important,
                .token.bold {
                  font-weight: bold;
                }

                .token.italic {
                  font-style: italic;
                }

                .token.entity {
                  cursor: help;
                }

                @media screen and (-ms-high-contrast: active) {
                  .token.important {
                    background: highlight;
                    color: window;
                    font-weight: normal;
                  }

                  .token.atrule,
                  .token.attr-value,
                  .token.function,
                  .token.keyword,
                  .token.operator,
                  .token.selector {
                    font-weight: bold;
                  }

                  .token.attr-value,
                  .token.comment,
                  .token.doctype,
                  .token.function,
                  .token.keyword,
                  .token.operator,
                  .token.property,
                  .token.string {
                    color: highlight;
                  }

                  .token.attr-value,
                  .token.url {
                    font-weight: normal;
                  }
                }
              }
            </style>`,
        );
      }

      async #init() {
        await import("/lib/prism/prism.js");

        const language = this.getAttribute("language") ?? "clike";
        const languageCode = this.getAttribute("languagecode");
        // & > pre > code
        const code = this.firstElementChild?.firstElementChild;

        if (code) {
          code.innerHTML = Prism.highlight(
            code.textContent,
            Prism.languages[language],
            languageCode ?? language,
          );
        }
      }
    },
  );
})();
