// Para solucionar el problema de Cross-Origin Resource Sharing - CORS
// 1. Crear los archivos package.json y proxy.js
// 2. Instalar node js
// 3. Donde estan los archivos del punto 1 correr en un cmd:
// 3.1 npm install
// 3.2 npm run proxy

var cors_proxy = require('cors-anywhere');

// Listen on a specific IP Address
var host = '0.0.0.0';

// Listen on a specific port, adjust if necessary
var port = 8081;

cors_proxy.createServer({
	originWhitelist : [], // Allow all origins
	requireHeader : [ 'origin', 'x-requested-with' ],
	removeHeaders : [ 'cookie', 'cookie2' ]
}).listen(port, host, function() {
	console.log('Running CORS Anywhere on ' + host + ':' + port);
});