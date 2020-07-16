const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const port = 3000;
const rollup = require("rollup");
const config = require("../rollup.config");


app.use(express.static("public"));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

(async () => {
  const watcher = await rollup.watch(config);
  watcher.on('event', (event) => {
    if (event.code === 'START') {
      console.log('Compiling...');
    }
    if (event.code === "END") {
      console.log('Done!');
    }
  });
})();
