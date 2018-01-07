$(document).ready(function () {

cart = {};
    if (localStorage && localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    var totalSum = 55;
    var totalItems = 0;

    if (cart.products !== undefined) {

        totalItems = cart.products.length;

        for (i = 0; i < cart.products.length; i++) {
            totalSum += cart.products[i].prodPrice;


            $(".product-table").append(
                    "<tr>" +
                    "<td>" + cart.products[i].prodName + "</td>" +
                    "<td>" + cart.products[i].prodPrice + "</td>" +
                    "<td>" + cart.products[i].prodDesc + "</td>" +
                    "</tr>"
                    );
        }
    }
    
    localStorage.removeItem("cart");
});