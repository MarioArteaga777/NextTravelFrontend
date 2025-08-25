// Referencias
const editarBtn = document.getElementById("editarPerfilBtn");
const guardarBtn = document.getElementById("guardarPerfilBtn");
const cancelarBtn = document.getElementById("cancelarPerfilBtn");
const formInputs = document.querySelectorAll("#perfilForm input");

// Al presionar "Editar"
editarBtn.addEventListener("click", () => {
  formInputs.forEach(inp => inp.disabled = false);
  editarBtn.classList.add("oculto");
  guardarBtn.classList.remove("oculto");
  cancelarBtn.classList.remove("oculto");
});

// Al presionar "Cancelar"
cancelarBtn.addEventListener("click", () => {
  formInputs.forEach(inp => inp.disabled = true);
  editarBtn.classList.remove("oculto");
  guardarBtn.classList.add("oculto");
  cancelarBtn.classList.add("oculto");
});

// Al presionar "Guardar cambios"
guardarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formInputs.forEach(inp => inp.disabled = true);
  editarBtn.classList.remove("oculto");
  guardarBtn.classList.add("oculto");
  cancelarBtn.classList.add("oculto");
});
