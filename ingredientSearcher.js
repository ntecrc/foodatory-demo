// Grab the request package...
var request = require("request-promise");
var keys = require("./key.js");
var client = keys.F2F_KEY;

module.exports = function (ingredients) {
    const query = ingredients.join();
    let _recipeData;

    
    return request(`http://food2fork.com/api/search?key=${client}&q=${query}`)
        .then(function (body) {
            var jsonData = JSON.parse(body);

            let recipeData = jsonData.recipes.map(function (recipe) {
                return {
                    title: recipe.title,
                    recipe_id: recipe.recipe_id,
                    image_url: recipe.image_url,
                    social_rank: recipe.social_rank

                };
            });
            return recipeData;
        })
        .then(function (recipes) {
            _recipeData = recipes;
            const ingredientrequests = recipes.map(function (recipe) {
                return request(`http://food2fork.com/api/get?key=${client}&rId=${recipe.recipe_id}`);

            });

            return Promise.all(ingredientrequests);
        })
        .then(function (ingredientBodies) {
            return ingredientBodies.map(function (ingredientBody) {
                return JSON.parse(ingredientBody);
            });
        })
        .then(function (ingredientJSONs) {
            _recipeData.forEach(function (recipe, index) {  
                recipe.ingredients=ingredientJSONs[index].recipe.ingredients; 
            });
            return _recipeData; 
        })
        .catch(function (error) {
            console.log("you messed up agian", error);
        });
};