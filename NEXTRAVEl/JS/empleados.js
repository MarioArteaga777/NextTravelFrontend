// ======================= MODAL AGREGAR EMPLEADO =======================
const modal = document.getElementById("miModal");
const openBtn = document.querySelector(".custom-button");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");

openBtn.addEventListener("click", () => modal.style.display = "flex");
closeBtn.addEventListener("click", () => modal.style.display = "none");
cancelBtn.addEventListener("click", () => modal.style.display = "none");

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

fotoInput.addEventListener("change", () => {
    const file = fotoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

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
const infoSalario = document.getElementById('infoSalario');
const infoFoto = document.getElementById('infoFoto');

let currentCard = null;

// Cerrar modal completamente
infoClose.addEventListener('click', () => infoModal.style.display = 'none');
cancelarInfoBtn.addEventListener('click', () => infoModal.style.display = 'none');

// Función para abrir modal info
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCard = btn.closest('.empleado-card');
        const nombre = currentCard.querySelector('.empleado-info h3').textContent;
        const foto = currentCard.querySelector('.empleado-foto').src;

        // Llenar campos
        infoNombre.value = nombre.split(' ')[0];
        infoApellido.value = nombre.split(' ')[1] || '';
        infoCorreo.value = '';
        infoTelefono.value = '';
        infoDireccion.value = '';
        infoSalario.value = '';
        infoFoto.src = foto;

        // Resetear botones y campos
        infoButtons.style.display = 'flex';
        guardarButtons.style.display = 'none';
        Array.from(infoForm.elements).forEach(el => {
            if(el.tagName !== 'BUTTON') el.disabled = true;
        });

        infoModal.style.display = 'flex';
    });
});

// EDITAR
editarBtn.addEventListener('click', () => {
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = false;
    });
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
});

// CANCELAR EDICION
cancelarEditBtn.addEventListener('click', () => {
    // Restaurar valores originales desde currentCard
    if(currentCard){
        const nombre = currentCard.querySelector('.empleado-info h3').textContent;
        const foto = currentCard.querySelector('.empleado-foto').src;
        infoNombre.value = nombre.split(' ')[0];
        infoApellido.value = nombre.split(' ')[1] || '';
        infoFoto.src = foto;
    }

    // Deshabilitar campos
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = true;
    });
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
});

// GUARDAR
guardarBtn.addEventListener('click', () => {
    // Aquí podrías actualizar los datos en la tarjeta
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = true;
    });
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
    infoModal.style.display = 'none';
});
