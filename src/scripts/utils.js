// Open external links in a new tab, site-wide (header, sidebar, content,
// footer). Loaded once from src/components/overrides/Header.astro, which every
// page renders.
document.addEventListener(
  "click",
  function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // closest(): the click often lands on an icon or span inside the link.
    const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (!/^https?:$/.test(url.protocol) || url.hostname === window.location.hostname) return;
    e.preventDefault();
    window.open(url.href, "_blank", "noopener");
  },
  true // Capture phase: runs before other handlers can stop the event.
);
