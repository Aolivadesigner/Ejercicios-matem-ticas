let ejercicios = [];
let fontSize = 30;
let lista, resultadoFinal;
let temporizador, minutos, segundos;
let canvasGrande, ctxGrande;
let canvasActual = null;

function iniciarExamen(){
  const num = parseInt(document.getElementById("numEjercicios").value);
  if(num<15 || num>100){ alert("El número debe estar entre 15 y 100"); return; }

  document.getElementById("inicio").style.display="none";
  document.getElementById("examen").style.display="block";

  lista = document.getElementById("lista-ejercicios");
  resultadoFinal = document.getElementById("resultado-final");
  lista.innerHTML="";
  ejercicios=[];

  const min = 1, max = 100;
  for(let i=0;i<num;i++){
    const a = Math.floor(Math.random()*(max-min+1))+min;
    const b = Math.floor(Math.random()*(max-min+1))+min;
    ejercicios.push({a,b,resultado:a+b});
    const div = document.createElement("div");
    div.classList.add("ejercicio");
    div.style.fontSize = fontSize + "px";
    div.innerHTML = `
      <span class="numero">${i+1}.</span>
      <span class="ecuacion">${a} + ${b} =</span>
      <input type="number" class="respuesta" id="respuesta${i}" />
      <button onclick="abrirCanvasGrande(${i})">📝 Anotar</button>
      <span class="solucion-ejercicio" id="solucion${i}"></span>
    `;
    lista.appendChild(div);
  }

  // Canvas grande modal
  canvasGrande = document.getElementById("canvas-grande");
  ctxGrande = canvasGrande.getContext("2d");
  initCanvasGrande();

  // Contador
  minutos=0; segundos=0;
  clearInterval(temporizador);
  temporizador = setInterval(()=>{ 
    segundos++; 
    if(segundos==60){ segundos=0; minutos++; }
    document.getElementById("contador").textContent=`${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
  },1000);
}

// Ampliar/Reducir texto
function ampliarTexto(){ fontSize+=4; actualizarFontSize(); }
function reducirTexto(){ if(fontSize>10){ fontSize-=4; actualizarFontSize(); } }
function actualizarFontSize(){
  const items = document.querySelectorAll(".ejercicio");
  items.forEach(div => div.style.fontSize = fontSize+"px");
}

// Canvas grande (modo Anotar)
function initCanvasGrande(){
  let dibujando=false, lastX=0, lastY=0;
  canvasGrande.addEventListener('pointerdown', e=>{
    dibujando=true; lastX=e.offsetX; lastY=e.offsetY;
  });
  canvasGrande.addEventListener('pointermove', e=>{
    if(!dibujando) return;
    ctxGrande.beginPath();
    ctxGrande.moveTo(lastX,lastY);
    ctxGrande.lineTo(e.offsetX,e.offsetY);
    ctxGrande.strokeStyle="black";
    ctxGrande.lineWidth=3;
    ctxGrande.stroke();
    lastX=e.offsetX; lastY=e.offsetY;
  });
  canvasGrande.addEventListener('pointerup', ()=>{ dibujando=false; });
  canvasGrande.addEventListener('pointerout', ()=>{ dibujando=false; });
}

// Abrir canvas grande modal
function abrirCanvasGrande(i){
  canvasActual = i;
  ctxGrande.clearRect(0,0,canvasGrande.width, canvasGrande.height);
  document.getElementById("canvas-grande-container").style.display="flex";
}

// Cerrar canvas grande
function cerrarCanvasGrande(){
  document.getElementById("canvas-grande-container").style.display="none";
}

// Finalizar examen
function finalizarExamen(){
  clearInterval(temporizador);
  let correctas = 0;
  ejercicios.forEach((ex,i)=>{
    const val = parseInt(document.getElementById(`respuesta${i}`).value);
    const sol = document.getElementById(`solucion${i}`);
    sol.textContent = ex.resultado;
    if(val===ex.resultado) correctas++;
  });
  resultadoFinal.textContent = `Resultado: ${correctas} de ${ejercicios.length}`;
}

// Volver Home
function volverHome(){
  document.getElementById("examen").style.display="none";
  document.getElementById("inicio").style.display="block";
  resultadoFinal.textContent="";
  clearInterval(temporizador);
}

// Hacer otro examen
function hacerOtroExamen(){
  iniciarExamen();
}