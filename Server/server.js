const http = require('http');

module.exports = http.createServer(function (req, res) {
    res.end('Hey there!');
}).listen(3000, () => console.log("NodeJS worker listening on port 3000"));