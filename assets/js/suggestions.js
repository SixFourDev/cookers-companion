function apiCall(){
    var searchInput = document.getElementById("search");
   
       // Gets word related to the word the user inputs
       searchInput.onkeydown = function() {
       var searchData = document.getElementById("search").value;
   
       if (searchData.length >= 3 ) {
          while (document.getElementsByClassName('')[0]) {
       document.getElementsByClassName('')[0].remove();
    }
  }
           var request = new XMLHttpRequest();
           request.open('GET', 'https://api.edamam.com/search?q=' + searchData + '&apikey=56c52d9c111e1bbde1de87206bc6f1de', true);
           request.onload = function () {
               // Begin accessing JSON data here
               var data = JSON.parse(this.response);
   
               var wrapper = document.createElement('div');
               wrapper.className = "";
               app.appendChild(wrapper);
               var results = data;
               if (request.status >= 200 && request.status < 400) {
                   console.log(data);
                   Object.keys(data.Search).map(function(key, index) {
                       console.log(data.Search[index].Title);
   
                       const searchResultsContainer = document.createElement('div');
                       searchResultsContainer.setAttribute('class', 'row');
   
                       const h1 = document.createElement('h1');
                       h1.textContent = data.Search[index].Title;
                       wrapper.appendChild(searchResultsContainer);
                       searchResultsContainer.appendChild(h1);
                       console.log(searchResultsContainer);
                    });
               } else {
                   console.log('error');
               }
           };
           request.send();
       }
   }