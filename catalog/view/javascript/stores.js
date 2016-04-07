/*
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author PrestaShop SA <contact@prestashop.com>
 *  @copyright  2007-2015 PrestaShop SA
 *  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
var map;
var allStores;
var markers = [];
var translation_1 = 'No stores were found.';
var translation_2 = 'store found -- see details:';
var translation_3 = 'stores found -- view all results:';
var translation_4 = 'Phone:';
var translation_5 = 'Get directions';
var translation_6 = 'Not found';
$(document).ready(function () {
    var defaultLat = 35.9127545;
    var defaultLong = -114.0757739;

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(defaultLat, defaultLong),
        zoom: 10,
        scrollwheel: false,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });
    infoWindow = new google.maps.InfoWindow();

    // locationSelect = document.getElementById('locationSelect');
    // 	locationSelect.onchange = function() {
    // 	var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
    // 	if (markerNum !== 'none')
    // 	google.maps.event.trigger(markers[markerNum], 'click');
    // };

    $('#addressInput').keypress(function (e) {
        code = e.keyCode ? e.keyCode : e.which;
        if (code === 13) {
            searchLocations();
        }
    });

    $(document).on('click', 'button[name=search_locations]', function (e) {
        e.preventDefault();
        searchLocations();
    });

    initMarkers();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(moveToLocation);
    }

});

function moveToLocation(position) {
    var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    findShopAndProduct(center);
}

function initMarkers() {
    $.ajax({
        url: "index.php?route=product/manufacturer/all_json",
        type: "post",
        dataType: 'json',
        success: function (data) {
            var bounds = new google.maps.LatLngBounds();
            data.forEach(function (item) {
                var posStr = item['fkb_map']
                if (posStr.indexOf(',') > -1) {
                    var position = posStr.split(',');
                    var latlng = new google.maps.LatLng(parseFloat(position[0]), parseFloat(position[1]));
                    item['position'] = latlng;
                    createMarker(latlng, item);
                    bounds.extend(latlng);
                }
            });
            allStores = data;
            console.log(allStores);
            map.fitBounds(bounds);
            var zoomOverride = map.getZoom();
            if (zoomOverride > 10)
                zoomOverride = 10;
            map.setZoom(zoomOverride);
        },
        error: function (data) {
            console.log("Error: ");
            console.log(data);
        }
    });
}

function popUpMsg() {
    var address = $("#addressInput").val();
    if (!!$.prototype.fancybox && isCleanHtml(address))
        $.fancybox.open([
            {
                type: 'inline',
                autoScale: true,
                minHeight: 30,
                content: '<p class="fancybox-error">' + address + ' ' + translation_6 + '</p>'
            }
        ], {
            padding: 0
        });
    else
        alert(address + ' ' + translation_6);
}

function findShopAndProduct(center) {
    map.panTo(center);
    createMyLocationMarker(center, 'Your Location');
    var nearShops = findNearShop(center);
    if (nearShops.length < 1) {
        popUpMsg()
    } else {
        console.log(nearShops);
        displayProducts(nearShops);
    }
}


function searchLocations() {
    $('#near_product').html("");
    // $('#stores_loader').show();
    var address = $('input[id=addressInput]').val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var center = results[0].geometry.location;
            findShopAndProduct(center);
        }
        else {
            popUpMsg();
        }
        // $('#stores_loader').hide();
    });
}

function createMyLocationMarker(myPosition, name) {
    var marker = new google.maps.Marker({
        map: map,
        position: myPosition,
        title: name
    });
    map.setZoom(15);
    markers[markers.length - 1].setMap(null);
    markers[markers.length - 1] = marker;
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function displayProducts(shops) {
    // var nearestShop = shops[0];
    var finalData = "";
    shops.forEach(function(shop){
        $.ajax({
        url: "index.php?route=product/manufacturer/info2&manufacturer_id=" + shop.manufacturer_id,
        type: "get",
        success: function (data) {
            var newData = $('#near_product').html() + data;
            $('#near_product').html(newData);
        },
        error: function () {
            console.log("Error: ");
            console.log(data);
        }
        });
    });
    
}

function getDistance(p1, p2) {
    var lat1 = p1.lat(), lon1 = p1.lng(), lat2 = p2.lat(), lon2 = p2.lng();

    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344;

    return dist;
}

function findNearShop(center) {
    var radius = 200;
    var nearShops = [];
    // console.log("center" + center);
    var i = 0;
    allStores.forEach(function (item) {
        i = i + 1;
        try {
            var shopPos = item['position'];
            var distance = getDistance(center, shopPos);
            console.log("shop " + i + ":" + shopPos);
            console.log("distance: " + distance);
            if (distance <= radius) {
                console.log("NEAR SHOP: " + item.name);
                //TODO need to clone item
                item['distance'] = distance;
                nearShops.push(item);
            }
        }
        catch (err) {
            console.log("Shop " + item.name + " got error: " + err)
        }

    });
    console.log("before: ", nearShops);
    nearShops = sortByKey(nearShops, "distance");
    console.log("after:", nearShops);
    console.log("allstores after:", allStores);
    return nearShops;
}

function createMarker(latlng, shopInfo) {
    var imageLink = 'image/' + shopInfo['image'];
    var html = '<b>' + shopInfo['name'] + '</b><br/>' + (shopInfo.hasOwnProperty('image')
            ? '<br /><br /><img src="' + imageLink + '" height="42" width="42" alt="" />'
            : '') + '<br /><a href="http://maps.google.com/maps?saddr=&daddr=' + latlng + '" target="_blank">' + translation_5 + '<\/a>';
    var marker = '';
    var icon = {
        url: imageLink,
        scaledSize: new google.maps.Size(24, 24), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    if (shopInfo.hasOwnProperty('image'))
        marker = new google.maps.Marker({map: map, icon: icon, position: latlng});
    else
        marker = new google.maps.Marker({map: map, position: latlng});

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}

// function createOption(name, distance, num) {
//     var option = document.createElement('option');
//     option.value = num;
//     option.innerHTML = name + ' (' + distance.toFixed(1) + ' ' + distance_unit + ')';
//     locationSelect.appendChild(option);
// }

// function downloadUrl(url, callback) {
//     var request = window.ActiveXObject ?
//         new ActiveXObject('Microsoft.XMLHTTP') :
//         new XMLHttpRequest();
//
//     request.onreadystatechange = function () {
//         if (request.readyState === 4) {
//             request.onreadystatechange = doNothing;
//             callback(request.responseText, request.status);
//         }
//     };
//
//     request.open('GET', url, true);
//     request.send(null);
// }
//
// function parseXml(str) {
//     if (window.ActiveXObject) {
//         var doc = new ActiveXObject('Microsoft.XMLDOM');
//         doc.loadXML(str);
//         return doc;
//     }
//     else if (window.DOMParser)
//         return (new DOMParser()).parseFromString(str, 'text/xml');
// }

function doNothing() {
}
