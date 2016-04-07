window.onload = function () {
    var positionStr = $('#input-fkb-map').val();
    var position = positionStr.split(',');
    console.log(positionStr.split(','));
    var options = {
        center: new google.maps.LatLng(position[0], position[1]),//<?php echo $fkb_map; ?>),
        zoom: 17,
        disableDefaultUI: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var div = document.getElementById('map_canvas');
    var map = new google.maps.Map(div, options);

    var image = '../image/catalog/map-marker.png';

    var myLoc = '';

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position[0], position[1]),
        icon: image,
        map: map
    });
    // $('a[href=#tab-rvgmap]').on('click', function() {
    // 	setTimeout(function(){
    // 		google.maps.event.trigger(map, 'resize');
    // 		map.setZoom(17);
    // 		map.setCenter(marker.getPosition());
    // 	}, 50);
    // });
};
// Geocode
var geocoder;
var map;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.7033127, -73.979681);
    var mapOptions = {
        zoom: 17,
        center: latlng,
        disableDefaultUI: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas-geocoding'),
        mapOptions);
}

function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            var lat = marker.getPosition().lat();
            var lng = marker.getPosition().lng();
            jQuery("span[id='lat']").html(lat);
            jQuery("span[id='comma']").html(',');
            jQuery("span[id='lng']").html(lng);
            $("input[id='input-fkb-map']").val(lat + ',' + lng);
        }
    });
}
// Add a marker to the map and push to the array.
function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    jQuery("span[id='lat']").html(lat);
    jQuery("span[id='comma']").html(',');
    jQuery("span[id='lng']").html(lng);
}

var marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.7033127, -73.979681),
    map: map
});
// $('a[href=#tab-rvgmap]').on('click', function() {
// 	setTimeout(function(){
// 		google.maps.event.trigger(map, 'resize');
//      map.setZoom(17); //You need to reset zoom
//      map.setCenter(marker.getPosition()); //You need to reset the center
//  }, 50);
// });
google.maps.event.addDomListener(window, 'load', initialize);
