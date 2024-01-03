const http = require('https');
const app = require('./app')
const fs = require('fs');

//define port
const port = 3000;

//create server
const server = http.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    }, app);

//listen to port
server.listen(port)