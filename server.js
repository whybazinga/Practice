const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const methods = require("client/public/src/coreF.js");

const postsPath = "./server/data/posts.json";
const app = express();

app.use(express.static(`./client/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const config;
  methods.getPhotoPosts.call(
    { photoPosts: posts },
    req.query.skip,
    req.query.top,
    {}
  );
  res.statusCode = 200;
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
