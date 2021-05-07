const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Utils
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Variables, path for express middleware
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");
const componentsPath = path.join(__dirname, "../views/components");

// Setup handlebars + express middleware
app.set("view engine", "hbs");
app.use(express.static(publicDirPath));
hbs.registerPartials(componentsPath);

app.get("/", (_req, res) => {
  res.render("index", {
    title: "Hello World",
  });
});

app.get("/weather", (req, res) => {
  const addressQuery = req.query.address;
  if (!addressQuery)
    return res.send({
      error: "Address must be provided!",
    });

  geocode(addressQuery, (error, { latitude, longtitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        query: addressQuery,
      });
    });
  });
});

app.listen(port, () =>
  console.log(`Server is up on http://localhost:${port}/`)
);
