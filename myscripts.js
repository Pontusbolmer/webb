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
                      $(".hmeanu").append('<a href="#" class="menuItem"> '+card+ " " +'</a>');
                }
          }
    
          $(".productBox").hide();
    
          /*$( ".hmeanu" ).hover(function() {
            $( ".productBox" ).toggle();
          });
          */
    
          var bajsskalle;
    
          fetch("underkategorier.json")
          .then(function(response) {
              return response.json();
          })
          .then(function(bajs) {
              bajsskalle = bajs;
              createUIFromLoadedbajs();
              console.log(bajsskalle);  
      
            
          });
    
          function createUIFromLoadedbajs() {
              for (var i = 0; i < bajsskalle.length; i++) {
                    var productBox = bajsskalle[i].stadname;
                    $(".productBox").append('<a href="#" class="menuItem"> '+productBox+ " " +'</a>');
    
               
            }
        }
     
    
    
    
    
    });