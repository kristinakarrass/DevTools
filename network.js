//click event for GitHub search
$("#submit").on("click", function() {
    //prevents the page to reload when enter is pressed
    event.preventDefault();

    //clear results div to not have multiple search results displayed
    $(".results").html("");
    //grab user input from github input box
    var searchTerm = $("#searchTerm").val();

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
                         
                // resultsDiv.append("<button class='button'>Save</button>");

                //append results to resultsDiv

                $(".results").append(resultsDiv);
            }
            //if no results are found, alert user to start over
        } else {
            $(".results").html("<h1>No results for this search. </br> Please choose a different search term.</h1>");
        }
    })
});
