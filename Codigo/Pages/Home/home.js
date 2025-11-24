document.addEventListener("DOMContentLoaded", () => {
  // Botão do card: vai para a página de perfil
  const btnPerfil = document.getElementById("btn-ver-perfil");
  if (btnPerfil) {
    btnPerfil.addEventListener("click", () => {
      window.location.href = "../Profile/index.html";
    });
  }

  // Formulário central de busca
  const form = document.getElementById("home-search-form");
  const input = document.getElementById("home-search-input");

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const termo = input.value.trim();

      // Se quiser exigir texto, pode checar length > 0:
      const query = termo.length > 0 ? `?q=${encodeURIComponent(termo)}` : "";
      window.location.href = "../Search/index.html" + query;
    });
  }
});