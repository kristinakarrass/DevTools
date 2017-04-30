//references the database
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
        var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&sensor=false;'

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //create variables for latitude and longitude of user input
            var userLat = response.results[0].geometry.location.lat;
            var userLng = response.results[0].geometry.location.lng;
            var location = response.results[0].formatted_address;

            database.ref("map/").push({
                location: location,
                latitude: userLat,
                longitude: userLng
            });
 
        })

    });

    //retrieve user location from database and display it on map
    database.ref("map/").on("child_added", function(childSnapshot) {
        //creating variables from childsnapshot for marker on map
        var location = childSnapshot.val().location;
        var userLng = childSnapshot.val().longitude;
        var userLat = childSnapshot.val().latitude;
        var marker = L.marker([userLat, userLng], {
            icon: L.mapbox.marker.icon({
                'marker-size' : 'medium',
                'marker-color' : '#4aaaa5'
            })

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

