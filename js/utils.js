// ===============================
// utils.js
// Funciones genéricas para toda la app de ejercicios de matemáticas
// ===============================

/* -------------------------------------------
1. Generar número aleatorio
-------------------------------------------- */
export function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* -------------------------------------------
2. Limpiar input y resultado
-------------------------------------------- */
export function limpiarInputResultado(inputId, resultadoId) {
  const input = document.getElementById(inputId);
  const resultado = document.getElementById(resultadoId);
  if (input) input.value = "";
  if (resultado) {
    resultado.textContent = "";
    resultado.style.color = "black";
  }
}

/* -------------------------------------------
3. Mostrar mensaje en pantalla
-------------------------------------------- */
export function mostrarResultado(texto, color = "black") {
  const salida = document.getElementById("resultado");
  if (!salida) return;
  salida.textContent = texto;
  salida.style.color = color;
}

/* -------------------------------------------
4. Generar problema (numérico o narrativo)
-------------------------------------------- */
export function generarProblema({
  tipo,
  rangoMax = 50,
  narrativo = false,
  divisionRango = { dividendo: 999, divisor: 99 }
}) {
  let num1, num2, resultado, operacionTexto, procedimiento;

  if (!narrativo) {
    // Operaciones básicas numéricas
    switch (tipo) {
      case "suma":
        num1 = numeroAleatorio(1, rangoMax);
        num2 = numeroAleatorio(1, rangoMax);
        resultado = num1 + num2;
        operacionTexto = `${num1} + ${num2} = ?`;
        procedimiento = `${num1} + ${num2} = ${resultado}`;
        break;

      case "resta":
        num1 = numeroAleatorio(1, rangoMax);
        num2 = numeroAleatorio(1, rangoMax);
        if (num2 > num1) [num1, num2] = [num2, num1];
        resultado = num1 - num2;
        operacionTexto = `${num1} - ${num2} = ?`;
        procedimiento = `${num1} - ${num2} = ${resultado}`;
        break;

      case "multiplicacion":
        num1 = numeroAleatorio(1, rangoMax);
        num2 = numeroAleatorio(1, rangoMax);
        resultado = num1 * num2;
        operacionTexto = `${num1} × ${num2} = ?`;
        procedimiento = `${num1} × ${num2} = ${resultado}`;
        break;

      case "division":
        num2 = numeroAleatorio(1, divisionRango.divisor);
        resultado = numeroAleatorio(1, Math.floor(divisionRango.dividendo / num2));
        num1 = resultado * num2;
        operacionTexto = `${num1} ÷ ${num2} = ?`;
        procedimiento = `${num1} ÷ ${num2} = ${resultado}`;
        break;

      case "fraccion":
        num1 = numeroAleatorio(1, rangoMax);
        num2 = numeroAleatorio(1, rangoMax);
        resultado = num1 / num2;
        operacionTexto = `${num1} / ${num2} = ? (decimal o fracción simplificada)`;
        procedimiento = `${num1} ÷ ${num2} = ${resultado}`;
        break;

      case "porcentaje":
        num1 = numeroAleatorio(1, 200);
        num2 = numeroAleatorio(1, 100);
        resultado = (num1 * num2) / 100;
        operacionTexto = `¿Cuál es el ${num2}% de ${num1}?`;
        procedimiento = `${num2}% de ${num1} = ${resultado}`;
        break;

      case "algebra":
        num1 = numeroAleatorio(1, 20);
        num2 = numeroAleatorio(1, 20);
        resultado = num2; // incógnita x
        operacionTexto = `Resuelve x: ${num1} + x = ${num1 + num2}`;
        procedimiento = `x = (${num1 + num2}) - ${num1} = ${resultado}`;
        break;
    }
  } else {
    // Problema narrativo
    switch (tipo) {
      case "suma":
        num1 = numeroAleatorio(1, rangoMax);
        num2 = numeroAleatorio(1, rangoMax);
        resultado = num1 + num2;
        operacionTexto = `Juan tenía ${num1} manzanas y compró ${num2} más. ¿Cuántas tiene en total?`;
        procedimiento = `${num1} + ${num2} = ${resultado}`;
        break;

      case "resta":
        num1 = numeroAleatorio(1, rangoMax);
        num2 = numeroAleatorio(1, num1);
        resultado = num1 - num2;
        operacionTexto = `María tenía ${num1} caramelos y se comió ${num2}. ¿Cuántos le quedan?`;
        procedimiento = `${num1} - ${num2} = ${resultado}`;
        break;

      case "multiplicacion":
        num1 = numeroAleatorio(1, 12);
        num2 = numeroAleatorio(1, 12);
        resultado = num1 * num2;
        operacionTexto = `Si una caja tiene ${num1} lápices y hay ${num2} cajas, ¿cuántos lápices hay en total?`;
        procedimiento = `${num1} × ${num2} = ${resultado}`;
        break;

      case "division":
        num2 = numeroAleatorio(1, 12);
        resultado = numeroAleatorio(1, 12);
        num1 = resultado * num2;
        operacionTexto = `Si hay ${num1} galletas y se reparten entre ${num2} niños, ¿cuántas galletas recibe cada uno?`;
        procedimiento = `${num1} ÷ ${num2} = ${resultado}`;
        break;

      case "fraccion":
        num1 = numeroAleatorio(1, 20);
        num2 = numeroAleatorio(1, 20);
        resultado = num1 / num2;
        operacionTexto = `De un pastel, se comen ${num1} de ${num2} partes. ¿Qué fracción del pastel queda?`;
        procedimiento = `${num1} ÷ ${num2} = ${resultado}`;
        break;

      case "porcentaje":
        num1 = numeroAleatorio(1, 200);
        num2 = numeroAleatorio(1, 100);
        resultado = (num1 * num2) / 100;
        operacionTexto = `De ${num1} alumnos, el ${num2}% aprobó el examen. ¿Cuántos aprobaron?`;
        procedimiento = `${num2}% de ${num1} = ${resultado}`;
        break;

      case "algebra":
        num1 = numeroAleatorio(1, 20);
        num2 = numeroAleatorio(1, 20);
        resultado = num2; // x
        operacionTexto = `En una bolsa hay ${num1} caramelos. Se agregan algunos más y ahora hay ${num1 + num2}. ¿Cuántos caramelos se agregaron?`;
        procedimiento = `x = (${num1 + num2}) - ${num1} = ${resultado}`;
        break;
    }
  }

  return { operacionTexto, resultado, procedimiento };
}

/* -------------------------------------------
5. Comprobar respuesta con intentos y tiempos
-------------------------------------------- */
export function comprobarRespuesta({
  respuesta,
  correcta,
  intentos,
  maxIntentos = 3,
  onCorrecto,
  onFallido,
  tiempoCorrecto = 15000,
  tiempoFallido = 20000
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