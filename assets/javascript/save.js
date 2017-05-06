
//initializes Firebase
var config = {
   	apiKey: "AIzaSyB0X6st9I1JgHTGsZ2bf6cEomOEp7I_COM",
   	authDomain: "webtools-f8edf.firebaseapp.com",
    	databaseURL: "https://webtools-f8edf.firebaseio.com",
    	projectId: "webtools-f8edf",
    	storageBucket: "webtools-f8edf.appspot.com",
    	messagingSenderId: "541829677685"
};

firebase.initializeApp(config);

//references the database
var database =  firebase.database();

$(document).ready(function() {

    //stores user and article info in database
	function storeArticle() {

        $("#resultMessageDiv").hide();
        //gets id of the clicked article (which is set to the unique article identifier from Firebase)
        var articleTitle = $(this).attr("id");
        var articleSource = $(this).attr("data");
        //identifies whether an article. has been saved already
        var duplicate = false;
        //captures article clicked
        var article = this;
        //captures snapshot of all the articles within the uid
        database.ref(uid + "/").once('value').then(function(snapshot) {
            //loops through database and captures snapshot of individual articles
            snapshot.forEach(function(childSnapshot) {
                //if title in article's id and in Firebase match, displays message
                if (articleTitle === childSnapshot.val().title) {
                    duplicate = true;
                    $("#resultMessage").html("You already saved this item.");
                    $("#resultMessageDiv").show();
                } 
            });

            //saves article in Firebase if not a duplicate  
            if (!duplicate && articleSource === "reddit") {

                var parentToStore = article.parentNode;
                var titleToStore = parentToStore.childNodes[2].innerHTML;
                var descToStore = parentToStore.childNodes[3].innerHTML;
                var urlToStore = parentToStore.childNodes[5].innerHTML;
                database.ref(uid + '/').push({
                    title: titleToStore,
                    description: descToStore,
                    URL: urlToStore,
                    readStatus: 0,
                    source: "reddit"
                });
            }

            if (!duplicate && articleSource === "git") {
                var parentToStore = article.parentNode;
                var titleToStore = parentToStore.childNodes[0].innerHTML;
                var gitUserToStore = parentToStore.childNodes[1].innerHTML;
                var descToStore = parentToStore.childNodes[2].innerHTML;
                var urlToStore = parentToStore.childNodes[4].innerHTML;
                database.ref(uid + '/').push({
                    title: titleToStore,
                    gitUser: gitUserToStore,
                    description: descToStore,
                    URL: urlToStore,
                    readStatus: 0,
                    source: "git"
                });
            }

             if (!duplicate && articleSource === "youtube") {
                var parentToStore = article.parentNode;
                var titleToStore = parentToStore.childNodes[2].innerHTML;
                var descToStore = parentToStore.childNodes[3].innerHTML;
                //var imgToStore = parentToStore.childNodes[4].innerHTML;
            
                //console.log ("img: " + imgToStore);
                var urlToStore = parentToStore.childNodes[9].innerHTML;
                database.ref(uid + '/').push({
                    title: titleToStore,
                    //image: imgToStore,
                    description: descToStore,
                    URL: urlToStore,
                    readStatus: 0,
                    source: "youtube"
                });
            }

    	});//ends database.ref
        
	}//ends storeArticle function

    function readStatus() {

        var articleChosen = $(this).attr("id");

        database.ref(uid + "/").once('value').then(function(snapshot) {

            snapshot.forEach(function(childSnapshot) {

                var articleKey = childSnapshot.key;
                
                //if key in article's id and article identifier in Firebase match, changes readStatus
                if (articleKey === articleChosen) {

                    if(childSnapshot.val().readStatus === 0) {
                        database.ref(uid + '/' + articleKey).update({
                            readStatus: 1
                        });
                    }   else {
                            database.ref(uid + '/' + articleKey).update({
                                    readStatus: 0
                            });
                        }
                }//ends if articleKey

            });//ends snapshot
        
        });//ends database.ref

    }//ends readStatus function

    function deleteArticle() {

        var articleChosen = $(this).attr("id");
        
        //gets element of article to delete and deletes article
        var articleToDelete = document.getElementById(articleChosen);
        articleToDelete.parentNode.parentNode.removeChild(articleToDelete.parentNode);
     
        database.ref(uid + "/").once('value').then(function(snapshot) {

            snapshot.forEach(function(childSnapshot) {

                //captures unique article identifier from Firebase
                var articleKey = childSnapshot.key;
                
                //if key in article's id and article identifier in Firebase match, delete article
                if (articleKey === articleChosen) {
                    database.ref(uid + '/' + articleKey).remove();
                } //ends if articleKey

            });//ends snapshot
        
        });//ends database.ref
    }

    //gets article information from Firebase and displays it
    function processJSON(json, readStatus) {

        if (json){

                var count = 0;
                var returnDiv;
                var returnTitleH4;
                var returnDescP;
                var returnLinkBtn;
                var deleteBtn;
                
                //loops thru keys & calls retrieveSaved() to retrieve values from Firebase and display them
                for (var key in json) {

                    //if Firebase readStatus = parameter readStatus or if parameter readStatus = -1
                    if(json[key]["readStatus"] === readStatus || readStatus === -1) {
                        returnTitle = json[key]["title"];
                        returnDesc =  json[key]["description"];
                        returnLink =  json[key]["URL"];

                        if(json[key]["source"] === "git"){
                            returnGitUser = json[key]["gitUser"];
                        }

                        // if(json[key]["source"] == "youtube"){
                        //     returnImg = json[key]["image"];
                        // }

                        //creates readStatus checkbox and sets unique article key as id
                        if(json[key]["readStatus"] === 1) {
                            readCheckbox = $("<div class='checkbox-inline'><label><input type='checkbox' value='one' id=" + key + " class='readArticle' checked>Read</label></div>");
                        }   else{
                                readCheckbox = $("<div class='checkbox-inline'><label><input type='checkbox' value='one' id=" + key + " class='readArticle'>Read</label></div>");
                            }

                        //creates div items to display article    
                        returnDiv = $("<div class='resultDiv'><br/><hr/>");

                        returnTitleH4 = $("<h4>" + returnTitle + "</h4>");
                        $(returnDiv).append(returnTitleH4);

                        if(json[key]["source"] === "git"){
                            returnGitUserP = $("<p>" + returnGitUser + "</p>");
                            $(returnDiv).append(returnGitUserP);
                        }

                        returnDescP = $("<p>" + returnDesc + "</p><br/>");
                        $(returnDiv).append(returnDescP);

                        // if(json[key]["source"] === "youtube"){
                        //     $(returnDiv).append(returnImg);
                        // }

                        deleteBtn = $("<button class='delete' id=" + key +  ">X</button>");
                        $(returnDiv).append(deleteBtn);

                        returnLinkBtn = $("<button class='linkButton'>" + returnLink + "</button>");
                        $(returnDiv).append(returnLinkBtn);
                        
                        $(returnDiv).append(readCheckbox);

                        //displays unread items before read items
                        if(json[key]["readStatus"] === 0) {
                            $(".results").prepend(returnDiv);
                        }   else {
                                $(".results").append(returnDiv);
                            }

                        count ++;
                    }// ends if stmt
               }//ends for loop 
              
            }//ends if json  
        return count;
            
    }//ends processJSON

	$("#allSavedNews").click(function() {
        
        $(".results").empty();
        $("#mapDiv").hide();
        $("#resultMessageDiv").hide();

        if (!uid) {
            $("#resultMessage").html("Please sign in on our homepage to <br/> save any items or view any saved items");
            $("#resultMessageDiv").show();
        }

        database.ref(uid + "/").once("value", function(snapshot) {
            
            //captures snapshot of all the articles within the uid
            json = snapshot.val();
          
            var count = 0;
            if(json) {
                //stores number of articles (all articles in Firebase)
                count = processJSON(json, -1);
            }
            
            if (count === 0) {
                $("#resultMessage").html("You haven't saved anything yet.");
                $("#resultMessageDiv").show();
            }
        
    	});//ends database.ref

	});//ends retrieveNews click

    //adds these event listeners to the document so they will work for dynamically generated elements
    $(document).on("click", ".saveBtn", storeArticle);
    $(document).on("click", ".readArticle", readStatus);
    $(document).on("click", ".delete", deleteArticle);
 
    $("#readNews").on("click", function(event) {
	
        $(".results").empty();
        $("#mapDiv").hide();
        $("#resultMessageDiv").hide();

        database.ref(uid + "/").once('value').then(function(snapshot) {

            json = snapshot.val();
            var readCount = 0;
            if(json){
                //stores number of read files
                readCount = processJSON(json, 1);
            }

            if (readCount === 0) {
                $("#resultMessage").html("You don't have any read items.");
                $("#resultMessageDiv").show();
            } 
        
        });//ends database.ref

    });//ends readNews on click

    $("#unreadNews").on("click", function(event) {
	
        $(".results").empty();
        $("#mapDiv").hide();
        $("#resultMessageDiv").hide();

        database.ref(uid + "/").once('value').then(function(snapshot) {

            json = snapshot.val();
            var unreadCount = 0;
            if(json){
                //stores number of unread files
                unreadCount = processJSON(json, 0);
            }

            if (unreadCount === 0) {
                $("#resultMessage").html("You don't have any unread items.");
                $("#resultMessageDiv").show();
            }  
        
        });//ends database.ref

    });//ends unreadNews on click

});//ends document.ready

