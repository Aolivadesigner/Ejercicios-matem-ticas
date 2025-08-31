const modal = document.getElementById("canvasModal");
const canvas = document.getElementById("anotaciones");
const ctx = canvas.getContext("2d");

// Variables dibujo
let dibujando = false;
let ultimaX = 0, ultimaY = 0;

// Variables pan/zoom
let scale = 1, offsetX = 0, offsetY = 0;
let lastDist = 0, lastMidX = 0, lastMidY = 0;

// Ajustar tamaño
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Transformación de coordenadas
const tx = x => (x - offsetX)/scale;
const ty = y => (y - offsetY)/scale;

// Dibujar línea
function dibujar(x, y){
  ctx.beginPath();
  ctx.moveTo(ultimaX, ultimaY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.stroke();
  ultimaX = x; ultimaY = y;
}

// Eventos mouse
canvas.addEventListener("mousedown", e => { 
  dibujando = true; 
  ultimaX = tx(e.offsetX); 
  ultimaY = ty(e.offsetY); 
});
canvas.addEventListener("mousemove", e => dibujando && dibujar(tx(e.offsetX), ty(e.offsetY)));
canvas.addEventListener("mouseup", () => dibujando = false);
canvas.addEventListener("mouseout", () => dibujando = false);

// Eventos touch (incluye pinch zoom)
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  if(e.touches.length === 1){
    dibujando = true;
    const rect = canvas.getBoundingClientRect();
    ultimaX = tx(e.touches[0].clientX - rect.left);
    ultimaY = ty(e.touches[0].clientY - rect.top);
  } else if(e.touches.length === 2){
    dibujando = false;
    const t1 = e.touches[0], t2 = e.touches[1];
    lastDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    lastMidX = (t1.clientX + t2.clientX)/2;
    lastMidY = (t1.clientY + t2.clientY)/2;
  }
});
canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  if(e.touches.length === 1 && dibujando){
    const rect = canvas.getBoundingClientRect();
    dibujar(tx(e.touches[0].clientX - rect.left), ty(e.touches[0].clientY - rect.top));
  } else if(e.touches.length === 2){
    const t1 = e.touches[0], t2 = e.touches[1];
    const newDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    const scaleChange = newDist / lastDist;
    scale *= scaleChange;
    lastDist = newDist;
    const midX = (t1.clientX + t2.clientX)/2;
    const midY = (t1.clientY + t2.clientY)/2;
    offsetX += midX - lastMidX;
    offsetY += midY - lastMidY;
    lastMidX = midX; lastMidY = midY;
  }
});
canvas.addEventListener("touchend", e => { if(e.touches.length === 0) dibujando = false; });
canvas.addEventListener("touchcancel", () => dibujando = false);

// Botones
document.getElementById("limpiar").addEventListener("click", ()=>{
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  scale = 1; offsetX = 0; offsetY = 0;
});

document.getElementById("cerrar").addEventListener("click", ()=>{
  modal.style.display = "none";
});

document.getElementById("minimizar").addEventListener("click", ()=>{
  if(canvas.style.display === "none"){
    canvas.style.display = "block";
  } else {
    canvas.style.display = "none";
  }
});

// Guardar imagen
document.getElementById("guardar").addEventListener("click", ()=>{
  const link = document.createElement("a");
  link.download = "pizarra.png";
  link.href = canvas.toDataURL();
  link.click();
});