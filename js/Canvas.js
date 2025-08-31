const modal = document.getElementById('modalCanvas');
const canvas = document.getElementById('anotaciones');
const ctx = canvas.getContext('2d');

// Redimensionar canvas
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);

// Dibujar función común
function dibujar(e){
  if(!dibujando) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.fillStyle = config.colorDibujo;
  ctx.beginPath();
  ctx.arc(x, y, config.radio, 0, Math.PI*2);
  ctx.fill();
}

// Eventos mouse
canvas.addEventListener('mousedown', e => { dibujando = true; dibujar(e); });
canvas.addEventListener('mouseup', () => dibujando = false);
canvas.addEventListener('mouseout', () => dibujando = false);
canvas.addEventListener('mousemove', dibujar);

// Eventos touch
canvas.addEventListener('touchstart', e => { dibujando = true; dibujar(e.touches[0]); });
canvas.addEventListener('touchmove', e => { if(dibujando) dibujar(e.touches[0]); e.preventDefault(); });
canvas.addEventListener('touchend', () => dibujando = false);
canvas.addEventListener('touchcancel', () => dibujando = false);

// Botones canvas
document.getElementById("btnCanvas").addEventListener("click", ()=>{
  modal.style.display="flex";
  resizeCanvas();
});
document.getElementById("btnCerrarCanvas").addEventListener("click", ()=> modal.style.display="none");
document.getElementById("btnBorrarCanvas").addEventListener("click", ()=> ctx.clearRect(0,0,canvas.width,canvas.height));
