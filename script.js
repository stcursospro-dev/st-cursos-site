// =======================================================
// ST CURSOS
// PARTE 1
// Carregamento da planilha + criação dos cards
// =======================================================

const URL =
"https://script.google.com/macros/s/AKfycbyQL_sRu82TuIIoNE8e_vmo4DYoNact6pXbPjiH1MNTnjA3-SbxgZIbAzGgVzxh3icMcQ/exec";

let cursos = [];

const containerCursos = document.getElementById("container-cursos");
const containerDestaques = document.querySelector(".cards");

// =======================================================
// LOADING
// =======================================================

containerCursos.innerHTML = `
<div class="loading">
    <h2>Carregando cursos...</h2>
</div>
`;

// =======================================================
// BUSCAR CURSOS
// =======================================================

async function carregarCursos(){

    try{

        const resposta = await fetch(URL);

        if(!resposta.ok){

            throw new Error("Erro ao carregar a planilha.");

        }

        cursos = await resposta.json();

        mostrarCursos(cursos);

        mostrarDestaques();

    }

    catch(erro){

        console.error(erro);

        containerCursos.innerHTML = `
            <div class="erro">

                <h2>Não foi possível carregar os cursos.</h2>

                <p>Tente novamente mais tarde.</p>

            </div>
        `;

    }

}

carregarCursos();

// =======================================================
// MOSTRAR CURSOS
// =======================================================

function mostrarCursos(lista){

    containerCursos.innerHTML = "";

    if(lista.length === 0){

        containerCursos.innerHTML = `
            <h2>Nenhum curso encontrado.</h2>
        `;

        return;

    }

    lista.forEach(curso=>{

        containerCursos.innerHTML += criarCard(curso);

    });

}

// =======================================================
// MOSTRAR DESTAQUES
// =======================================================

function mostrarDestaques(){

    if(!containerDestaques) return;

    containerDestaques.innerHTML = "";

    const destaques = cursos.filter(curso=>{

        return String(curso.destaque).toLowerCase() === "sim";

    });

    destaques.forEach(curso=>{

        containerDestaques.innerHTML += criarCard(curso);

    });

}

// =======================================================
// CARD
// =======================================================

function criarCard(curso){

    return `

    <div class="card">

        ${curso.destaque == "sim"
        ? '<div class="badge">⭐ Destaque</div>'
        : ""}

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

// =======================================================
// ST CURSOS
// PARTE 2
// Pesquisa + Categorias + Navegação
// =======================================================

// -----------------------------------
// ELEMENTOS
// -----------------------------------

const campoPesquisa = document.querySelector(".search-box input");

const categorias = document.querySelectorAll(".categoria");

const btnExplorar = document.querySelector(".hero-buttons button");

const btnDestaques = document.querySelector(".hero-buttons .secondary");

const linkInicio = document.querySelector('nav a[href="#"]');

const linkVerTodos = document.querySelector("#destaques .section-title a");

// -----------------------------------
// PESQUISA
// -----------------------------------

if(campoPesquisa){

    campoPesquisa.addEventListener("input", ()=>{

        const texto = campoPesquisa.value
        .toLowerCase()
        .trim();

        if(texto === ""){

            mostrarCursos(cursos);

            return;

        }

        const resultado = cursos.filter(curso=>{

            return (

                curso.nome.toLowerCase().includes(texto)

                ||

                curso.categoria.toLowerCase().includes(texto)

                ||

                curso.descricao.toLowerCase().includes(texto)

            );

        });

        mostrarCursos(resultado);

    });

}

// -----------------------------------
// FILTRO POR CATEGORIA
// -----------------------------------

categorias.forEach(card=>{

    card.addEventListener("click", ()=>{

        const categoria = card
        .querySelector("h3")
        .textContent
        .trim();

        const resultado = cursos.filter(curso=>{

            return curso.categoria
            .toLowerCase()
            === categoria.toLowerCase();

        });

        mostrarCursos(resultado);

        document
        .getElementById("cursos")
        .scrollIntoView({

            behavior:"smooth"

        });

    });

});

// -----------------------------------
// BOTÃO EXPLORAR
// -----------------------------------

if(btnExplorar){

    btnExplorar.addEventListener("click", ()=>{

        document
        .getElementById("cursos")
        .scrollIntoView({

            behavior:"smooth"

        });

    });

}

// -----------------------------------
// BOTÃO VER DESTAQUES
// -----------------------------------

if(btnDestaques){

    btnDestaques.addEventListener("click", ()=>{

        document
        .getElementById("destaques")
        .scrollIntoView({

            behavior:"smooth"

        });

    });

}

// -----------------------------------
// VER TODOS
// -----------------------------------

if(linkVerTodos){

    linkVerTodos.addEventListener("click",(e)=>{

        e.preventDefault();

        mostrarCursos(cursos);

        document
        .getElementById("cursos")
        .scrollIntoView({

            behavior:"smooth"

        });

    });

}

// -----------------------------------
// MENU INÍCIO
// -----------------------------------

if(linkInicio){

    linkInicio.addEventListener("click",(e)=>{

        e.preventDefault();

        mostrarCursos(cursos);

        campoPesquisa.value="";

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}