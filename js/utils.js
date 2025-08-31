// utils.js

// Genera un número aleatorio entre min y max (inclusive)
export function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Limpia el input y el resultado
export function limpiarInputResultado(inputId, resultadoId) {
  const input = document.getElementById(inputId);
  const resultado = document.getElementById(resultadoId);
  if(input) input.value = "";
  if(resultado) {
    resultado.textContent = "";
    resultado.style.color = "black";
  }
}

// Comprueba la respuesta y muestra si es correcta o incorrecta
// Además opcional: mostrar la respuesta correcta
export function comprobarRespuesta(valorUsuario, valorCorrecto, resultadoId, mostrarCorrecta = true) {
  const resultado = document.getElementById(resultadoId);
  if(!resultado) return;

  if(valorUsuario === valorCorrecto) {
    resultado.textContent = "✅ Correcto!";
    resultado.style.color = "green";
  } else {
    let texto = "❌ Intenta otra vez";
    if(mostrarCorrecta) texto += ` (Respuesta correcta: ${valorCorrecto})`;
    resultado.textContent = texto;
    resultado.style.color = "red";
  }
}

// Función auxiliar para generar operaciones básicas
export function nuevaOperacion(operador, min = 1, max = 50) {
  const num1 = numeroAleatorio(min, max);
  const num2 = numeroAleatorio(min, max);
  const simbolo = operador;
  const operacionTexto = `${num1} ${simbolo} ${num2} = ?`;
  const operacionDiv = document.getElementById("operacion");
  if(operacionDiv) operacionDiv.textContent = operacionTexto;

  limpiarInputResultado("respuesta", "resultado");

  // Devuelve también los números y la operación para usarla en el comprobador
  return { num1, num2, operador };
}