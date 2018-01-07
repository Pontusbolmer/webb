$(document).ready(function () {

    var navbarItems;


    fetch("huvud.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (huvud) {
                navbarItems = huvud;
                createUIFromLoadedProducts();
            });



    function createUIFromLoadedProducts() {

        fetch("underkategorier.json")
                .then(function (response) {
                    return response.json();
                })
                .then(function (underkat) {

                    // Lägg till startside knapp först
                    $(".navbar").append(
                            '<div style="float: left;">' +
                            '<a href="index.html">Startsida</a>' +
                            '</div>');
                    listOfUnderCategories = underkat;
                    for (var i = 0; i < navbarItems.length; i++) {
                        // Bara dom som har align left ska vara dropdown menyer
                        if (navbarItems[i].align === "left") {
                            // add to navbar as a category
                            addDropDownButton(navbarItems[i]);
                        } else {
                            // add to navbar as a clickable item
                            addClickableItem(navbarItems[i]);

                        }


                    }

                    for (var i = 0; i < listOfUnderCategories.length; i++) {
                        var underkat = listOfUnderCategories[i];

                        var menuitem = '<a href="categories.html?id=' + underkat.huvudkategori + '&subid=' + underkat.id + '"> ' + underkat.name + '</a>';

                        var dropdownName = ".menubutton-" + underkat.huvudkategori;
                        $(dropdownName).next().append(menuitem);

                    }
                    addLoginRegister();
                });
    }

    function addLoginRegister() {
        // add Login button if Logged out, add log out and username if logged in sessionstorage
        var user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            $(".navbar").append(
                    '<div style="float: right;">' +
                    '<a href="#"> ' + user.email + '</a>' +
                    '<a href="#" id="logoutBtn">Logout</a>'+ 
                    '</div>'
                    );
            document.getElementById("logoutBtn").onclick = function() {
                sessionStorage.removeItem("user");
                window.location="http://localhost:8080/pontus/test/index.html";
            };
        } else {
            $(".navbar").append(
                    '<div style="float: right;">' +
                    '<a href="user.html">Login</a>' +
                    '</div>'
                    );
        }
    }

    function addClickableItem(navbarObject) {
        $(".navbar").append(
                '<div style="float: right;">' +
                '<a href="' + navbarObject.page + '.html">' + navbarObject.name + '</a>' +
                '</div>'
                );
    }

    function addDropDownButton(navbarObject) {
        $(".navbar").append(
                '<div class="dropdown">' +
                '<button class="dropbtn menubutton-' + navbarObject.id +
                '" onclick=' + "window.location='http://localhost:8080/pontus/test/categories.html?id=" + navbarObject.id + "'"
                + '>' + navbarObject.name + '<i class="fa fa-caret-down"></i>' +
                '</button>' +
                '<div class="dropdown-content"' +
                '</div>' +
                '</div>'
                );
    }

});