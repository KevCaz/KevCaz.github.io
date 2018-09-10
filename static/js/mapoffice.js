var latlngu = [43.5299, -80.2286];
var zoom = 14;

var map = L.map('map', {
  zoomControl: false
}).setView(latlngu, zoom);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="http://www.openstreetmap.org/#map=17/43.53012/-80.22782">View larger map</a> '
}).addTo(map);

L.marker(latlngu).addTo(map)
    .bindPopup('<a href="https://www.uoguelph.ca/"><i class="fa fa-university" aria-hidden="true"></i> <b>University of Guelph</b></a> <br/>'+
    '<a href="https://www.uoguelph.ca/ib/"> Department of Integrative Biology</a><br/>'+
    'Summerlee Science Complex, <br/> Office SSC-2471, <br/> Guelph, ON N1G 2W1')
    .openPopup();


// custom zoom bar control that includes a Zoom Home function
// found here http://gis.stackexchange.com/questions/127286/home-button-leaflet-map
// adjusting zoom.out
L.Control.zoomHome = L.Control.extend({

    // zoom: this._map.getCenter();

    initialize: function (latlng, zoom) {
      // save position of the layer or any options from the constructor
      this._latlng = latlng;
      this._zoom = zoom;
    },

    options: {
        position: 'topright',
        zoomInText: '<i class="fa fa-plus" style="line-height:1.2;"></i>',
        zoomInTitle: 'Zoom in',
        zoomOutText: '<i class="fa fa-minus" style="line-height:1.2;"></i>',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: '<i class="fa fa-home" style="line-height:1.2;"></i>',
        zoomHomeTitle: 'Zoom home'
    },

    onAdd: function (map) {
        var controlName = 'gin-control-zoom',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
            options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
        controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
        controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
        controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    },


    onRemove: function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn: function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut: function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomHome: function (e) {
        this._map.setView(this._latlng, this._zoom);
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

    _updateDisabled: function () {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
    }
});


// add the new control to the map
var zoomHome = new L.Control.zoomHome(latlngu, zoom);
zoomHome.addTo(map);
