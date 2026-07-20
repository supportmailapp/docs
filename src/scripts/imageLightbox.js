// Click any <img> inside an ImageWrapper to open it full-size in a <dialog>.
// Dialog element is created on demand and appended to <body>, outside the
// normal component tree, since it needs to escape ImageWrapper's overflow-clip.
let dialog;

function getDialog() {
  if (dialog) return dialog;

  dialog = document.createElement("dialog");
  dialog.id = "image-lightbox";

  const figure = document.createElement("figure");
  figure.id = "image-lightbox-figure";

  const img = document.createElement("img");
  img.id = "image-lightbox-img";
  figure.appendChild(img);

  const caption = document.createElement("figcaption");
  caption.id = "image-lightbox-caption";
  figure.appendChild(caption);

  dialog.appendChild(figure);

  Object.assign(dialog.style, {
    position: "fixed",
    inset: "0",
    margin: "auto",
    padding: "0",
    border: "none",
    background: "transparent",
    width: "fit-content",
    height: "fit-content",
    maxWidth: "100vw",
    maxHeight: "100vh",
  });
  Object.assign(figure.style, {
    margin: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    maxWidth: "100vw",
    maxHeight: "100vh",
  });
  Object.assign(img.style, {
    display: "block",
    width: "auto",
    height: "auto",
    maxWidth: "100vw",
    maxHeight: "calc(100vh - 3rem)",
    objectFit: "contain",
  });
  Object.assign(caption.style, {
    color: "white",
    textAlign: "center",
    fontSize: "0.875rem",
  });

  // Click anywhere except the caption text closes the dialog.
  dialog.addEventListener("click", (event) => {
    if (event.target === caption) return;
    dialog.close();
  });

  document.body.appendChild(dialog);
  return dialog;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    !(target instanceof HTMLElement) ||
    target.tagName.toLowerCase() !== "img"
  )
    return;

  const wrapper = target.closest('[data-type="image-wrapper"]');
  if (!wrapper) return;

  const dlg = getDialog();
  const dlgImg = dlg.querySelector("img");
  const dlgCaption = dlg.querySelector("figcaption");
  dlgImg.src = target.currentSrc || target.src;
  dlgImg.alt = target.alt;
  dlgCaption.textContent = target.alt;
  dlgCaption.style.display = target.alt ? "block" : "none";
  dlg.showModal();
});
