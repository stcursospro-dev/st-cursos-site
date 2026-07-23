const api = {

    async post(dados) {

        const resposta = await fetch(API_URL, {

            method: "POST",

            body: JSON.stringify(dados)

        });

        return await resposta.json();

    },

    async login(usuario) {

        return await this.post({

            acao: "login",

            ...usuario

        });

    },

    async buscarCargo(email) {

        return await this.post({

            acao: "buscarCargo",

            email

        });

    }

};