const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const methods = require("./client/public/src/coreF");

const postsPath = "./server/data/posts.json";
const app = express();

app.use(express.static(`./client/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const { skip, top, config } = req.query;
  const result = methods.getPhotoPosts.call(
    { photoPosts: posts },
    skip || 0,
    top || 10,
    JSON.parse(config)
  );
  if (result) {
    res.send(JSON.stringify(result));
    res.statusCode = 200;
  } else {
    res.end();
    res.statusCode = 400;
  }
});

app.get("/post", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const result = methods.getPhotoPost.call(
    { photoPosts: posts },
    req.query.id
  );
  if (result) {
    res.send(JSON.stringify(result));
    res.statusCode = 200;
  } else {
    res.end();
    res.statusCode = 400;
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
