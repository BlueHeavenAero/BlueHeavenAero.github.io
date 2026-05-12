/**
 * Edit this file to customize the page. Paths are relative to index.html.
 */
window.SITE_CONFIG = {
  /**
   * Path to your top-left logo image (e.g. assets/logo.png).
   * Leave empty ("") to hide the logo until you have one.
   */
  logoSrc: "assets/logo.png",
  logoAlt: "Blue Heaven Aerospace Corporation",

  /**
   * Main headline. Use either:
   * - titleLines: array of strings (each becomes a line), or
   * - title: one string; use \\n for line breaks
   */
  titleLines: ["B.L.U.E."],
  // title: "Single line\\nSecond line",

  /** Small accent under the title (e.g. SINCE 1975). Empty string hides it. */
  subtitle: "Build, Launch, Upgrade, Evolve",

  /** YouTube video ID only (from youtube.com/watch?v=THIS_PART) */
  youtubeVideoId: "2kinj5IuURQ",

  /** Accent color for subtitle (CSS color). Optional; falls back to CSS default. */
  accentColor: "",

  /**
   * Markdown file shown below the video (fetched at runtime).
   * Use a local static server or GitHub Pages so fetch() can load it.
   */
  markdownSrc: "content.md",

  /**
   * Optional inline markdown if the file cannot be loaded (e.g. offline preview).
   * Usually left empty when using markdownSrc.
   */
  markdownBody: "",
};
