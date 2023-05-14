// Selects all of the card elements in each column
var recipeElements = [
    document.querySelector(".column:nth-of-type(1) .card"),
    document.querySelector(".column:nth-of-type(2) .card"),
    document.querySelector(".column:nth-of-type(3) .card"),
    document.querySelector(".column:nth-of-type(4) .card"),
    document.querySelector(".column:nth-of-type(5) .card"),
  ];
  
  // Function that gets the top 5 recipes based on the search query
  async function getTopSearches() {
    // Assigns topSearchesURL TheMealDB API endpoint
    var topSearchesURL = `https://www.themealdb.com/api/json/v1/1/random.php`;
    // Starts block of code to test for errors while being executed
    try {
      // For loop to iterate over the recipeElements array
      for (let i = 0; i < recipeElements.length; i++) {
        // Sends a request to the API endpoint and waits for the response
        var response = await fetch(topSearchesURL);
        // Takes response from API, and converts it to an object with json
        var data = await response.json();
        // Accesses the first object in the meals array
        var recipe = data.meals[0];
        // Calls the displayRecipe function and passes the recipe and recipeElements array
        displayRecipe(recipe, recipeElements[i]);
      }
    } catch (error) {
      // Logs any error that may have occurred in the try block
      console.log(error);
    }
  }
  
  
  
