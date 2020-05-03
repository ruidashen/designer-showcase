const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { promisify } = require('util');

const readDirAsync = promisify(fs.readdir);

router.get("/:category", (req, res) => {
  let fileName = req.params.category;
  res.render(`${fileName}.html`);
})

router.get("/:projectDir/:projectName", async (req, res) => {
  let projectName = req.params.projectName;
  const fileDir = req.params.projectDir + "/" + projectName;
  const result = [];

  const files = await readDirAsync(path.join(__dirname, "/public/img/" + fileDir));

  files.forEach((file) => result.push(file));
  let title = projectName.indexOf('-') >= 0 ? projectName.split('-') : projectName.split('_');
  title = title.join(' ').toUpperCase();
  res.render(`template.html`, {
    files: result,
    dirName: fileDir,
    title
  });
});

module.exports = router;
