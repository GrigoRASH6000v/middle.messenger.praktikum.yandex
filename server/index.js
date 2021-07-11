// server.js
const express = require("express")
const path = require("path")


const app = express();
const PORT = 3000;

app.use(express.static(path.join(process.cwd() + "/dist")));



app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});__dirname