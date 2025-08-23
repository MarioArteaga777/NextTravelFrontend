// ======================= MODAL ELIMINAR =======================
const eliminarBtns = document.querySelectorAll(".eliminar-btn");
const modalEliminar = document.getElementById("confirmarEliminar");
const cancelarEliminar = document.getElementById("cancelarEliminar");
const aceptarEliminar = document.getElementById("aceptarEliminar");
let empleadoSeleccionado = null;

eliminarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        empleadoSeleccionado = btn.closest(".empleado-card");
        modalEliminar.style.display = "flex";
    });
});

cancelarEliminar.addEventListener("click", () => {
    modalEliminar.style.display = "none";
    empleadoSeleccionado = null;
});

aceptarEliminar.addEventListener("click", () => {
    if (empleadoSeleccionado) empleadoSeleccionado.remove();
    modalEliminar.style.display = "none";
    empleadoSeleccionado = null;
});

window.addEventListener("click", (e) => {
    if (e.target === modalEliminar) modalEliminar.style.display = "none";
});

// ======================= MODAL INFORMACION / EDICION =======================
const infoModal = document.getElementById('infoModal');
const infoClose = document.getElementById('infoClose');
const editarBtn = document.getElementById('editarBtn');
const cancelarInfoBtn = document.getElementById('cancelarInfoBtn');
const cancelarEditBtn = document.getElementById('cancelarEditBtn');
const guardarBtn = document.getElementById('guardarBtn');

const infoButtons = document.getElementById('infoButtons');
const guardarButtons = document.getElementById('guardarButtons');
const infoForm = document.getElementById('infoForm');

const infoNombre = document.getElementById('infoNombre');
const infoApellido = document.getElementById('infoApellido');
const infoCorreo = document.getElementById('infoCorreo');
const infoTelefono = document.getElementById('infoTelefono');
const infoDireccion = document.getElementById('infoDireccion');
const infoEdad = document.getElementById('infoEdad');
const infoEstado = document.getElementById('infoEstado');
const infoGenero = document.getElementById('infoGenero');
const infoDui = document.getElementById('infoDui');
const infoFechaRegistro = document.getElementById('infoFechaRegistro');
const infoFoto = document.getElementById('infoFoto');
const infoFotoInput = document.getElementById('infoFotoInput');

let currentCard = null;
let originalData = {};

// ======================= FUNCIONES AUXILIARES =======================
function llenarFormulario(card) {
    const nombreCompleto = card.querySelector('.empleado-info h3').textContent;
    const fotoSrc = card.querySelector('.empleado-foto').src;

    // Guardar datos originales para cancelar edición
    originalData = {
        nombre: nombreCompleto.split(' ')[0],
        apellido: nombreCompleto.split(' ')[1] || '',
        correo: card.dataset.correo || '',
        telefono: card.dataset.telefono || '',
        direccion: card.dataset.direccion || '',
        edad: card.dataset.edad || '',
        estado: card.dataset.estado || '',
        genero: card.dataset.genero || '',
        dui: card.dataset.dui || '',
        fechaRegistro: card.dataset.fechaRegistro || '',
        foto: fotoSrc
    };

    // Llenar campos
    infoNombre.value = originalData.nombre;
    infoApellido.value = originalData.apellido;
    infoCorreo.value = originalData.correo;
    infoTelefono.value = originalData.telefono;
    infoDireccion.value = originalData.direccion;
    infoEdad.value = originalData.edad;
    infoEstado.value = originalData.estado;
    infoGenero.value = originalData.genero;
    infoDui.value = originalData.dui;
    infoFechaRegistro.value = originalData.fechaRegistro;
    infoFoto.src = originalData.foto;

    // Bloquear campos
    Array.from(infoForm.elements).forEach(el => {
        if (el.tagName !== 'BUTTON') el.disabled = true;
    });

    // Mostrar botones correctos
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
}

// ======================= ABRIR MODAL INFORMACION =======================
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCard = btn.closest('.empleado-card');
        llenarFormulario(currentCard);
        infoModal.style.display = 'flex';
    });
});

// ======================= CERRAR MODAL =======================
infoClose.addEventListener('click', () => infoModal.style.display = 'none');
cancelarInfoBtn.addEventListener('click', () => infoModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === infoModal) infoModal.style.display = 'none';
});

// ======================= EDITAR =======================
editarBtn.addEventListener('click', () => {
    Array.from(infoForm.elements).forEach(el => {
        if (el.tagName !== 'BUTTON') el.disabled = false;
    });
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
});

// ======================= CANCELAR EDICION =======================
cancelarEditBtn.addEventListener('click', () => {
    // Restaurar datos originales
    infoNombre.value = originalData.nombre;
    infoApellido.value = originalData.apellido;
    infoCorreo.value = originalData.correo;
    infoTelefono.value = originalData.telefono;
    infoDireccion.value = originalData.direccion;
    infoEdad.value = originalData.edad;
    infoEstado.value = originalData.estado;
    infoGenero.value = originalData.genero;
    infoDui.value = originalData.dui;
    infoFechaRegistro.value = originalData.fechaRegistro;
    infoFoto.src = originalData.foto;

    // Bloquear campos
    Array.from(infoForm.elements).forEach(el => {
        if (el.tagName !== 'BUTTON') el.disabled = true;
    });

    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
});

// ======================= GUARDAR CAMBIOS =======================
guardarBtn.addEventListener('click', () => {
    // Actualizar tarjeta visualmente (puedes actualizar también atributos data si los usas)
    currentCard.querySelector('.empleado-info h3').textContent = `${infoNombre.value} ${infoApellido.value}`;
    currentCard.querySelector('.empleado-foto').src = infoFoto.src;

    // Bloquear campos de nuevo
    Array.from(infoForm.elements).forEach(el => {
        if (el.tagName !== 'BUTTON') el.disabled = true;
    });

    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
    infoModal.style.display = 'none';
});

// ======================= CAMBIO DE FOTO =======================
infoFoto.addEventListener('click', () => infoFotoInput.click());
infoFotoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(event){
            infoFoto.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});
