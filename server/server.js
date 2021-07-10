// server.js
const express = require('express');
const path = require('path')

const app = express();
const PORT = 4000;

app.use(express.static('../dist'));




console.log(path.join("../public"))


app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 