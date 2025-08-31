function initPad(targetInputId) {
  const container = document.getElementById("padContainer");
  container.innerHTML = ""; // Limpiar

  const targetInput = document.getElementById(targetInputId);

  // Input interno del pad
  const padInput = document.createElement("input");
  padInput.type = "text";
  padInput.id = "padInput";
  padInput.readOnly = true;
  container.appendChild(padInput);

  // Contenedor de botones
  const padNumerico = document.createElement("div");
  padNumerico.id = "padNumerico";
  container.appendChild(padNumerico);

  // Botones 1-9
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      padInput.value += i;
      targetInput.value = padInput.value;
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
  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Borrar";
  btnBorrar.addEventListener("click", () => {
    padInput.value = "";
    targetInput.value = "";
  });
  padNumerico.appendChild(btnBorrar);

  // Botón Enter
  const btnEnter = document.createElement("button");
  btnEnter.textContent = "Enter";
  btnEnter.addEventListener("click", () => {
    targetInput.value = padInput.value;
    padInput.value = "";
  });
  padNumerico.appendChild(btnEnter);
}