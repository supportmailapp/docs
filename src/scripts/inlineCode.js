// Global click listener to handle clicks on inline code blocks with copy-to-clipboard functionality.
// Inline means <p>... <code class="code">...</code> ...</p>
document.addEventListener("click", (event) => {
  const target = event.target;
  console.log("Clicked element:", target);
  if (
    target instanceof HTMLElement &&
    target.tagName.toLowerCase() === "code" &&
    target.dir === "auto"
  ) {
    console.log(Date.now(), "Copying code to clipboard:", target.textContent);
    navigator.clipboard.writeText(target.textContent || "");
    alert("Code copied to clipboard!");
  }
});
