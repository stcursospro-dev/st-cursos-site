// =======================================================
// ST CURSOS V2
// PARTE 1
// Configurações + Elementos + Carregamento
// =======================================================

//===============================
// CONFIGURAÇÕES
//===============================

const API_URL =
"https://script.google.com/macros/s/AKfycbyQL_sRu82TuIIoNE8e_vmo4DYoNact6pXbPjiH1MNTnjA3-SbxgZIbAzGgVzxh3icMcQ/exec";

//===============================
// DADOS
//===============================

let cursos = [];
let resultadosPesquisa = [];
let indiceSelecionado = -1;

//===============================
// ELEMENTOS
//===============================

const containerCursos =
document.getElementById("container-cursos");

const containerDestaques =
document.querySelector(".cards");

const pesquisa =
document.getElementById("pesquisa");

const searchResults =
document.getElementById("search-results");

const categorias =
document.querySelectorAll(".categoria");

const btnExplorar =
document.querySelector(".hero-buttons button");

const btnDestaques =
document.querySelector(".hero-buttons .secondary");

const linkInicio =
document.querySelector('nav a[href="#topo"]');

const linkVerTodos =
document.querySelector("#destaques .section-title a");

//===============================
// LOADING
//===============================

mostrarLoading();

//======================================================

function mostrarLoading(){

    containerCursos.innerHTML=`

        <div class="loading">

            <h2>Carregando cursos...</h2>

        </div>

    `;

}

//======================================================
// BUSCAR CURSOS
//======================================================

async function carregarCursos(){

    try{

        const resposta =
        await fetch(API_URL);

        if(!resposta.ok){

            throw new Error("Erro ao buscar cursos.");

        }

        cursos =
        await resposta.json();

        cursos = cursos.map(curso=>{

            return{

                nome:
                String(curso.nome || "").trim(),

                categoria:
                String(curso.categoria || "").trim(),

                preco:
                String(curso.preco || "").trim(),

                descricao:
                String(curso.descricao || "").trim(),

                imagem:
                String(curso.imagem || "").trim(),

                link:
                String(curso.link || "").trim(),

                destaque:
                String(curso.destaque || "")
                .trim()
                .toLowerCase()

            };

        });

        mostrarCursos(cursos);

        mostrarDestaques();

        atualizarTitulo();

        iniciarPesquisa();

        iniciarCategorias();

        iniciarBotoes();

        console.log("Cursos carregados:", cursos);

    }

    catch(erro){

        console.error(erro);

        containerCursos.innerHTML=`

            <div class="erro">

                <h2>

                    Não foi possível carregar os cursos.

                </h2>

                <p>

                    Tente novamente mais tarde.

                </p>

            </div>

        `;

    }

}

carregarCursos();

//======================================================
// CRIAR CARD
//======================================================

function criarCard(curso){

    return `

        <div class="card">

            ${
                curso.destaque==="sim"

                ?

                `<div class="badge">

                    ⭐ Destaque

                </div>`

                :

                ""

            }

            <img
                src="${curso.imagem}"
                alt="${curso.nome}"
                loading="lazy"
            >

            <div class="card-content">

                <div class="card-category">

                    ${curso.categoria}

                </div>

                <h3 class="card-title">

                    ${curso.nome}

                </h3>

                <p class="card-description">

                    ${curso.descricao}

                </p>

                <div class="card-price">

                    ${curso.preco}

                </div>

                <button
                    onclick="window.open('${curso.link}','_blank')">

                    Comprar Agora

                </button>

            </div>

        </div>

    `;

}

//======================================================
// MOSTRAR CURSOS
//======================================================

function mostrarCursos(lista){

    containerCursos.innerHTML="";

    if(lista.length===0){

        containerCursos.innerHTML=`

            <h2>

                Nenhum curso encontrado.

            </h2>

        `;

        return;

    }

    lista.forEach(curso=>{

        containerCursos.innerHTML+=

        criarCard(curso);

    });

}

//======================================================
// DESTAQUES
//======================================================

function mostrarDestaques(){

    containerDestaques.innerHTML="";

    const destaques=

    cursos.filter(curso=>

        curso.destaque==="sim"

    );

    destaques.forEach(curso=>{

        containerDestaques.innerHTML+=

        criarCard(curso);

    });

}

// =======================================================
// ST CURSOS V2
// PARTE 2
// Pesquisa Inteligente + Popup
// =======================================================

//===============================
// INICIAR PESQUISA
//===============================

function iniciarPesquisa() {

    if (!pesquisa) return;

    pesquisa.addEventListener("input", pesquisarCursos);

    pesquisa.addEventListener("focus", () => {

        if (pesquisa.value.trim() !== "") {

            pesquisarCursos();

        }

    });

}

//===============================
// PESQUISAR
//===============================

