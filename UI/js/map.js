var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker? 
        
function initMap() {
 
    map = new google.maps.Map(document.getElementById('map'),{
          center: {lat: 6.6018, lng: 3.3515},
          zoom: 10
        });
    google.maps.event.addListener(map, 'click', function(event) {                
        var clickedLocation = event.latLng;
        if(marker === false){
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        markerLocation();
    });
}
        
function markerLocation(){
    var currentLocation = marker.getPosition();
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude
}
        google.maps.event.addDomListener(window, 'load', initMap);      
//Load the map when the page has finished loading.
