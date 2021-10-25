const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(`${process.cwd()}/dist`)));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
// const http = require('http');

// const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
