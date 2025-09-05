// ===============================
// 🔢 Funciones básicas
// ===============================

// Genera un número aleatorio entre min y max (inclusive)
export function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===============================
// 🧹 Manejo de interfaz
// ===============================

// Limpia el input y el resultado
export function limpiarInputResultado(inputId, resultadoId) {
  const input = document.getElementById(inputId);
  const resultado = document.getElementById(resultadoId);

  if (input) input.value = "";
  if (resultado) {
    resultado.textContent = "";
    resultado.style.color = "black";
  }
}

// ===============================
// ✅ Comprobación simple
// ===============================

// Comprueba la respuesta y muestra si es correcta o incorrecta
// Además opcional: mostrar la respuesta correcta
export function comprobarRespuesta(
  valorUsuario,
  valorCorrecto,
  resultadoId,
  mostrarCorrecta = true
) {
  const resultado = document.getElementById(resultadoId);
  if (!resultado) return;

  if (valorUsuario === valorCorrecto) {
    resultado.textContent = "✅ Correcto!";
    resultado.style.color = "green";
  } else {
    let texto = "❌ Intenta otra vez";
    if (mostrarCorrecta) texto += ` (Respuesta correcta: ${valorCorrecto})`;
    resultado.textContent = texto;
    resultado.style.color = "red";
  }
}

// ===============================
// ➕ Generador de operaciones
// ===============================

// Genera una operación básica con un operador dado
export function nuevaOperacion(operador, min = 1, max = 50) {
  const num1 = numeroAleatorio(min, max);
  const num2 = numeroAleatorio(min, max);

  const operacionTexto = `${num1} ${operador} ${num2} = ?`;
  const operacionDiv = document.getElementById("operacion");
  if (operacionDiv) operacionDiv.textContent = operacionTexto;

  limpiarInputResultado("respuesta", "resultado");

  // Devuelve los datos para usarlos en el comprobador
  return { num1, num2, operador };
}

// ===============================
// 🎯 Comprobación con intentos y espera
// ===============================

// Controla intentos (máx. 3, configurable) y tiempos de espera
export function comprobarConIntentos({
  valorUsuario,
  valorCorrecto,
  resultadoId,
  onCorrecto,
  onAgotado,
  intentosRestantes,
  setIntentosRestantes,
  tiempoCorrecto = 15000, // 15 segundos
  tiempoFallido = 20000   // 20 segundos
}) {
  const resultado = document.getElementById(resultadoId);
  if (!resultado) return;

  if (valorUsuario === valorCorrecto) {
    resultado.textContent = "✅ Correcto!";
    resultado.style.color = "green";
    setTimeout(onCorrecto, tiempoCorrecto);
    return true;
  } else {
    intentosRestantes--;
    setIntentosRestantes(intentosRestantes);

    if (intentosRestantes > 0) {
      resultado.textContent = `❌ Incorrecto. Te quedan ${intentosRestantes} intentos.`;
      resultado.style.color = "orange";
    } else {
      resultado.textContent = `❌ Fallaste. La respuesta correcta era: ${valorCorrecto}`;
      resultado.style.color = "red";
      setTimeout(onAgotado, tiempoFallido);
    }
    return false;
  }
}