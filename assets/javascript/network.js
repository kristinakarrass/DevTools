
//click event for GitHub search
$("#submit").on("click", function() {
    //prevents the page to reload when enter is pressed
    event.preventDefault();

    $("#resultMessage").html("");
    $("#resultMessageDiv").hide();

    //clear results div to not have multiple search results displayed
    $(".results").html("");
    //grab user input from github input box
    var searchTerm = $("#searchTerm").val().trim();

    //only searches if the user inputs a value
    if (!searchTerm == "") {

        $("#searchTerm").val("");

        //query GitHub repositories for user search term 
        var queryURL = "https://api.github.com/search/repositories?q=" + searchTerm;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //runs if there are results from search
            console.log(response);
            if (response.items.length > 0) {
                for (var i = 0; i < 10; i++) {
                    //create resultsDiv with information chosen for user (Title, User Name, Desciption, URL linked to view button)
                    var resultsDiv = $("<div class='display'>");
                    var gitTitle = $("<h4>").html(response.items[i].name);
                    var gitUser = $("<p>").html("Git User: " + response.items[i].owner.login);
                    var gitDescription = $("<p>").html("Description: " + response.items[i].description);
                    var gitURL = $("<button class='button' id='networkView' ><a href='" + response.items[i].html_url + "'target='none'>View</a></button><br/><hr/>");
                    resultsDiv.append(gitTitle);
                    resultsDiv.append(gitUser);
                    resultsDiv.append(gitDescription);
                    var saveButton = $("<button class='saveBtn button'>Save</button>");
                    saveButton.attr("id", response.items[i].name);
                    saveButton.attr("data", "git");
                    resultsDiv.append(saveButton);
                    resultsDiv.append(gitURL);    
                             
                    //append results to resultsDiv
                    $(".results").append(resultsDiv);
                }
                //if no results are found, alert user to start over
            } else {
                $("#resultMessage").html("Sorry, no results are available for that search.<br/>Please try another search term.");
                $("#resultMessageDiv").show();
            }
        });//ends .done
    }//ends if (!searchTerm == "")
    else {
        $("#resultMessage").html("You must enter a search term.");
        $("#resultMessageDiv").show();
    }

});//ends submit


