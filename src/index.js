const server = require("./server");
const blipp = require ('blipp');
require('dotenv').config();
const Jwt = require('@hapi/jwt');
const cors = require('hapi-cors');

(async () =>{

    await server.register(Jwt); // registrar plugin JWT

    await server.register({plugin: cors}); // registrar plugin Cors

    server.auth.strategy('jwt', 'jwt', { // configurar estratégia do jwt
        keys: `asdkjhafhadsjadf`,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        validate: () => {
            return {isValid: true};
        }
    });

    await server.auth.default('jwt'); // todas as rotas por padrão terão proteção
    
    await server.register(blipp); //registrar plugin blipp 

    // startando o servidor
    await server.start();
    console.log("Server started %s", server.info.uri);
})();