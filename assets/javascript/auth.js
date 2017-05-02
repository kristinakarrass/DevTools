
$(document).ready(function(){

    var provider;
    window.uid;

    function toggleSignIn() {
        //if there's no current user
        if (!firebase.auth().currentUser) {
            //creates provider
            provider = new firebase.auth.GoogleAuthProvider();
            //displays Google sign-in popup
            firebase.auth().signInWithPopup(provider).then(function(result) {
                $("#resultMessageDiv").hide();
                //captures all user data captured by Google
                user = result.user;
            //captures and displays any errors   
            }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  $("#resultMessage").html("Login Failed. " + errorMessage);
                  $("#resultMessageDiv").show();    
                  console.log(errorCode);
                  console.log(errorMessage);
               });
        }//ends if stmt 
            else {
                //if there is a current user, signs them out
                firebase.auth().signOut();
            }
        
    }//ends toggleSignIn
 
    //registers Firebase auth listeners:
    function initApp() {
        // Listens for auth state changes
        firebase.auth().onAuthStateChanged(function(user) {
            
            if (user) {
                //stores the user's id 
                uid = user.uid;
                //changes to a sign out button and updates status when user is signed in
                document.getElementById('GoogleSignIn').textContent = 'Sign out';
            }   else {
                    //changes to a sign in button and updates status when user is signed out
                    document.getElementById('GoogleSignIn').textContent = 'Google Sign-In';
                }
        
        });
        //calls toggleSignIn when clicked
        document.getElementById('GoogleSignIn').addEventListener('click', toggleSignIn);
    }//ends initApp()

    initApp();

});//end document.ready
