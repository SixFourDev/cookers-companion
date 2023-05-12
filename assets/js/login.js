function saveCredentials() {
    var username = document.getElementById("#username").value;
    var password = document.getElementById("#password").value;
    var login = document.getElementById("#login").value;
    var data = {"username": username,"password": password, "login": login};
    fetch('/save', {
        method: 'GET',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

addEventListener('submit', login)
}
{
    let loginbtn= document.getElementById("loginbtn");
}