import { comprobarRespuesta, numeroAleatorio, limpiarInputResultado } from "../js/utils.js";

// Variables de la operación
let num1, num2;

// Generar operación aleatoria
function nuevaOperacion() {
  num1 = numeroAleatorio(1, 50);
  num2 = numeroAleatorio(1, 50);
  document.getElementById("operacion").textContent = `${num1} + ${num2} = ?`;
  limpiarInputResultado("respuesta", "resultado");
}

// Comprobar respuesta
document.getElementById("btnComprobar").addEventListener("click", function() {
  const respuesta = parseInt(document.getElementById("respuesta").value);
  comprobarRespuesta(respuesta, num1 + num2, "resultado");
  setTimeout(nuevaOperacion, 1500);
});

// Inicial
nuevaOperacion();