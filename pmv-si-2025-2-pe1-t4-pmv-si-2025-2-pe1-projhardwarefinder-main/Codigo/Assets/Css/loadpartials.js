document.addEventListener("DOMContentLoaded", () => {
    function loadPartial(containerId, url, callback) {
      const container = document.getElementById(containerId);
      if (!container) return;
  
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.text();
        })
        .then((html) => {
          container.innerHTML = html;
          if (typeof callback === "function") callback();
        })
        .catch((err) => console.error("Erro ao carregar", url, err));
    }
  
    // Caminhos relativos a partir de /Codigo/Pages/*/index.html
    loadPartial("app-header", "../../Components/Header/header.html", () => {
      if (window.Header && typeof Header.init === "function") {
        Header.init();
      }
    });
  
    loadPartial("app-footer", "../../Components/Footer/footer.html", () => {
      if (window.Footer && typeof Footer.init === "function") {
        Footer.init();
      }
    });
  });