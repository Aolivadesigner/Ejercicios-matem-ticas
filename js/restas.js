let operacionActual;
let intentos = 0;
const maxIntentos = 3;

function nuevaOperacion() {
  operacionActual = generarOperacion("resta", 50);
  document.getElementById("operacion").textContent = operacionActual.operacion;
  document.getElementById("respuesta").value = "";
  document.getElementById("resultado").textContent = "";
  intentos = 0;
}

document.getElementById("btnComprobar").addEventListener("click", function () {
  let respuesta = parseInt(document.getElementById("respuesta").value);
  let resultado = comprobarRespuesta(
    respuesta,
    operacionActual.resultado,
    intentos,
    maxIntentos,
    nuevaOperacion,
    nuevaOperacion
  );
  intentos = resultado.intentos;
});

// Inicial
nuevaOperacion();