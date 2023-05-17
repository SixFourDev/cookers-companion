// Creates variables for our Edamam ID & Key
var edamamAppId = '5c0067e3';
var edamamAppKey = '56c52d9c111e1bbde1de87206bc6f1de';
// Creates variables for our Nutritionix ID & Key
var nutritionixAppId = '13554c1a';
var nutritionixAppKey = '625ffc981e7b96d9c8f9946a57bd5bc8';
// Creates variable query to top searches
var query = "top searches";

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
      // Parses the response into JSON format
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

// Creates displayRecipe function and takes recipe and recipeElement as two arguments
function displayRecipe(recipe, recipeElement) {
  // Finds the first "img" element inside recipeElement and sets the src to the value of strMealThumb property of the recipe object
  recipeElement.querySelector("img").src = recipe.strMealThumb;
  // Finds the first "title" element inside recipeElement and sets the text content to the value of strMeal property of the recipe object
  recipeElement.querySelector(".title").textContent = recipe.strMeal;
  // Finds the first "p" element with the class content in recipeElement and sets the text content to the value of strInstructions property of the recipe object
  recipeElement.querySelector(".content p").textContent = recipe.strInstructions;

  // Assigns ingredients and empty array
  var ingredients = [];
  // For loop that will run 20 times because the API returns up to 20 ingredients
  for (let j = 1; j <= 20; j++) {
    // Assign the "j" ingredient and measure from the recipe object
    var ingredient = recipe[`strIngredient${j}`];
    var measure = recipe[`strMeasure${j}`];
    // Checks to see if both the ingredient and measure are not null or empty. If they're good, push a string containing the ingredient and its measure into the ingredients array
    if (ingredient && ingredient !== "" && measure && measure !== "") {
      ingredients.push(`${ingredient} (${measure})`);
    }
  }
  // Finds first "p" element with class content in recipeElement and sets text content to the ingredients array joined as a string with each ingredient separated by a comma
  recipeElement.querySelector(".content p").textContent = ingredients.join(", ");
  // Links user to the recipe-details.html
  recipeElement.querySelector("a").href = `recipe-details.html`;
  // When the link is clicked, the function is executed which stores the recipe object in the browser's localStorage as a string.
  recipeElement.querySelector("a").addEventListener("click", function () {
    localStorage.setItem("recipe", JSON.stringify(recipe));
  });
}

// Calls getTopSearches function
getTopSearches();