function pesquisarCursos() {

    const texto = pesquisa.value
        .trim()
        .toLowerCase();

    if (texto === "") {

        esconderPesquisa();

        mostrarCursos(cursos);

        return;

    }

    resultadosPesquisa = cursos.filter(curso => {

        const nome = curso.nome.toLowerCase();

        const categoria = curso.categoria.toLowerCase();

        const descricao = curso.descricao.toLowerCase();

        return (

            nome.includes(texto)

            ||

            categoria.includes(texto)

            ||

            descricao.includes(texto)

        );

    });

    mostrarResultadosPesquisa(resultadosPesquisa);

    mostrarCursos(resultadosPesquisa);

}

//===============================
// RESULTADOS
//===============================

function mostrarResultadosPesquisa(lista) {

    searchResults.innerHTML = "";

    indiceSelecionado = -1;

    if (lista.length === 0) {

        searchResults.style.display = "block";

        searchResults.innerHTML = `

            <div class="search-item">

                <div class="search-info">

                    <h4>

                        Nenhum curso encontrado.

                    </h4>

                </div>

            </div>

        `;

        return;

    }

    lista.slice(0,5).forEach((curso,index)=>{

        searchResults.innerHTML += `

            <div
                class="search-item"
                data-index="${index}"
            >

                <img
                    src="${curso.imagem}"
                    alt="${curso.nome}"
                >

                <div class="search-info">

                    <h4>

                        ${curso.nome}

                    </h4>

                    <p>

                        📂 ${curso.categoria}

                    </p>

                    <div class="search-price">

                        ${curso.preco}

                    </div>

                </div>

            </div>

        `;

    });

    searchResults.style.display = "block";

    adicionarEventosPesquisa();

}

//===============================
// CLIQUES
//===============================

function adicionarEventosPesquisa(){

    const itens =

    document.querySelectorAll(".search-item");

    itens.forEach(item=>{

        item.addEventListener("click",()=>{

            const index=

            Number(item.dataset.index);

            abrirCurso(

                resultadosPesquisa[index]

            );

        });

    });

}

//===============================
// ABRIR CURSO
//===============================

function abrirCurso(curso){

    esconderPesquisa();

    pesquisa.value = curso.nome;

    mostrarCursos([curso]);

    const card=

    document.querySelector(".card");

    if(card){

        card.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

        card.style.transition=".4s";

        card.style.boxShadow=

        "0 0 35px #22c55e";

        setTimeout(()=>{

            card.style.boxShadow="";

        },1500);

    }

}

//===============================
// ESCONDER PESQUISA
//===============================

function esconderPesquisa(){

    searchResults.style.display="none";

}

//===============================
// FECHAR AO CLICAR FORA
//===============================

document.addEventListener("click",(e)=>{

    if(

        !e.target.closest(".search-box")

    ){

        esconderPesquisa();

    }

});

// =======================================================
// ST CURSOS V2
// PARTE 3
// Navegação + Categorias + Botões + Teclado
// =======================================================

//===============================
// CATEGORIAS
//===============================

