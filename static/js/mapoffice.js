// Longitude/Latitude UQAR
var latlngu = L.latLng(48.452900, -68.512790);
var zoom = 5;


// set up the map and remove the default zoomControl
var map = L.map('map', {
    zoomControl: false
});
map.setView(latlngu, zoom);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="http://www.openstreetmap.org/#map=17/48.45315/-68.51316">View larger map</a> '
}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
L.marker(latlngu).addTo(map)
    .bindPopup('<a href="http://www.uqar.ca"><b>UQAR</b></a> <br/> Campus de Rimouski <br/> 300, allée des Ursulines <br/> G5L 3A1 Rimouski, Qc (Canada) <br/> <i class="fa fa-phone fa"></i>  &nbsp; +1 418 723-1986 (1569) ')
    .openPopup();
//
// add the new control to the map
var zoomHome = new L.Control.zoomHome(latlngu, zoom);
zoomHome.addTo(map);
