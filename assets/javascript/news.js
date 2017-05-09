
$(document).ready(function() {

    var apiResponse = [];
    window.apiTitle;
    window.apiURL;
    window.apiDescription;
    window.readStatus = "unread";

    $("#submit").click(function() {
        
        event.preventDefault();

        $("#resultMessage").html("");
        $("#resultMessageDiv").hide();

        $(".results").empty();
        var userQuery = $("#searchTerm").val().trim();

        //only searches if the user inputs a value
        if (!userQuery == "") {

            $("#searchTerm").val("");
         
            //requests query from reddit
            var apiResponse = $.ajax({
                url: 'https://www.reddit.com/subreddits/search.json?q=' + userQuery,
                method: 'GET',
                dataType: 'json'
            });

            //displays query results
            apiResponse.done(function(response) {

                //stores items returned
                var apiData = response.data.children;

                //sets local variables once outside of for loop
                var resultDiv;
                var apiTitleH4;
                var apiDescP;
                var button;
                var apiURLBtn;

                //loops thru items returned and displays them
                if (apiData.length > 0) {
                    for (var i = 0; i < apiData.length; i++) {

                        resultDiv = $("<div id='resultDiv'><br/><hr/>");

                        apiTitle = apiData[i].data.title;
                        apiTitleH4 = $("<h4>" + apiTitle + "</h4>");
                        apiTitleH4.attr("id", "articleTitle");
                        $(resultDiv).append(apiTitleH4);
                            
                        apiDesc = apiData[i].data.public_description;
                        apiDescP = $("<p> Description: " + apiDesc + "</p>");
                        apiDescP.attr("id", "articleDes");
                        $(resultDiv).append(apiDescP);

                        button = $("<button>Save</button>");
                        button.addClass("saveBtn");
                        button.attr("id", apiTitle);
                        button.attr("data", "reddit");
                        $(resultDiv).append(button);

                        apiURL = 'http://reddit.com' + apiData[i].data.url;
                        apiURLBtn = $("<button><a href='" + apiURL + "'target='none'>View</a></button><br/>");
                        apiURLBtn.attr("id", "articleLink");
                        $(resultDiv).append(apiURLBtn);
                            
                        $(".results").append(resultDiv);
                    };
                }   else {
                        $("#resultMessage").html("Sorry, no results are available for that search.<br/>Please try another search term.");
                        $("#resultMessageDiv").show();
                    }

            });//ends apiResponse.done
        }//ends if (!userQuery == "")
        else {
            $("#resultMessage").html("You must enter a search term.");
            $("#resultMessageDiv").show();
        }

    });//ends submit click

});//ends document.ready

