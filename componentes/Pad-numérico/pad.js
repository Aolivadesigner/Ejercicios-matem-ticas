const padInput = document.getElementById("padInput");
const padNumerico = document.getElementById("padNumerico");

// Crear botones 1-9
for(let i=1; i<=9; i++){
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.addEventListener("click", ()=> padInput.value += i);
  padNumerico.appendChild(btn);
}

// Botón 0
const btn0 = document.createElement("button");
btn0.textContent = "0";
btn0.addEventListener("click", ()=> padInput.value += "0");
padNumerico.appendChild(btn0);

// Botón Borrar
document.getElementById("padBorrar").addEventListener("click", ()=> padInput.value = "");

// Botón Enter
document.getElementById("padEnter").addEventListener("click", ()=> {
  // Aquí puedes enviar el valor al input principal de operaciones
  const valor = padInput.value;
  console.log("Valor ingresado: " + valor);
  padInput.value = "";
});