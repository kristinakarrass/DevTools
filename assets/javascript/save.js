
//click on viewAllSaved, sort unread first, then read


//initializes firebase
var config = {
   	apiKey: "AIzaSyB0X6st9I1JgHTGsZ2bf6cEomOEp7I_COM",
   	authDomain: "webtools-f8edf.firebaseapp.com",
    databaseURL: "https://webtools-f8edf.firebaseio.com",
    projectId: "webtools-f8edf",
    storageBucket: "webtools-f8edf.appspot.com",
    messagingSenderId: "541829677685"
};

firebase.initializeApp(config);

//variable to reference the database
var database = firebase.database();

$(document).ready(function() {
	
    //stores user and article info in database
	function storeArticle() {

    	var parentToStore = this.parentNode;
    	var titleToStore = parentToStore.childNodes[2].innerHTML;
    	var descToStore = parentToStore.childNodes[3].innerHTML;
    	var urlToStore = parentToStore.childNodes[6].innerHTML;

    	firebase.database().ref(uid + '/').push({
           
        	title: titleToStore,
        	description: descToStore,
        	URL: urlToStore,
        	readStatus: "not read"

    	});
       
	}//ends storeArticle function

    function readStatus() {

        //gets id of the clicked article (which is set to the unique article identifier from Firebase)
        var articleChosen = $(this).attr("id");

        //snapshot captures snapshot of all the articles within the uid
        return firebase.database().ref(uid + "/").once('value').then(function(snapshot) {

            //loops through each key in firebase
            //childSnapshot captures snapshot of the individual article
            snapshot.forEach(function(childSnapshot) {

                //captures unique article identifier from Firebase
                var articleKey = childSnapshot.key;
                
                //if key in article's id and article identifier in Firebase match, changes readStatus
                if (articleKey == articleChosen) {

                    if(childSnapshot.val().readStatus == "not read") {
                        firebase.database().ref(uid + '/' + articleKey).update({
                            readStatus: "read"
                        });
                    }   else {
                            firebase.database().ref(uid + '/' + articleKey).update({
                                    readStatus: "not read"
                            });
                        }
                } //ends if articleKey

            });//ends snapshot
        
        });//ends return

    }//ends readStatus function

    //global var needed for savedDiv function
    var returnTitle;
    var returnDesc;
    var returnLink;
    var readCheckbox;

    //retrieves values from Firebase and displays them
    function savedDiv(key) {

        var returnDiv = $("<div class='resultDiv'><br/><hr/>");

        var returnTitleH4 = $("<h4>" + returnTitle + "</h4>");
        $(returnDiv).append(returnTitleH4);

        var returnDescP = $("<p>" + returnDesc + "</p><br/>");
        $(returnDiv).append(returnDescP);

        var returnLinkBtn = $("<button>" + returnLink + "</button><br/>");
        $(returnDiv).append(returnLinkBtn);
        
        var deleteBtn = $("<button class='delete' id=" + key +  ">X</button>");
        $(returnDiv).append(deleteBtn);

        $(returnDiv).append(readCheckbox);

        $("#saveResults").append(returnDiv);

    } //ends retrieveSaved function

    //global variable needed for saveMessageDiv function
    var saveMessageP;

    function saveMessageDiv() {
        var saveMessageDiv = $("<div id='saveMessage'>");
        $(saveMessageDiv).append(saveMessageP);
        $("#saveResults").append(saveMessageDiv);
        $("#saveMessage").css("color", "red");
    }

    function deleteArticle() {

        //gets id of the clicked article (which is set to the unique article identifier from Firebase)
        var articleChosen = $(this).attr("id");
        var articleToDelete = document.getElementById(articleChosen);
        
        //deletes article
        articleToDelete.parentNode.parentNode.removeChild(articleToDelete.parentNode);
     
        //snapshot captures snapshot of all the articles within the uid
        return firebase.database().ref(uid + "/").once('value').then(function(snapshot) {

            //loops through each key in firebase
            //childSnapshot captures snapshot of the individual article
            snapshot.forEach(function(childSnapshot) {

                //captures unique article identifier from Firebase
                var articleKey = childSnapshot.key;
                
                //if key in article's id and article identifier in Firebase match, delete article
                if (articleKey == articleChosen) {
                    firebase.database().ref(uid + '/' + articleKey).remove();
                } //ends if articleKey

            });//ends snapshot
        
        });//ends return
    }

	$("#allSavedNews").click(function() {

    	$("#results").empty();
        $("#saveResults").empty();

        return firebase.database().ref(uid + "/").once('value').then(function(snapshot) {
            
            //captures snapshot of all the articles within the uid
            json = snapshot.val();
            key = key;

            if (json){

                //loops thru keys
                //calls retrieveSaved function to retrieve values from Firebase and display them
                for (var key in json) {
            	    returnTitle = json[key]["title"];
                    returnDesc =  json[key]["description"];
                    returnLink =  json[key]["URL"];
                    //creates readStatus checkbox and sets unique article key as id
                    if(json[key]["readStatus"] == "read"){
                        readCheckbox = $("<div class='checkbox-inline'><label><input type='checkbox' value='one' id=" + key + " class='readArticle' checked>Read</label></div>");
                    }   else{
                            readCheckbox = $("<div class='checkbox-inline'><label><input type='checkbox' value='one' id=" + key + " class='readArticle'>Read</label></div>");
                        }
                    savedDiv(key);
        	   } //ends for loop 

            }   else { 
                    saveMessageP = $("<h4>You haven't saved anything yet.</h4>");
                    saveMessageDiv();
                }  
        
    	}); //ends return

	});//ends retrieveNews click

    //adds these event listeners to the document so they will work for dynamically generated elements
    $(document).on("click", ".saveBtn", storeArticle);
    $(document).on("click", ".readArticle", readStatus);
    $(document).on("click", ".delete", deleteArticle);
 
    $("#readNews").on("click", function(event) {
	
        $("#results").empty();
        $("#saveResults").empty();

        return firebase.database().ref(uid + "/").once('value').then(function(snapshot) {

            //captures snapshot of all the articles within the uid
            json = snapshot.val();
            key = key;

            if (json){

                var readCount = 0;

                for (var key in json) {
                    if(json[key]["readStatus"] == "read") {
                        returnTitle = json[key]["title"];
                        returnDesc =  json[key]["description"];
                        returnLink =  json[key]["URL"];
                        readCheckbox = $("<div class='checkbox-inline'><label><input type='checkbox' value='one' id=" + key + " class='readArticle' checked>Read</label></div>");
                        savedDiv();
                        readCount++;
                    }//ends first if json[key]
                } //ends for loop

            }   else { 
                    saveMessageP = $("<h4>You haven't saved anything yet.</h4>");
                    saveMessageDiv();
                }

            if (readCount == 0) {
                saveMessageP = $("<h4>You don't have any read items.</h4>");
                saveMessageDiv();
            }  
        
        }); //ends return

    }); //ends readNews on click

    $("#unreadNews").on("click", function(event) {
	
        $("#results").empty();
        $("#saveResults").empty();

        return firebase.database().ref(uid + "/").once('value').then(function(snapshot) {

            json = snapshot.val();
            key = key;

            if (json){

                var unreadCount = 0;

                for (var key in json) {
                    if(json[key]["readStatus"] == "not read") {
                        returnTitle = json[key]["title"];
                        returnDesc =  json[key]["description"];
                        returnLink =  json[key]["URL"];
                        readCheckbox = $("<div class='checkbox-inline'><label><input type='checkbox' value='one' id=" + key + " class='readArticle'>Read</label></div>");                
                        savedDiv();
                        unreadCount++;
                    }//ends first if json[key]
                } //ends for loop

            }   else { 
                    saveMessageP = $("<h4>You haven't saved anything yet.</h4>");
                    saveMessageDiv();
                }

            if (unreadCount == 0) {
                saveMessageP = $("<h4>You don't have any unread items.</h4>");
                saveMessageDiv();
            }   
        
        }); //ends return

    }); //ends unreadNews on click

});//ends document.ready

