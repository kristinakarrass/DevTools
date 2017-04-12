  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCslYrCxbDfzGaaUL9ooO5oq2bHasApGoY",
    authDomain: "user-location-f6937.firebaseapp.com",
    databaseURL: "https://user-location-f6937.firebaseio.com",
    projectId: "user-location-f6937",
    storageBucket: "user-location-f6937.appspot.com",
    messagingSenderId: "260601362565"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    //create map 
    L.mapbox.accessToken = 'pk.eyJ1Ijoia3Jpa2FyciIsImEiOiJjajEwcmxpdmEwM2ZoMzJwZWNrc3hnYm13In0.8cXei-iPLO0qctadLZ9O9w';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([15, -25], 2);

    //get user's location and add it to the map
    $("#add-location").on("click", function() {
        //prevents the page to reload when enter is pressed
        event.preventDefault();
        //create user location (grab it from user input) and query variables
        var userLocation = $("#userLocation").val().trim();
        var queryURL = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&sensor=false;'

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);
            console.log(response.results[0].formatted_address);
            console.log(response.results[0].geometry.location.lat);
            console.log(response.results[0].geometry.location.lng);
            //create variables for latitude and longitude of user input
            var userLat = response.results[0].geometry.location.lat;
            var userLng = response.results[0].geometry.location.lng;
            var location = response.results[0].formatted_address;

            database.ref().push({
                location: location,
                latitude: userLat,
                longitude: userLng
            });
 
        })

    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().location);

        $("#userLocation").val("");
    });

    //retrieve user location from database and display it on map
    database.ref().on("child_added", function(childSnapshot) {
        //creating variables from childsnapshot for marker on map
        var location = childSnapshot.val().location;

        var userLng = childSnapshot.val().longitude;
        var userLat = childSnapshot.val().latitude;
        var marker = L.marker([userLat, userLng], {
            icon: L.mapbox.marker.icon({
                'marker-size' : 'medium',
                'marker-color' : '#4aaaa5'
            })

        
    
    // Create Chapel Hill, NC marker and set its icons to L.mapbox.marker.icon

        })  //popup showing user location and add it to map
            .bindPopup(location)
            .addTo(map);
    })

    // Create Bootcamp Chapel Hill, NC marker and set its icons to L.mapbox.marker.icon

    L.marker([35.9131996, -79.0558445], {
        icon: L.mapbox.marker.icon({
            'marker-size': 'medium',
            'marker-color': '#4aaaa5'
        })

    })
        .bindPopup("UNC Chapel Hill Bootcamp, NC, USA")
        .addTo(map);

