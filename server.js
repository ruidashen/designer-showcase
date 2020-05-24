const express = require("express");
const app = express();
const router = require("./routes");
const nunjucks = require("nunjucks");
nunjucks.configure("view", { autoescape: true, express: app });

app.use(express.static("public"));
app.use(router);
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"));
