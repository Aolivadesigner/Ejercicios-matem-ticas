const modal = document.getElementById('modalCanvas');
const canvas = document.getElementById('anotaciones');
const ctx = canvas.getContext('2d');

let dibujando = false;
let ultimaX = 0;
let ultimaY = 0;

let scale = 1, offsetX = 0, offsetY = 0;
let lastDist = 0, lastMidX = 0, lastMidY = 0;

// Ajuste tamaño canvas según contenedor
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);

// Transformar coordenadas
const transformarX = x => (x - offsetX)/scale;
const transformarY = y => (y - offsetY)/scale;

// Dibujar línea
function dibujar(e) {
  if(!dibujando) return;
  const rect = canvas.getBoundingClientRect();
  const x = transformarX(e.clientX - rect.left);
  const y = transformarY(e.clientY - rect.top);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(ultimaX, ultimaY);
  ctx.lineTo(x, y);
  ctx.stroke();

  ultimaX = x;
  ultimaY = y;
}

// Mouse events
canvas.addEventListener('mousedown', e => { 
  dibujando = true; 
  ultimaX = transformarX(e.offsetX); 
  ultimaY = transformarY(e.offsetY); 
});
canvas.addEventListener('mouseup', () => dibujando = false);
canvas.addEventListener('mouseout', () => dibujando = false);
canvas.addEventListener('mousemove', dibujar);

// Touch events (dibujar y zoom)
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  if(e.touches.length === 1){
    dibujando = true;
    const rect = canvas.getBoundingClientRect();
    ultimaX = transformarX(e.touches[0].clientX - rect.left);
    ultimaY = transformarY(e.touches[0].clientY - rect.top);
  } else if(e.touches.length === 2){
    dibujando = false;
    const [t1, t2] = e.touches;
    lastDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    lastMidX = (t1.clientX + t2.clientX)/2;
    lastMidY = (t1.clientY + t2.clientY)/2;
  }
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if(e.touches.length === 1 && dibujando){
    dibujar(e.touches[0]);
  } else if(e.touches.length === 2){
    const [t1, t2] = e.touches;
    const newDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    const scaleChange = newDist / lastDist;
    scale *= scaleChange;
    lastDist = newDist;

    const midX = (t1.clientX + t2.clientX)/2;
    const midY = (t1.clientY + t2.clientY)/2;
    offsetX += midX - lastMidX;
    offsetY += midY - lastMidY;
    lastMidX = midX;
    lastMidY = midY;
  }
});

canvas.addEventListener('touchend', e => { if(e.touches.length === 0) dibujando = false; });
canvas.addEventListener('touchcancel', () => dibujando = false);

// Botones
document.getElementById("btnCanvas").addEventListener("click", () => {
  modal.style.display = "flex";
  resizeCanvas();
});

document.getElementById("btnCerrarCanvas").addEventListener("click", () => modal.style.display = "none");

document.getElementById("btnBorrarCanvas").addEventListener("click", () => {
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  scale = 1; offsetX = 0; offsetY = 0;
});