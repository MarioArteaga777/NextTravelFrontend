// ======================= FUNCION GENERICA PARA CERRAR MODAL =======================
function cerrarModal(modalSelector, cancelBtnSelector, extraClose = null) {
    const modal = document.querySelector(modalSelector);
    const cancelBtn = cancelBtnSelector ? document.querySelector(cancelBtnSelector) : null;

    if(cancelBtn) cancelBtn.addEventListener('click', () => modal.style.display = 'none');
    if(extraClose) extraClose.addEventListener('click', () => modal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if(e.target === modal) modal.style.display = 'none';
    });
}

// ======================= MODAL ELIMINAR =======================
document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById('confirmarEliminar');
        modal.style.display = 'flex';
    });
});
cerrarModal('#confirmarEliminar', '#cancelarEliminar');

// ======================= MODAL INFORMACION =======================
const infoModal = document.getElementById('infoModal');
const infoClose = document.getElementById('infoClose');
const editarBtn = document.getElementById('editarBtn');
const cancelarInfoBtn = document.getElementById('cancelarInfoBtn');
const guardarButtons = document.getElementById('guardarButtons');
const infoButtons = document.getElementById('infoButtons');
const infoForm = document.getElementById('infoForm');

let currentCard = null;
let originalData = {};

function llenarFormulario(card) {
    const nombreCompleto = card.querySelector('.cliente-info h3').textContent;
    const fotoSrc = card.querySelector('.cliente-foto').src;

    originalData = {
        nombre: nombreCompleto.split(' ')[0],
        apellido: nombreCompleto.split(' ')[1] || '',
        foto: fotoSrc
    };

    document.getElementById('infoNombre').value = originalData.nombre;
    document.getElementById('infoApellido').value = originalData.apellido;
    document.getElementById('infoFoto').src = originalData.foto;

    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = true;
    });

    infoButtons.style.display = 'flex';
    guardarButtons.style.display = 'none';
}

// Abrir modal información
document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCard = btn.closest('.cliente-card');
        llenarFormulario(currentCard);
        infoModal.style.display = 'flex';
    });
});

// Cerrar modal info
cerrarModal('#infoModal', '#cancelarInfoBtn', infoClose);

// Función editar: muestra botón guardar
editarBtn.addEventListener('click', () => {
    Array.from(infoForm.elements).forEach(el => {
        if(el.tagName !== 'BUTTON') el.disabled = false;
    });
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
});

// Cambio de foto
const infoFoto = document.getElementById('infoFoto');
const infoFotoInput = document.getElementById('infoFotoInput');
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

// ======================= MODAL LOGOUT =======================
cerrarModal('#logoutModal', '#cancelarLogout');
