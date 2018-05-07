const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const methods = require('./client/public/src/coreF');

const postsPath = './server/data/posts.json';
const app = express();

app.use(express.static('./client/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const { skip, top, config } = req.query;
  const result = methods.getPhotoPosts.call(
    { photoPosts: posts },
    skip || 0,
    top || 10,
    config === undefined ? undefined : JSON.parse(config),
  );
  if (result) {
    res.status(200).send(JSON.stringify(result));
  } else {
    res.status(400).end();
  }
});

app.get('/post', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const result = methods.getPhotoPost.call(
    { photoPosts: posts },
    req.query.id,
  );
  if (result) {
    res.status(200).send(JSON.stringify(result));
  } else {
    res.status(400).end();
  }
});

app.delete('/remove', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const result = methods.removePhotoPost.call(
    { photoPosts: posts },
    req.query.id,
  );
  if (result) {
    fs.writeFileSync(postsPath, JSON.stringify(posts));
    res.status(200).send(JSON.stringify(result));
  } else {
    res.status(400).send(JSON.stringify(result));
  }
});

app.post('/add', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const result = methods.addPhotoPost.call(
    Object.assign({ photoPosts: posts }, methods),
    req.body,
  );
  if (result) {
    fs.writeFileSync(postsPath, JSON.stringify(posts));
    res.status(200).send(JSON.stringify(result));
  } else {
    res.status(400).send(JSON.stringify(result));
  }
});

app.put('/edit', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const result = methods.editPhotoPost.call(
    Object.assign({ photoPosts: posts }, methods),
    req.query.id,
    req.body,
  );
  if (result) {
    fs.writeFileSync(postsPath, JSON.stringify(posts));
    res.status(200).send(JSON.stringify(result));
  } else {
    res.status(400).send(JSON.stringify(result));
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
