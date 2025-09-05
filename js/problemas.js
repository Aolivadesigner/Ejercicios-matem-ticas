import { numeroAleatorio, limpiarInputResultado, mostrarResultado } from "./utils.js";

let problemaActual;
let intentos = 0;
const maxIntentos = 3;

// Generar un problema narrativo combinando operaciones
function generarProblemaNarrativoCombinado() {
  // Número de operaciones dentro del problema (2 a 4)
  const numOperaciones = numeroAleatorio(2, 4);
  let operaciones = [];
  let resultado = 0;
  let procedimiento = "";
  let enunciado = "En una situación: ";

  for (let i = 0; i < numOperaciones; i++) {
    const opType = ["suma", "resta", "multiplicacion", "division"][numeroAleatorio(0, 3)];
    let num1 = numeroAleatorio(1, 20);
    let num2 = numeroAleatorio(1, 20);
    let opTexto = "";
    let opResultado = 0;

    if (opType === "resta" && num2 > num1) [num1, num2] = [num2, num1];
    if (opType === "division") {
      num2 = numeroAleatorio(1, 10);
      opResultado = numeroAleatorio(1, 10);
      num1 = opResultado * num2;
    }

    switch(opType) {
      case "suma":
        opResultado = num1 + num2;
        opTexto = `${num1} más ${num2}`;
        break;
      case "resta":
        opResultado = num1 - num2;
        opTexto = `${num1} menos ${num2}`;
        break;
      case "multiplicacion":
        opResultado = num1 * num2;
        opTexto = `${num1} por ${num2}`;
        break;
      case "division":
        opResultado = num1 / num2;
        opTexto = `${num1} dividido entre ${num2}`;
        break;
    }

    // Combinamos en el enunciado
    enunciado += `Operación ${i+1}: ${opTexto}. `;
    procedimiento += `Operación ${i+1}: ${opTexto} = ${opResultado}\n`;

    // Para resultado total, sumamos todos los resultados parciales
    resultado += opResultado;
  }

  return { enunciado, resultado, procedimiento };
}

// Generar nueva operación
function nuevaOperacion() {
  problemaActual = generarProblemaNarrativoCombinado();
  document.getElementById("operacion").textContent = problemaActual.enunciado;
  document.getElementById("procedimiento").textContent = "";
  limpiarInputResultado("respuesta", "resultado");
  intentos = 0;
}

// Comprobar respuesta
document.getElementById("btnComprobar").addEventListener("click", () => {
  const respuesta = parseFloat(document.getElementById("respuesta").value);

  if (respuesta === problemaActual.resultado) {
    mostrarResultado("✅ Correcto!", "green");
    document.getElementById("procedimiento").textContent = `Procedimiento:\n${problemaActual.procedimiento}`;
    setTimeout(nuevaOperacion, 5000);
  } else {
    intentos++;
    if (intentos < maxIntentos) {
      mostrarResultado(`❌ Incorrecto. Intento ${intentos} de ${maxIntentos}`, "orange");
    } else {
      mostrarResultado(`❌ Fallaste. La respuesta correcta es ${problemaActual.resultado}`, "red");
      document.getElementById("procedimiento").textContent = `Procedimiento:\n${problemaActual.procedimiento}`;
      setTimeout(nuevaOperacion, 7000);
    }
  }
});

// Botón para nueva operación manual
document.getElementById("btnNuevaOperacion").addEventListener("click", nuevaOperacion);

// Inicial
nuevaOperacion();