const operacionEl = document.getElementById("operacion");
const respuestaEl = document.getElementById("respuesta");
const btnComprobar = document.getElementById("btnComprobar");
const resultadoEl = document.getElementById("resultado");

let a, b;

// Generar nueva división
function nuevaDivision() {
  a = Math.floor(Math.random() * 100) + 1;  // dividendo
  b = Math.floor(Math.random() * 10) + 1;   // divisor
  operacionEl.textContent = `${a} ÷ ${b} = ?`;
  respuestaEl.value = "";
  resultadoEl.textContent = "";
}

// Comprobar respuesta
btnComprobar.addEventListener("click", () => {
  const respuesta = parseFloat(respuestaEl.value);
  if (respuesta === a / b) {
    resultadoEl.textContent = "✅ Correcto";
    resultadoEl.style.color = "green";
  } else {
    resultadoEl.textContent = `❌ Incorrecto, la respuesta es ${a / b}`;
    resultadoEl.style.color = "red";
  }
  nuevaDivision();
});

// Inicialización
nuevaDivision();