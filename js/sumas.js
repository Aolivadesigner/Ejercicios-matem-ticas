let num1, num2;

// Generar operación aleatoria
function nuevaOperacion() {
  num1 = Math.floor(Math.random() * 50) + 1;
  num2 = Math.floor(Math.random() * 50) + 1;
  document.getElementById("operacion").textContent = `${num1} + ${num2} = ?`;
  document.getElementById("respuesta").value = "";
  document.getElementById("resultado").textContent = "";
}

// Comprobar respuesta
document.getElementById("btnComprobar").addEventListener("click", function() {
  let respuesta = parseInt(document.getElementById("respuesta").value);
  if(respuesta === num1 + num2){
    document.getElementById("resultado").textContent = "✅ Correcto!";
    document.getElementById("resultado").style.color = "green";
  } else {
    document.getElementById("resultado").textContent = "❌ Intenta otra vez";
    document.getElementById("resultado").style.color = "red";
  }
  setTimeout(nuevaOperacion,1500);
});

// Canvas modal
const modal = document.getElementById('modalCanvas');
const canvas = document.getElementById('anotaciones');
const ctx = canvas.getContext('2d');
let dibujando = false;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);

// Eventos canvas
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

document.getElementById("btnCanvas").addEventListener("click", ()=>{
  modal.style.display="flex";
  resizeCanvas();
});
document.getElementById("btnCerrarCanvas").addEventListener("click", ()=> modal.style.display="none");
document.getElementById("btnBorrarCanvas").addEventListener("click", ()=> ctx.clearRect(0,0,canvas.width,canvas.height));

// Inicial
nuevaOperacion();