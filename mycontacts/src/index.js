/* eslint linebreak-style: ["error", "windows"] */
const express = require('express');

const routes = require("./routes")

const app = express();

// app.use([
//     routes,
//     (request, response) => {}, 
// ]);
app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('Server na porta 3000: http://localhost:3000'));