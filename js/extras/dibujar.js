// Dibujar con mouse
canvas.addEventListener('mousedown', e => { dibujando = true; dibujar(e); });
canvas.addEventListener('mouseup', () => dibujando = false);
canvas.addEventListener('mouseout', () => dibujando = false);
canvas.addEventListener('mousemove', dibujar);

// Dibujar con touch
canvas.addEventListener('touchstart', e => {
  dibujando = true;
  dibujar(e.touches[0]);  // usamos el primer toque
});
canvas.addEventListener('touchmove', e => {
  if(!dibujando) return;
  dibujar(e.touches[0]);
  e.preventDefault(); // evita que la página se desplace
});
canvas.addEventListener('touchend', () => dibujando = false);
canvas.addEventListener('touchcancel', () => dibujando = false);

// Función dibujar
function dibujar(e){
  if(!dibujando) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI*2);
  ctx.fill();
}