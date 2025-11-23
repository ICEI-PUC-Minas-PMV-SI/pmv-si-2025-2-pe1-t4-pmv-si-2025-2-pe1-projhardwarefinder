// Atualiza o ano automaticamente
window.Footer = {
    init() {
      const span = document.querySelector(".js-current-year");
      if (span) span.textContent = new Date().getFullYear();
    }
  };