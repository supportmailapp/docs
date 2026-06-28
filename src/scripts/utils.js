// Intercept and handle external links
document.addEventListener(
  "click",
  function (e) {
    if (!window) return;
    const target = e.target;
    if (target instanceof HTMLElement && target.tagName === "A" && !target.href.includes(window.location.hostname)) {
      e.preventDefault();
      window.open(target.href, "_blank", "noopener");
    }
  },
  true // Important, use capture phase events propagate from the window down to the target element before bubbling begins
);
