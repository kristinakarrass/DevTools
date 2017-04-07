$("#submit").on("click", function() {
    //prevents the page to reload when enter is pressed
    event.preventDefault();

    //clear gifs div to only have one set of gifs displayed
    $(".results").html("");
    var searchTerm = $("#searchTerm").val();
    console.log(searchTerm);
    var queryURL = "https://api.github.com/search/repositories?q=" + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        if (response.items.length > 0) {
            for (var i = 0; i < 10; i++) {
                var resultsDiv = $("<div class='display'>");
                var gitTitle = $("<p>").html("Title: " + response.items[i].name);
                var gitUser = $("<p>").html("Git User: " + response.items[i].full_name);
                var gitDescription = $("<p>").html("Description: " + response.items[i].description);
                var gitURL = $("<button class='button'><a href='" + response.items[i].html_url + "'target='none'>View</a></button>");
                resultsDiv.append(gitTitle);
                resultsDiv.append(gitUser);
                resultsDiv.append(gitDescription);
                resultsDiv.append(gitURL);
                resultsDiv.appen("<button class='button'>x</button>");
                resultsDiv.append("<button class='button'>Save</button>");

                $(".results").append(resultsDiv);
            }
        } else {
            $(".results").html("<h1>No results for this search. </br> Please choose a different search term.</h1>");
        }
    })
});
