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
