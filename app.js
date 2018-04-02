const http = require("http");
const fs = require("fs");
const path = require("path");

const staticPath = "./client/public";

http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile(staticPath + "/index.html", (err, data) => {
        if (!err) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        } else {
          console.log("Oopsy");
          res.writeHead(500, "Error loading index.html");
          res.end(err);
        }
      });
    } else if (req.url.match(".css$")) {
      let cssPath = path.join(__dirname, "client", "public", req.url);
      res.writeHead(200, { "Content-Type": "text/css" });
      fs.createReadStream(cssPath, "UTF-8").pipe(res);
    } else if (req.url.match(".png$")) {
      let imagePath = path.join(__dirname, "client", "public", req.url);
      res.writeHead(200, { "Content-Type": "image/css" });
      fs.createReadStream(imagePath, "UTF-8").pipe(res);
    } else if (req.url.match(".js$")) {
      let jsPath = path.join(__dirname, "client", "public", req.url);
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(jsPath, "UTF-8").pipe(res);
    }
  })
  .listen(8080);
