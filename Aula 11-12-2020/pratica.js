/**
 * Exemple 01
 */

function fazRequisicao() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolvida');
      // reject("Promise erro");
      // throw new Error('Deu erro');
    }, 5000);
  });
}

fazRequisicao()
  .then(console.log)
  .catch(console.log)
  .finally(console.log("Finalizando..."))

// Console Response - Resolve
// Finalizando...
// Promise resolvida (After 5s)

// Console Response - Reject & Throw Error
// Finalizando...
// /home/gabriel/Desktop/Desenvolvimento Web/Solutis/Curso React - Pos Admissao/Atividades/Javascript/Aula 11-12-2020/pratica.js:10
//       throw new Error('Deu erro');
//       ^

// Error: Deu erro
//     at Timeout.setTimeout [as _onTimeout] (/home/gabriel/Desktop/Desenvolvimento Web/Solutis/Curso React - Pos Admissao/Atividades/Javascript/Aula 11-12-2020/pratica.js:10:13)
//     at ontimeout (timers.js:436:11)
//     at tryOnTimeout (timers.js:300:5)
//     at listOnTimeout (timers.js:263:5)
//     at Timer.processTimers (timers.js:223:10) (After 5s)

//----------------

/**
 * Exemple 02
 */

// const { default: fetch } = require("node-fetch");
fetch = require("node-fetch");
let cepBuscado;
console.log("Buscando CEP");
cepBuscado = buscarCep("13845373");
console.log("CEP Buscado");
console.log("CEP encontrado: ", cepBuscado);

function buscarCep(parametro){
  let cep;
  fetch(`https://viacep.com.br/ws/${parametro}/json/`)
    .then(response => response.json())
    .then(data => {
      cep = data.cep;
      console.log('CEP encontrado: ', cep);
    })
    .catch(console.error);
    return cep;
}

// Console Response
// Buscando CEP
// CEP Buscado
// CEP encontrado:  undefined
// CEP encontrado:  13845-373

//----------------

/**
 * New Example
 */
 
getUser(1);

async function getUser(id){
  console.log('Iniciando requisição...');
  try{
    const response = await fetch(`https://reqress.in/api/user/${id}`);
    console.log('Tratando os dados recebidos...');
    const user = await response.json();
    console.log(`Olá ${user.data.name}, bem vindo a Matrix.`);
  }catch(err){
    console.log('Erro durante a solicitação :', err);
  }

}

// Console Response - Resolved (id = 1)
// Iniciando requisição...
// Tratando os dados recebidos...
// Olá cerulean, bem vindo a Matrix.

// Console Response - Error (id = 1)
// Iniciando requisição...
// Erro durante a solicitação : { FetchError: request to https://reqress.in/api/user/1 failed, reason: connect ECONNREFUSED 78.47.226.171:443
//   at ClientRequest.<anonymous> (/home/gabriel/Desktop/Desenvolvimento Web/Solutis/Curso React - Pos Admissao/Atividades/Javascript/node_modules/node-fetch/lib/index.js:1461:11)
//   at ClientRequest.emit (events.js:198:13)
//   at TLSSocket.socketErrorListener (_http_client.js:401:9)
//   at TLSSocket.emit (events.js:198:13)
//   at emitErrorNT (internal/streams/destroy.js:91:8)
//   at emitErrorAndCloseNT (internal/streams/destroy.js:59:3)
//   at process._tickCallback (internal/process/next_tick.js:63:19)
// message:
//  'request to https://reqress.in/api/user/1 failed, reason: connect ECONNREFUSED 78.47.226.171:443',
// type: 'system',
// errno: 'ECONNREFUSED',
// code: 'ECONNREFUSED' }

//----------------