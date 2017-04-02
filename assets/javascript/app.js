
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyB0X6st9I1JgHTGsZ2bf6cEomOEp7I_COM",
//     authDomain: "webtools-f8edf.firebaseapp.com",
//     databaseURL: "https://webtools-f8edf.firebaseio.com",
//     projectId: "webtools-f8edf",
//     storageBucket: "webtools-f8edf.appspot.com",
//     messagingSenderId: "541829677685"
//   };

//   firebase.initializeApp(config);

//   var defaultDatabase = firebase.database();
//   var defaultAuthentation = firebase.auth();
//   var provider = new firebase.auth.GithubAuthProvider();

// // Sets up shortcuts to Firebase features and initiate firebase auth.
// FriendlyChat.prototype.initFirebase = function() {
//   // Shortcuts to Firebase SDK features.
//   this.auth = firebase.auth();
//   this.database = firebase.database();
//   this.storage = firebase.storage();
//   // Initiates Firebase auth and listen to auth state changes.
//   this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
// };

// // Signs-in Friendly Chat.
// FriendlyChat.prototype.signIn = function() {
//   // Sign in Firebase using popup auth and Google as the identity provider.
//   var provider = new firebase.auth.GoogleAuthProvider();
//   this.auth.signInWithPopup(provider);
// };

// // Signs-out of Friendly Chat.
// FriendlyChat.prototype.signOut = function() {
//   // Sign out of Firebase.
//   this.auth.signOut();
// };

// // Triggers when the auth state change for instance when the user signs-in or signs-out.
// FriendlyChat.prototype.onAuthStateChanged = function(user) {
//   if (user) { // User is signed in!
//     // Get profile pic and user's name from the Firebase user object.
//     var profilePicUrl = user.photoURL; // Only change these two lines!
//     var userName = user.displayName;   // Only change these two lines!

// // Returns true if user is signed-in. Otherwise false and displays a message.
// FriendlyChat.prototype.checkSignedInWithMessage = function() {
//   // Return true if the user is signed in Firebase
//   if (this.auth.currentUser) {
//     return true;
//   }

  




$(document).ready(function(){

var apiResponse = [];

$("#submit").click(function(){
  $("#results").empty();
  var userQuery = $("#search").val().trim();
     
      var apiResponse = $.ajax({
          url: 'https://www.reddit.com/subreddits/search.json?q=' + userQuery,
          method: 'GET',
          dataType: 'json'
      });
            apiResponse.done(function(response){
                  console.log(response);
                  apiData = response.data.children;
                  if (apiData.length > 0) {
                      for (i=0; i < apiData.length; i++) {
                          var apiTitle = apiData[i].data.title;
                          var apiURL = 'http://reddit.com' + apiData[i].data.url;
                          var apiLink = "<button><a href='" + apiURL + "'target='none'>View</a></button><br/>";
                          var apiTitle = apiTitle;
                          var apiDescription = apiData[i].data.public_description;
                          var resultDiv = $("<div id='resultDiv'>");
                          $(resultDiv).append("<h4>" + apiTitle + "</h4>");
                          $(resultDiv).append("<p>" + apiDescription + "</p><br/>");
                          $(resultDiv).append("<button>Save</button>");
                          $(resultDiv).append(apiLink + "<br/><hr/>");
                          $("#results").append(resultDiv);
                      };
                  }   else {
                            $("#results").append("<p id='noResultsMessage'> Sorry, no results are available for that search.<br/>Please try another search term.</p>");
                      }
                  userQuery = $("#searchTerm");
                
            });
});

});//end document.ready




function authController($firebaseAuth){

    var authObj = $firebaseAuth();
    var self = this;

    //Bindable Objects:
    self.loggedIn = new Boolean();
    self.userEmail;

    //Function Declarations
    self.logOff = logOff;

    //auth Listener:
    authObj.$onAuthStateChanged(function(firebaseUser){

        if(firebaseUser){
            console.log("Logged in " + firebaseUser);
            self.loggedIn = true;
            self.userEmail = firebaseUser.email;
        }
        else{
            console.log("Not Logged in!");
            self.loggedIn = false;
            self.userEmail = null
        }
    })

    // Functions
    function logOff(){
       var promise =  authObj.$signOut();
       promise.catch(e => console.log(e.message));
    }
}
