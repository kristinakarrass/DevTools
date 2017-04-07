
$(document).ready(function() {

    var apiResponse = [];
    window.apiTitle;
    window.apiURL;
    window.apiDescription;
    window.readStatus = "unread";

    $("#submitNews").click(function() {

        $("#results").empty();
        $("#saveResults").empty();
        var userQuery = $("#search").val().trim();
     
        var apiResponse = $.ajax({
            url: 'https://www.reddit.com/subreddits/search.json?q=' + userQuery,
            method: 'GET',
            dataType: 'json'
        });

        apiResponse.done(function(response){
            apiData = response.data.children;
            if (apiData.length > 0) {
                for (i=0; i < apiData.length; i++) {

                    var resultDiv = $("<div id='resultDiv'><br/><hr/>");

                    apiTitle = apiData[i].data.title;
                    var apiTitleH4 = $("<h4>" + apiTitle + "</h4>");
                    apiTitleH4.attr("id", "articleTitle");
                    $(resultDiv).append(apiTitleH4);
                        
                    apiDesc = apiData[i].data.public_description;
                    var apiDescP = $("<p>" + apiDesc + "</p><br/>");
                    apiDescP.attr("id", "articleDes")
                    $(resultDiv).append(apiDescP);

                    var button = $("<button>Save</button>");
                    button.addClass("saveBtn");
                    button.attr("id", "saveBtn-" + i)
                    $(resultDiv).append(button);

                    apiURL = 'http://reddit.com' + apiData[i].data.url;
                    var apiURLBtn = $("<button><a href='" + apiURL + "'target='none'>View</a></button><br/>");
                    apiURLBtn.attr("id", "articleLink");
                    $(resultDiv).append(apiURLBtn);
                        
                    $("#results").append(resultDiv);
                };
            }   else {
                    $("#results").append("<p id='noResultsMessage'> Sorry, no results are available for that search.<br/>Please try another search term.</p>");
                }
                      
            userQuery = $("#searchTerm");

        });//end apiResponse.done

    });//end submit click

});//end document.ready

