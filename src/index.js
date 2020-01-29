const express = require("express");
const routes = require("./routes");
const globalMiddleware = require("./globalMiddleware");

const app = express();

app.use(express.json());
app.use(globalMiddleware);
app.use(routes);

app.listen(3333);
