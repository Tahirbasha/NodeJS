const http = require("http");

const server = http.createServer(function(req, res) {
    if (req.url === '/getData') {
        return res.end("This is the data :)");
    }
    return res.end("Hello World");
})

server.listen(8080);