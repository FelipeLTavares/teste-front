# Teste Técnico
## 1 Instalação
1 - Clonar o repositório
```git clone```

2 - acessar o diretório
```cd teste-front```

3 - garantir que a versão do node na máquina é compatível (a usada no desenvolvimento foi a 22)

4 - instalar as dependencias
```npm install```

5 - rodar o projeto usando:
```npm run dev```

## 2 Visão Geral
Esse é um sistema simples que basicamente: cadastra, autentica e mostrar uma lista de usuários.
O ponto principal do teste e foco desse projeto é a apresentação de um modal (como um de aviso de mudança de políticas de privacidade) que deve ser enquanto o usuário não confirmar que está ciente da mudança.
O framework usado para construir o projeto foi o Vue3, sem muito foco na estilização usando apenas CSS. Os dados de usuários cadastrados são temporariamente persistidos no sessionStorage, os quais são manipulados num store do Pinia afim de facilitar a a reutilização das funcionalidades entre os componentes.
Depois de autenticado, o sistema verifica se o usuário logado aceitou ou não os "novos termos", se tiver aceitado o modal não é mais mostrado em novos acesso, se não tiver aceitado, ele aparecerá nos novos acessos até que o usuário aceite os termos. 

## 3 Arquitetura
Não fugi da estrutura inicial proposta pelo Vue3 separado os arquivos em:
- componentes, que são os blocos de código reutilizáveis;
- views, que são os arquivos focados na apresentação da interface;
- e stores, onde ficam os arquivos que facilitam a manipulação de dados entre componentes.

## 4 Casos de uso (e testes)
1 - O sistema começa na tela de login, mas deve inicialmente ir para a tela de registro clicando em "Criar uma conta"
2 - Forneça um nome, um e-mail e uma senha para criar um usuário (que inicialmente iniciará no estado de "ainda não aceito os novos termos")
3 - Volte a tela de login e se autentique usndo os dados que acabou de criar
4 - Dando tudo certo, é redirecionado para a tela inicial e como ainda não aceito os novos termos, surgirá o modal para gerenciar isso, podendo escolher: "aceitar e fechar" ou só "fechar";
5.1 - Se clicar em aceitar então ao sair da conta e entrar novamente, o modal não aparecerá mais;
5.2 - Se clicar em fechar, no próximo acesso o modal aparecerá novamente até que o seja aceito;
6 - clicando em sair, no botão do lado superior direito, o usuário é deslogado e voltará para a tela de login.
