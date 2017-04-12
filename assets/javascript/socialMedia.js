$(document).ready(function() {
 
    // var database = firebase.database();
    //note to self: try with youtube and linkedin because these do not have oauth
    //oauth is a thing where the user has to be logged in with their account for that social media site for the query to be authorized
    //like in order to search tweets, they would have to log into twitter
    //which isnt really good UX for our site

    var apiResponse = [];

    $("#submit").click(function() {
        $("#results").empty();
            var userQuery = $("#searchTerm").val().trim();
     
            var apiResponse = $.ajax({
              // url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + userQuery,
              url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ userQuery + "&type=video&videoCaption=closedCaption&maxResults=50&key=AIzaSyAxiRCPhMVJCiQMhQeJ6JeKWXjKwzvldrs",
              method: 'GET',
              dataType: 'json'
            });

            apiResponse.done(function(response){
                  //extract each video's title, description, link, small thumbnail to display on page, put each of these in a div for each video and append to 
                  //larger div
                  var resultsArray = response.items;
                  if (resultsArray.length>0) {   
                  for (i=0; i<resultsArray.length; i++) {
                    var newDiv = $("<div class = 'video'><br/><hr/>");
                    
                    var videoTitle = $("<h4>" + resultsArray[i].snippet.title + "</h4>");
                    newDiv.append(videoTitle);

                    var videoDescription = $("<p> Description: " + resultsArray[i].snippet.description + "</p>");
                    newDiv.append(videoDescription);

                    var videoThumbnail = resultsArray[i].snippet.thumbnails.default.url;
                    var videoImage = $("<img src ='" + videoThumbnail + "' alt = 'video'> <br/><br/>");
                    newDiv.append(videoImage);

                    var vidId = resultsArray[i].id.videoId;
                    var vidIdFullLink = "https://www.youtube.com/watch?v="+vidId;
                    // newDiv.append("<a href =" + vidIdFullLink + ">"+ videoTitle + "</a> <br>");
                    
                    
                    var saveButton = $("<button>");
                    saveButton.addClass("saveBtn");
                    saveButton.text("Save");
                    saveButton.attr("id", videoTitle);
                    saveButton.attr("data", "youtube");
                    newDiv.append(saveButton);
                    newDiv.append("<button><a href='"+ vidIdFullLink+"'" + "target='_blank'>View</a></button>");
                    //note to frontend person! please style the text on this button so it doesnt have standard link formatting and looks like standard button text.
                    //the other ways of making link buttons that I've looked up don't work with dynamic button creation like I have here
                    //also, I just looked at the news.js file, and the view button there seems to have been created the same way
                    //so it looks like our best bet is to make the button text the link on our view buttons, and then use css to make the button text look like every other button 
                    

//                   
                    // newDiv.append("<form action= '" + vidIdFullLink+"'>" + "<input type = 'submit' value = 'View' /></form>"); 
                    
                    $("#results").append(newDiv);
                  }
                }
                else {
                  $("#results").append("<p id='noResultsMessage'> Sorry, no results are available for that search.<br/>Please try another search term.</p>");

                }

                
        });//end apiResponse.done
    });//end submit click

});//end document.ready