import { nuevaOperacion, comprobarConIntentos, mostrarResultado, } from "../js/utils.js";

let operacion;
let intentosRestantes;

function generarSuma() {
  operacion = nuevaOperacion("+", 1, 50);
  intentosRestantes = 3;
}

document.getElementById("btnComprobar").addEventListener("click", function() {
  const respuesta = parseInt(document.getElementById("respuesta").value);
  const correcto = eval(`${operacion.num1} ${operacion.operador} ${operacion.num2}`);

  comprobarConIntentos({
    valorUsuario: respuesta,
    valorCorrecto: correcto,
    resultadoId: "resultado",
    onCorrecto: generarSuma,   // qué pasa si acierta
    onAgotado: generarSuma,    // qué pasa si gasta intentos
    intentosRestantes,
    setIntentosRestantes: (n) => intentosRestantes = n,
    tiempoCorrecto: 15000,  // se puede ajustar
    tiempoFallido: 20000
  });
});

// Inicial
generarSuma();