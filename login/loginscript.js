const API_URL = "https://script.google.com/macros/s/AKfycbyQL_sRu82TuIIoNE8e_vmo4DYoNact6pXbPjiH1MNTnjA3-SbxgZIbAzGgVzxh3icMcQ/exec";

window.onload = () => {

    google.accounts.id.initialize({

        client_id: "1004264785302-4pl5u75ge7jhl6i70gv3j9mfa5cjpsbl.apps.googleusercontent.com",

        callback: respostaGoogle

    });

    google.accounts.id.renderButton(

        document.getElementById("google-login"),

        {

            theme: "outline",

            size: "large",

            shape: "pill",

            width: 350,

            text: "signin_with"

        }

    );

}

async function respostaGoogle(resposta) {

    console.log("Entrou na respostaGoogle");

    const dados = JSON.parse(atob(resposta.credential.split(".")[1]));

    const usuario = {

        nome: dados.name,

        email: dados.email,

        foto: dados.picture

    };

    try {

        const respostaAPI = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify({

                acao: "login",

                ...usuario

            })

        });

        const resultado = await respostaAPI.json();

        usuario.cargo = resultado.cargo;

        localStorage.setItem("usuario", JSON.stringify(usuario));

        console.log(resultado);

    } catch (erro) {

        console.error(erro);

    }

    localStorage.setItem("usuario", JSON.stringify(usuario));

    console.log(usuario);

    window.location.href = "../index.html";

}