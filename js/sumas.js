let ejercicios = [];
let fontSize = 30;
let lista, resultadoFinal;
let temporizador, minutos, segundos;
let canvasData = [];
let canvasGrande, ctxGrande;

function iniciarExamen(){
  const num = parseInt(document.getElementById("numEjercicios").value);
  if(num<15 || num>100){ alert("El número debe estar entre 15 y 100"); return; }

  document.getElementById("inicio").style.display="none";
  document.getElementById("examen").style.display="block";

  lista = document.getElementById("lista-ejercicios");
  resultadoFinal = document.getElementById("resultado-final");
  lista.innerHTML="";
  ejercicios=[]; canvasData=[];
  lista.style.fontSize = fontSize + "px";

  const min = 1, max = 100;
  for(let i=0;i<num;i++){
    const a = Math.floor(Math.random()*(max-min+1))+min;
    const b = Math.floor(Math.random()*(max-min+1))+min;
    ejercicios.push({a,b,resultado:a+b});
    const div = document.createElement("div");
    div.classList.add("ejercicio");
    div.innerHTML = `
      <div class="ejercicio-superior">
        <span class="numero">${i+1}.</span>
        <span class="ecuacion" onclick="abrirCanvasGrande(${i})">${a} + ${b} =</span>
        <input type="number" class="respuesta" id="respuesta${i}" />
      </div>
      <canvas id="canvas${i}"></canvas>
      <span class="solucion-ejercicio" id="solucion${i}"></span>
    `;
    lista.appendChild(div);
    initCanvas(`canvas${i}`);
  }

  // Inicializar canvas grande
  canvasGrande = document.getElementById("canvas-grande");
  ctxGrande = canvasGrande.getContext("2d");
  initCanvasGrande();

  minutos=0; segundos=0;
  clearInterval(temporizador);
  temporizador = setInterval(()=>{ 
    segundos++; 
    if(segundos==60){ segundos=0; minutos++; }
    document.getElementById("contador").textContent=`${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
  },1000);
}

// Ampliar/Reducir texto
function ampliarTexto(){ fontSize+=4; lista.style.fontSize = fontSize+'px'; }
function reducirTexto(){ if(fontSize>10){ fontSize-=4; lista.style.fontSize = fontSize+'px'; } }

// Canvas pequeño
function initCanvas(id){
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  let dibujando=false;
  let lastX=0, lastY=0;

  canvas.addEventListener('pointerdown', e=>{ dibujando=true; lastX=e.offsetX; lastY=e.offsetY; });
  canvas.addEventListener('pointermove', e=>{ if(!dibujando) return; ctx.beginPath(); ctx.moveTo(lastX,lastY); ctx.lineTo(e.offsetX,e.offsetY); ctx.strokeStyle="black"; ctx.lineWidth=2; ctx.stroke(); lastX=e.offsetX; lastY=e.offsetY; });
  canvas.addEventListener('pointerup', ()=>{ dibujando=false; guardarCanvas(id); });
  canvas.addEventListener('pointerout', ()=>{ dibujando=false; guardarCanvas(id); });

  function guardarCanvas(cid){ canvasData[cid]=canvas.toDataURL(); }
}

// Canvas grande (modo Cánovas)
function initCanvasGrande(){
  let dibujando=false, lastX=0, lastY=0;
  canvasGrande.addEventListener('pointerdown', e=>{ dibujando=true; lastX=e.offsetX; lastY=e.offsetY; });
  canvasGrande.addEventListener('pointermove', e=>{ if(!dibujando) return; ctxGrande.beginPath(); ctxGrande.moveTo(lastX,lastY); ctxGrande.lineTo(e.offsetX,e.offsetY); ctxGrande.strokeStyle="black"; ctxGrande.lineWidth=3; ctxGrande.stroke(); lastX=e.offsetX; lastY=e.offsetY; });
  canvasGrande.addEventListener('pointerup', ()=>{ dibujando=false; });
  canvasGrande.addEventListener('pointerout', ()=>{ dibujando=false; });
}

function abrirCanvasGrande(i){
  const c = document.getElementById(`canvas${i}`);
  ctxGrande.clearRect(0,0,canvasGrande.width, canvasGrande.height);
  const img = new Image();
  img.onload = ()=>{ ctxGrande.drawImage(img,0,0,canvasGrande.width,canvasGrande.height); }
  img.src = c.toDataURL();
  document.getElementById("canvas-grande-container").style.display="flex";
}

function cerrarCanvasGrande(){
  document.getElementById("canvas-grande-container").style.display="none";
}

// Finalizar