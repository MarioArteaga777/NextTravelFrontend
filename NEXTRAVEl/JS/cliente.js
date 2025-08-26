// ======================== MODALES ========================
const addClienteModal = document.getElementById("miModal");
const editClienteModal = document.getElementById("infoModal");
const confirmarEliminarModal = document.getElementById("confirmarEliminar");

// Botones de cerrar / cancelar
const closeButtons = document.querySelectorAll(".close-btn");
const cancelButtons = document.querySelectorAll(".cancel-btn");

// ======================== ELEMENTOS ========================
const tablaClientes = document.querySelector(".empleados-table tbody");
const miniMenu = document.getElementById("miniAcciones");
let filaSeleccionada = null;

// Botones mini menú
const miniEditar = document.getElementById("miniEditar");
const miniEliminar = document.getElementById("miniEliminar");

// ======================== FUNCIONES ========================
function abrirModal(modal) { modal.style.display = "flex"; }
function cerrarModal(modal) { modal.style.display = "none"; }

// Cerrar con X
closeButtons.forEach(btn =>
  btn.addEventListener("click", () => cerrarModal(btn.closest(".modal")))
);

// Cerrar con Cancelar
cancelButtons.forEach(btn =>
  btn.addEventListener("click", () => cerrarModal(btn.closest(".modal")))
);

// ======================== TABLA: MINI MENU ========================
tablaClientes.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-btn")) {
    filaSeleccionada = e.target.closest("tr");
    const rect = e.target.getBoundingClientRect();
    miniMenu.style.top = `${rect.bottom + window.scrollY}px`;
    miniMenu.style.left = `${rect.left + window.scrollX}px`;
    miniMenu.style.display = "flex";
  }
});

// Cerrar mini menú si clic afuera
window.addEventListener("click", (e) => {
  if (!miniMenu.contains(e.target) && !e.target.classList.contains("menu-btn")) {
    miniMenu.style.display = "none";
  }
});

// ======================== ACCIONES MINI MENÚ ========================
miniEditar.addEventListener("click", () => {
  if (filaSeleccionada) abrirModal(editClienteModal);
  miniMenu.style.display = "none";
});

miniEliminar.addEventListener("click", () => {
  if (filaSeleccionada) abrirModal(confirmarEliminarModal);
  miniMenu.style.display = "none";
});

// ======================== CONFIRMAR ELIMINAR ========================
document.getElementById("aceptarEliminar").addEventListener("click", () => {
  if (filaSeleccionada) filaSeleccionada.remove();
  cerrarModal(confirmarEliminarModal);
});

// ======================== BOTÓN AGREGAR CLIENTE ========================
document.querySelector(".custom-button").addEventListener("click", () => {
  abrirModal(addClienteModal);
});
