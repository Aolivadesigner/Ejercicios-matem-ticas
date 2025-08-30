// Generar operación aleatoria
function nuevaOperacion() {
  num1 = Math.floor(Math.random() * 50) + 1;
  num2 = Math.floor(Math.random() * 50) + 1;
  document.getElementById("operacion").textContent = `${num1} + ${num2} = ?`;
  document.getElementById("respuesta").value = "";
  document.getElementById("resultado").textContent = "";
}