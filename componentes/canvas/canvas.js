const canvas = document.getElementById("pizarra");
const ctx = canvas.getContext("2d");

let dibujando = false;
let x = 0, y = 0;

// Ajustar tamaño dinámico
function ajustarCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", ajustarCanvas);
ajustarCanvas();

// Dibujar
canvas.addEventListener("mousedown", e => {
  dibujando = true;
  [x, y] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", e => {
  if (!dibujando) return;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [x, y] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => dibujando = false);
canvas.addEventListener("mouseleave", () => dibujando = false);

// Limpiar
document.getElementById("limpiar").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Guardar como imagen
document.getElementById("guardar").addEventListener("click", () => {
  const enlace = document.createElement("a");
  enlace.download = "pizarra.png";
  enlace.href = canvas.toDataURL();
  enlace.click();
});

// Minimizar
document.getElementById("minimizar").addEventListener("click", () => {
  canvas.style.display = (canvas.style.display === "none") ? "block" : "none";
});

// Cerrar
document.getElementById("cerrar").addEventListener("click", () => {
  document.querySelector(".canvas-container").style.display = "none";
});