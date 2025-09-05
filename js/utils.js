// utils.js
// Este archivo contiene todas las funciones genéricas
// que comparten sumas, restas y multiplicaciones.

/* -------------------------------------------
   1. Generar número aleatorio en un rango
-------------------------------------------- */
export function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* -------------------------------------------
   2. Generar una operación según el tipo
   - tipo puede ser: "suma", "resta", "multiplicacion"
   - rango es el máximo de los números (por defecto 50)
-------------------------------------------- */
export function generarOperacion(tipo, rango = 50) {
  let num1 = numeroAleatorio(1, rango);
  let num2 = numeroAleatorio(1, rango);

  // Evitar negativos en la resta
  if (tipo === "resta" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  let operacionTexto = "";
  let resultado = 0;

  switch (tipo) {
    case "suma":
      operacionTexto = `${num1} + ${num2} = ?`;
      resultado = num1 + num2;
      break;
    case "resta":
      operacionTexto = `${num1} - ${num2} = ?`;
      resultado = num1 - num2;
      break;
    case "multiplicacion":
      operacionTexto = `${num1} × ${num2} = ?`;
      resultado = num1 * num2;
      break;
  }

  return { operacionTexto, resultado };
}

/* -------------------------------------------
   3. Mostrar un mensaje en pantalla
   - texto → mensaje a mostrar
   - color → color del mensaje
-------------------------------------------- */
export function mostrarResultado(texto, color = "black") {
  const salida = document.getElementById("resultado");
  if (!salida) return;
  salida.textContent = texto;
  salida.style.color = color;
}

/* -------------------------------------------
   4. Comprobar respuesta con intentos
   - respuesta → lo que escribió el usuario
   - correcta → la solución correcta
   - intentos → intentos ya usados
   - maxIntentos → máximo permitido (ej: 3)
   - onCorrecto → qué hacer si acierta
   - onFallido → qué hacer si agota intentos
   - tiempoCorrecto → espera antes de nueva operación (ms)
   - tiempoFallido → espera antes de nueva operación si falla
-------------------------------------------- */
export function comprobarRespuesta({
  respuesta,
  correcta,
  intentos,
  maxIntentos,
  onCorrecto,
  onFallido,
  tiempoCorrecto = 15000, // 15 segundos
  tiempoFallido = 20000   // 20 segundos
}) {
  if (respuesta === correcta) {
    mostrarResultado("✅ Correcto!", "green");
    setTimeout(onCorrecto, tiempoCorrecto);
    return { intentos, terminado: true };
  } else {
    intentos++;
    if (intentos < maxIntentos) {
      mostrarResultado(`❌ Incorrecto. Intento ${intentos} de ${maxIntentos}`, "orange");
      return { intentos, terminado: false };
    } else {
      mostrarResultado(`❌ Fallaste. La respuesta correcta era: ${correcta}`, "red");
      setTimeout(onFallido, tiempoFallido);
      return { intentos, terminado: true };
    }
  }
}