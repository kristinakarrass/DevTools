
$(document).ready(function() {
 
    // var database = firebase.database();

    var apiResponse = [];

    $("#submit").click(function() {
        $("#results").empty();
            var userQuery = $("#search").val().trim();
     
            var apiResponse = $.ajax({
              url: 'https://www.reddit.com/subreddits/search.json?q=' + userQuery,
              method: 'GET',
              dataType: 'json'
            });

            apiResponse.done(function(response){
                  console.log(response);
                  apiData = response.data.children;
                  if (apiData.length > 0) {
                      for (i=0; i < apiData.length; i++) {
                          var apiTitle = apiData[i].data.title;
                          var apiURL = 'http://reddit.com' + apiData[i].data.url;
                          var apiLink = "<button><a href='" + apiURL + "'target='none'>View</a></button><br/>";
                          var apiTitle = apiTitle;
                          var apiDescription = apiData[i].data.public_description;
                          var resultDiv = $("<div id='resultDiv'>");
                          $(resultDiv).append("<h4>" + apiTitle + "</h4>");
                          $(resultDiv).append("<p>" + apiDescription + "</p><br/>");
                          $(resultDiv).append("<button>Save</button>");
                          $(resultDiv).append(apiLink + "<br/><hr/>");
                          $("#results").append(resultDiv);
                      };
                  }   else {
                            $("#results").append("<p id='noResultsMessage'> Sorry, no results are available for that search.<br/>Please try another search term.</p>");
                      }
                      
                  userQuery = $("#searchTerm");

                
        });//end apiResponse.done
    });//end submit click

});//end document.ready