// Define um objeto global Header usado pelo loadpartials.js
window.Header = {
    init() {
      const currentPage = document.body.dataset.page; // "home", "search", "profile"
  
      const links = document.querySelectorAll(".main-nav a[data-page]");
      links.forEach((link) => {
        // Marca ativo
        if (link.dataset.page === currentPage) {
          link.classList.add("is-active");
        }
  
        // Garante que o clique navega corretamente
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const target = link.getAttribute("href");
          if (target) {
            window.location.href = target;
          }
        });
      });
    },
  };