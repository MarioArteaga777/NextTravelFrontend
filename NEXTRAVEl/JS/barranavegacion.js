const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
 
 
sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  setTimeout(() => {
    swiper.update(); // Espera la transición para asegurar el nuevo layout
  }, 500);
});



  document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar-nav .nav-link");
    const current = window.location.pathname.split("/").pop();

    links.forEach(link => {
      if(link.getAttribute("href") === current){
        link.classList.add("active");
      }
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.querySelector('.secondary-nav .nav-item:last-child .nav-link');
    const logoutModal = document.getElementById("logoutModal");
    const cancelarLogout = document.getElementById("cancelarLogout");
    const confirmarLogout = document.getElementById("confirmarLogout");

    if (logoutLink) {
        // Cuando se hace clic en "Cerrar sesión" (sidebar)
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            logoutModal.style.display = "flex"; // Mostrar modal
        });
    }

    // Botón cancelar
    cancelarLogout.addEventListener("click", () => {
        logoutModal.style.display = "none"; // Ocultar modal
    });

    // Botón confirmar logout
    confirmarLogout.addEventListener("click", () => {
        // Limpiar sesión (ejemplo con localStorage/sessionStorage)
        localStorage.clear();
        sessionStorage.clear();

        // Redirigir al login o inicio
        window.location.href = "login.html";
    });

    // Si haces clic fuera del modal, también se cierra
    window.addEventListener("click", (e) => {
        if (e.target === logoutModal) {
            logoutModal.style.display = "none";
        }
    });
});

