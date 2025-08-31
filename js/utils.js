// utils.js

export function toggleIframe(btnId, iframeId) {
  const btn = document.getElementById(btnId);
  const iframe = document.getElementById(iframeId);

  if (!btn || !iframe) return;

  btn.addEventListener("click", () => {
    iframe.style.display =
      iframe.style.display === "none" || iframe.style.display === ""
        ? "block"
        : "none";
  });
}