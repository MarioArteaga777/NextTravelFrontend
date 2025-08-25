const editarBtn = document.getElementById("editarPerfilBtn");
const guardarBtn = document.getElementById("guardarPerfilBtn");
const cancelarBtn = document.getElementById("cancelarPerfilBtn");
const formInputs = document.querySelectorAll("#perfilForm input");

let valoresOriginales = {};

// Habilitar edición
editarBtn.addEventListener("click", () => {
  valoresOriginales = {};
  formInputs.forEach(inp => {
    valoresOriginales[inp.id] = inp.value;
    inp.disabled = false;
  });
  editarBtn.classList.add("oculto");
  guardarBtn.classList.remove("oculto");
  cancelarBtn.classList.remove("oculto");
});

// Cancelar edición
cancelarBtn.addEventListener("click", () => {
  formInputs.forEach(inp => {
    inp.value = valoresOriginales[inp.id];
    inp.disabled = true;
  });
  editarBtn.classList.remove("oculto");
  guardarBtn.classList.add("oculto");
  cancelarBtn.classList.add("oculto");
});

// Guardar cambios
guardarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formInputs.forEach(inp => inp.disabled = true);
  editarBtn.classList.remove("oculto");
  guardarBtn.classList.add("oculto");
  cancelarBtn.classList.add("oculto");

  // Vista previa de imagen
  const fileInput = document.getElementById("formImagen");
  const fotoPerfil = document.getElementById("perfilFoto");
  if (fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoPerfil.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }

  alert("✅ Cambios guardados correctamente");
});
