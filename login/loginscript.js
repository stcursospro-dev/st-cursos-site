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

function respostaGoogle(resposta) {

    const dados = JSON.parse(atob(resposta.credential.split(".")[1]));

    const usuario = {

        nome: dados.name,

        email: dados.email,

        foto: dados.picture

    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    console.log(usuario);

    window.location.href = "../index.html";

}