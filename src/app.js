const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicdir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

console.log(partialsPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicdir));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "khushal ahir",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About ",
    name: "khushal ahir",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "khushal ahir",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please provide an address" });
  }

  geocode(req.query.address, (error, { placename, Location } = {}) => {
    error ? res.send({ error }) : "";

    forecast(placename, (error, forcastdata) => {
      error
        ? res.send({ error })
        : res.send({
            forcastdata,
            Location,
          });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: " you must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    message: "help article not found",
    name: "khushal ahir",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    message: "page not found",
    name: "khushal ahir",
  });
});

app.listen(1234, () => {
  console.log("server is up on port 1234");
});
