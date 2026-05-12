(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) {
    console.error("SITE_CONFIG is missing. Ensure site-config.js loads before main.js.");
    return;
  }

  const logoEl = document.getElementById("logo");
  const logoLink = document.querySelector(".logo-link");
  const siteHeader = document.getElementById("site-header");
  const titleEl = document.getElementById("hero-title");
  const subtitleEl = document.getElementById("hero-subtitle");
  const iframeEl = document.getElementById("video-embed");
  const videoFrame = document.getElementById("video-frame");
  const videoPlaceholder = document.getElementById("video-placeholder");
  const contentEl = document.getElementById("content");

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const logoSrc = typeof cfg.logoSrc === "string" ? cfg.logoSrc.trim() : "";
  if (logoSrc) {
    logoLink.hidden = false;
    siteHeader.classList.remove("site-header--compact");
    logoEl.src = logoSrc;
    logoEl.alt = cfg.logoAlt || "";
    logoEl.onerror = function () {
      logoLink.hidden = true;
      logoEl.removeAttribute("src");
      siteHeader.classList.add("site-header--compact");
    };
  } else {
    logoLink.hidden = true;
    logoEl.removeAttribute("src");
    logoEl.alt = "";
    siteHeader.classList.add("site-header--compact");
  }

  const lines = Array.isArray(cfg.titleLines)
    ? cfg.titleLines
    : typeof cfg.title === "string"
      ? cfg.title
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  titleEl.textContent = "";
  lines.forEach((line) => {
    const span = document.createElement("span");
    span.className = "line";
    span.textContent = line;
    titleEl.appendChild(span);
  });

  const sub = typeof cfg.subtitle === "string" ? cfg.subtitle.trim() : "";
  if (sub) {
    subtitleEl.textContent = sub;
    subtitleEl.hidden = false;
  } else {
    subtitleEl.hidden = true;
  }

  if (cfg.accentColor && typeof cfg.accentColor === "string" && cfg.accentColor.trim()) {
    document.documentElement.style.setProperty("--accent", cfg.accentColor.trim());
  }

  const id = typeof cfg.youtubeVideoId === "string" ? cfg.youtubeVideoId.trim() : "";
  if (id && /^[\w-]{11}$/.test(id)) {
    iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
    iframeEl.title = cfg.videoTitle || "Featured YouTube video";
    videoFrame.hidden = false;
    videoPlaceholder.hidden = true;
  } else {
    videoFrame.hidden = true;
    videoPlaceholder.hidden = false;
  }

  function renderMarkdown(md) {
    const text = typeof md === "string" ? md : "";
    if (typeof marked !== "undefined" && marked.parse) {
      contentEl.innerHTML = marked.parse(text);
    } else {
      contentEl.textContent = text;
    }
  }

  const mdSrc = typeof cfg.markdownSrc === "string" ? cfg.markdownSrc.trim() : "";
  const inlineMd = typeof cfg.markdownBody === "string" ? cfg.markdownBody : "";

  if (!mdSrc) {
    renderMarkdown(inlineMd);
    return;
  }

  const url = new URL(mdSrc, window.location.href);
  fetch(url.href)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.text();
    })
    .then((text) => {
      renderMarkdown(text);
    })
    .catch(() => {
      if (inlineMd.trim()) {
        renderMarkdown(inlineMd);
      } else {
        contentEl.innerHTML =
          "<p>Could not load <code>" +
          escapeHtml(mdSrc) +
          "</code>. Use a local server (e.g. <code>npx serve .</code>) or set <code>markdownBody</code> in <code>site-config.js</code> as a fallback.</p>";
      }
    });
})();
