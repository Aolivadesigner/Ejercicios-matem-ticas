let num1, num2;

// Generar operación aleatoria
function nuevaOperacion() {
  num1 = Math.floor(Math.random() * 50) + 1;
  num2 = Math.floor(Math.random() * 50) + 1;
  // Asegurarnos de no tener resultado negativo
  if(num2 > num1){
    [num1, num2] = [num2, num1];
  }
  document.getElementById("operacion").textContent = `${num1} - ${num2} = ?`;
  document.getElementById("respuesta").value = "";
  document.getElementById("resultado").textContent = "";
}

// Comprobar respuesta
document.getElementById("btnComprobar").addEventListener("click", function() {
  let respuesta = parseInt(document.getElementById("respuesta").value);
  if(respuesta === num1 - num2){
    document.getElementById("resultado").textContent = "✅ Correcto!";
    document.getElementById("resultado").style.color = "green";
  } else {
    document.getElementById("resultado").textContent = "❌ Intenta otra vez";
    document.getElementById("resultado").style.color = "red";
  }
  setTimeout(nuevaOperacion,1500);
});

// Inicial
nuevaOperacion();