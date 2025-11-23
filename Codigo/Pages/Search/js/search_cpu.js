
    // Lista de imagens com um atributo pre-estabelecido.
  
    const images = [
      { src: '../peca_procura/img/cpu_i5.jpg', alt: 'intel i5', potencia: 7, preco: 6, custobeneficio: 8 },
      { src: '../peca_procura/img/cpu_i9_ultra.jpg', alt: 'intel i9 ultra', potencia: 9, preco: 4, custobeneficio: 6 },
      { src: '../peca_procura/img/cpu_rayzen_threadripper.jpg', alt: 'amd rayzen threadripper', potencia: 10, preco: 5, custobeneficio: 7 },
      { src: '../peca_procura/img/cpu_rayzen3.jpg', alt: 'amd rayzen 3', potencia: 3, preco: 10, custobeneficio: 6 }
    ];

    const gallery = document.getElementById('gallery');
    const sortPotenciaBtn = document.getElementById('sortPotenciaBtn');
    const sortPrecoBtn = document.getElementById('sortPrecoBtn');
    const sortCustobeneficioBtn = document.getElementById('sortCustobenenficioBtn');

    // Estado: order guarda os índices atuais da exibição (referenciam images[])
    let order = [0,1,2,3];
    const originalOrder = order.slice();

    // Estado para ordenação por atributo (true = ascendente, false = descendente)
    let sortAsc = true;

    // Pré-carregar imagens
    const preloaded = [];
    images.forEach(img => {
      const i = new Image();
      i.src = img.src;
      preloaded.push(i);
    });


      // controle para os botoes laterais de pagina
  function trocapagina(numPaginaRecebido) {

                let numPagina = numPaginaRecebido;

                switch (numPagina){ 

                    case 1:
                        window.location.href = "../pages_detalhes/peca_cpu_detalhes.html";
                        break;
                    case 2:
                        window.location.href = "../pages_detalhes/peca_gpu_detalhes.html";
                        break;
                    case 3:
                        window.location.href = "../pages_detalhes/peca_memoria_detalhes.html";
                        break;
                    case 4:
                        window.location.href = "../pages_detalhes/peca_mobo_detalhes.html";
                        break;
                    case 5:
                        window.location.href = "../pages_detalhes/peca_fonte_detalhes.html";
                        break;
                    case 6:
                        window.location.href = "../search.html";
                
                }
                
            }

    // Constroi a galeria com base no array order
    function buildGallery(){
      gallery.innerHTML = '';
      for (let i = 0; i < order.length; i++){
        const idx = order[i];
        const fig = document.createElement('figure');
        fig.setAttribute('data-index', idx);

        // badge que mostra o atributo (potencia)
        const badge = document.createElement('span');
        badge.className = 'potencia-badge';
        badge.textContent = 'Pw: ' + images[idx].potencia;
        fig.appendChild(badge);

        // badge que mostra o atributo (preco)
        const badge2 = document.createElement('span');
        badge2.className = 'preco-badge';
        badge2.textContent = 'R$: ' + images[idx].preco;
        fig.appendChild(badge2);

         // badge que mostra o atributo (custobeneficio)
        const badge3 = document.createElement('span');
        badge3.className = 'custobeneficio-badge';
        badge3.textContent = 'R$/Pw: ' + images[idx].custobeneficio;
        fig.appendChild(badge3);
        

        const img = document.createElement('img');
        img.src = images[idx].src;
        fig.appendChild(img);
        gallery.appendChild(fig);
      }
    }


    function disableControls(state){
      [sortPotenciaBtn, sortPrecoBtn, sortCustobeneficioBtn].forEach(b => b.disabled = state);
      if(state){
        [sortPotenciaBtn, sortPrecoBtn, sortCustobeneficioBtn].forEach(b => b.style.opacity = '0.6');
      } else {
        [sortPotenciaBtn, sortPrecoBtn, sortCustobeneficioBtn].forEach(b => b.style.opacity = '');
      }
    }

    // Aplica fade-out, reordena e fade-in
    function reorder(newOrder){
      disableControls(true);
      gallery.classList.add('fading');

      setTimeout(()=>{
        order = newOrder.slice();
        buildGallery();
        void gallery.offsetWidth; // reflow para garantir transição
        gallery.classList.remove('fading');
        setTimeout(()=> disableControls(false), 320);
      }, 320);
    }


    function orderByPotencia(arr, asc = true){
      // arr: array de índices
      const a = arr.slice();
      a.sort((i1, i2) => {
        const p1 = images[i1].potencia;
        const p2 = images[i2].potencia;
        return asc ? p1 - p2 : p2 - p1;
      });
      return a;
    }

    function orderByPreco(arr, asc = true){
      // arr: array de índices
      const a = arr.slice();
      a.sort((i1, i2) => {
        const p1 = images[i1].preco;
        const p2 = images[i2].preco;
        return asc ? p1 - p2 : p2 - p1;
      });
      return a;
    }

    function orderByCustobeneficio(arr, asc = true){
      // arr: array de índices
      const a = arr.slice();
      a.sort((i1, i2) => {
        const p1 = images[i1].custobeneficio;
        const p2 = images[i2].custobeneficio;
        return asc ? p1 - p2 : p2 - p1;
      });
      return a;
    }

    // Utilitário para comparar arrays simples
    function arraysEqual(a, b){
      if (a.length !== b.length) return false;
      for (let i=0;i<a.length;i++){
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    // Handlers


    // Aqui está o botão solicitado: ordena as imagens segundo um atributo pre-estabelecido.
    // A cada clique alternamos ascendente/descendente e atualizamos o texto do botão.
    sortPotenciaBtn.addEventListener('click', () => {
      const newOrder = orderByPotencia(order, sortAsc);
      // Se a ordem já estiver igual (por exemplo, clique que não muda), invertemos direção e aplicamos
      if (arraysEqual(newOrder, order)){
        sortAsc = !sortAsc;
        const alt = orderByPotencia(order, sortAsc);
        reorder(alt);
      } else {
        reorder(newOrder);
        sortAsc = !sortAsc;
      }
      sortPotenciaBtn.textContent = 'Ordenar por Potencia ' + (sortAsc ? '↑' : '↓');
    });

    sortPrecoBtn.addEventListener('click', () => {
      const newOrder = orderByPreco(order, sortAsc);
      // Se a ordem já estiver igual (por exemplo, clique que não muda), invertemos direção e aplicamos
      if (arraysEqual(newOrder, order)){
        sortAsc = !sortAsc;
        const alt = orderByPreco(order, sortAsc);
        reorder(alt);
      } else {
        reorder(newOrder);
        sortAsc = !sortAsc;
      }
      sortPrecoBtn.textContent = 'Ordenar por Preco ' + (sortAsc ? '↑' : '↓');
    });

    sortCustobeneficioBtn.addEventListener('click', () => {
      const newOrder = orderByCustobeneficio(order, sortAsc);
      // Se a ordem já estiver igual (por exemplo, clique que não muda), invertemos direção e aplicamos
      if (arraysEqual(newOrder, order)){
        sortAsc = !sortAsc;
        const alt = orderByCustobeneficio(order, sortAsc);
        reorder(alt);
      } else {
        reorder(newOrder);
        sortAsc = !sortAsc;
      }
      sortCustobenenficioBtn.textContent = 'Ordenar por Custo Beneficio ' + (sortAsc ? '↑' : '↓');
    })

    // Inicializa
    buildGallery();

    // Expondo estado para debug no console se quiser:
    window._galleryState = { order, images, reorder, buildGallery, orderByPotencia };