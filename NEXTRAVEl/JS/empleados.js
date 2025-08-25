// ======================= MODALES =======================
const modalAgregar = document.getElementById("miModal");
const modalEliminar = document.getElementById("confirmarEliminar");
const modalInfo = document.getElementById("infoModal");

// Abrir modal agregar
document.querySelector(".custom-button").addEventListener("click", () => modalAgregar.style.display = "flex");

// Cerrar todos los modales
document.querySelectorAll(".modal .close-btn, .modal .cancel-btn").forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".modal").style.display = "none");
});
window.addEventListener("click", e => {
    if(e.target.classList.contains("modal")) e.target.style.display = "none";
});

// ======================= VISTA PREVIA DE FOTO =======================
const preview = document.getElementById("preview");
document.getElementById("foto").addEventListener("change", e => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = ev => preview.src = ev.target.result;
        reader.readAsDataURL(file);
    }
});
document.getElementById("preview").addEventListener("click", () => document.getElementById("foto").click());

const infoFoto = document.getElementById("infoFoto");
const infoFotoInput = document.getElementById("infoFotoInput");
infoFoto.addEventListener("click", () => infoFotoInput.click());
infoFotoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = ev => infoFoto.src = ev.target.result;
        reader.readAsDataURL(file);
    }
});

// ======================= TABLA EMPLEADOS =======================
document.querySelectorAll(".empleados-table tbody tr").forEach(row => {
    // Crear celda de acciones si no existe
    let accionesCell = row.querySelector(".acciones");
    if(!accionesCell){
        accionesCell = document.createElement("td");
        accionesCell.classList.add("acciones");
        row.appendChild(accionesCell);

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("editar-btn");
        accionesCell.appendChild(btnEditar);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("eliminar-btn");
        accionesCell.appendChild(btnEliminar);

        accionesCell.style.display = "none";

        // Editar
        btnEditar.addEventListener("click", e => {
            e.stopPropagation();
            modalInfo.style.display = "flex";
            document.getElementById("infoNombre").value = row.cells[1].textContent;
            document.getElementById("infoApellido").value = row.cells[2].textContent;
            document.getElementById("infoCorreo").value = row.cells[3].textContent;
            document.getElementById("infoTelefono").value = row.cells[4].textContent;
            document.getElementById("infoDireccion").value = row.cells[5].textContent;
            document.getElementById("infoSalario").value = row.cells[6].textContent.replace("$","");
            infoFoto.src = row.cells[0].querySelector("img").src;

            // Deshabilitar inputs al abrir
            Array.from(document.getElementById("infoForm").elements)
                 .forEach(el => { if(el.tagName!=="BUTTON") el.disabled = true; });
            document.getElementById("infoButtons").style.display = "flex";
            document.getElementById("guardarButtons").style.display = "none";
        });

        // Eliminar
        btnEliminar.addEventListener("click", e => {
            e.stopPropagation();
            modalEliminar.style.display = "flex";
            document.getElementById("aceptarEliminar").onclick = () => {
                row.remove();
                modalEliminar.style.display = "none";
            };
        });
    }

    // Mostrar/ocultar acciones al click
    row.addEventListener("click", () => {
        document.querySelectorAll(".acciones").forEach(c => c.style.display="none");
        accionesCell.style.display = "block";
    });
});

// ======================= EDITAR EN MODAL INFO =======================
const editarBtn = document.getElementById("editarBtn");
const cancelarEditBtn = document.getElementById("cancelarEditBtn");
const guardarBtn = document.getElementById("guardarBtn");
const infoButtons = document.getElementById("infoButtons");
const guardarButtons = document.getElementById("guardarButtons");
const infoForm = document.getElementById("infoForm");

editarBtn.addEventListener("click", () => {
    infoButtons.style.display = "none";
    guardarButtons.style.display = "flex";
    Array.from(infoForm.elements).forEach(el => el.disabled = false);
});

cancelarEditBtn.addEventListener("click", () => {
    infoButtons.style.display = "flex";
    guardarButtons.style.display = "none";
    Array.from(infoForm.elements).forEach(el => { if(el.tagName!=="BUTTON") el.disabled = true; });
});
