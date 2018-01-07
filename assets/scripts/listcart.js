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
                    '<td class="removeRowBtn"> <i class="fa fa-trash-o" aria-hidden="true"></i> </td>' +
                    "</tr>"
                    );
        }
    }
    
    
    $(".product-table").append(
            "<tfoot>" +
            "<tr>" +
            "<td> Total pris med frakt 55kr</td>" +
            "<td id='totalsumcolumn'>" + totalSum + "</td>" +
            "<td>" + "<button class='checkoutBtn'> Checkout & pay </button>" + "</td>" +
            "</tr>" +
            "</tfoot>"
            );

    $('body').on('click', '.removeRowBtn', function () {
        // to make sure at least one row remains
        if ($('.removeRowBtn').length > 0) {
            // Ta bort från carten med samma namn
            var prodname = $(this).parents('tr').children('td:first')[0].textContent;
            var price = $(this).parents('tr').children('td:nth-child(2)')[0].textContent;
            
            deleteProductFromCart(prodname);
            $(this).parents('tr').remove();
            document.getElementById("totalsumcolumn").innerHtml=totalSum-price;
        }
    });
    
    $('body').on('click', '.checkoutBtn', function () {
       checkout();
    });

    function checkout(){
        // Kontrollera om de är inloggade
        var user = JSON.parse(sessionStorage.getItem("user"));
        if(user){
            // Checkout
            window.location='http://localhost:8080/pontus/test/checkout.html';
        }else{
            // Erbjud Att registera eller Logga in  
            var conf = confirm("Vill du logga in som kund eller registrera dig?");
            if(conf ==   true){
                window.location='http://localhost:8080/pontus/test/user.html';
            }else{
                window.location='http://localhost:8080/pontus/test/checkout.html';
            }
        }
        
        
    }

    function deleteProductFromCart(productname) {
        cart = JSON.parse(localStorage.getItem("cart"));
        var newCart = {};
        newCart.products = [];
        // Lägg till alla icke matchande object till en ny kundvagn och spara den (enbart en)
        var removed = false;
        for(i=0;i<cart.products.length; i++){
            
            if(cart.products[i].prodName !== productname || removed ){
                newCart.products.push(cart.products[i]);
            }else{
                removed = true;
            }
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
        
    }

});

