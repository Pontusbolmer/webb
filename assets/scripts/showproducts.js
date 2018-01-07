$(document).ready(function () {


    // Add search for ID of clicked item
    // Get the URL parameter 
    var id = findGetParameter("id");
    var subid = findGetParameter("subid");
    var prodid = findGetParameter("prodid");
    getProductsById(id, subid, prodid);


    /**
     * This function returns an array of objects with the correct id 
     */
    function getProductsById(id, subid, prodid) {

        fetch("produkter.json")
                .then(function (response) {
                    return response.json();
                }).then(function (jsonResponse) {
            for (var i = 0; i < jsonResponse.length; i++) {

                // titta om prodid är satt, isåfall vill vi bara lista en 
                if(prodid !== null){
                    if(prodid == jsonResponse[i].id){
                        showProduct(jsonResponse[i]);
                        continue;
                    }
                }
                
                // Om de matchar vårat ID
                if (subid === null) {
                    if (id == jsonResponse[i].huvudKat) {
                        addProduct(jsonResponse[i]);
                    }
                } else {
                    if (id == jsonResponse[i].huvudKat && subid == jsonResponse[i].underKat) {
                        addProduct(jsonResponse[i]);
                    }
                }

            }
        });
    }
    
    function showProduct(object){
                $(".products").append(
                '<div class="product-card">' +
                    '<div class="product-image">' +
                        '<img src="assets/img/' + object.imgSrc + '">' +
                    '</div>' +
                    '<div class="product-info"> ' +
                        '<h5>' + object.prodName + '</h5>' +
                        '<h6> ' + object.prodDesc + '</h6>' +
                        '<h6> ' + object.prodPrice + '</h6>' +
                    '</div>' +
                    '<button id="' + object.id + '"> Add to cart </button>' +
                '</div>'
                );
        document.getElementById(object.id).onclick = function () {
            addToCart(object);
        };
    }

    function addToCart(object) {

        var cart = {};
        cart.products = [];

        if (localStorage && localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            cart.products.push(object);
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
            cart = JSON.parse(localStorage.getItem("cart"));
            cart.products.push(object);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    function addProduct(object) {
        $(".products").append(
                '<div class="product-card">' +
                    '<a href="categories.html?prodid=' + object.id + '">' +
                    '<div class="product-image">' +
                        '<img src="assets/img/' + object.imgSrc + '">' +
                    '</div>' +
                    '<div class="product-info"> ' +
                        '<h5>' + object.prodName + '</h5>' +
                        '<h6> ' + object.prodPrice + '</h6>' +
                    '</div>' +
                    '</a>' +
                    '<button id="' + object.id + '"> Add to cart </button>' +
                '</div>'
                );
        document.getElementById(object.id).onclick = function () {
            addToCart(object);
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