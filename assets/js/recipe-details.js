// Creates variables for our Edamam ID & Key
var edamamAppId = '5c0067e3';
var edamamAppKey = '56c52d9c111e1bbde1de87206bc6f1de';
// Creates variables for our Nutritionix ID & Key
var nutritionixAppId = '13554c1a';
var nutritionixAppKey = '625ffc981e7b96d9c8f9946a57bd5bc8';

// Retrieve the recipe ID from the URL parameters
var urlParams = URLSearchParams(window.location.search);
var recipeId = urlParams.get('recipeId');

// Make an API call to fetch the recipe details using the recipeId
async function getRecipeDetails(recipeId)