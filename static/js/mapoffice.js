var latlngu = [43.5299, -80.2286];
var zoom = 14;

var map = L.map('map', {
  // zoomControl: false
}).setView(latlngu, zoom);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="http://www.openstreetmap.org/#map=17/43.53012/-80.22782">View larger map</a> '
}).addTo(map);

L.marker(latlngu).addTo(map)
    .bindPopup('<a href="https://www.uoguelph.ca/"><b>University of Guelph</b></a> <br/>'+
    '<a href="https://www.uoguelph.ca/ib/"> Department of Integrative Biology</a><br/>'+
    'Summerlee Science Complex, <br/> Office SSC-2471, <br/> Guelph, ON N1G 2W1')
    .openPopup();

// add the new control to the map
var zoomHome = new L.Control.zoomHome(latlngu, zoom);
zoomHome.addTo(map);

address = "Department of Integrative Biology, Summerlee Science Complex, "
