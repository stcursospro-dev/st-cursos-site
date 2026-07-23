//======================================
// ST CURSOS - PERMISSIONS
//======================================

function ehAdmin() {

    return obterCargoAtual() === "admin";

}

function ehUsuario() {

    return obterCargoAtual() === "usuario";

}

function temPermissao(cargo) {

    return obterCargoAtual() === cargo;

}