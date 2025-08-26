// ================= MODALES =================
const addSiteBtn = document.querySelector('.custom-button');
const addSiteModal = document.getElementById('addSiteModal');
const editSiteModal = document.getElementById('editSiteModal');
const confirmarEliminarModal = document.getElementById('confirmarEliminar');

// Botones cerrar modal
const closeButtons = document.querySelectorAll('.close-btn');
const cancelButtons = document.querySelectorAll('.cancel-btn');

// ================= ABRIR MODALES =================
// Agregar sitio
addSiteBtn.addEventListener('click', () => {
    addSiteModal.style.display = 'flex';
});

// ================= CERRAR MODALES =================
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

cancelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ================= PREVISUALIZACIÓN DE IMAGEN =================
// Agregar Sitio
const fotoAdd = document.getElementById('fotoAdd');
const previewAdd = document.querySelector('#addSiteModal #preview');
if(fotoAdd && previewAdd) {
    previewAdd.addEventListener('click', () => fotoAdd.click());
    fotoAdd.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = () => previewAdd.src = reader.result;
            reader.readAsDataURL(file);
        }
    });
}

// Editar Sitio
const fotoEdit = document.getElementById('fotoEdit');
const previewEdit = document.querySelector('#editSiteModal #preview');
if(fotoEdit && previewEdit) {
    previewEdit.addEventListener('click', () => fotoEdit.click());
    fotoEdit.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = () => previewEdit.src = reader.result;
            reader.readAsDataURL(file);
        }
    });
}

// ================= BOTONES EDITAR / GUARDAR =================
const editSiteForm = document.getElementById('editSiteForm');
const camposEditar = editSiteForm.querySelectorAll('input, select, textarea');
const editarBtn = document.getElementById('editarBtn');
const cancelarEditBtn = document.getElementById('cancelarEditBtn');
const guardarBtn = document.getElementById('guardarBtn');
const infoButtons = document.getElementById('infoButtons');
const guardarButtons = document.getElementById('guardarButtons');

// Bloquear todos los campos inicialmente
camposEditar.forEach(campo => campo.disabled = true);

// Botón "Editar"
editarBtn.addEventListener('click', () => {
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
    camposEditar.forEach(campo => campo.disabled = false);
});

// Botón "Cancelar" en editar
cancelarEditBtn.addEventListener('click', () => {
    guardarButtons.style.display = 'none';
    infoButtons.style.display = 'flex';
    camposEditar.forEach(campo => campo.disabled = true);
});

// Botón "Guardar cambios"
guardarBtn.addEventListener('click', () => {
    // Aquí agregas lógica para guardar los cambios en la tabla
    editSiteModal.style.display = 'none';
    guardarButtons.style.display = 'none';
    infoButtons.style.display = 'flex';
    camposEditar.forEach(campo => campo.disabled = true);
});

// ================= BOTON ELIMINAR =================
const aceptarEliminar = document.getElementById('aceptarEliminar');
const cancelarEliminar = document.getElementById('cancelarEliminar');

aceptarEliminar.addEventListener('click', () => {
    if(filaSeleccionada) filaSeleccionada.remove();
    confirmarEliminarModal.style.display = 'none';
});

cancelarEliminar.addEventListener('click', () => {
    confirmarEliminarModal.style.display = 'none';
});

// ================= MENU CONTEXTUAL =================
const miniAcciones = document.getElementById('miniAcciones');
let filaSeleccionada = null;

// Mostrar menú al clic derecho sobre la tabla
document.querySelector('.clientes-table tbody').addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const fila = e.target.closest('tr');
    if (!fila) return;

    filaSeleccionada = fila;

    miniAcciones.style.display = 'flex';
    miniAcciones.style.top = `${e.pageY}px`;
    miniAcciones.style.left = `${e.pageX}px`;
});

// Ocultar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('#miniAcciones')) {
        miniAcciones.style.display = 'none';
    }
});

// Función editar
document.getElementById('miniEditar').addEventListener('click', () => {
    if (filaSeleccionada) {
        editSiteModal.style.display = 'flex';

        const celdas = filaSeleccionada.querySelectorAll('td');
        document.getElementById('editSiteName').value = celdas[1].textContent;
        document.getElementById('editSiteLocation').value = celdas[3].textContent;
        document.getElementById('editSiteCategory').value = celdas[4].textContent.toLowerCase();
        document.getElementById('editSiteDescription').value = celdas[5].textContent;

        camposEditar.forEach(campo => campo.disabled = true);
        infoButtons.style.display = 'flex';
        guardarButtons.style.display = 'none';
    }
    miniAcciones.style.display = 'none';
});

// Función eliminar
document.getElementById('miniEliminar').addEventListener('click', () => {
    if (filaSeleccionada) {
        confirmarEliminarModal.style.display = 'flex';
    }
    miniAcciones.style.display = 'none';
});
