//click on read change to true or false
//click on viewSaved, default to show all and sort unread first, then read
//click on only read show if match user and read
//click on only unread show if match user and unread
//click on all show if match user and sort unread first, then read
//maybe sort by date of article or read/unread

//does not work if put in document.ready
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
	//store user and article info in database
	function storeArticle() {

    	var parentToStore = this.parentNode;
    	var titleToStore = parentToStore.childNodes[2].innerHTML;
    	var descToStore = parentToStore.childNodes[3].innerHTML;
    	var urlToStore = parentToStore.childNodes[6].innerHTML;

    	firebase.database().ref(uid + '/').push({

        	title: titleToStore,
        	description: descToStore,
        	URL: urlToStore,
        	readStatus: readStatus

    	});
        
	}//ends storeArticle function

	//adds the event listener to the document so it will work for dynamically generated elements
	$(document).on("click", ".saveBtn", storeArticle);

	$("#retrieveNews").click(function() {

    	$("#results").empty();
    	$("#saveResults").empty();

    	return firebase.database().ref(uid + "/").once('value').then(function(snapshot) {

        	var json = snapshot.val();
        	var key;
        	
        	for (var field in json) {
            
            	key = field;
                
            	var returnDiv = $("<div id='resultDiv'><br/><hr/>");

            	var returnTitle = json[key]["title"];
            	var returnTitleH4 = $("<h4>" + returnTitle + "</h4>");
            	$(returnDiv).append(returnTitleH4);

            	var returnDesc =  json[key]["description"];
            	var returnDescP = $("<p>" + returnDesc + "</p><br/>");
            	$(returnDiv).append(returnDescP);

            	var returnLink =  json[key]["URL"];
            	var returnLinkBtn = $("<button>" + returnLink + "</button><br/>");
            	$(returnDiv).append(returnLinkBtn);

            	$("#saveResults").append(returnDiv);

        	} //ends for loop   
        
    	}); //ends return

	});//ends retrieveNews click

});












// $("#viewRead").on("click", function(event) {
// 	//view all read under that user (matches user and unread)
// });

// $("viewUnread").on("click", function(event) {
// 	//view all unread under that user (matches user and read)
// });

// $("#viewAll").on("click", function(event) {
// 	//same as view saved so make into a function to be called here and in on click view saved
// });

// $(".delete").on("click", function(event) {
// 	//delete only that article (matches user and article values)
// });

