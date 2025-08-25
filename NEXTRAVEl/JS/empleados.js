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

// Vista previa de foto agregar
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
if(agregarBtn) agregarBtn.addEventListener("click", e => {
    e.preventDefault();

    Swal.fire({
        icon: "success",
        title: "Empleado agregado",
        text: "El empleado fue registrado correctamente.",
        confirmButtonColor: "#3085d6"
    });

    modal.style.display = "none";
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
const infoEstado = document.getElementById('infoEstado');
const infoRol = document.getElementById('infoRol');
const infoFoto = document.getElementById('infoFoto');
const infoFotoInput = document.getElementById('infoFotoInput');
const cancelarInfoBtn = document.getElementById('cancelarInfoBtn');

let filaSeleccionada = null;

// Cerrar modal info
infoClose.addEventListener('click', () => infoModal.style.display = 'none');
cancelarInfoBtn.addEventListener('click', () => infoModal.style.display = 'none');

// EDITAR: habilitar inputs
editarBtn.addEventListener('click', () => {
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = false;
    });
});

// Cancelar edición
cancelarEditBtn.addEventListener('click', () => {
    if(filaSeleccionada){
        cargarDatosFila(filaSeleccionada);
    }
    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = true;
    });
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

// Guardar cambios (SweetAlert)
guardarBtn.addEventListener('click', e => {
    e.preventDefault();
    Swal.fire({
        icon: "success",
        title: "Cambios guardados",
        text: "Los datos se han actualizado correctamente.",
        confirmButtonColor: "#3085d6"
    });
    infoModal.style.display = "none";
});


// ======================= MINI ACCIONES EN TABLA (CLICK DERECHO) =======================
const miniAcciones = document.getElementById("miniAcciones");

// Evitar menú contextual normal y mostrar el menú flotante
document.querySelectorAll(".empleados-table tbody tr").forEach(fila => {
    fila.addEventListener("contextmenu", (e) => {
        e.preventDefault(); 
        filaSeleccionada = fila;

        miniAcciones.style.top = e.pageY + "px";
        miniAcciones.style.left = e.pageX + "px";
        miniAcciones.style.display = "flex";
    });
});

// Ocultar menú al hacer clic fuera
window.addEventListener("click", () => {
    miniAcciones.style.display = "none";
});

// ===== Función para cargar datos de la fila en el modal =====
function cargarDatosFila(fila) {
    const celdas = fila.querySelectorAll("td");
    infoFoto.src = celdas[0].querySelector("img").src;
    infoNombre.value = celdas[1].textContent;
    infoApellido.value = celdas[2].textContent;
    infoCorreo.value = celdas[3].textContent;
    infoTelefono.value = celdas[4].textContent;
    infoDireccion.value = celdas[5].textContent;
    infoSalario.value = celdas[6].textContent.replace("$","").trim();
    infoEstado.value = celdas[7].textContent.toLowerCase();
    infoRol.value = celdas[8].textContent;

    // Bloquear inputs
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = true;
    });

    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
}

// ===== Botón Editar en mini menú =====
document.getElementById("miniEditar").addEventListener("click", () => {
    if(filaSeleccionada){
        cargarDatosFila(filaSeleccionada);
        infoModal.style.display = "flex";
    }
    miniAcciones.style.display = "none";
});

// ===== Botón Mensajes =====
document.getElementById("miniMensaje").addEventListener("click", () => {
    window.location.href = "mensajes.html";
});

// Botón Eliminar
document.getElementById("miniEliminar").addEventListener("click", () => {
    if(filaSeleccionada){
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el empleado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        }).then((result) => {
            if(result.isConfirmed){
                filaSeleccionada.remove();
                Swal.fire("Eliminado", "El empleado ha sido eliminado.", "success");
            }
        });
    }
});

