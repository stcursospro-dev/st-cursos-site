//CONFIGURAÇÕES CLOUDINARY

const CLOUD_NAME = "gumshwlu";
const UPLOAD_PRESET = "st-cursos-upload";

//API PLANILHA

const API_URL =
    "https://script.google.com/macros/s/AKfycbyQL_sRu82TuIIoNE8e_vmo4DYoNact6pXbPjiH1MNTnjA3-SbxgZIbAzGgVzxh3icMcQ/exec";

let imagemCloudinary = "";


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

        destaque: document.getElementById("destaque").checked,

        vendido: document.getElementById("vendido").checked,

        novidade: document.getElementById("novidade").checked

    };


    console.log(produto);


    try {


        const resposta = await fetch(API_URL, {

            method: "POST",

            redirect: "follow",

            headers: {

                "Content-Type": "text/plain;charset=utf-8"

            },

            body: JSON.stringify(produto)

        });

        const resultado = await resposta.json();


        const resultado = await resposta.json();


        console.log(resultado);


        alert("✅ Produto salvo com sucesso!");


        modal.style.display = "none";


    } catch (erro) {


        console.error(erro);


        alert("❌ Erro ao salvar produto");


    }



});