import { comprobarRespuesta, limpiarInputResultado, nuevaOperacion } from "../js/utils.js";

let operacion;

// Generar operación de suma
function generarSuma() {
  operacion = nuevaOperacion("+", 1, 50);
}

// Comprobar respuesta
document.getElementById("btnComprobar").addEventListener("click", function() {
  const respuesta = parseInt(document.getElementById("respuesta").value);
  const correcto = eval(`${operacion.num1} ${operacion.operador} ${operacion.num2}`);
  comprobarRespuesta(respuesta, correcto, "resultado");
  setTimeout(generarSuma, 1500);
});

// Inicial
generarSuma();