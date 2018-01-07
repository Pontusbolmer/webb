$(document).ready(function () {

    var register = findGetParameter("register");
    if (register) {
        createUiForRegister();
    } else {
        createUiForLogin();
    }

    function createUiForLogin() {

        $('.middleDiv').append(
                '<form action="user.html" method="post" id="loginform">' +
                'Username: <input type="text" name="username" id="username"><br>' +
                'Password: <input type="password" name="password" id="password"><br>' +
                '<input type="submit" value="Submit">  <button id="registerBtn">Register</button>' +
                '</form> '
                );

        document.getElementById('registerBtn').onclick = function () {
            window.location = 'http://localhost:8080/pontus/test/user.html?register=true';
        };

        document.getElementById('loginform').onsubmit = function () {

            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            // get parameter, kolla om Login, logut eller Register
            // Get user data
            fetch("assets/data/kunder.json")
                    .then(function (response) {
                        return response.json();
                    }).then(function (jsonResponse) {

                for (i = 0; i < jsonResponse.length; i++) {
                    if (username === jsonResponse[i].email && password === jsonResponse[i].password) {
                        var user = {
                            email: jsonResponse[i].email
                        };

                        if (jsonResponse[i].admin) {
                            user.admin = true;
                        }
                        sessionStorage.setItem("user", JSON.stringify(user));
                        window.location = 'http://localhost:8080/pontus/test/index.html';

                    }
                }
                // titta nya customers i localStorage
                var users = JSON.parse(localStorage.getItem("users"));
                for (i = 0; i < users.customers.length; i++) {
                    if (username === users.customers[i].email && password === users.customers[i].password) {
                        var user = {
                            email: users.customers[i].email
                        };
                        sessionStorage.setItem("user", JSON.stringify(user));
                        window.location = 'http://localhost:8080/pontus/test/index.html';
                    }
                }
            });
            return false;

        };

    }



    function createUiForRegister() {
        $('.middleDiv').append(
                '<form action="user.html" method="post" id="loginform">' +
                'Namn: <input type="text" name="namn" id="namn"><br>' +
                'Email: <input type="text" name="email" id="email"><br>' +
                'Address: <input type="text" name="address" id="address"><br>' +
                'Telefonnummer: <input type="text" name="telefonnummer" id="telefonnummer"><br>' +
                'Password: <input type="password" name="password" id="password"><br>' +
                '<input type="submit" value="Submit"> ' +
                '</form> '
                );
        document.getElementById('loginform').onsubmit = function () {

            var newUser = {
                namn: document.getElementById('namn').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                telefon: document.getElementById('telefonnummer').value,
                password: document.getElementById('password').value
            };
            sessionStorage.setItem("user", JSON.stringify(newUser));

            users = {};
            users.customers = [];

            if (localStorage.getItem("users")) {
                users = JSON.parse(localStorage.getItem("users"));
                users.customers.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
            } else {
                localStorage.setItem("users", JSON.stringify(users));
                users = JSON.parse(localStorage.getItem("users"));
                users.customers.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
            }
            window.location = 'http://localhost:8080/pontus/test/index.html';

        };
    }





    function findGetParameter(parameterName) {
        var result = null,
                tmp = [];
        location.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                    tmp = item.split("=");
                    if (tmp[0] === parameterName)
                        result = decodeURIComponent(tmp[1]);
                });
        return result;
    }
});
