// Selects all of the card elements in each column
var recipeElements = [
    document.querySelector(".column:nth-of-type(1) .card"),
    document.querySelector(".column:nth-of-type(2) .card"),
    document.querySelector(".column:nth-of-type(3) .card"),
    document.querySelector(".column:nth-of-type(4) .card"),
    document.querySelector(".column:nth-of-type(5) .card"),
  ];
  
  // Function that gets the top 5 recipes based on the search query
  async function getSearchResults() {
    // Creates the URL for the API request using the search query and API credentials
    var searchResults = `www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`;
    try {
      // Sends a request to the API and waits for a response
      var response = await fetch(searchResults);
      // Parses the response into JSON format
      var data = await response.json();
      // Extracts the recipe data from the response
      var hits = data.hits;
  
      // Loops through each recipe element and populates it with data from the API response
      for (let i = 0; i < hits.length; i++) {
        var recipe = hits[i].recipe;
  
        // Selects the recipe element for the current loop iteration
        var recipeElement = recipeElements[i];
  
        // Updates the image, title, and ingredient text of the recipe element
        recipeElement.querySelector("img").src = recipe.image;
        recipeElement.querySelector(".title").textContent = recipe.label;
        recipeElement.querySelector(".content p").textContent = recipe.ingredientLines.join(", ");
  
        // Sets the href attribute of the "View Recipe" link to the recipe URL
        recipeElement.querySelector("a").href = recipe.url;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Calls the getSearchResults function when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    getSearchResults();
  });