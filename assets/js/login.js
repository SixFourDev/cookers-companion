function saveCredentials() {
    var username = document.getElementById("#username").value;
    var password = document.getElementById("#password").value;
    var login = document.getElementById("#login").value;
    var data = {"username": username,"password": password, "login": login};
    fetch ({
        method: 'GET',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
