export function initPad(targetInputId) {
  const targetInput = document.getElementById(targetInputId);
  const padContainer = document.getElementById("padContainer");

  // Mostrar pad al hacer focus
  targetInput.addEventListener("focus", () => padContainer.style.display = "block");
  // Ocultar pad al perder focus con pequeño delay
  targetInput.addEventListener("blur", () => {
    setTimeout(() => padContainer.style.display = "none", 200);
  });

  // Limpiar y crear elementos
  padContainer.innerHTML = "";

  const padInput = document.createElement("input");
  padInput.type = "text";
  padInput.id = "padInput";
  padInput.readOnly = true;
  padContainer.appendChild(padInput);

  const padNumerico = document.createElement("div");
  padNumerico.id = "padNumerico";
  padContainer.appendChild(padNumerico);

  // Crear botones 1-9
  for(let i = 1; i <= 9; i++){
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
  btnBorrar.classList.add("special");
  btnBorrar.addEventListener("click", () => {
    padInput.value = "";
    targetInput.value = "";
  });
  padNumerico.appendChild(btnBorrar);

  // Botón Enter
  const btnEnter = document.createElement("button");
  btnEnter.textContent = "Enter";
  btnEnter.classList.add("special");
  btnEnter.addEventListener("click", () => {
    targetInput.value = padInput.value;
    padInput.value = "";
  });
  padNumerico.appendChild(btnEnter);
}