// Creates variables for our Nutritionix ID & Key
var nutritionixAppId = '13554c1a';
var nutritionixAppKey = '625ffc981e7b96d9c8f9946a57bd5bc8';

// Retrieve the stored recipe data from localStorage
var storedRecipe = localStorage.getItem("recipe");

// Convert the stored recipe data back into an object
var recipe = JSON.parse(storedRecipe);

// Select the elements on the page where you want to display the recipe details
var recipeImageElement = document.querySelector("#recipeImage");
var recipeTitleElement = document.querySelector("#recipeTitle");
var recipeIngredientsElement = document.querySelector("#ingredientsList");
var recipeInstructionsElement = document.querySelector("#directionsList");

// Set the src attribute of the recipe image to the recipe's strMealThumb property
recipeImageElement.src = recipe.strMealThumb;

// Set the text content of the recipe title to the recipe's strMeal property
recipeTitleElement.textContent = recipe.strMeal;