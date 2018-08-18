var db = require("../models");
var ingredientSearcher = require('../ingredientSearcher.js')

module.exports = function(app) {
  // Get all examples
  app.get("/api/recipes/:ingredients", function(req, res) {
    console.log("anything")
    var ingredients= req.params.ingredients
    
    ingredients = ['egg', 'milk']
    ingredientSearcher(ingredients)
      .then(function (recipes) {  
        res.json(recipes);
      });

  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
