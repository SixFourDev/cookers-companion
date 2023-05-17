// Adds event listener that runs the function once the entire HTML doc has been loaded
document.addEventListener('DOMContentLoaded', function () {
// creates a new URL object with the query string of the current URL
  var params = new URLSearchParams(window.location.search);
  // gets the value of search from the url's query string
  var query = params.get('search');

  console.log('Search query:', query);
  // run this statement only if search query is present
  if (query) {
    // sends a request to themealdb API to search for meals from user input
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    // takes response and converts it to json format
      .then(response => response.json())
      // take that data then do this
      .then(data => {
        // selects the element results and assigns it this variable
        var resultsContainer = document.getElementById('results');
        // if statement that will only run if api response includes a meals array
        if (data.meals) {
          // for loop that iterates over each meal in array
          data.meals.forEach(meal => {
            var result = document.createElement('div');
            result.className = 'column is-one-third';
            // sets the html content of the new div element, includes information about the meal and view recipe button
            result.innerHTML = `
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${meal.strMeal}</p>
                      <p class="subtitle">${meal.strArea}</p>
                      <a href="recipe-details.html?id=${meal.idMeal}">
                      <button class="button is-link">View Recipe</button>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            `;
            // appends it to the html
            resultsContainer.appendChild(result);

            // Add event listener to the "View Recipe" button
            var viewRecipeButton = result.querySelector('a');
            viewRecipeButton.addEventListener('click', function(e) {
                e.preventDefault(); // prevent the link from redirecting immediately
                localStorage.setItem('recipe', JSON.stringify(meal)); // store the selected recipe in localStorage
                window.location.href = viewRecipeButton.href; // redirect to the recipe details page
            });
          });
        } else {
          console.log('No meals found for query:', query);
        }
      })
      .catch(error => console.error('Fetch error:', error));
  } else {
    console.log('No search query provided.');
  }

});