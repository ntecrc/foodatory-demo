$(document).ready(function () {
    //Event listener for our search button 
    $("#ingredients").on("click", function (event) {
        console.log('ingredients');
        event.preventDefault();

        // URL forAPI key 

        var Url = 'http://localhost:3000/api/recipes/ingredients';

        //Performing an AJAX GET request to our queryURL 
        $.ajax({
            url: Url,
            method: "GET",
            data: {
                query: document.getElementById('ingredients').value
            }
        }).then(function (response) {
            console.log("response:", response);
            $('.test').empty();
            (response.forEach(function (response) {

                var recipeTitle = response.title;
                var recipeId = response.recipe_id;
                var image = response.image_url;
                var socialRank = response.social_rank;
                var ingredient = response.ingredients;


                let recipeHTML = `
            <div class="row  justify-content-center">
                <div class="col-4 ">
                  <div class="card shadow p-3 mb-5 bg-white rounded">
                      <img class="card-img-top shadow p-2 mb-3 bg-white rounded" src="${image}" alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">${recipeTitle}</h5>
                          <p class="card-text">${ingredient}</p>

                      </div>
                  </div>
                </div>
            
                    `;

                $('.test').append(recipeHTML);


            }));
        })

            .fail(function (error) {
                $('.showFood').text("Does not match of database");


            });
    });

});