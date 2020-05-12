## Todo List (React)
Mesmo princípio do projeto original, agora aplicado com o uso do Framework ReactJS.

Inclui backend e frontend web, seguindo o modelo SPA.

Backend opera com um banco de dados local, utilizando sqlite3. Informações são armazenadas em duas tabelas criadas com a biblioteca "knex": usuários e todos, com a chave primária da primeira, id de usuário, sendo inserida na segunda como chave estrangeira para definir a associação. Permite a criação, edição e deleção destes itens através de controladores prórpios, com rotas definidas através do router da biblioteca "express".

Frontend foi criado através de ReactJS, com páginas dedicadas a cada funcionalidade (Login, Registro, Perfil, Configurações, Criação, Edição, Deleção e Detalhamento de Todos). O gerenciamento dos dados é feito com uma API dedicada a se conectar ao backend, fazendo uso da biblioteca 'axios', permitindo gerenciar os dados. A manipulação dos mesmos é feita através dos módulos UseState e UseEffect, além de funções auxiliares. A navegação é feita com a biblioteca "react-router-dom", utilizando os módulos BrowserRouter, Switch e Route, para definir rotas para cada página num arquivo dedicado e Link e UseHistory para transitar entre as mesmas.
