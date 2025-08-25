// ======================= MODAL AGREGAR =======================
const modal = document.getElementById("miModal");
const openBtn = document.querySelector(".custom-button");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");

// Abrir y cerrar modal agregar
openBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");
cancelBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// ======================= MODAL ELIMINAR =======================
const eliminarBtns = document.querySelectorAll(".eliminar-btn");
const modalEliminar = document.getElementById("confirmarEliminar");
const cancelarEliminar = document.getElementById("cancelarEliminar");

eliminarBtns.forEach(btn => btn.addEventListener("click", () => modalEliminar.style.display = "flex"));
cancelarEliminar.addEventListener("click", () => modalEliminar.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modalEliminar) modalEliminar.style.display = "none"; });

// ======================= MODAL INFORMACION / EDICION =======================
const infoModal = document.getElementById('infoModal');
const infoClose = document.getElementById('infoClose');
const editarBtn = document.getElementById('editarBtn');
const cancelarEditBtn = document.getElementById('cancelarEditBtn');
const guardarBtn = document.getElementById('guardarBtn');
const infoButtons = document.getElementById('infoButtons');
const guardarButtons = document.getElementById('guardarButtons');
const infoForm = document.getElementById('infoForm');

const infoRealizador = document.getElementById('infoRealizador');
const infoVehiculo = document.getElementById('infoVehiculo');
const infoGasto = document.getElementById('infoGasto');
const infoFecha = document.getElementById('infoFecha');
const infoDescripcion = document.getElementById('infoDescripcion');
const cancelarInfoBtn = document.getElementById('cancelarInfoBtn');

let currentCard = null;

// Cerrar modal info
infoClose.addEventListener('click', () => infoModal.style.display = 'none');
cancelarInfoBtn.addEventListener('click', () => infoModal.style.display = 'none');

// Abrir modal info
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCard = btn.closest('.empleado-card');

        // Llenar con datos de la tarjeta (ejemplo)
        infoRealizador.value = "Juan Pérez";
        infoVehiculo.value = "Toyota Corolla";
        infoGasto.value = 1200;
        infoFecha.value = "2025-08-25";
        infoDescripcion.value = "Cambio de aceite";

        // Bloquear campos
        Array.from(infoForm.elements).forEach(el => { if (el.tagName !== 'BUTTON') el.disabled = true; });

        // Mostrar botones correctos
        infoButtons.style.display = 'flex';
        guardarButtons.style.display = 'none';

        infoModal.style.display = 'flex';
    });
});

// Editar: desbloquea campos
editarBtn.addEventListener('click', () => {
    Array.from(infoForm.elements).forEach(el => { if (el.tagName !== 'BUTTON') el.disabled = false; });
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
});

// Cancelar edición
cancelarEditBtn.addEventListener('click', () => {
    Array.from(infoForm.elements).forEach(el => { if (el.tagName !== 'BUTTON') el.disabled = true; });
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
});

// Guardar cambios (solo cierra modal, no guarda en tarjetas aún)
guardarBtn.addEventListener('click', e => {
    e.preventDefault();
    Array.from(infoForm.elements).forEach(el => { if (el.tagName !== 'BUTTON') el.disabled = true; });
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
    infoModal.style.display = 'none';
});
