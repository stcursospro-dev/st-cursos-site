Arquivo	Responsabilidade	O que faz na prática	Exemplos de funções


A. api.js:	Comunicação com o servidor	
Centraliza todas as chamadas para o Apps Script. Nenhum outro arquivo deve usar fetch(API_URL) diretamente.	
loginGoogle(), buscarCargo(), listarCursos(), adicionarCurso(), editarCurso(), excluirCurso()


B. auth.js:	Autenticação	
Controla o login e o logout do usuário. Responsável apenas pela autenticação, sem verificar permissões.	loginGoogle(), logout(), estaLogado()


C. config.js:	Configurações globais
Guarda constantes usadas em todo o projeto. Assim, quando algo mudar, altera apenas um lugar.	
API_URL, VERSAO, TEMPO_SESSAO, SITE_NAME


D. guards.js:	Proteção de páginas	
Impede acesso a páginas que exigem login ou permissões específicas. É a "barreira de segurança" do sistema.	
protegerAdmin(), protegerUsuario(), protegerPaginaLogada()


E. permissions.js:	Controle de permissões
Decide o que cada usuário pode ou não fazer, baseado no cargo e nas permissões.	
ehAdmin(), podeEditarCurso(), podeExcluirCurso(), podeComprar()


F. session.js:	Gerenciamento da sessão
Controla os dados da sessão atual do usuário, mantendo tudo atualizado com o servidor.
atualizarCargo(), atualizarSessao(), verificarSessao()


G. storage.js:	Armazenamento local
Centraliza todas as operações de localStorage (e futuramente sessionStorage ou IndexedDB). Nenhum outro arquivo deve acessar o localStorage diretamente.	
salvarUsuario(), obterUsuario(), removerUsuario(), salvarFavoritos()


H. utils.js:	Funções auxiliares	
Contém funções genéricas que podem ser usadas em qualquer parte do projeto, sem depender de login ou banco de dados.	
formatarPreco(), formatarData(), gerarUUID(), copiarTexto()