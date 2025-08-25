// ======================= MODAL AGREGAR EMPLEADO =======================
const modal = document.getElementById("miModal");
const openBtn = document.querySelector(".custom-button");
const closeBtn = modal.querySelector(".close-btn");
const cancelBtn = modal.querySelector(".cancel-btn");
const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");

// Abrir y cerrar modal agregar
openBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");
cancelBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if(e.target===modal) modal.style.display="none"; });

// Vista previa de foto agregar (funciona, pero no guarda cambios)
fotoInput.addEventListener("change", () => {
    const file = fotoInput.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = e => preview.src = e.target.result;
        reader.readAsDataURL(file);
    }
});

// Evitar que el botón "Agregar" haga algo
const agregarBtn = document.getElementById("AgregarBtn");
if(agregarBtn) agregarBtn.addEventListener("click", e => e.preventDefault());

// ======================= MODAL ELIMINAR =======================
const eliminarBtns = document.querySelectorAll(".eliminar-btn");
const modalEliminar = document.getElementById("confirmarEliminar");
const cancelarEliminar = document.getElementById("cancelarEliminar");

// Abrir y cerrar modal eliminar
eliminarBtns.forEach(btn => btn.addEventListener("click", () => modalEliminar.style.display = "flex"));
cancelarEliminar.addEventListener("click", () => modalEliminar.style.display = "none");
window.addEventListener("click", (e) => { if(e.target===modalEliminar) modalEliminar.style.display="none"; });

// ======================= MODAL INFORMACION / EDICION =======================
const infoModal = document.getElementById('infoModal');
const infoClose = document.getElementById('infoClose');
const editarBtn = document.getElementById('editarBtn');
const cancelarEditBtn = document.getElementById('cancelarEditBtn');
const guardarBtn = document.getElementById('guardarBtn');
const infoButtons = document.getElementById('infoButtons');
const guardarButtons = document.getElementById('guardarButtons');
const infoForm = document.getElementById('infoForm');
const infoNombre = document.getElementById('infoNombre');
const infoApellido = document.getElementById('infoApellido');
const infoFoto = document.getElementById('infoFoto');
const infoFotoInput = document.getElementById('infoFotoInput');
const cancelarInfoBtn = document.getElementById('cancelarInfoBtn');

let currentCard = null;

// Abrir y cerrar modal info
infoClose.addEventListener('click', () => infoModal.style.display = 'none');
cancelarInfoBtn.addEventListener('click', () => infoModal.style.display = 'none');

// Abrir info modal y mostrar foto y nombre
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCard = btn.closest('.empleado-card');
        const nombre = currentCard.querySelector('.empleado-info h3').textContent;
        const foto = currentCard.querySelector('.empleado-foto').src;
        infoNombre.value = nombre.split(' ')[0];
        infoApellido.value = nombre.split(' ')[1] || '';
        infoFoto.src = foto;
        infoButtons.style.display = 'flex';
        guardarButtons.style.display = 'none';
        Array.from(infoForm.elements).forEach(el => { if(el.tagName !== 'BUTTON') el.disabled = true; });
        infoModal.style.display = 'flex';
    });
});

// EDITAR no hace cambios reales, solo muestra "Guardar Cambios"
editarBtn.addEventListener('click', () => {
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
});

// Cancelar edición solo cierra modal y resetea campos
cancelarEditBtn.addEventListener('click', () => {
    if(currentCard){
        const nombre = currentCard.querySelector('.empleado-info h3').textContent;
        const foto = currentCard.querySelector('.empleado-foto').src;
        infoNombre.value = nombre.split(' ')[0];
        infoApellido.value = nombre.split(' ')[1] || '';
        infoFoto.src = foto;
    }
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
});

// Vista previa foto info
infoFoto.addEventListener('click', () => infoFotoInput.click());
infoFotoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = ev => infoFoto.src = ev.target.result;
        reader.readAsDataURL(file);
    }
});

// Guardar cambios NO hace nada
guardarBtn.addEventListener('click', e => e.preventDefault());

// Botón de mensaje redirige a mensajes.html
document.querySelectorAll('.mensaje-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'mensajes.html';
    });
});
