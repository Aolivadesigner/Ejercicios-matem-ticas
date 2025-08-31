// pad.js - Pad numérico para operaciones
document.addEventListener("DOMContentLoaded", () => {
  const padContainer = document.getElementById("padNumerico");
  let inputActivo = null;

  // Detectar el input activo
  document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener("focus", () => {
      inputActivo = input;
    });
  });

  // Crear botones del pad
  const numeros = [
    "1","2","3",
    "4","5","6",
    "7","8","9",
    "0"
  ];

  numeros.forEach(n => {
    const btn = document.createElement("button");
    btn.textContent = n;
    btn.className = "padBtn";
    btn.addEventListener("click", () => {
      if(inputActivo) inputActivo.value += n;
    });
    padContainer.appendChild(btn);
  });

  // Botón borrar
  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "⌫";
  btnBorrar.className = "padBtn borrar";
  btnBorrar.addEventListener("click", () => {
    if(inputActivo) inputActivo.value = inputActivo.value.slice(0, -1);
  });
  padContainer.appendChild(btnBorrar);

  // Botón limpiar
  const btnLimpiar = document.createElement("button");
  btnLimpiar.textContent = "C";
  btnLimpiar.className = "padBtn limpiar";
  btnLimpiar.addEventListener("click", () => {
    if(inputActivo) inputActivo.value = "";
  });
  padContainer.appendChild(btnLimpiar);
});
