var db = require("../models");

module.exports = function(app) {
  // Load home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });

  // Load about us page
  app.get("/aboutus", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/aboutus.html"));
  });

  // Load sign-in page
  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/sign.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
