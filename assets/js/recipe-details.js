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

// Creates empty array for the variable ingredients
var ingredients = [];
// For loop to iterate 20 times because API gets up to 20 ingredients
for (let i = 1; i <= 20; i++) {
    // Uses current loop counter (i) to fetch both ingredient and measurement from recipe object
  var ingredient = recipe[`strIngredient${i}`];
  var measure = recipe[`strMeasure${i}`];
    // Checks both ingredient and measure variables are not null or empty, if true adds string containing the ingredient and its measurement to the ingredients array
  if (ingredient && ingredient !== "" && measure && measure !== "") {
    ingredients.push(`${ingredient} (${measure})`);
  }
}
// Uses map function to transform each ingredient string to a list item, then uses join to concatenate all list items into a single string
recipeIngredientsElement.innerHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");

// Set the text content of the recipe instructions to the recipe's strInstructions property
recipeInstructionsElement.textContent = recipe.strInstructions;