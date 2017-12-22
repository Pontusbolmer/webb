$( document ).ready(function() {

    var listOfProducts;
    
        fetch("huvud.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(huvud) {
            listOfProducts = huvud;
            createUIFromLoadedProducts();
            console.log(listOfProducts);  
    
          
        });

        function createUIFromLoadedProducts() {
            for (var i = 0; i < listOfProducts.length; i++) {
                  var card = listOfProducts[i].countryname;
                  $(".hmeanu").append('<a href="#">'+card+'</a>');
            }
      }
 


});