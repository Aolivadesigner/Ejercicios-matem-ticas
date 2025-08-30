let ejercicios = [];
let lista, resultadoFinal;
let temporizador, minutos, segundos;
let canvasData = [];

function iniciarExamen(){
  const num = parseInt(document.getElementById("numEjercicios").value);
  if(num < 15 || num > 100){ alert("El número debe estar entre 15 y 100"); return; }

  document.getElementById("inicio").style.display="none";
  document.getElementById("examen").style.display="block";

  lista = document.getElementById("lista-ejercicios");
  resultadoFinal = document.getElementById("resultado-final");
  lista.innerHTML="";
  ejercicios=[];
  canvasData=[];

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
        <span class="ecuacion">${a} + ${b} =</span>
        <input type="number" class="respuesta" id="respuesta${i}" />
      </div>
      <canvas id="canvas${i}"></canvas>
      <span class="solucion-ejercicio" id="solucion${i}"></span>
    `;
    lista.appendChild(div);

    // Inicializar canvas
    initCanvas(`canvas${i}`);
  }

  minutos=0; segundos=0;
  clearInterval(temporizador);
  temporizador = setInterval(()=>{ 
    segundos++; 
    if(segundos==60){ segundos=0; minutos++; }
    document.getElementById("contador").textContent=`${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
  },1000);
}
//ajuste tamaño de texto

function ampliarTexto(){
  let lista = document.getElementById("lista-ejercicios");
  let style = window.getComputedStyle(lista, null).getPropertyValue('font-size');
  let size = parseFloat(style);
  lista.style.fontSize = (size + 4) + "px"; // aumenta 4px
}

function reducirTexto(){
  let lista = document.getElementById("lista-ejercicios");
  let style = window.getComputedStyle(lista, null).getPropertyValue('font-size');
  let size = parseFloat(style);
  if(size > 10) lista.style.fontSize = (size - 4) + "px"; // disminuye 4px
}
// Columna única / multi-columna
function ampliar(){ lista.style.gridTemplateColumns="1fr"; }
function reducir(){ lista.style.gridTemplateColumns=""; }

// Canvas para escribir a mano
function initCanvas(id){
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  let dibujando=false;
  let lastX=0, lastY=0;

  canvas.addEventListener('pointerdown', e=>{ dibujando=true; lastX = e.offsetX; lastY = e.offsetY; });
  canvas.addEventListener('pointermove', e=>{ if(!dibujando) return; ctx.beginPath(); ctx.moveTo(lastX,lastY); ctx.lineTo(e.offsetX,e.offsetY); ctx.strokeStyle="black"; ctx.lineWidth=2; ctx.stroke(); lastX = e.offsetX; lastY = e.offsetY; });
  canvas.addEventListener('pointerup',()=>{ dibujando=false; guardarCanvas(); });
  canvas.addEventListener('pointerout',()=>{ dibujando=false; guardarCanvas(); });

  function guardarCanvas(){ canvasData[id]=canvas.toDataURL(); }
}

// Finalizar examen
function finalizarExamen(){
  clearInterval(temporizador);
  for(let i=0;i<ejercicios.length;i++){
    const val = document.getElementById(`respuesta${i}`).value;
    if(val==""||isNaN(val)){ alert("Completa todos los ejercicios"); return; }
  }

  let aciertos=0;
  ejercicios.forEach((e,i)=>{
    const input = document.getElementById(`respuesta${i}`);
    const span = document.getElementById(`solucion${i}`);
    span.textContent=`= ${e.resultado}`;
    if(parseInt(input.value)===e.resultado) aciertos++;
  });

  resultadoFinal.textContent = `Has acertado ${aciertos} de ${ejercicios.length} (${((aciertos/ejercicios.length)*10).toFixed(1)}/10)`;

  // Datos exportables
  const exportData = ejercicios.map((e,i)=>({
    ejercicio:`${e.a} + ${e.b}`,
    respuesta: document.getElementById(`respuesta${i}`).value,
    solucion: e.resultado,
    dibujo: canvasData[`canvas${i}`] || null
  }));
  console.log(exportData); // aquí podrías enviar por correo o guardar en servidor
}

// Volver Home
function volverHome(){ window.location.href="index.html"; }

// Hacer otro examen
function hacerOtroExamen(){ document.getElementById("examen").style.display="none"; document.getElementById("inicio").style.display="block"; }
