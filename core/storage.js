//======================================
// ST CURSOS - STORAGE
//======================================

const STORAGE = {

    USUARIO: "usuario",

    FAVORITOS: "favoritos"

};

//======================================
// USUÁRIO
//======================================

function obterUsuario() {

    return JSON.parse(localStorage.getItem(STORAGE.USUARIO));

}

function salvarUsuario(usuario) {

    localStorage.setItem(

        STORAGE.USUARIO,

        JSON.stringify(usuario)

    );

}

function removerUsuario() {

    localStorage.removeItem(STORAGE.USUARIO);

}