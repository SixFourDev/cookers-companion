// Creates variables for our Edamam ID & Key
var edamamAppId = '5c0067e3';
var edamamAppKey = '56c52d9c111e1bbde1de87206bc6f1de';
// Creates variables for our Nutritionix ID & Key
var nutritionixAppId = '13554c1a';
var nutritionixAppKey = '625ffc981e7b96d9c8f9946a57bd5bc8';
var topSearchesURL = "https://api.edamam.com/search";

const recipeElements = [
    document.querySelector(".recipe-1"),
    document.querySelector(".recipe-2"),
    document.querySelector(".recipe-3"),
    document.querySelector(".recipe-4"),
    document.querySelector(".recipe-5"),
  ];

  async function getTopSearches() {
    try {
        const response = await fetch(`${topSearchesURL}?q=&app_id=${edamamAppId}&app_key=${edamamAppKey}&from=0&to=5`);
      const data = await response.json();
  
      const hits = data.hits;
  
      for (let i = 0; i < hits.length; i++) {
        const recipe = hits[i].recipe;
  
        const recipeElement = recipeElements[i];
        recipeElement.querySelector("img").src = recipe.image;
        recipeElement.querySelector("h4").textContent = recipe.label;
        recipeElement.querySelector("p").textContent = recipe.source;
        recipeElement.querySelector("a").href = recipe.url;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  getTopSearches();

// Created asynchronous function getRecipeData
async function getRecipeData() {
    // Starts with a try block for error handling
  try {
    // Creates a variable to wait to fetch from edamam
    var response = await fetch(`https://api.edamam.com/search?q=pizza&app_id=${edamamAppId}&app_key=${edamamAppKey}`);
    // Extracts data with JSON and assign it to data
    var data = await response.json();
    // Extracts the recipe info from the data object by accessing first index and accessing the recipe object in it
    var recipe = data.hits[0].recipe;
    // Sends a POST request
    var nutritionixResponse = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': nutritionixAppId,
        'x-app-key': nutritionixAppKey
      },
      body: JSON.stringify({
        query: recipe.label
      })
    });
    // Extracts the JSON data from response 
    var nutritionixData = await nutritionixResponse.json();
    // Extracts the calorie count from nf calories property from the first index in the foods array
    var nutrients = nutritionixData.foods[0].nf_calories;
    // Logs the recipe object
    console.log('Recipe:', recipe);
    // Logs the calorie count
    console.log('Nutrition Information:', nutrients);
    // Created a catch block to handle any errors
  } catch (error) {
    console.log(error);
  }
}

getRecipeData();

