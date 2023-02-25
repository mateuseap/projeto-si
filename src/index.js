const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 8080;

const server = http.createServer((request, response) => {
  const path = url.parse(request.url).pathname;

  fs.readFile(__dirname + path, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write('This page does not exist');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
    }

    response.end();
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