function iniciarCategorias() {

    categorias.forEach(card => {

        card.addEventListener("click", () => {

            const categoria = card
                .querySelector("h3")
                .textContent
                .trim()
                .toLowerCase();

            const filtrados = cursos.filter(curso =>
                curso.categoria.toLowerCase() === categoria
            );

            mostrarCursos(filtrados);

            esconderPesquisa();

            pesquisa.value = "";

            document
                .getElementById("cursos")
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    });

}

//===============================
// BOTÕES
//===============================

function iniciarBotoes() {

    if (btnExplorar) {

        btnExplorar.addEventListener("click", () => {

            document
                .getElementById("cursos")
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    }

    if (btnDestaques) {

        btnDestaques.addEventListener("click", () => {

            document
                .getElementById("destaques")
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    }

    if (linkVerTodos) {

        linkVerTodos.addEventListener("click", e => {

            e.preventDefault();

            pesquisa.value = "";

            mostrarCursos(cursos);

            esconderPesquisa();

            document
                .getElementById("cursos")
                .scrollIntoView({

                    behavior: "smooth"

                });

        });

    }

    if (linkInicio) {

        linkInicio.addEventListener("click", e => {

            e.preventDefault();

            pesquisa.value = "";

            mostrarCursos(cursos);

            esconderPesquisa();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

}

//===============================
// NAVEGAÇÃO PELO TECLADO
//===============================

pesquisa.addEventListener("keydown", function (e) {

    const itens = document.querySelectorAll(".search-item");

    if (itens.length === 0) return;

    // ↓

    if (e.key === "ArrowDown") {

        e.preventDefault();

        indiceSelecionado++;

        if (indiceSelecionado >= itens.length) {

            indiceSelecionado = 0;

        }

        atualizarSelecao(itens);

    }

    // ↑

    if (e.key === "ArrowUp") {

        e.preventDefault();

        indiceSelecionado--;

        if (indiceSelecionado < 0) {

            indiceSelecionado = itens.length - 1;

        }

        atualizarSelecao(itens);

    }

    // ENTER

    if (e.key === "Enter") {

        e.preventDefault();

        if (indiceSelecionado >= 0) {

            abrirCurso(

                resultadosPesquisa[indiceSelecionado]

            );

        }

    }

    // ESC

    if (e.key === "Escape") {

        esconderPesquisa();

    }

});

//===============================
// DESTACAR ITEM
//===============================

function atualizarSelecao(itens) {

    itens.forEach(item => {

        item.style.background = "";

    });

    if (indiceSelecionado >= 0) {

        itens[indiceSelecionado].style.background = "#252525";

        itens[indiceSelecionado].scrollIntoView({

            block: "nearest"

        });

    }

}

//===============================
// ATALHO CTRL + K
//===============================

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key.toLowerCase() === "k"){

        e.preventDefault();

        pesquisa.focus();

    }

});

//===============================
// LIMPAR PESQUISA
//===============================

pesquisa.addEventListener("search",()=>{

    mostrarCursos(cursos);

    esconderPesquisa();

});

//===============================
// DUPLO CLIQUE NA LOGO
//===============================

const logo = document.querySelector(".logo");

if(logo){

    logo.addEventListener("dblclick",()=>{

        pesquisa.focus();

    });

}

//===============================
// EFEITO NOS CARDS
//===============================

document.addEventListener("mouseover",(e)=>{

    const card = e.target.closest(".card");

    if(!card) return;

    card.style.transition=".35s";

});

console.log("ST Cursos V2 - Parte 3 carregada.");

// =======================================================
// ST CURSOS V2
// PARTE 4
// Utilidades + Favoritos + Cache + Melhorias
// =======================================================

//======================================
// SALVAR CURSOS EM CACHE
//======================================

function salvarCache(){

    try{

        localStorage.setItem(

            "st_cursos",

            JSON.stringify(cursos)

        );

    }

    catch(e){

        console.warn("Não foi possível salvar o cache.");

    }

}

//======================================
// LER CACHE
//======================================

function carregarCache(){

    try{

        const cache =

        localStorage.getItem("st_cursos");

        if(!cache) return [];

        return JSON.parse(cache);

    }

    catch(e){

        return [];

    }

}

//======================================
// FAVORITOS
//======================================

let favoritos =

JSON.parse(

localStorage.getItem("favoritos") || "[]"

);

//======================================

function favoritar(nome){

    if(favoritos.includes(nome)){

        favoritos = favoritos.filter(

            item=>item!==nome

        );

        toast("Removido dos favoritos.");

    }

    else{

        favoritos.push(nome);

        toast("Adicionado aos favoritos.");

    }

    localStorage.setItem(

        "favoritos",

        JSON.stringify(favoritos)

    );

}

//======================================
// TOAST
//======================================

function toast(texto){

    const aviso =

    document.createElement("div");

    aviso.className="toast";

    aviso.innerText=texto;

    document.body.appendChild(aviso);

    setTimeout(()=>{

        aviso.classList.add("show");

    },20);

    setTimeout(()=>{

        aviso.classList.remove("show");

        setTimeout(()=>{

            aviso.remove();

        },300);

    },2200);

}

//======================================
// ATUALIZAR CACHE APÓS CARREGAR
//======================================

setTimeout(()=>{

    if(cursos.length){

        salvarCache();

    }

},1000);

//======================================
// IMAGEM COM ERRO
//======================================

document.addEventListener("error",(e)=>{

    if(e.target.tagName==="IMG"){

        e.target.src=

        "https://placehold.co/400x250/161b22/ffffff?text=ST+Cursos";

    }

},true);

//======================================
// BOTÃO VOLTAR AO TOPO
//======================================

const voltarTopo=

document.createElement("button");

voltarTopo.innerHTML="↑";

voltarTopo.className="voltar-topo";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        voltarTopo.style.opacity="1";

        voltarTopo.style.pointerEvents="all";

    }

    else{

        voltarTopo.style.opacity="0";

        voltarTopo.style.pointerEvents="none";

    }

});

voltarTopo.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

//======================================
// CONTADOR DE CURSOS
//======================================

function atualizarTitulo(){

    const titulo =

    document.querySelector("#cursos h2");

    if(!titulo) return;

    titulo.textContent=

    `Todos os Cursos (${cursos.length})`;

}



//======================================
// PRELOAD DAS PRIMEIRAS IMAGENS
//======================================

function preload(){

    cursos.slice(0,5).forEach(curso=>{

        const img = new Image();

        img.src=curso.imagem;

    });

}

setTimeout(preload,1500);

//======================================
// MENSAGEM FINAL
//======================================

console.log("%cST Cursos V2 carregado!",
"color:#22c55e;font-size:20px;font-weight:bold;");