// utils.js
export function toggleIframe(btnId, modalId, closeBtnId) {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  const cerrar = document.getElementById(closeBtnId);

  if (!btn || !modal || !cerrar) return;

  // Abrir modal al hacer click en el botón
  btn.addEventListener("click", () => {
    modal.style.display = "flex";  // modal tipo flex para centrar iframe
  });

  // Cerrar modal
  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });
}