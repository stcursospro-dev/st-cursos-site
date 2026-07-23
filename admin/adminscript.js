protegerAdmin();

//CONFIGURAÇÕES CLOUDINARY

const CLOUD_NAME = "gumshwlu";
const UPLOAD_PRESET = "st-cursos-upload";

//API PLANILHA


let imagemCloudinary = "";
let produtoEditando = null;
let produtos = [];
const modalExcluir = document.getElementById("modal-excluir");
const btnCancelarExcluir = document.getElementById("cancelar-excluir");
const btnConfirmarExcluir = document.getElementById("confirmar-excluir");
let idParaExcluir = null;




// TOAST

function mostrarToast(mensagem, tipo = "sucesso") {

    const toast = document.getElementById("toast");

    toast.innerHTML = mensagem;

    toast.className = "";

    toast.classList.add("show");

    toast.classList.add(tipo);

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


//MODAL

const modal = document.getElementById("modalProduto");

const btnNovo = document.getElementById("btnNovoProduto");

const btnFechar = document.getElementById("fecharModal");

btnNovo.onclick = () => {

    modal.style.display = "flex";

}

btnFechar.onclick = () => {

    modal.style.display = "none";

}

window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

}

btnCancelarExcluir.addEventListener("click", fecharModalExcluir);

btnConfirmarExcluir.addEventListener("click", () => {

    excluirProduto(idParaExcluir);

    fecharModalExcluir();

});

//PREÇO

const campoPreco = document.getElementById("preco");

campoPreco.addEventListener("blur", () => {

    let valor = campoPreco.value
        .replace("R$", "")
        .replace(/\s/g, "")
        .replace(",", ".");

    valor = parseFloat(valor);

    if (isNaN(valor)) {

        campoPreco.value = "";

        return;

    }

    campoPreco.value = valor.toFixed(2).replace(".", ",");

});

const inputImagem = document.getElementById("imagem");

const btnEscolherImagem = document.getElementById("btnEscolherImagem");

const nomeImagem = document.getElementById("nomeImagem");

btnEscolherImagem.addEventListener("click", () => {

    inputImagem.click();

});

inputImagem.addEventListener("change", async () => {

    console.log("Evento disparou!");

    if (inputImagem.files.length === 0) return;

    const arquivo = inputImagem.files[0];

    nomeImagem.textContent = "⏳ Enviando imagem...";

    const leitor = new FileReader();

    leitor.onload = function (e) {

        document.getElementById("previewImagem").src = e.target.result;

    };

    leitor.readAsDataURL(arquivo);

    const formData = new FormData();

    formData.append("file", arquivo);

    formData.append("upload_preset", UPLOAD_PRESET);

    try {

        const resposta = await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

            {

                method: "POST",

                body: formData

            }

        );

        const dados = await resposta.json();

        imagemCloudinary = dados.secure_url;

        nomeImagem.textContent = "✅ Imagem enviada";

        console.log(imagemCloudinary);

    } catch (erro) {

        console.error(erro);

        nomeImagem.textContent = "❌ Erro ao enviar";

    }

});

const btnSalvar = document.getElementById("salvarProduto");

btnSalvar.addEventListener("click", async () => {


    const produto = {

        nome: document.getElementById("nome").value,

        categoria: document.getElementById("categoria").value,

        preco: document.getElementById("preco").value,

        descricao: document.getElementById("descricao").value,

        imagem: imagemCloudinary,

        link: document.getElementById("link").value,

        destaque: document.getElementById("destaque").checked ? "sim" : "não",

        vendido: document.getElementById("vendido").checked ? "sim" : "não",

        novidade: document.getElementById("novidade").checked ? "sim" : "não"

    };


    console.log(produto);


    try {


        const resposta = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                acao: produtoEditando ? "editar" : "adicionar",

                id: produtoEditando,

                ...produto

            })

        });

        const resultado = await resposta.json();

        produtoEditando = null;

        btnSalvar.textContent = "Salvar Produto";

        carregarProdutos();


        console.log(resultado);


        mostrarToast("✅ Produto salvo com sucesso!");

        limparFormulario();

        modal.style.display = "none";


    } catch (erro) {


        console.error(erro);


        mostrarToast("❌ Erro ao salvar produto.", "erro");

        limparFormulario();


    }



});

async function carregarProdutos() {

    try {

        const resposta = await fetch(API_URL);

        produtos = await resposta.json();

        const lista = document.getElementById("lista-produtos");

        lista.innerHTML = "";

        produtos.forEach(produto => {

            lista.innerHTML += `
    
        <div class="produto-card">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p>${produto.categoria}</p>

            <strong>
                R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}
            </strong>

            <div class="produto-acoes">

    <button class="editar" onclick="editarProduto('${produto.id}')">
        ✏️ Editar
    </button>

    <button class="excluir" onclick="abrirModalExcluir('${produto.id}')">
        🗑️ Excluir
    </button>

</div>

        </div>

    `;

        });

    } catch (erro) {

        console.error("Erro ao carregar produtos:", erro);

    }

}

function editarProduto(id) {

    const produto = produtos.find(p => p.id === id);

    produtoEditando = id;

    document.getElementById("nome").value = produto.nome;

    document.getElementById("categoria").value = produto.categoria;

    document.getElementById("preco").value = Number(produto.preco)
        .toFixed(2)
        .replace(".", ",");

    document.getElementById("descricao").value = produto.descricao;

    document.getElementById("link").value = produto.link;

    document.getElementById("destaque").checked = produto.destaque === "sim";

    document.getElementById("vendido").checked = produto.vendido === "sim";

    document.getElementById("novidade").checked = produto.novidade === "sim";

    document.getElementById("previewImagem").src = produto.imagem;

    imagemCloudinary = produto.imagem;

    modal.style.display = "flex";

    btnSalvar.textContent = "Atualizar Produto";

}



async function excluirProduto(id) {

    try {

        const resposta = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                acao: "excluir",

                id

            })

        });

        const resultado = await resposta.json();

        console.log(resultado);

        carregarProdutos();

        mostrarToast("🗑️ Produto excluído com sucesso!");

    } catch (erro) {

        console.error(erro);

        mostrarToast("❌ Erro ao excluir produto.", "erro");

    }

}

function abrirModalExcluir(id) {

    idParaExcluir = id;

    modalExcluir.style.display = "flex";

}

function fecharModalExcluir() {

    idParaExcluir = null;

    modalExcluir.style.display = "none";

}

//FUNÇÃO PARA LIMPAR FORMULÁRIO

function limparFormulario(){

    document.getElementById("nome").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("preco").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("link").value = "";

    document.getElementById("destaque").checked = false;

    document.getElementById("vendido").checked = false;

    document.getElementById("novidade").checked = false;

    document.getElementById("previewImagem").src =
    "https://placehold.co/350x500?text=Capa";

    document.getElementById("nomeImagem").textContent =
    "Nenhuma imagem selecionada";

    document.getElementById("imagem").value = "";

    imagemCloudinary = "";

}

carregarProdutos();
limparFormulario();