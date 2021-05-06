const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Variables and path for express config
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");
const componentsPath = path.join(__dirname, "../views/components");

// Setup handlebars engine + static dir
app.set("view engine", "hbs");
app.use(express.static(publicDirPath));
hbs.registerPartials(componentsPath);

app.get("/", (_req, res) => {
  res.render("index", {
    title: "Hello World",
  });
});

app.get("/about", (_req, res) => {
  res.render("about");
});

app.get("/weather", (_req, res) => {
  res.send({
    location: "Jakarta",
    forecast: {
      temp: 30,
      desc: "Cloudy",
    },
  });
});

app.listen(port, () =>
  console.log(`Server is up on http://localhost:${port}/`)
);
