require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

// aqui vamos importar o express
const express = require("express");

const routes = require("./routes");
migrationsRun();


// Para não poluir nosso código vamos para index.js
// const { usersRoutes } = require("./routes/users.routes")

// Aqui vamos inicializar o express
const app = express();
// Aqui vamos adicionar os comando para o metodo POST usando o Insomnia
app.use(express.json());

app.use(routes);





// Aqui vamos criar uma mensagem na port 3333, usando o comando a baixo
// Obs: usamos "/" para ele buscar em todo o diretório
// e para ver acessamos o navegador usando localhost:3333
// app.get("/message", (request, response) => {
//     response.send("Hello, world");
// });

// Request / Response
// Nessa aula aprenderemos como utilizar os Route Params utilizando recursos e parâmetros em nossa Rota

// app.get("/message/:id/:user", (request, response) => {
//     response.send(`
//     Mensagem ID: ${request.params.id}
//     Para o Usuário: ${request.params.user}
//     `);
// });

// Para não ficar repetindo paralavras como request e params, podemos desusturar usando
// const { id, user } = request.params;
// Aqui foi comentado que foi somente por exemplo usado em aula
// app.get("/message/:id/:user", (request, response) => {
//     const { id, user } = request.params;

//     response.send(`
//     Mensagem ID: ${id}
//     Nome do Usuário: ${user}
//     `);
// });

// Nessa aula aprenderemos o que é Query Params e como utilizar e qual a diferença dele para o Route Params.
// vamos refazer abaixo usando o metodo POST
// app.get("/users", (request, response) => {
//     const { page, limit } = request.query;

//     response.send(`Página: ${page}. Mostrar: ${limit}`);
// });

// Aqui jogamos essa rota no arquivo users.routes.js
// app.post("/users", (request, response) => {
//     const { name, email, password } = request.body;
//     // response.send(`Usuário: ${name}. E-mail: ${email}. E a senha é: ${password}`);
//     response.json({ name, email, password});
// })
//    const { name, email, password } = request.body;

    // response.send(`Usuário: ${name}. - E-mail: ${email}. e a senha ${password} `);

//     // Aqui vamos usar o metodo json para atualizar nossos dados
//     response.json({ name, email, password })
// // });


// Aqui criamos o endereço, a porta onde nossa api vai ficar observando as requisições e devolver o que for solicitado


// Para verificar se está funcionando, no terminado a gente digita node src/server.js que vai retornar
// Server is running on Port 3333
// Para facilitar podemos acessar o package.json e em scripts podermos adicionar a linha de comando
// "start": node ./src/server.js e então damos um control c para pausar nosso terminal e então limpamos ele
// e então digitamos npm start que já vai iniciar nosso primeiro script

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });

});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));