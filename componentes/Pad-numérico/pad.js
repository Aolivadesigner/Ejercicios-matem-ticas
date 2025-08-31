// Función para inicializar el pad en cualquier input
function initPad(targetInputId) {
  const padInput = document.getElementById("padInput");
  const padNumerico = document.getElementById("padNumerico");
  const targetInput = document.getElementById(targetInputId);

  // Limpiar el pad
  padInput.value = "";
  padNumerico.innerHTML = "";

  // Crear botones 1-9
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      padInput.value += i;
      targetInput.value = padInput.value; // Cargar en input de suma
    });
    padNumerico.appendChild(btn);
  }

  // Botón 0
  const btn0 = document.createElement("button");
  btn0.textContent = "0";
  btn0.addEventListener("click", () => {
    padInput.value += "0";
    targetInput.value = padInput.value;
  });
  padNumerico.appendChild(btn0);

  // Botón Borrar
  document.getElementById("padBorrar").addEventListener("click", () => {
    padInput.value = "";
    targetInput.value = "";
  });

  // Botón Enter
  document.getElementById("padEnter").addEventListener("click", () => {
    // Opcional: puedes hacer algo al confirmar
    console.log("Valor ingresado: " + padInput.value);
    targetInput.value = padInput.value;
    padInput.value = "";
  });
}