const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.get("/help", (req, res) => {
  res.send("<h1>About Page</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Jakarta",
  });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
