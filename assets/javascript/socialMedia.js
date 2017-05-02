$(document).ready(function() {
 
    //This ajax call indexes the search function of the YouTube API for videos that match the query the user types into the search box.
    //Relevant info about each video is then extracted from the API response and displayed in a div.
    //Buttons which allow the user to save each video to their profile or view it on YouTube are then dynamically created under each result. 

    $("#submit").click(function() {

        event.preventDefault();

        $("#resultMessage").html("");
        $("#resultMessageDiv").hide();

        $(".results").empty();
        var userQuery = $("#searchTerm").val().trim();

        //only searches if the user inputs a value
        if (!userQuery == "") {

            $("#searchTerm").val("");
         
            var apiResponse = $.ajax({
                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ userQuery + "&type=video&videoCaption=closedCaption&maxResults=50&key=AIzaSyAxiRCPhMVJCiQMhQeJ6JeKWXjKwzvldrs",
                method: 'GET',
                dataType: 'json'
            });

            apiResponse.done(function(response){
                //extract each video's title, description, link, small thumbnail to display on page, put each of these in a div for each video and append to 
                //larger div
                var resultsArray = response.items;
                if (resultsArray.length > 0) {   //execute if there is at last 1 result
                    for (var i = 0; i < resultsArray.length; i++) {
                        var newDiv = $("<div class='video'><br/><hr/>");
                        
                        var videoTitle = $("<h4>" + resultsArray[i].snippet.title + "</h4>");
                        newDiv.append(videoTitle);

                        var videoDescription = $("<p> Description: " + resultsArray[i].snippet.description + "</p>");
                        newDiv.append(videoDescription);

                        var videoThumbnail = resultsArray[i].snippet.thumbnails.default.url;
                        var videoImage = $("<img src ='" + videoThumbnail + "' alt = 'video'> <br/><br/>");
                        newDiv.append(videoImage);

                        var vidId = resultsArray[i].id.videoId;
                        var vidIdFullLink = "https://www.youtube.com/watch?v="+vidId;
                        
                        //dynamically creating "save" and "view" buttons for each search result
                        var saveButton = $("<button>");
                        saveButton.addClass("saveBtn");
                        saveButton.text("Save");
                        saveButton.attr("id", videoTitle);
                        saveButton.attr("data", "youtube");
                        newDiv.append(saveButton);
                        newDiv.append("<button id='yTLink'><a href='"+ vidIdFullLink+"'" + "target='_blank'>View</a></button>");
                        
                        $(".results").append(newDiv);
                    }
                }
                else { // if there are no search results for the user's query
                    $("#resultMessage").html("Sorry, no results are available for that search.<br/>Please try another search term.");
                    $("#resultMessageDiv").show();

                }
                         
            });//end apiResponse.done
        }//end if (!userQuery == "")
        else {
            $("#resultMessage").html("You must enter a search term.");
            $("#resultMessageDiv").show();
        }

    });//end submit click

});//end document.ready