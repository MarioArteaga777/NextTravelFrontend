// ================= SWIPER =================
const swiper = new Swiper('.wrapper', {
    spaceBetween: 40,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

// ================= MODALES =================
const addSiteBtn = document.querySelector('.custom-button');
const addSiteModal = document.getElementById('addSiteModal');
const editSiteModal = document.getElementById('editSiteModal');
const confirmarEliminarModal = document.getElementById('confirmarEliminar');
const logoutModal = document.getElementById('logoutModal');

// Botones cerrar modal
const closeButtons = document.querySelectorAll('.close-btn');
const cancelButtons = document.querySelectorAll('.cancel-btn');

// ================= ABRIR MODALES =================
addSiteBtn.addEventListener('click', () => {
    addSiteModal.style.display = 'flex';
});

document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        editSiteModal.style.display = 'flex';
    });
});

document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        confirmarEliminarModal.style.display = 'flex';
    });
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
const previewAdd = document.getElementById('preview');

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
const previewEdit = document.getElementById('preview');

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

// Bloquear todos los campos inicialmente
camposEditar.forEach(campo => campo.disabled = true);

// Botón "Editar"
editarBtn.addEventListener('click', () => {
    infoButtons.style.display = 'none';
    guardarButtons.style.display = 'flex';
    // Habilitar campos
    camposEditar.forEach(campo => campo.disabled = false);
});

// Botón "Cancelar" en editar
cancelarEditBtn.addEventListener('click', () => {
    guardarButtons.style.display = 'none';
    infoButtons.style.display = 'flex';
    // Bloquear campos de nuevo
    camposEditar.forEach(campo => campo.disabled = true);
});

// Botón "Guardar cambios"
guardarBtn.addEventListener('click', () => {
    // Guardar cambios aquí
    editSiteModal.style.display = 'none';
    guardarButtons.style.display = 'none';
    infoButtons.style.display = 'flex';
    camposEditar.forEach(campo => campo.disabled = true);
});
