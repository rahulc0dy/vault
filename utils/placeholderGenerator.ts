interface PlaceholderProps {
  colors?: { foreground: string; background: string };
  mode?: "dark" | "light";
  dimensions: { width: number; height: number } | number;
  text?: string;
  format?: string; // Optional; default will be SVG if not provided
  font?:
    | "Lato"
    | "Lora"
    | "Montserrat"
    | "Noto Sans"
    | "Open Sans"
    | "Oswald"
    | "Playfair Display"
    | "Poppins"
    | "PT Sans"
    | "Raleway"
    | "Roboto"
    | "Source Sans Pro";
}

export const placeHolder = ({
  colors,
  mode,
  dimensions,
  text,
  format = "svg",
  font,
}: PlaceholderProps): string => {
  // If no colors are provided but a mode is, use defaults.
  if (!colors && mode) {
    colors =
      mode === "dark"
        ? { background: "18181b", foreground: "F0FDFA" } // Dark mode: black bg, white text
        : { background: "F0FDFA", foreground: "18181b" }; // Light mode: white bg, black text
  }

  // Construct the dimensions string.
  let dimensionStr: string;
  if (typeof dimensions === "number") {
    dimensionStr = `${dimensions}`;
  } else {
    dimensionStr = `${dimensions.width}x${dimensions.height}`;
  }

  // Construct the colors part if available.
  let colorPart = "";
  if (colors) {
    // Note: Both background and foreground are required if one is provided.
    colorPart = `/${colors.background}/${colors.foreground}`;
  }

  // Construct the format part.
  // The documentation shows two possibilities:
  // 1. As a path segment: .../600x400/png
  // 2. As a file extension: .../600x400.png
  // We'll use the path segment method (unless the default "svg" is used).
  let formatPart = "";
  if (format && format.toLowerCase() !== "svg") {
    formatPart = `/${format.toLowerCase()}`;
  }

  // Construct the query parameter for text, if provided.
  let query = "";
  if (text) {
    // Spaces become plus signs if desired, but encodeURIComponent is generally safe.

    query = `?text=${encodeURIComponent(text)}`;
  }

  if (font) {
    // The default font is Lato.
    let fontPart = `font=${encodeURIComponent(font)}`;
    if (text) {
      fontPart = "&" + fontPart;
    } else fontPart = "?" + fontPart;

    query += fontPart;
  }

  return `https://placehold.co/${dimensionStr}${colorPart}${formatPart}${query}`;
};
