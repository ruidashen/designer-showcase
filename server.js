const express = require("express");
const app = express();
const router = require("./routes");
const nunjucks = require("nunjucks");
nunjucks.configure("view", { autoescape: true, express: app });

app.use(express.static("public"));
app.use(router);

app.listen(5000);