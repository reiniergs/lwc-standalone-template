const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const rollup = require("rollup");
const config = require("../roolup.config");

app.use(express.static("public"));

app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

(async () => {
  const bundle = await rollup.rollup(config);
  // await bundle.write(config.output);
  // await bundle.write(config.output);
})();
