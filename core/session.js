//======================================
// ST CURSOS - SESSION
//======================================

function obterSessao() {

    return obterUsuario();

}

function estaLogado() {

    return obterSessao() !== null;

}

function atualizarSessao(usuario) {

    salvarUsuario(usuario);

}

function encerrarSessao() {

    removerUsuario();

}

function obterCargoAtual() {

    const usuario = obterSessao();

    if (!usuario) {

        return null;

    }

    return usuario.cargo;

}

async function sincronizarSessao() {

    const usuario = obterSessao();

    if (!usuario) {

        return null;

    }

    return usuario;

}