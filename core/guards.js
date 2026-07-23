function protegerAdmin(){

    if (!estaLogado()) {

        window.location.href = "../login/login.html";

        return;

    }

    if (!ehAdmin()) {

        window.location.href = "../index.html";

        return;
    }

}