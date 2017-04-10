
$(document).ready(function() {

    var provider;
    window.uid;

    function toggleSignIn() {
        //if there's no current user
        if (!firebase.auth().currentUser) {
            //creates provider
            provider = new firebase.auth.GoogleAuthProvider();
            //displays Google sign-in popup
            firebase.auth().signInWithPopup(provider).then(function(result) {
                $("#saveMessageDiv").hide();
            //captures and displays any errors
            }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  $("#saveMessage").html("Login Failed. " + errorMessage);
                  $("#saveMessageDiv").show();    
                  console.log(errorCode);
                  console.log(errorMessage);
              });
        }//ends if stmt  
            else {
                //if there is a current user, signs them out
                firebase.auth().signOut();
            }
    }//ends toggleSignIn()
 
    //sets up UI event listeners and registers Firebase auth listeners:
    function initApp() {
        // Listens for auth state changes
        firebase.auth().onAuthStateChanged(function(user) {
            //changes to a sign out button and updates status when user is signed in
            if (user) {
                document.getElementById('GoogleSignInStatus').textContent = 'Signed in';
                document.getElementById('GoogleSignIn').textContent = 'Sign out';
                //changes to a sign in button and updates status when user is signed out
            }   else {
                    document.getElementById('GoogleSignInStatus').textContent = 'Signed out';
                    document.getElementById('GoogleSignIn').textContent = 'Sign in with Google';
                }
        });
        //calls toggleSignIn when clicked
        document.getElementById('GoogleSignIn').addEventListener('click', toggleSignIn);
    }//ends initApp()

    initApp();

});//ends document.ready
