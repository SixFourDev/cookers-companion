document.addEventListener('DOMContentLoaded', function () {

  const params = new URLSearchParams(window.location.search);
  const query = params.get('search');

  console.log('Search query:', query);

  if (query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        const resultsContainer = document.getElementById('results');
        if (data.meals) {
          data.meals.forEach(meal => {
            const result = document.createElement('div');
            result.className = 'column is-one-third';
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
            resultsContainer.appendChild(result);

            // Add event listener to the "View Recipe" button
            const viewRecipeButton = result.querySelector('a');
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