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

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "Missing address query!",
    });

  res.send({
    location: req.query.address,
    forecast: {
      temp: 30,
      desc: "Cloudy",
    },
  });
});

app.listen(port, () =>
  console.log(`Server is up on http://localhost:${port}/`)
);
